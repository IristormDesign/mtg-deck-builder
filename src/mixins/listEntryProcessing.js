import axios from 'axios'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import requestScryfallData from '@/mixins/requestScryfallData.js'
import removeCard from '@/mixins/removeCard.js'
import stringMethods from '@/mixins/stringMethods.js'

const regexPatterns = {
	cardEntry: /^(?:\s*)\d+\s+.+/gim, // Any line in a multiline string beginning with a number, then a space, then any other characters. The line may begin with any number of whitespace characters.
	emptyLine: /^\s*$/, // A substring that contains nothing from beginning to end, except maybe whitespace characters. (Lines' newline characters have been removed from the `split()` method.)
	frontFaceName: /^\d+ (.[^/]+)(?= *\/+)/i, // A substring like the `regexName` pattern, except that it ends before the first "/" (slash), while the whole string does contain at least one "/".
	name: /^\d+ (.+)/i, // A substring of any characters that follow the `regexQuantity` pattern.
	quantity: /^(\d+)(?= )/i // A substring that begins with a number and ends with a space.
}

export default {
	mixins: [getActiveDeck, requestScryfallData, removeCard, stringMethods],
	data () {
		return {
			anyCardRemoved: false,
			cardRequestsAborted: [],
			cardRequestInvalid: [],
			cardRequestOtherError: [],
			cardsSuccessfullyAdded: {
				main: [], sideboard: []
			},
			cardsToAdd: {
				main: [], sideboard: []
			},
			cardsToAddZeroQty: {
				main: [], sideboard: []
			},
			cardsToUpdate: {
				main: [], sideboard: []
			},
			invalidCardNames: {
				main: [], sideboard: []
			},
			repeatedCardNames: {
				main: [], sideboard: []
			},
			submittedCards: {
				main: [], sideboard: []
			}
		}
	},
	computed: {
		validateList () {
			if (!this.textCardList.match(regexPatterns.cardEntry)) {
				this.$store.commit('idOfShowingDialog', {
					id: 'invalidListFormat',
					data: {
						callback: this.focusOnTextarea
					}
				})

				return false
			} else {
				return true
			}
		}
	},
	methods: {
		submitForm () {
			if (!this.validateSubmission()) return

			this.processSubmission()

			if (this.hasExcessiveQuantity) return
			if (!this.validateCardCount()) return

			this.determineNewOrExistingCardNames('main')
			this.determineNewOrExistingCardNames('sideboard')
			this.addNewCardsToDeck('main')
			this.addNewCardsToDeck('sideboard')
			this.updateExistingQuantities('main')
			this.updateExistingQuantities('sideboard')

			this.$nextTick(() => {
				this.$store.commit('decks', this.$store.state.decks)
			})

			if (
				(
					this.cardsToAddZeroQty.main.length + this.cardsToAddZeroQty.sideboard.length > 0 ||
					this.cardsToUpdate.main.length + this.cardsToUpdate.sideboard.length > 0
				) && this.totalCardsToAdd === 0
			) {
				this.goToResultsPage()
			}
		},
		validateSubmission () {
			this.hasExcessiveQuantity = false

			if (!this.textCardList) {
				this.focusOnTextarea()
				return false
			}

			return this.validateList
		},
		processSubmission () {
			const allLines = this.textCardList.split('\n')
			let sideboardBeginningIndex = -1
			const validListEntries = {
				main: [], sideboard: []
			}

			for (let i = 0; i < allLines.length; i++) {
				const line = allLines[i]?.trim() || ''
				const prevLine = allLines[i - 1]?.trim() || ''

				if (sideboardBeginningIndex < 0) { // If the sideboard beginning index hasn't been found yet...
					if (prevLine.match(regexPatterns.cardEntry) && line.match(regexPatterns.emptyLine)) {
						sideboardBeginningIndex = i
					} else if (line.match(regexPatterns.cardEntry)) {
						validListEntries.main.push(line)
					}
				} else { // Else the sideboard beginning index has already been found.
					if (line.match(regexPatterns.cardEntry)) {
						validListEntries.sideboard.push(line)
					}
				}
			}

			/* Reset the following arrays in case they contain leftover data from a previous submission attempt. */
			this.submittedCards = {
				main: [], sideboard: []
			}
			this.repeatedCardNames = {
				main: [], sideboard: []
			}

			const getCardEntriesFromSubmission = (groupName) => {
				for (const item of validListEntries[groupName]) {
					const cardEntry = this.parseCardEntry(item)

					if (cardEntry) {
						this.submittedCards[groupName].push(cardEntry)
					}
				}
			}
			getCardEntriesFromSubmission('main')
			getCardEntriesFromSubmission('sideboard')
		},
		validateCardCount () {
			const totalCards = this.submittedCards.main.length + this.submittedCards.sideboard.length

			if (totalCards > 200) {
				this.$store.commit('idOfShowingDialog', {
					id: 'tooManyCardNames',
					data: { callback: this.focusOnTextarea }
				})
				return false
			}
			return true
		},
		determineNewOrExistingCardNames (groupName) {
			this.submittedCards[groupName].forEach(card => {
				const existingCard = this.findExistingCardByName(
					card.name,
					{ inSideboard: groupName === 'sideboard' }
				)

				if (existingCard) {
					card.name = existingCard.name
					card.name2 = existingCard.name2

					this.cardsToUpdate[groupName].push(card)
				} else if (card.qty <= 0) {
					this.cardsToAddZeroQty[groupName].push(card)
				} else {
					this.cardsToAdd[groupName].push(card)
				}
			})
		},
		addNewCardsToDeck (groupName) {
			if (this.cardsToAdd[groupName].length === 0) {
				return
			}

			this.isLoadingCards = true

			const done = () => {
				this.numberOfNewCardsRequested++

				if (this.numberOfNewCardsRequested === this.totalCardsToAdd) {
					this.goToResultsPage()
				}
			}
			const timeoutDuration = (index) => {
				if (groupName === 'sideboard') {
					return index + this.cardsToAdd.main.length
				} else {
					return index
				}
			}

			this.cardsToAdd[groupName].forEach((card, index) => {
				setTimeout(() => {
					// this.cardRequestsAborted.push(card)
					// done()
					this.requestNewCardFromScryfall(card, done, groupName)
				}, (timeoutDuration(index) * 125))
			})
		},
		updateExistingQuantities (groupName) {
			this.isLoadingCards = true

			const targetGroup = (() => {
				if (groupName === 'sideboard') {
					return this.deck.sideboard
				} else {
					return this.deck
				}
			})()

			this.cardsToUpdate[groupName].forEach(submittedCard => {
				const cardIndex = targetGroup.cards.findIndex(foundCard => {
					return foundCard.name.toUpperCase() === submittedCard.name.toUpperCase()
				})

				if (cardIndex >= 0) {
					const existingCard = targetGroup.cards[cardIndex]

					existingCard.qty = submittedCard.qty

					if (existingCard.qty <= 0) {
						this.removeCard(cardIndex, true)

						this.anyCardRemoved = true
					}
				}
			})
		},
		parseCardEntry (entry) {
			const qtyMatch = entry.match(regexPatterns.quantity)
			const nameMatch = entry.match(regexPatterns.frontFaceName) || entry.match(regexPatterns.name)

			if (!qtyMatch || !nameMatch) {
				return null
			}

			const cardQty = Number(qtyMatch[1])
			const cardName = this.cleanedCardName(nameMatch[1])

			if (cardQty > 99) {
				this.showExcessiveQuantityError(cardQty, cardName)
				return null
			}

			return {
				qty: cardQty, name: cardName
			}
		},
		requestNewCardFromScryfall (card, callback, groupName) {
			console.info(`Card named "${card.name}" requested via Scryfall API.`)

			const urlEncodedQuery = card.name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

			axios
				.get(
					`https://api.scryfall.com/cards/named?fuzzy=${urlEncodedQuery}`,
					{ timeout: 10000 }
				)
				.then(response => {
					this.recordForResultsPage(response.data, card, groupName)

					this.assignCardData(response.data, null, {
						qty: card.qty,
						inSideboard: groupName === 'sideboard'
					})
				})
				.catch(error => {
					switch (error.code) {
						case 'ECONNABORTED':
							this.cardRequestsAborted.push(card)
							break
						case 'ERR_BAD_REQUEST':
							this.cardRequestInvalid.push(card)
							break
						default:
							console.error(error)
							this.cardRequestOtherError.push(card)
					}
				})
				.finally(() => {
					return callback()
				})
		},
		recordForResultsPage (data, card, groupName) {
			if (data.card_faces) {
				card.name = this.cleanedCardName(data.card_faces[0].name)
				card.name2 = this.cleanedCardName(data.card_faces[1].name)
			} else {
				card.name = this.cleanedCardName(data.name)
			}

			const existingCard = this.findExistingCardByName(
				card.name,
				{ inSideboard: groupName === 'sideboard' }
			)

			if (existingCard) {
				this.cardsToUpdate[groupName].push(card)
				this.updateExistingQuantities(groupName)
			} else {
				this.cardsSuccessfullyAdded[groupName].push(card)
			}
		},
		cleanedCardName (cardName) {
			cardName = this.removeExcessSpaces(cardName)
			cardName = this.curlApostrophes(cardName)

			return cardName
		}
	}
}
