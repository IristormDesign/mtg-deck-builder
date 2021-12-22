<template>
	<section>
		<h4>Mana Values of Spells</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Count</th>
					<th>Percent</th>
				</tr>
			</thead>
			<tbody v-if="!emptyTable">
				<tr v-show="countCmc(0)">
					<th>0</th>
					<td>{{ countCmc(0) }}</td>
					<td>{{ calculatePercentage(countCmc(0)) }}</td>
				</tr>
				<tr v-show="countCmc(1)">
					<th>1</th>
					<td>{{ countCmc(1) }}</td>
					<td>{{ calculatePercentage(countCmc(1)) }}</td>
				</tr>
				<tr v-show="countCmc(2)">
					<th>2</th>
					<td>{{ countCmc(2) }}</td>
					<td>{{ calculatePercentage(countCmc(2)) }}</td>
				</tr>
				<tr v-show="countCmc(3)">
					<th>3</th>
					<td>{{ countCmc(3) }}</td>
					<td>{{ calculatePercentage(countCmc(3)) }}</td>
				</tr>
				<tr v-show="countCmc(4)">
					<th>4</th>
					<td>{{ countCmc(4) }}</td>
					<td>{{ calculatePercentage(countCmc(4)) }}</td>
				</tr>
				<tr v-show="countCmc(5)">
					<th>5</th>
					<td>{{ countCmc(5) }}</td>
					<td>{{ calculatePercentage(countCmc(5)) }}</td>
				</tr>
				<tr v-show="countCmc(6)">
					<th>6</th>
					<td>{{ countCmc(6) }}</td>
					<td>{{ calculatePercentage(countCmc(6)) }}</td>
				</tr>
				<tr v-show="countCmc(7)">
					<th>7</th>
					<td>{{ countCmc(7) }}</td>
					<td>{{ calculatePercentage(countCmc(7)) }}</td>
				</tr>
				<tr v-show="countCmc(8)">
					<th>8+</th>
					<td>{{ countCmc(8) }}</td>
					<td>{{ calculatePercentage(countCmc(8)) }}</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<th><i>(None)</i></th>
					<td>—</td>
					<td>—</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import calculatePercentage from '@/mixins/calculatePercentage.js'

export default {
	mixins: [calculatePercentage],
	props: {
		deck: Object
	},
	computed: {
		emptyTable () {
			if (
				this.countCmc(0) === 0 &&
				this.countCmc(1) === 0 &&
				this.countCmc(2) === 0 &&
				this.countCmc(3) === 0 &&
				this.countCmc(4) === 0 &&
				this.countCmc(5) === 0 &&
				this.countCmc(6) === 0 &&
				this.countCmc(7) === 0 &&
				this.countCmc(8) === 0
			) {
				return true
			}
			return false
		}
	},
	methods: {
		countCmc (givenCmc) {
			const counts = {
				cmc0: 0,
				cmc1: 0,
				cmc2: 0,
				cmc3: 0,
				cmc4: 0,
				cmc5: 0,
				cmc6: 0,
				cmc7: 0,
				cmc8Plus: 0
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (card.mana !== '') { // Excludes land
						if (card.cmc === 0) {
							counts.cmc0++
						} else if (card.cmc === 1) {
							counts.cmc1++
						} else if (card.cmc === 2) {
							counts.cmc2++
						} else if (card.cmc === 3) {
							counts.cmc3++
						} else if (card.cmc === 4) {
							counts.cmc4++
						} else if (card.cmc === 5) {
							counts.cmc5++
						} else if (card.cmc === 6) {
							counts.cmc6++
						} else if (card.cmc === 7) {
							counts.cmc7++
						} else if (card.cmc >= 8) {
							counts.cmc8Plus++
						}
					}
				}
			})

			switch (givenCmc) {
			case 0:
				return counts.cmc0
			case 1:
				return counts.cmc1
			case 2:
				return counts.cmc2
			case 3:
				return counts.cmc3
			case 4:
				return counts.cmc4
			case 5:
				return counts.cmc5
			case 6:
				return counts.cmc6
			case 7:
				return counts.cmc7
			case 8:
				return counts.cmc8Plus
			}
		}
	}
}
</script>
