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
		checkWhetherMobileLayout () {
			/* This needs to be a Vue method function rather than a Vue computed function to return updated values whenever the viewport changes. */
			return window.innerWidth <= 768 // The number must match the media query max-width in CSS.
		},
		viewCard (card) {
			const store = this.$store
			const deck = this.deck

			if (this.$route.name === 'drawSim') {
				store.commit('viewedDrawnCard', card)
			} else if (store.state.showSideboard) {
				this.$set(deck.sideboard, 'viewedCard', card)

				if (deck.sideboard.viewedCard.starred) {
					this.$set(deck.sideboard, 'viewedStarredCard', card)
				}
			} else {
				this.$set(deck, 'viewedCard', card)

				if (deck.viewedCard.starred) {
					this.$set(deck, 'viewedStarredCard', card)
				}
			}

			store.commit('decks', store.state.decks)
			store.commit('showCard', true)
		},
		reactToHoverOverImage () {
			this.attentionAddCard()

			this.$store.commit('showingAnyPopup', false)
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
			}, 500) // Timeout duration equal to CSS animation duration (page-list-editor.scss).
		}
	}
}
