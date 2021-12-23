<template>
	<section>
		<h4>Power & Toughness</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Power</th>
					<th>Tough.</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Average</th>
					<td>{{ calculateAveragePT('power') }}</td>
					<td>{{ calculateAveragePT('toughness') }}</td>
				</tr>
				<tr>
					<th>Greatest</th>
					<td>{{ getSuperlativePT('power')['greatest'] }}</td>
					<td>{{ getSuperlativePT('toughness')['greatest'] }}</td>
				</tr>
				<tr>
					<th>Least</th>
					<td>{{ getSuperlativePT('power')['least'] }}</td>
					<td>{{ getSuperlativePT('toughness')['least'] }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>

export default {
	props: {
		deck: Object
	},
	methods: {
		onlyCardsWithPT (pt) {
			// Get only the cards that have a power or toughness property.
			return this.deck.cards.filter(card => card[pt])
		},
		calculateAveragePT (pt) {
			let avg = 0
			let total = 0

			this.onlyCardsWithPT(pt).forEach(card => {
				const ptAsNum = Number(card[pt]) // The power/toughness data is originally received as a string type, so covert it to a number type.

				if (!isNaN(ptAsNum)) { // The card's power/toughness value should be an actual number rather than `NaN`. If it is `NaN`, that means it's a variable symbol, and thus it should be ignored for calculating the average.
					for (let i = 0; i < card.qty; i++) {
						avg += ptAsNum
						total++
					}
				}
			})

			if (total > 0) {
				avg /= total
			}

			avg = avg.toFixed(1)

			return avg
		},
		getSuperlativePT (pt) {
			const onlyCardsWithPT = this.onlyCardsWithPT(pt)
			let greatest = '—'
			let least = '—'

			if (onlyCardsWithPT.length > 0) {
				greatest = 0
				least = Infinity

				onlyCardsWithPT.forEach(card => {
					const ptNum = Number(card[pt])

					if (ptNum > greatest) {
						greatest = ptNum
					}
					if (ptNum < least) {
						least = ptNum
					}
				})
			}

			return { greatest, least }
		}
	}
}
</script>
