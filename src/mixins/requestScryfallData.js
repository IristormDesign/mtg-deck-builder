import axios from 'axios'
import stringMethods from '@/mixins/stringMethods.js'
import deckColors from '@/mixins/deckColors.js'

export default {
	mixins: [stringMethods, deckColors],
	data () {
		return {
			oldCardData: {}
		}
	},
	computed: {
		/**
		 * @returns The object for either the main deck or the sideboard
		 */
		activeCardList () {
			if (this.$store.state.showSideboard) {
				return this.deck.sideboard
			} else {
				return this.deck
			}
		}
	},
	methods: {
		/**
		 * @param {string} query Required
		 * @param {Function} callback
		 * @param {Object} oldCardData Required only when an existing card is to be replaced via a deck data update.
		 * @returns {Function} Callback function
		 */
		requestScryfallData (query, callback, oldCardData) {
			this.oldCardData = oldCardData
			const regexScryfallCardURL = /scryfall\.com\/card\/(\w+|\d+)\/(\w+|\d+)\//i // A substring `scryfall.com/card/X/Y/`, where "X" is the card set codename (at least one letter or digit) and "Y" is the collector number (at least one digit or even letter).
			const regexURL = /^http(s?):/i // A string beginning with `http:` or `https:`.

			// Determine whether the user's submission from the card adder is a card name or a URL to a Scryfall card page.
			if (regexScryfallCardURL.test(query)) {
				const cardSet = query.match(regexScryfallCardURL)[1]
				const collectorNumber = query.match(regexScryfallCardURL)[2]

				// eslint-disable-next-line
				console.log(`Request Scryfall API for card #${collectorNumber} in set ${cardSet.toUpperCase()}`)

				axios
					.post(
						'https://api.scryfall.com/cards/collection/',
						{
							identifiers: [{
								set: cardSet,
								collector_number: collectorNumber
							}],
							cancelToken: axios.CancelToken.source().token
						},
						{
							headers: { 'Content-Type': 'application/json' }
						}
					)
					.then(response => {
						// The app has successfully connected to the Scryfall API, but still check that valid card data exists from the user's query. The data could be invalid at this step if the user manually typed in a URL with an incorrect card set codename or collector number.
						try {
							this.assignCardData(response.data.data[0])
						} catch {
							alert('⚠ Error: The Scryfall card page URL you submitted doesn’t match a Magic card that exists.')
						}
					})
					.catch(error => {
						alert(`⚠ ${error.response.data.details}`)
						// eslint-disable-next-line
						console.error(error)
					})
					.finally(() => {
						return callback
					})
			} else if (regexURL.test(query)) { // Else, if the user submitted a URL (that isn't for Scryfall card page, since that was already checked)...
				alert('⚠ Error: The query you submitted is neither the URL to a card page on Scryfall nor the name of a Magic card.')
			} else { // Else the query submitted by the user is a card name, not a URL.
				// eslint-disable-next-line
				console.log(`Request Scryfall API for "${query}"`)

				const urlEncodedQuery = query.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

				axios
					.get(
						`https://api.scryfall.com/cards/named?fuzzy=${urlEncodedQuery}`,
						{ cancelToken: axios.CancelToken.source().token }
					)
					.then(response => {
						this.assignCardData(response.data)
					})
					.catch(error => {
						if (error.response.status === 404) {
							alert(`⚠ No Magic card named “${query}” exists.`)
						} else {
							alert(`⚠ ${error.response.data.details}`)
							// eslint-disable-next-line
							console.error(error)
						}
					})
					.finally(() => {
						return callback
					})
			}
		},
		assignCardData (data) {
			const newCard = {}

			if (data.card_faces) { // If the card is a double-faced or split card...
				const dataFace1 = data.card_faces[0]
				const dataFace2 = data.card_faces[1]

				newCard.name = `${dataFace1.name} / ${dataFace2.name}`

				newCard.mana = `${dataFace1.mana_cost}`
				if (dataFace2.mana_cost !== '') { // If the card's second face has its own mana cost, add it onto the mana cost string with a slash before it.
					newCard.mana += '/' + dataFace2.mana_cost
				}

				newCard.type = `${dataFace1.type_line} / ${dataFace2.type_line}`
				newCard.cmc = data.cmc

				if (data.colors) {
					newCard.colors = data.colors
				} else {
					newCard.colors = dataFace1.colors
				}

				if (data.image_uris) {
					newCard.img = data.image_uris.normal
				} else {
					newCard.img = dataFace1.image_uris.normal
				}

				if (data.power) {
					newCard.power = data.power
				} else {
					newCard.power = dataFace1.power
				}

				if (data.toughness) {
					newCard.toughness = data.toughness
				} else {
					newCard.toughness = dataFace1.toughness
				}
			} else { // Else the card is a single-faced card.
				newCard.name = data.name
				newCard.mana = data.mana_cost
				newCard.type = data.type_line
				newCard.cmc = data.cmc
				newCard.colors = data.colors
				newCard.img = data.image_uris.normal
				newCard.power = data.power
				newCard.toughness = data.toughness
			}
			newCard.name = this.curlApostrophes(newCard.name)
			newCard.rarity = data.rarity
			newCard.keywords = data.keywords
			newCard.link = data.scryfall_uri
			newCard.imgVersion = this.$store.state.latestImageVersion

			if (newCard.colors.length >= 2) {
				newCard.colors.unshift('multicolor')
			}

			if (this.oldCardData) {
				newCard.qty = this.oldCardData.qty
				newCard.gapAfter = this.oldCardData.gapAfter

				this.updateOldCard(newCard)
			} else {
				newCard.qty = 1

				this.validateNewCard(newCard)
			}
		},
		updateOldCard (newCard) {
			if (this.oldCardData) {
				if (this.oldCardData.inSideboard) {
					this.$store.commit('setShowSideboard', true)
				} else {
					this.$store.commit('setShowSideboard', false)
				}
			}
			const list = this.activeCardList
			const index = list.cards.findIndex((foundCard) => {
				return foundCard.name === newCard.name
			})

			list.cards.splice(index, 1, newCard)
			this.deck.editDate = new Date()

			this.$nextTick(() => {
				this.$store.commit('setDecks', this.$store.state.decks)
			})
		},
		/**
		 * Check that the card doesn't exist by name in the card list, even if this check has already been done once.
		 *
		 * There are two reasons to do this: (1) It's possible for the Scryfall API's "fuzzy" search, which corrects misspelled names and assumes full names from partial queries, to return a slightly different name than what the user originally submitted. (2) It's also possible that the user's query was in the form of a Scryfall card page URL, and so now the name of that card needs to be checked.
		 * @param {Object} newCard
		*/
		validateNewCard (newCard) {
			const existingCard = this.findExistingCardByName(newCard.name)

			if (existingCard) {
				if (this.optionalReplacement) {
					const replaceCard = this.notifyCardExists(newCard.name, true)

					if (replaceCard) {
						newCard.qty = existingCard.qty

						this.updateOldCard(newCard)
					} // Else do nothing, because the user has chosen to not replace the card.
				} else {
					this.notifyCardExists(newCard.name)
				}
			} else {
				this.insertCardIntoDeck(newCard)
			}
		},
		/**
		 * @param {string} cardName
		 * @returns {Object} The card object, if it's found.
		 */
		findExistingCardByName (cardName) {
			cardName = this.curlApostrophes(cardName)

			return this.activeCardList.cards.find(foundCard =>
				cardName.toUpperCase() === foundCard.name.toUpperCase()
			)
		},
		/**
		 * @param {string} cardName The name of a card.
		 * @param {boolean} confirmToReplace Set to `true` to show a `confirm()` and let the user decide on replacing the existing card. Otherwise, show only an `alert()`.
		 * @returns {boolean} `true` if the card is to be replaced.
		 */
		notifyCardExists (cardName, confirmToReplace) {
			this.activeCardList.viewedCard = cardName

			const stringActiveCardList = () => {
				let output = 'deck'

				if (this.$store.state.showSideboard) {
					output += '’s sideboard' // As in `this deck's sideboard`.
				}

				return output
			}

			if (confirmToReplace) {
				// (Can't use a timeout here because it messes with the return.)
				return confirm(
					`”${cardName}” is already in this ${stringActiveCardList()}, but in a different print from the one you’re submitting.\n\nReplace the existing print?`
				)
			} else {
				setTimeout(() => {
					alert(
						`”${cardName}” is already in this ${stringActiveCardList()}.\n\n(If you were trying to add a duplicate of this card, increase its quantity number in the card list instead.)`
					)
				}, 25) // Duration should be just long enough to make the card display have a fully animated transition while the browser alert appears.
			}
		},
		insertCardIntoDeck (newCard) {
			this.activeCardList.cards.push(newCard)

			const deck = this.deck

			deck.editDate = new Date()
			deck.sortBy = 'unsorted'
			this.determineDeckColors(this.deck)

			deck.cards.forEach(eachCard => {
				eachCard.gapAfter = false
			})
			deck.sideboard.cards.forEach(eachCard => {
				eachCard.gapAfter = false
			})

			this.$nextTick(() => {
				this.activeCardList.viewedCard = newCard.name
				this.$store.commit('setDecks', this.$store.state.decks)
			})
		}
	}
}
