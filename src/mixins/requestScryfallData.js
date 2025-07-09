import axios from 'axios'
import latestDataVersions from '@/mixins/latestDataVersions.js'
import stringMethods from '@/mixins/stringMethods.js'
import doubleFacedCards from '@/mixins/doubleFacedCards'
import deckColors from '@/mixins/deckColors.js'
import truncateURLs from '@/mixins/truncateURLs.js'

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
			console.info('Random card requested via Scryfall API.')

			/*
			 * The Scryfall API's loading speed for random card requests can be sped up through the use of card criteria filters, which reduces the pool of possible cards for the API to get.
			 */
			function getRandomizedQueryCriteria () {
				const randomNumber = Math.random()

				if (randomNumber < 2 / 11) {
					return '>%3DW' // White cards.
				} else if (randomNumber < 4 / 11) {
					return '>%3DU' // Blue cards.
				} else if (randomNumber < 6 / 11) {
					return '>%3DB' // Black cards.
				} else if (randomNumber < 8 / 11) {
					return '>%3DR' // Red cards.
				} else if (randomNumber < 10 / 11) {
					return '>%3DG' // Green cards.
				} else {
					return '%3DC' // Colorless cards.
				}
			}

			axios
				.get(
					`https://api.scryfall.com/cards/random?q=color${getRandomizedQueryCriteria()}+%28game%3Apaper%29+legal%3Acommander+-is%3Auniversesbeyond+lang%3Aen`,
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

			console.info(`Card #${collectorNumber} in set ${cardSet.toUpperCase()} requested via Scryfall API.`)

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
		 * @param {string} name Required
		 * @param {Function} callback
		 * @param {Object} oldCardData - Unused except when an existing card is going to be replaced via a deck data update.
		 * @returns {Function} Callback function
		 */
		axiosRequestName (name, callback, oldCardData) {
			console.info(`Card named "${name}" requested via Scryfall API.`)

			const urlEncodedQuery = name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

			axios
				.get(
					`https://api.scryfall.com/cards/named?fuzzy=${urlEncodedQuery}`,
					{ timeout: 10000 }
				)
				.then(
					response => {
						this.assignCardData(response.data, oldCardData)

						if (typeof callback === 'function') {
							callback()
						}
					},
					noResponse => {
						if (typeof callback === 'function') {
							callback(noResponse)
						}
					}
				)
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
		 * @param {Object} [listEntryData] - An object containing certain card attributes when adding cards via card list entry.
		 */
		assignCardData (data, oldCard, listEntryData) {
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
					newCard.img = truncateURLs.truncateCardImageURL(data.image_uris.normal)
				} else {
					newCard.img = truncateURLs.truncateCardImageURL(dataFace1.image_uris.normal)
					newCard.img2 = truncateURLs.truncateCardImageURL(dataFace2.image_uris.normal)
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

				if (data.loyalty) {
					newCard.loyalty = data.loyalty
				} else {
					newCard.loyalty = dataFace1.loyalty
					newCard.loyalty2 = dataFace2.loyalty
				}
			} else { // Else the card is a single-faced card.
				newCard.name = this.curlApostrophes(data.name)
				newCard.mana = data.mana_cost
				newCard.type = this.curlApostrophes(data.type_line)
				newCard.colors = data.colors
				newCard.img = truncateURLs.truncateCardImageURL(data.image_uris.normal)

				if (data.power) {
					newCard.power = data.power
				}
				if (data.toughness) {
					newCard.toughness = data.toughness
				}
				if (data.loyalty) {
					newCard.loyalty = data.loyalty
				}
			}

			if (!newCard.cmc) { // If the card's `cmc` value hasn't already been set by a previous condition...
				newCard.cmc = data.cmc
			}

			if (data.produced_mana) {
				newCard.prodMana = data.produced_mana
			}

			newCard.link = truncateURLs.truncateCardLinkURL(data.scryfall_uri)
			newCard.imgVersion = this.latestImageVersion

			switch (data.rarity) {
				case 'common':
				case 'uncommon':
				case 'rare':
				case 'mythic':
				case 'special':
				case 'bonus':
					newCard.rarity = data.rarity.charAt(0)
					break
				default: // If the new card's rarity is somehow not any of the known rarities, then set the card's rarity value to a string comprising an underscore followed by the name of this unknown rarity. The underscore is important in case the unknown rarity's name happens to begin with the same letter as one of the known rarities' first letter, thus preventing bugs where the app checks the rarity value's first letter.
					newCard.rarity = '_' + data.rarity
			}

			if (data.keywords.length > 0) {
				newCard.keywords = data.keywords
			}

			if (data.layout !== 'normal') {
				newCard.layout = data.layout
			}

			if (listEntryData?.qty) {
				newCard.qty = listEntryData.qty
			} else {
				newCard.qty = 1
			}

			if (oldCard) {
				newCard.rarity = oldCard.rarity
				newCard.img = oldCard.img
				newCard.imgVersion = oldCard.imgVersion
				newCard.link = oldCard.link
				newCard.qty = oldCard.qty

				if (oldCard.img2) {
					newCard.img2 = oldCard.img2
				}
				if (oldCard.gapAfter === true) {
					newCard.gapAfter = true
				}

				this.updateOldCard(newCard, oldCard.inSideboard)
			} else {
				this.validateNewCard(newCard, listEntryData)
			}
		},
		/**
		 * Update the data for an existing card in the deck.
		 * @param {Object} modelCard - The card's new data.
		 * @param {boolean} inSideboard - Whether the card is in the sideboard.
		*/
		updateOldCard (modelCard, inSideboard) {
			const cardGroup = inSideboard ? this.deck.sideboard : this.deck

			const existingCard = cardGroup.cards.find(foundCard => {
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
		 * @param {Object} [listEntryData] - If this param is empty, then the validation is adding a card from the standard card adder instead of the card list entry.
		*/
		validateNewCard (newCard, listEntryData) {
			const existingCard = this.findExistingCardByName(newCard.name, listEntryData)

			const targetGroup = (() => {
				if (listEntryData) {
					return listEntryData.inSideboard ? this.deck.sideboard : this.deck
				} else {
					return this.activeCardList
				}
			})()

			if (existingCard) {
				this.$set(targetGroup, 'viewedCard', existingCard)

				if (this.optionalReplacement) {
					this.notifyCardExists(newCard, true)
				} else if (isNaN(listEntryData.qty)) {
					this.notifyCardExists(newCard)
				}
			} else {
				this.insertCardIntoDeck(newCard, targetGroup)
			}
		},
		/**
		 * @param {String} cardName
		 * @param {Object} [listEntryData] - This param should be defined only if this method has been called from the card list entry process.
		 * @returns {Object} The card object, if it's found.
		 */
		findExistingCardByName (cardName, listEntryData) {
			const cardGroup = (() => {
				if (listEntryData) {
					if (listEntryData.inSideboard) {
						return this.deck.sideboard
					} else {
						return this.deck
					}
				} else {
					return this.activeCardList
				}
			})()

			cardName = this.curlApostrophes(cardName).trim()

			const foundExistingCard = cardGroup.cards.find(foundCard =>
				cardName.toUpperCase() === foundCard.name.toUpperCase()
			)

			return foundExistingCard
		},
		/**
		 * @param {Object} card The card object.
		 * @param {boolean} confirmToReplace Set to `true` to make the user confirm whether the requested card replaces the existing card.
		 */
		notifyCardExists (card, confirmToReplace) {
			this.loadingCard = false
			this.$set(
				this.activeCardList,
				'viewedCard',
				this.findExistingCardByName(card.name)
			)

			if (confirmToReplace) {
				this.$store.commit('idOfShowingDialog', {
					id: 'replaceExistingPrint',
					data: card
				})
			} else {
				this.$store.commit('idOfShowingDialog', {
					id: 'cardAlreadyInDeck',
					data: this.fullCardName(card)
				})
			}
		},
		insertCardIntoDeck (newCard, targetGroup) {
			this.loadingCard = false

			targetGroup.cards.push(newCard)

			const deck = this.deck

			deck.editDate = new Date()
			deck.sortBy = '(Unsorted)'
			this.determineDeckColors()

			deck.cards.forEach(eachCard => {
				delete eachCard.gapAfter
			})
			deck.sideboard.cards.forEach(eachCard => {
				delete eachCard.gapAfter
			})

			this.$nextTick(() => {
				this.$set(targetGroup, 'viewedCard', newCard)
				this.$store.commit('decks', this.$store.state.decks)
			})
		}
	}
}
