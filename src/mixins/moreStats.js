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
			let deckTotal = 0

			this.deck.cards.forEach(card => {
				deckTotal += card.qty
			})

			const percentage = (count / deckTotal * 100).toFixed(1) + '%'

			return percentage
		}
	}
}
