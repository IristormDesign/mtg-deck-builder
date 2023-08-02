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
				v-model="cardQueryInput"
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
			optionalReplacement: false,
			cardSuggestions: null,
			cardQueryInput: '',
			delay: false,
			loadingCard: false
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
		cardQueryInput () {
			this.debouncedAutocomplete()

			// If the user pastes a Scryfall page URL into the card adder's text input, then automatically submit the query.
			const regexScryfallCardURL = /^http(s?):\/\/scryfall\.com\/card\/(\w+|\d+)\/(\w+|\d+)\//i // A string beginning with `https://scryfall.com/card/X/Y/`, where "X" is the card set codename (at least one letter or digit) and "Y" is the collector number (at least one digit or even letter).
			if (regexScryfallCardURL.test(this.cardQueryInput)) {
				this.handleSubmit()
			}
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
			const query = this.cardQueryInput.trim()
			const regexCodeSymbol = /^#/ // A string beginning with `#`, as for the MDB code `#random`.
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

				const queryCardSuggestions = (data) => {
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
						queryCardSuggestions(response.data.data)
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

			for (const option of options) {
				if (this.cardQueryInput === option.value) {
					this.handleSubmit()
					break
				}
			}
		},
		handleSubmit () {
			const query = this.cardQueryInput.trim()

			if (query === '') {
				this.$refs.focusCardAdder.focus()
			} else {
				this.delay = true // Scryfall staff doesn't want too many server requests sent too quickly.
				this.loadingCard = true

				if (query.toLowerCase() === '#random') {
					axios
						.get(
							'https://api.scryfall.com/cards/random?q=legal%3Amodern+-is%3Adigital', // Get a random card that's legal in Modern tournaments and is NOT a digital (MTG Arena) edition.
							{ cancelToken: axios.CancelToken.source().token }
						)
						.then(response => {
							this.getCard(response.data.name)
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
					this.getCard(query)
				}

				this.$nextTick(() => {
					this.loadingCard = false
				})
			}

			this.cardQueryInput = ''

			setTimeout(() => {
				this.delay = false
			}, 500)
		},
		getCard (query) {
			this.optionalReplacement = false

			const regexScryfallCardURL = /^(https:\/\/)?scryfall\.com\/card\/(\w+|\d+)\/(\w+|\d+)\//i // A string beginning with `https://scryfall.com/card/X/Y/`, possibly excluding the `https://`, and where "X" and "Y" are each at least one letter or digit.

			if (regexScryfallCardURL.test(query)) { // If the query matches the pattern of a URL to a Scryfall card page...
				const regexQueryURL = new RegExp('^' + query + '.*', 'i')
				const foundExistingCardByLink = this.activeCardList.cards.find(foundCard =>
					regexQueryURL.test(foundCard.link)
				)

				if (foundExistingCardByLink) {
					// The query is an exact variation match of an existing card, so don't get card data.

					this.notifyCardExists(foundExistingCardByLink.name)
				} else {
					this.optionalReplacement = true
					this.requestScryfallData(query)
				}
			} else { // Else treat the query as a card name.
				const foundExistingCardByName = this.findExistingCardByName(this.curlApostrophes(query))

				if (foundExistingCardByName) {
					this.notifyCardExists(foundExistingCardByName.name)
				} else { // Else the queried card doesn't match the name of another card in the list.
					this.requestScryfallData(query)
				}
			}
		}
	}
}
</script>
