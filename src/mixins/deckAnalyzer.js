import deckAnalyzerFiltering from './deckAnalyzerFiltering'

export default {
	mixins: [deckAnalyzerFiltering],
	computed: {
		tableHeadCommon () {
			return `
				<tr>
					<th></th>
					<th title="Count">Ct.</th>
					<th>Percent</th>
				</tr>
			`
		},
		totalCards () {
			// return this.deck.cards.reduce(
			return this.filteredCards().reduce(
				(total, card) => total + card.qty,
				0
			)
		}
	},
	methods: {
		/**
		 * @param {number} count
		 * @returns {string} Percentage
		 */
		calculatePercentage (count) {
			return ((count / this.totalCards) * 100).toFixed(1)
		},
		/**
		 * @param {Object} counts
		 * @returns {Object} Object with properties sorted by count
		 */
		sortTableByCounts (counts) {
			return Object.fromEntries(
				Object.entries(counts)
					.sort((a, b) => {
						if (a[1].ct) {
							return b[1].ct - a[1].ct
						} else {
							return b[1] - a[1]
						}
					})
			)
		}
	}
}
