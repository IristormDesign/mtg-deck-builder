import sortingClusterGaps from '@/mixins/sortingClusterGaps.js'

export default {
	mixins: [sortingClusterGaps],
	methods: {
		/**
		 * Remove a specified card name from the deck's active card list.
		 * @param {number} index - The card name's index in the `cards` array.
		 * @param {boolean} isRemoteRemoval - Used for removing cards outside the List Editor's quantity elements.
		 */
		removeCard (index, isRemoteRemoval) {
			const list = this.activeCardList
			const cards = list.cards

			if (list.viewedStarredCard === list.viewedCard) {
				list.viewedStarredCard = null
			}

			/* If the card to be removed happens to be the currently displayed card, then display the next card in the list. */
			if (
				cards.length > 1 && (
					list.viewedCard.name === cards[index].name ||
					isRemoteRemoval
				)
			) {
				if (index + 1 === cards.length) { // If this card is last in the list...
					this.$set(list, 'viewedCard', cards[index - 1])
				} else {
					this.$set(list, 'viewedCard', cards[index + 1])
				}
			} else {
				this.$set(list, 'viewedCard', null)
			}

			/* Now remove the card from the deck. */
			cards.splice(index, 1)

			if (this.$store.state.sortAttribute !== '(Unsorted)') {
				this.addSortingClusterGaps(this.deck, this.$store.state.sortAttribute)
			}

			this.determineDeckColors()
		}
	}
}
