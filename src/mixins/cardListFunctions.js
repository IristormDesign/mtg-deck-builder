export default {
	computed: {
		activeCardList () {
			if (this.$store.state.showSideboard) {
				return this.deck.sideboard
			} else {
				return this.deck
			}
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

			if (this.$route.path.includes('/draw-simulator')) {
				store.commit('viewedDrawnCard', card)
			} else if (store.state.showSideboard) {
				this.deckObject.sideboard.viewedCard = card
			} else {
				this.deckObject.viewedCard = card
			}

			store.commit('decks', store.state.decks)
			store.commit('showCard', true)
		}
	}
}
