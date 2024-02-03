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

			if (store.state.showSideboard) {
				this.deckObject.sideboard.viewedCard = card.name
			} else {
				this.deckObject.viewedCard = card.name
			}

			store.commit('decks', store.state.decks)
			store.commit('showCard', true)
		}
	}
}
