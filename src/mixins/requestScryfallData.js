import stringMethods from '@/mixins/stringMethods.js'

export default {
	mixins: [stringMethods],
	methods: {
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
		},
		requestScryfallData (cardQuery, axios, deck, oldCard) {
			console.log(`Request Scryfall API for "${cardQuery}" data.`)

			cardQuery = cardQuery.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

			axios
				.get(
					'https://api.scryfall.com/cards/named?fuzzy=' + cardQuery,
					{ cancelToken: axios.CancelToken.source().token }
				)
				.then(response => {
					const data = response.data
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

					if (oldCard) {
						newCard.qty = oldCard.qty
					} else {
						newCard.qty = 1
					}

					if (newCard.colors.length >= 2) {
						newCard.colors.unshift('multicolor')
					}

					const store = this.$store

					if (oldCard) {
						deck.cards = deck.cards.filter(card =>
							card.name !== newCard.name
						)
						deck.cards.push(newCard)
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
							deck.cards.push(newCard)
							deck.editDate = new Date()

							this.$nextTick(() => {
								deck.viewedCard = newCardName
								store.commit('setDecks', store.state.decks)
							})

							store.commit('setSortAttribute', '')
						}
					}
				})
				.catch(error => {
					alert(`⚠ Error: ${error.response.data.details}`)
					console.log(error)
				})
		}
	}
}
