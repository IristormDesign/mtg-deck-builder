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
		calculatePercentage (givenValue) {
			let deckTotal = 0

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					deckTotal++
				}
			})

			const percentage = ((givenValue / deckTotal) * 100).toFixed(1)

			return percentage + '%'
		},
		dataCommonCountPercent (counter) {
			return `
				<td>${counter}</td>
				<td>${this.calculatePercentage(counter)}</td>
			`
		}
	}
}
