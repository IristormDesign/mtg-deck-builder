export default {
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
		tableBodyEmpty () {
			return `
				<tr>
					<th><i>(None)</i></th>
					<td>—</td>
					<td>—</td>
				</tr>
			`
		},
		totalCards () {
			return this.deck.cards.reduce(
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
		}
	}
}
