import axios from 'axios'
import latestDataVersions from '@/mixins/latestDataVersions.js'
import stringMethods from '@/mixins/stringMethods.js'
import doubleFacedCards from './doubleFacedCards'
import deckColors from '@/mixins/deckColors.js'

export default {
	mixins: [latestDataVersions, stringMethods, doubleFacedCards, deckColors],
	data () {
		return {
			regexScryfallCardURL: /scryfall\.com\/card\/(.*\/)*(\w+|\d+)(-|\/)(\w+|\d+)\//i /* This gets a string containing:
				1. `scryfall.com/card/`
				2. A possible but not required subdirectory of any name, which could include cards from "The List" set, such as `plst/`
				3. The card set codename, which is at least one letter or digit
				4. Either a `/` (slash) or a `-` (hyphen)
				5. The card collector number, which is at least one letter or digit
				6. A `/` (slash)
				This regex is able to get Scryfall URLs of card prints from standard sets as well as "The List" set. For example, either `https://scryfall.com/card/c17/183/nin-the-pain-artist` or `https://scryfall.com/card/plst/C17-183/nin-the-pain-artist` work. (However, the image for a card from "The List" gets another print's image instead, which shouldn't happen, but isn't important enough to fix right now.)
			*/
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
		 * Request the Scryfall API for a random card.
		 */
		axiosRequestRandom () {
			console.info('Random card requested with Scryfall API')

			axios
				.get(
					'https://api.scryfall.com/cards/random?q=legal%3Avintage+lang%3Aen+-is%3Adigital', // Get a random card that's legal in Vintage tournaments, is in English text, and is NOT a digital (MTG Arena) edition.
					{ timeout: 10000 }
				)
				.then(response => {
					this.assignCardData(response.data)
				})
				.catch(error => {
					this.loadingCard = false

					if (error.code === 'ECONNABORTED') {
						this.alertConnectionTimeout()
					} else {
						this.alertMiscErrorMessage(error)
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
			const collectorNumber = matchingQueryParts[4]

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
						timeout: 10000
					}
				)
				.then(response => {
					/* The app has successfully connected to the Scryfall API, but still check that valid card data exists from the user's query. The data could be invalid at this step if the user manually typed in a URL with an incorrect card set codename or collector number. */
					try {
						this.assignCardData(response.data.data[0])
					} catch {
						this.loadingCard = false
						this.$store.commit('idOfShowingDialog', 'invalidCardPageURL')
					}
				})
				.catch(error => {
					this.loadingCard = false

					if (error.code === 'ECONNABORTED') {
						this.alertConnectionTimeout()
					} else {
						this.alertMiscErrorMessage(error)
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
			console.info(`Card named "${name}" requested with Scryfall API`)

			const urlEncodedQuery = name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

			axios
				.get(
					`https://api.scryfall.com/cards/named?fuzzy=${urlEncodedQuery}`,
					{ timeout: 10000 }
				)
				.then(response => {
					this.assignCardData(response.data, oldCardData)
				})
				.catch(error => {
					this.loadingCard = false

					if (error.code === 'ECONNABORTED') {
						this.alertConnectionTimeout()
					} else if (error.code === 'ERR_BAD_REQUEST') {
						this.$store.commit('idOfShowingDialog', {
							id: 'invalidCardName',
							data: name
						})
					} else {
						this.alertMiscErrorMessage(error)
					}
				})
				.finally(() => {
					return callback
				})
		},
		alertConnectionTimeout () {
			this.$store.commit('idOfShowingDialog', 'scryfallConnectionTimedOut')
		},
		alertMiscErrorMessage (error) {
			this.$store.commit('idOfShowingDialog', {
				id: 'miscError',
				data: error.message
			})
		},
		/**
		 * @param {Object} data - The card's data received straight from the Scryfall API.
		 * @param {Object} [oldCard] - The card's existing data in the app. Param should be empty except when updating the card data version.
		 * @param {Number} [enteredQty] - The number for the card's quantity. Param should be empty except when adding cards via card list entry.
		 */
		assignCardData (data, oldCard, enteredQty) {
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

				if (!data.cmc) { // Needed for special exceptions such as: https://scryfall.com/card/sld/1544/adrix-and-nev-twincasters-adrix-and-nev-twincasters
					newCard.cmc = dataFace1.cmc
				}

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

			if (!newCard.cmc) { // If the card's `cmc` value hasn't already been set by a previous condition...
				newCard.cmc = data.cmc
			}
			newCard.rarity = data.rarity
			newCard.keywords = data.keywords
			newCard.layout = data.layout
			newCard.link = data.scryfall_uri
			newCard.imgVersion = this.latestImageVersion

			if (enteredQty) {
				newCard.qty = enteredQty
			} else {
				newCard.qty = 1
			}

			if (oldCard) {
				newCard.img = oldCard.img
				newCard.imgVersion = oldCard.imgVersion
				newCard.link = oldCard.link
				newCard.gapAfter = oldCard.gapAfter
				newCard.qty = oldCard.qty

				if (oldCard.img2) {
					newCard.img2 = oldCard.img2
				}

				this.updateOldCard(newCard, oldCard.inSideboard)
			} else {
				this.validateNewCard(newCard, enteredQty)
			}
		},
		/**
		 * Update the data for an existing card in the deck.
		 * @param {Object} modelCard - The card's new data.
		 * @param {boolean} inSideboard - Whether the card is in the sideboard.
		*/
		updateOldCard (modelCard, inSideboard) {
			this.$store.commit('showSideboard', inSideboard)

			const existingCard = this.activeCardList.cards.find(foundCard => {
				const regexDoubleFacedName = new RegExp(`(${modelCard.name})[ /]*(${modelCard.name2})`, 'i') // This regex finds names of double-faced cards that includes the back face's name, and with zero or more slashes (`/`) in between the front face and back face names. In older card data, the names for double-faced cards had included both face's names together with a singular slash.

				return (
					foundCard.name === modelCard.name ||
					regexDoubleFacedName.test(foundCard.name)
				)
			})

			for (const key in modelCard) {
				if (key !== 'qty') {
					existingCard[key] = modelCard[key]
				}
			}
		},
		/**
		 * Check that the card doesn't exist by name in the card list, even if this check has already been done once.
		 *
		 * There are two reasons to do this: (1) It's possible for the Scryfall API's "fuzzy" search, which corrects misspelled names and assumes full names from partial queries, to return a slightly different name than what the user originally submitted. (2) It's also possible that the user's query was in the form of a Scryfall card page URL, and so now the name of that card needs to be checked.
		 *
		 * @param {Object} newCard
		 * @param {Number} [fromListEntry] - Taken from the variable for the quantity of an added card via card list entry. If this param is empty, then the validation is adding a card from the standard card adder.
		*/
		validateNewCard (newCard, fromListEntry) {
			const existingCard = this.findExistingCardByName(newCard.name)

			if (existingCard) {
				this.activeCardList.viewedCard = existingCard

				if (this.optionalReplacement) {
					this.notifyCardExists(newCard, true)
				} else if (isNaN(fromListEntry)) {
					this.notifyCardExists(newCard)
				}
			} else {
				this.insertCardIntoDeck(newCard)
			}
		},
		/**
		 * @param {String} cardName
		 * @param {Object} [cardGroup]
		 * @returns {Object} The card object, if it's found.
		 */
		findExistingCardByName (cardName, cardGroup) {
			cardName = this.curlApostrophes(cardName).trim()

			if (!cardGroup) {
				cardGroup = this.activeCardList
			}

			return cardGroup.cards.find(foundCard =>
				cardName.toUpperCase() === foundCard.name.toUpperCase()
			)
		},
		/**
		 * @param {Object} card The card object.
		 * @param {boolean} confirmToReplace Set to `true` to make the user confirm whether the requested card replaces the existing card.
		 */
		notifyCardExists (card, confirmToReplace) {
			this.loadingCard = false
			this.activeCardList.viewedCard = this.findExistingCardByName(card.name)

			if (confirmToReplace) {
				this.$store.commit('idOfShowingDialog', {
					id: 'replaceExistingPrint',
					data: card
				})
			} else {
				this.$store.commit('idOfShowingDialog', {
					id: 'cardAlreadyInDeck',
					data: this.doubleFacedCardName(card)
				})
			}
		},
		insertCardIntoDeck (newCard) {
			this.loadingCard = false

			this.activeCardList.cards.push(newCard)

			const deck = this.deck

			deck.editDate = new Date()
			deck.sortBy = '(Unsorted)'
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
