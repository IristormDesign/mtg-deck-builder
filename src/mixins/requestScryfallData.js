import stringMethods from '@/mixins/stringMethods.js'
import deckColorMixins from '@/mixins/deckColorMixins.js'

export default {
	mixins: [stringMethods, deckColorMixins],
	computed: {
		activeCardList () {
			if (this.$store.state.showSideboard) {
				return this.deck.sideboard
			} else {
				return this.deck
			}
		}
	},
	methods: {
		findExistingCard (cardName) {
			return this.activeCardList.cards.find(anyCard =>
				cardName.toUpperCase() === anyCard.name.toUpperCase()
			)
		},
		cardExistsNotice (cardName) {
			cardName = this.findExistingCard(cardName).name // This gets the card's full, correctly spelled name from the deck's existing card (rather than taking the user's possibly misspelled or incomplete query).

			this.activeCardList.viewedCard = cardName

			const activeCardListString = () => {
				if (this.$store.state.showSideboard) {
					return 'deck’s sideboard'
				} else {
					return 'deck'
				}
			}

			setTimeout(() => {
				alert(`”${cardName}” is already in this ${activeCardListString()}. If you want to have duplicates of a card, increase its quantity from the card list.`)
			}, 0)
		},
		requestScryfallData (query, axios, deck, oldCard, callback) {
			const assignCardData = (data) => {
				const newCard = {}
				const store = this.$store

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
				newCard.imgVersion = store.state.latestImageVersion

				if (oldCard) {
					newCard.qty = oldCard.qty
				} else {
					newCard.qty = 1
				}

				if (newCard.colors.length >= 2) {
					newCard.colors.unshift('multicolor')
				}

				let cards = this.activeCardList.cards

				if (oldCard) {
					cards = cards.filter(card =>
						card.name !== newCard.name
					)
					cards.push(newCard)
					deck.editDate = new Date()

					this.$nextTick(() => {
						store.commit('setDecks', store.state.decks)
					})
				} else {
					const newCardName = newCard.name

					// The card's name needs to be checked in the deck a second time. This is because it's possible for the Scryfall API's "fuzzy" search, which corrects misspelled names and assumes full names from partial queries, to return a slightly different name than what the user originally submitted.
					if (this.findExistingCard(newCardName)) {
						this.cardExistsNotice(newCardName)
					} else {
						cards.push(newCard)
						deck.editDate = new Date()
						deck.sortBy = 'unsorted'
						this.determineDeckColors(this.deck)

						deck.cards.forEach(card => {
							card.gapAfter = false
						})
						deck.sideboard.cards.forEach(card => {
							card.gapAfter = false
						})
						this.$nextTick(() => {
							this.activeCardList.viewedCard = newCardName
							store.commit('setDecks', store.state.decks)
						})
					}
				}
			}

			// Determine whether the user's submission from the card adder is a card name or a URL to a Scryfall card page.
			const regexScryfallCardURL = /scryfall\.com\/card\/(\w+|\d+)\/(\w+|\d+)\//i // A substring `scryfall.com/card/X/Y/`, where "X" is the card set codename (at least one letter or digit) and "Y" is the collector number (at least one digit or even letter).
			const regexURL = /^http(s?):/i // A string beginning with `http:` or `https:`.

			if (regexScryfallCardURL.test(query)) {
				const cardSet = query.match(regexScryfallCardURL)[1]
				const collectorNumber = query.match(regexScryfallCardURL)[2]

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
						// The app has successfully connected to the Scryfall API, but still check that valid card data exists from the user's query. The data could be invalid at this step if the user manually typed in a URL with an incorrect set code or collector number.
						try {
							assignCardData(response.data.data[0])
						} catch {
							alert('⚠ Error: The Scryfall page URL you submitted doesn’t match a Magic card that exists.')
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
				alert('⚠ The query you submitted is neither the name of a Magic card nor the URL to a card page on Scryfall.')
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
						assignCardData(response.data)
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
		}
	}
}
