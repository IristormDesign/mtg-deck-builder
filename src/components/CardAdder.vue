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
				ref="focus"
				type="text"
				v-model="cardNameInput"
			/>
			<datalist id="card-suggestions">
				<option v-for="name in cardSuggestions" :key="name">
					{{ name }}
				</option>
				<option value="[random]">
					(🎲 Add a randomly selected card)
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
import stringMethods from '@/mixins/stringMethods.js'
import cardListSectionalGaps from '@/mixins/cardListSectionalGaps.js'
import axios from 'axios'
import debounce from 'debounce'

export default {
	mixins: [stringMethods, cardListSectionalGaps],
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

			if (query !== '' && query !== '[random]') {
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

				if (cardNameInput.toLowerCase() === '[random]') {
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

			this.$refs.focus.focus()
			this.cardNameInput = ''

			setTimeout(() => {
				this.delay = false
			}, 500)
		},
		getTheCard (query) {
			const deck = this.deck
			query = this.curlApostrophes(query)

			if (this.findExistingCard(query)) {
				this.cardExistsNotice(query)
				this.loadingCard = false
				this.delay = false
			} else {
				console.log(`Request Scryfall API for "${query}" data.`)

				query = query.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

				axios
					.get(
						'https://api.scryfall.com/cards/named?fuzzy=' + query,
						{ cancelToken: axios.CancelToken.source().token }
					)
					.then(response => {
						const rd = response.data
						const newCard = {}

						if (rd.card_faces) { // If the card is a double-faced or split card...
							const rdFace1 = rd.card_faces[0]
							const rdFace2 = rd.card_faces[1]

							newCard.name = `${rdFace1.name} / ${rdFace2.name}`

							newCard.mana = `${rdFace1.mana_cost}`
							if (rdFace2.mana_cost !== '') { // If the card's second face has its own mana cost, add it onto the mana cost string with a slash before it.
								newCard.mana += '/' + rdFace2.mana_cost
							}

							newCard.type = `${rdFace1.type_line} / ${rdFace2.type_line}`
							newCard.cmc = rd.cmc

							if (rd.colors) {
								newCard.colors = rd.colors
							} else {
								newCard.colors = rdFace1.colors
							}

							if (rd.image_uris) {
								newCard.img = rd.image_uris.normal
							} else {
								newCard.img = rdFace1.image_uris.normal
							}
						} else { // Else the card is a single-faced card.
							newCard.name = rd.name
							newCard.mana = rd.mana_cost
							newCard.type = rd.type_line
							newCard.cmc = rd.cmc
							newCard.colors = rd.colors
							newCard.img = rd.image_uris.normal
						}
						newCard.name = this.curlApostrophes(newCard.name)
						newCard.rarity = rd.rarity
						newCard.link = rd.scryfall_uri
						newCard.qty = 1

						if (newCard.colors.length >= 2) {
							newCard.colors.unshift('multicolor')
						}

						const newCardName = newCard.name
						const store = this.$store

						// The card's name needs to be checked in the deck a second time. This is because it's possible for the Scryfall API's "fuzzy" search, which can correct misspelled names or assume full names from partial queries, to return a slightly different name than what the user originally submitted.
						if (this.findExistingCard(newCardName)) {
							this.cardExistsNotice(newCardName)
						} else {
							deck.cards.push(newCard)
							deck.editDate = new Date()

							this.$nextTick(() => {
								deck.viewedCard = newCardName
								store.commit('setDecks', store.state.decks)
							})

							store.commit('setSortAttribute', '')
						}
					})
					.catch(error => {
						alert(`⚠ Error: ${error.response.data.details}`)
						console.log(error)
					})
					.finally(() => {
						this.loadingCard = false

						this.$nextTick(() => {
							this.$refs.focus.focus()
						})
					})
			}
		},
		findExistingCard (cardName) {
			return this.deck.cards.find(anyCard =>
				cardName.toUpperCase() === anyCard.name.toUpperCase()
			)
		},
		cardExistsNotice (cardName) {
			cardName = this.findExistingCard(cardName).name // This gets the card's full, correctly spelled name from the deck's existing card (rather than taking the user's possibly misspelled or incomplete query).

			this.deck.viewedCard = cardName

			setTimeout(() => {
				alert(`”${cardName}” is already in this deck. If you want duplicates of a certain card, increase its quantity from the card list.`)
			}, 1)
		}
	}
}
</script>
