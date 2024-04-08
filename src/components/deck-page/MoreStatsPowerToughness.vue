<template>
	<section>
		<h4>Power/Toughness</h4>
		<table>
			<thead class="distinct-head">
				<tr>
					<th></th>
					<th>Power</th>
					<th>Tough.</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Greatest</th>
					<td>{{ power.greatest }}</td>
					<td>{{ toughness.greatest }}</td>
				</tr>
				<tr>
					<th>Average</th>
					<td>{{ power.average }}</td>
					<td>{{ toughness.average }}</td>
				</tr>
				<tr>
					<th>Least</th>
					<td>{{ power.least }}</td>
					<td>{{ toughness.least }}</td>
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
	data () {
		return {
			power: {
				greatest: '—',
				average: '—',
				least: '—',
				total: 0
			},
			toughness: {
				greatest: '—',
				average: '—',
				least: '—',
				total: 0
			}
		}
	},
	mounted () {
		this.setUpPTStats()
	},
	methods: {
		setUpPTStats () {
			const cardsWithPT = this.deck.cards.filter(
				card => card.toughness // Find only the cards that have the toughness attribute. If a card has it, then it'd be paired with the power attribute too.
			)

			if (cardsWithPT.length > 0) {
				const power = this.power
				const toughness = this.toughness

				power.greatest = 0
				toughness.greatest = 0
				power.average = 0
				toughness.average = 0
				power.least = Infinity
				toughness.least = Infinity

				cardsWithPT.forEach(card => {
					this.determinePTStats(card, 'power')
					this.determinePTStats(card, 'toughness')
				})

				this.calculateAverage('power')
				this.calculateAverage('toughness')
			}
		},
		determinePTStats (card, pT) {
			const pTNum = Number(card[pT]) // The power/toughness data is originally received as a string type, so covert it to a number type.
			const pTData = this[pT]

			if (!isNaN(pTNum)) { // The card's power/toughness value should be an actual number rather than `NaN`. If it is `NaN`, that means it's a variable symbol, and thus it should be ignored for calculating the average.
				for (let i = 0; i < card.qty; i++) {
					pTData.average += pTNum
					pTData.total++
				}

				if (pTNum > pTData.greatest) {
					pTData.greatest = pTNum
				}
				if (pTNum < pTData.least) {
					pTData.least = pTNum
				}
			}
		},
		calculateAverage (pT) {
			const pTData = this[pT]

			if (pTData.total > 0) {
				pTData.average /= pTData.total
			}
			pTData.average = pTData.average.toFixed(1)
		}
	}
}
</script>
