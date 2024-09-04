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
		},
		attentionAddCard (alreadyAttending) {
			if (
				alreadyAttending ||
				this.activeCardList.cards.length > 0
			) return

			const cardAdderInput = document.querySelector('#card-input')

			if (!cardAdderInput) return // Check for this condition to prevent errors when in the middle of loading a submitted card name.

			alreadyAttending = true
			cardAdderInput.classList.add('attention')

			setTimeout(() => {
				cardAdderInput.classList.remove('attention')
				alreadyAttending = false
			}, 500) // Timeout duration equal to CSS animation duration (page-deck-editor.scss).
		}
	}
}
