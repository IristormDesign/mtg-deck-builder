export default {
	computed: {
		tableHeadCommon () {
			return `
				<tr>
					<th></th>
					<th>Ct.</th>
					<th>Percent</th>
				</tr>
			`
		},
		tableBodyEmpty () {
			return `
				<tr>
					<th><i>(None)</i></th>
					<td>—</td>
					<td>—</td>
				</tr>
			`
		}
	},
	methods: {
		/**
		 * @param {number} count
		 * @returns {string} Percentage
		 */
		calculatePercentage (count) {
			const deckTotal = this.deck.cards.reduce(
				(total, card) => total + card.qty, 0
			)

			return ((count / deckTotal) * 100).toFixed(1) + '%'
		}
	}
}
