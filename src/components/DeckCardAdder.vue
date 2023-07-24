<template>
	<section class="card-adder">
		<form
			v-if="!loadingCard"
			@submit.prevent="handleSubmit()"
		>
			<label for="card-input">Add a Card to This {{activeCardListString}}:</label>
			<input
				@input="submitSuggestion()"
				:placeholder="inputPlaceholder"
				autocomplete="off"
				id="card-input"
				list="card-suggestions"
				ref="focusCardAdder"
				type="text"
				v-model="cardNameInput"
			/>
			<datalist id="card-suggestions">
				<option
					v-for="name in cardSuggestions"
					:key="name"
				>
					{{ name }}
				</option>
				<option value="#Random">
					🎲 Add a randomly selected Magic card
				</option>
			</datalist>
			<button :disabled="delay">Add</button>
		</form>
		<div v-else class="loading-indicator">
			<span>Loading card&hellip;</span>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import debounce from 'debounce'
import stringMethods from '@/mixins/stringMethods.js'
import requestScryfallData from '@/mixins/requestScryfallData.js'

export default {
	mixins: [stringMethods, requestScryfallData],
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
		activeCardListString () {
			if (this.$store.state.showSideboard) {
				return 'Sideboard'
			} else {
				return 'Deck'
			}
		},
		inputPlaceholder () {
			if (this.deck.cards.length === 0) {
				return '(Enter the name of a card here.)'
			} else {
				return null
			}
		}
	},
	watch: {
		cardNameInput () {
			this.debouncedAutocomplete()
		},
		loadingCard (loading) {
			if (window.innerWidth > 768 && !loading) {
				this.$nextTick(() => {
					this.$refs.focusCardAdder.focus()
				})
			}
		}
	},
	methods: {
		autocompleteName () {
			const query = this.cardNameInput.trim()
			const regexCodeSymbol = /^#/ // A string beginning with `#`, as for the special MDB code `#random`.
			const regexAnyURL = /^http(s?):/i // A string beginning with `http:` or `https:`.
			const regexScryfallShortURL = /^scryfall\./i // A string beginning with `scryfall.`, which indicates the user is manually typing a URL to a Scryfall page.

			if ( // Basically, if the submitted query is identifiable as just a card name...
				query &&
				!regexCodeSymbol.test(query) &&
				!regexAnyURL.test(query) &&
				!regexScryfallShortURL.test(query)
			) {
				// eslint-disable-next-line
				console.log(`Request Scryfall API to autocomplete query "${query}"`)

				const requestCardSuggestions = (data) => {
					// Limit the number of autocomplete suggestions to 5.
					while (data.length > 5) {
						data.pop()
					}

					this.cardSuggestions = data
				}

				axios
					.get(
						`https://api.scryfall.com/cards/autocomplete?q=${query}`
					)
					.then(response => {
						requestCardSuggestions(response.data.data)
					})
					.catch(error => {
						// eslint-disable-next-line
						console.log(error)
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

			if (cardNameInput === '') {
				this.$refs.focusCardAdder.focus()
			} else {
				this.delay = true // Scryfall staff doesn't want too many server requests sent too quickly.
				this.loadingCard = true

				if (cardNameInput.toLowerCase() === '#random') {
					axios
						.get(
							'https://api.scryfall.com/cards/random?q=legal%3Amodern+-is%3Adigital', // Get a random card that's legal in Modern tournaments and is NOT a digital (MTG Arena) edition.
							{ cancelToken: axios.CancelToken.source().token }
						)
						.then(response => {
							this.getTheCard(response.data.name)
						})
						.catch(error => {
							if (error.response.data.details) {
								alert(`⚠ ${error.response.data.details}`)
							}

							// eslint-disable-next-line
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
