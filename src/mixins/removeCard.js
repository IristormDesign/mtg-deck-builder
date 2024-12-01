import sortingClusterGaps from '@/mixins/sortingClusterGaps.js'

export default {
	mixins: [sortingClusterGaps],
	methods: {
		/**
		 * Remove a specified card name from the deck's active card list.
		 * @param {number} index - The card name's index in the `cards` array.
		 * @param {string} name - The card's name.
		 * @param {boolean} isRemoteRemoval - Used for removing cards outside the Deck Editor's quantity elements.
		 */
		removeCard (index, isRemoteRemoval) {
			const list = this.activeCardList
			const cards = list.cards
			const totalCards = cards.length - 1

			/* If the card to be removed happens to be the currently displayed card, then display the next card in the list. */
			if (
				totalCards > 0 && (
					list.viewedCard.name === cards[index].name ||
					isRemoteRemoval
				)
			) {
				if (index === totalCards) { // If this card is last in the list...
					list.viewedCard = cards[index - 1]
				} else {
					list.viewedCard = cards[index + 1]
				}
			} else {
				list.viewedCard = null
			}

			/* Now remove the card from the deck. */
			cards.splice(index, 1)

			if (this.$store.state.sortAttribute !== '') {
				this.addSortingClusterGaps(this.deck, this.$store.state.sortAttribute)
			}

			this.determineDeckColors()
		}
	}
}
