<template>
	<div class="card-adder">
		<form v-if="!loadingCard" @submit.prevent="handleSubmit()">
			<label for="card-input">Add a card to this deck:</label>
			<input
				@input="submitSuggestion()"
				:placeholder="inputPlaceholder"
				autocomplete="off"
				id="card-input"
				list="card-suggestions"
				type="text"
				v-model="cardNameInput"
			/>
			<datalist id="card-suggestions">
				<option v-for="name in cardSuggestions" :key="name">
					{{ name }}
				</option>
				<option value="(random)">
					🎲 Add a randomly selected Magic card
				</option>
			</datalist>
			<button class="primary-btn" :disabled="delay">Add<span> Card</span></button>
		</form>
		<div v-else class="loading-indicator">
			Loading card&hellip;
		</div>
	</div>
</template>

<script>

import axios from 'axios'
import debounce from 'debounce'
import stringMethods from '@/mixins/stringMethods.js'
import requestScryfallData from '@/mixins/requestScryfallData.js'
import cardListSectionalGaps from '@/mixins/cardListSectionalGaps.js'

export default {
	mixins: [stringMethods, requestScryfallData, cardListSectionalGaps],
	props: {
		deck: Object
	},
	data () {
		return {
			cardNameInput: '',
			delay: false,
			loadingCard: false,
			cardSuggestions: null
		}
	},
	created () {
		this.debouncedAutocomplete = debounce(this.autocompleteName, 500)
	},
	computed: {
		inputPlaceholder () {
			if (this.deck.cards.length === 0) {
				return '(Enter the name of a card here.)'
			}
			return null
		}
	},
	watch: {
		cardNameInput: function () {
			this.debouncedAutocomplete()
		}
	},
	methods: {
		alertTooLong () {
			alert('⚠ The Scryfall web server seems to be taking too long to respond right now. Please try again at a later time.')
		},
		autocompleteName () {
			const query = this.cardNameInput

			if (query !== '' && query !== '(random)') {
				console.log(`Request Scryfall API for autocomplete from "${query}".`)

				axios
					.get(`https://api.scryfall.com/cards/autocomplete?q=${query}`)
					.then(response => {
						const data = response.data.data

						// Limit the number of autocomplete suggestions to 5.
						while (data.length > 5) {
							data.pop()
						}

						this.cardSuggestions = data
					})
					.catch(error => {
						console.log(`⚠ Error: ${error.response.data.details}`)
					})
			} else if (query === '') {
				this.cardSuggestions = []
			}
		},
		submitSuggestion () {
			const options = document.getElementById('card-suggestions').childNodes

			for (let i = 0; i < options.length; i++) {
				if (this.cardNameInput === options[i].value) {
					this.handleSubmit()
					break
				}
			}
		},
		handleSubmit () {
			const cardNameInput = this.cardNameInput

			if (cardNameInput !== '') {
				this.delay = true // Scryfall staff doesn't want too many server requests sent too quickly.
				this.loadingCard = true

				// Cancel when 15 seconds pass.
				setTimeout(() => {
					if (this.loadingCard) {
						this.alertTooLong()
						axios.CancelToken.source().cancel()
						this.loadingCard = false
						this.delay = false
					}
				}, 15000)

				if (cardNameInput.toLowerCase() === '(random)') {
					axios
						.get(
							'https://api.scryfall.com/cards/random?q=legal%3Amodern', // Get a random card that's legal in Modern tournaments.
							{ cancelToken: axios.CancelToken.source().token }
						)
						.then(response => {
							this.getTheCard(response.data.name)
						})
						.catch(error => {
							alert(`⚠ Error: ${error.response.data.details}`)
							console.log(error)
							this.loadingCard = false
						})
				} else {
					this.getTheCard(cardNameInput)
				}
			}

			this.cardNameInput = ''

			setTimeout(() => {
				this.delay = false
			}, 500)
		},
		getTheCard (query) {
			query = this.curlApostrophes(query)

			if (this.findExistingCard(query)) {
				this.cardExistsNotice(query)
				this.delay = false
			} else {
				this.requestScryfallData(query, axios, this.deck)
			}

			this.$nextTick(() => {
				this.loadingCard = false
			})
		}
	}
}
</script>
