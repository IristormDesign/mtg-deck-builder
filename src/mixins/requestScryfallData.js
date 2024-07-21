import axios from 'axios'
import stringMethods from '@/mixins/stringMethods.js'
import deckColors from '@/mixins/deckColors.js'

export default {
	mixins: [stringMethods, deckColors],
	data () {
		return {
			oldCardData: null,
			regexScryfallCardURL: /^(https:\/\/)?scryfall\.com\/card\/(\w+|\d+)\/(\w+|\d+)\//i // A string beginning with `https://scryfall.com/card/X/Y/`, possibly excluding the `https://` part, and where `X` (the card set codename) and `Y` (the card collector number) are each at least one letter or digit.
		}
	},
	computed: {
		/**
		 * @returns The object for either the main deck or the sideboard.
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
		 * Request the Scryfall API for a random card that's legal in Modern tournaments and is NOT a digital (MTG Arena) edition.
		 */
		axiosRequestRandom () {
			console.info('Random card requested with Scryfall API')

			axios
				.get(
					'https://api.scryfall.com/cards/random?q=legal%3Amodern+-is%3Adigital',
					{ timeout: 8000 }
				)
				.then(response => {
					this.assignCardData(response.data)
				})
				.catch(error => {
					this.loadingCard = false

					if (error.code === 'ECONNABORTED') {
						this.alertTimeout()
					} else {
						alert(`⚠ Error: ${error.message}`)
					}
				})
		},
		/**
		 * Request the Scryfall API for a card according to its card set and collector number (based on a submitted Scryfall card page URL).
		 * @param {string} query Required
		 */
		axiosCollectionRequest (query) {
			const matchingQueryParts = query.match(this.regexScryfallCardURL)
			const cardSet = matchingQueryParts[2]
			const collectorNumber = matchingQueryParts[3]

			console.info(`Card #${collectorNumber} in set ${cardSet.toUpperCase()} requested with Scryfall API`)

			axios
				.post(
					'https://api.scryfall.com/cards/collection/',
					{
						identifiers: [{
							set: cardSet,
							collector_number: collectorNumber
						}]
					}, {
						headers: { 'Content-Type': 'application/json' },
						timeout: 8000
					}
				)
				.then(response => {
					// The app has successfully connected to the Scryfall API, but still check that valid card data exists from the user's query. The data could be invalid at this step if the user manually typed in a URL with an incorrect card set codename or collector number.
					try {
						this.assignCardData(response.data.data[0])
					} catch {
						alert('⚠ The URL you’re submitting doesn’t go to a valid card page on Scryfall. No card could be added from it.')
					}
				})
				.catch(error => {
					this.loadingCard = false

					if (error.code === 'ECONNABORTED') {
						this.alertTimeout()
					} else {
						alert(`⚠ Error: ${error.message}`)
					}
				})
		},
		/**
		 * Request the Scryfall API for a card by name.
		 *
		 * The `callback` and `oldCardData` parameters are unused except when an existing card is going to be replaced via a deck data update.
		 * @param {string} name Required
		 * @param {Function} callback
		 * @param {Object} oldCardData
		 * @returns {Function} Callback function
		 */
		axiosRequestName (name, callback, oldCardData) {
			this.oldCardData = oldCardData

			console.info(`Card named "${name}" requested with Scryfall API`)

			const urlEncodedQuery = name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

			axios
				.get(
					`https://api.scryfall.com/cards/named?fuzzy=${urlEncodedQuery}`,
					{ timeout: 8000 }
				)
				.then(response => {
					this.assignCardData(response.data)
				})
				.catch(error => {
					this.loadingCard = false

					if (error.code === 'ECONNABORTED') {
						this.alertTimeout()
					} else if (error.code === 'ERR_BAD_REQUEST') {
						alert(`⚠ No Magic card named “${name}” exists.`)
					} else {
						alert(`⚠ Error: ${error.message}`)
					}
				})
				.finally(() => {
					return callback
				})
		},
		alertTimeout () {
			alert('⚠ Sorry, but your card name couldn’t be added right now. 😭\n\nMTG Deck Builder gets card data from Scryfall, but it seems Scryfall’s web servers can’t be reached at the moment. Try again at a later time.')
		},
		assignCardData (data) {
			this.$nextTick(() => { // Using `$nextTick()` is probably helping prevent bugs involved with updating old card data sets.
				const newCard = {}

				if (data.card_faces) { // If the card is a double-faced or split card...
					const dataFace1 = data.card_faces[0]
					const dataFace2 = data.card_faces[1]

					newCard.name = this.curlApostrophes(dataFace1.name)
					newCard.name2 = this.curlApostrophes(dataFace2.name)

					if (data.mana) {
						newCard.mana = data.mana_cost
					} else {
						newCard.mana = dataFace1.mana_cost
						newCard.mana2 = dataFace2.mana_cost
					}

					newCard.type = dataFace1.type_line
					newCard.type2 = dataFace2.type_line

					if (data.colors) {
						newCard.colors = data.colors
					} else {
						newCard.colors = dataFace1.colors
						newCard.colors2 = dataFace2.colors
					}

					if (data.image_uris) {
						newCard.img = data.image_uris.normal
					} else {
						newCard.img = dataFace1.image_uris.normal
						newCard.img2 = dataFace2.image_uris.normal
					}

					if (data.power) {
						newCard.power = data.power
					} else {
						newCard.power = dataFace1.power
						newCard.power2 = dataFace2.power
					}

					if (data.toughness) {
						newCard.toughness = data.toughness
					} else {
						newCard.toughness = dataFace1.toughness
						newCard.toughness2 = dataFace2.toughness
					}
				} else { // Else the card is a single-faced card.
					newCard.name = this.curlApostrophes(data.name)
					newCard.mana = data.mana_cost
					newCard.type = data.type_line
					newCard.colors = data.colors
					newCard.img = data.image_uris.normal
					newCard.power = data.power
					newCard.toughness = data.toughness
				}

				newCard.cmc = data.cmc
				newCard.rarity = data.rarity
				newCard.keywords = data.keywords
				newCard.layout = data.layout
				newCard.link = data.scryfall_uri
				newCard.imgVersion = this.$store.state.latestImageVersion
				newCard.qty = 1

				if (this.oldCardData) {
					newCard.img = this.oldCardData.img
					newCard.imgVersion = this.oldCardData.imgVersion
					newCard.link = this.oldCardData.link
					newCard.gapAfter = this.oldCardData.gapAfter
					newCard.qty = this.oldCardData.qty

					if (this.oldCardData.img2) {
						newCard.img2 = this.oldCardData.img2
					}

					this.updateOldCard(newCard)
				} else {
					this.validateNewCard(newCard)
				}
			})
		},
		updateOldCard (newCard) {
			const store = this.$store

			if (this.oldCardData.inSideboard) {
				store.commit('showSideboard', true)
			} else {
				store.commit('showSideboard', false)
			}

			const oldCard = this.activeCardList.cards.find(foundCard => {
				const regexDoubleFacedName = new RegExp(`(${newCard.name})[ /]*(${newCard.name2})`, 'i') // This regex finds names of double-faced cards that includes the back face's name, and with zero or more slashes (`/`) in between the front face and back face names. In older card data, the names for double-faced cards had included both face's names together with a singular slash.

				return (
					foundCard.name === newCard.name ||
					regexDoubleFacedName.test(foundCard.name)
				)
			})

			for (const key in newCard) {
				oldCard[key] = newCard[key]
			}
		},
		/**
		 * Check that the card doesn't exist by name in the card list, even if this check has already been done once.
		 *
		 * There are two reasons to do this: (1) It's possible for the Scryfall API's "fuzzy" search, which corrects misspelled names and assumes full names from partial queries, to return a slightly different name than what the user originally submitted. (2) It's also possible that the user's query was in the form of a Scryfall card page URL, and so now the name of that card needs to be checked.
		 *
		 * @param {Object} newCard
		*/
		validateNewCard (newCard) {
			const existingCard = this.findExistingCardByName(newCard.name)

			if (existingCard) {
				if (this.optionalReplacement) {
					const replaceCard = this.notifyCardExists(newCard, true)

					if (replaceCard) {
						newCard.qty = existingCard.qty

						this.updateOldCard(newCard)
					} // Else do nothing, because the user has chosen to not replace the card.
				} else {
					this.notifyCardExists(newCard)
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
		 * @param {Object} card The card object.
		 * @param {boolean} confirmToReplace Set to `true` to show a `confirm()` and let the user decide on replacing the existing card. Otherwise, show only an `alert()`.
		 * @returns {boolean} `true` if the card is to be replaced.
		 */
		notifyCardExists (card, confirmToReplace) {
			this.activeCardList.viewedCard = card
			this.loadingCard = false

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
					`”${card.name}” is already in this ${stringActiveCardList()}, but in a different print from the one you’re submitting.\n\nReplace the existing print?`
				)
			} else {
				setTimeout(() => {
					alert(
						`”${card.name}” is already in this ${stringActiveCardList()}.\n\n(If you were trying to add a duplicate of this card name, increase its quantity number in the card list.)`
					)
				}, 25) // Duration should be just long enough to make the card image have a fully animated transition while the browser alert appears.
			}
		},
		insertCardIntoDeck (newCard) {
			this.loadingCard = false

			this.activeCardList.cards.push(newCard)

			const deck = this.deck

			deck.editDate = new Date()
			deck.sortBy = ''
			this.determineDeckColors()

			deck.cards.forEach(eachCard => {
				eachCard.gapAfter = false
			})
			deck.sideboard.cards.forEach(eachCard => {
				eachCard.gapAfter = false
			})

			this.$nextTick(() => {
				this.activeCardList.viewedCard = newCard
				this.$store.commit('decks', this.$store.state.decks)
			})
		}
	}
}
