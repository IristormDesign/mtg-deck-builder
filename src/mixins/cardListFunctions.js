export default {
	computed: {
		activeCardList () {
			if (this.$store.state.showSideboard) {
				return this.deck.sideboard
			} else {
				return this.deck
			}
		},
		anotherStarredCard () {
			return this.activeCardList.cards.find(
				card => card.starred
			)
		},
		cardObject () {
			return this.card
		},
		deckObject () {
			return this.deck
		}
	},
	methods: {
		viewCard (card) {
			const store = this.$store
			const deck = this.deck

			if (this.$route.name === 'drawSim') {
				store.commit('viewedDrawnCard', card)
			} else if (store.state.showSideboard) {
				deck.sideboard.viewedCard = card

				if (deck.sideboard.viewedCard.starred) {
					deck.sideboard.viewedStarredCard = card
				}
			} else {
				deck.viewedCard = card

				if (deck.viewedCard.starred) {
					deck.viewedStarredCard = card
				}
			}

			store.commit('decks', store.state.decks)
			store.commit('showCard', true)
		}
	}
}
