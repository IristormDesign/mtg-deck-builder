<template>
	<section>
		<h4>Miscellaneous</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Count</th>
					<th>Percent</th>
				</tr>
			</thead>
			<tbody v-if="!emptyTable">
				<tr v-show="countMisc('legendary')">
					<th>Legendary</th>
					<td>{{ countMisc('legendary') }}</td>
					<td>{{ calculatePercentage(countMisc('legendary')) }}</td>
				</tr>
				<tr v-show="countMisc('basic land')">
					<th>Basic Land</th>
					<td>{{ countMisc('basic land') }}</td>
					<td>{{ calculatePercentage(countMisc('basic land')) }}</td>
				</tr>
				<tr v-show="countMisc('monocolored')">
					<th>Monocolored</th>
					<td>{{ countMisc('monocolored') }}</td>
					<td>{{ calculatePercentage(countMisc('monocolored')) }}</td>
				</tr>
				<tr v-show="countMisc('multicolored')">
					<th>Multicolored</th>
					<td>{{ countMisc('multicolored') }}</td>
					<td>{{ calculatePercentage(countMisc('multicolored')) }}</td>
				</tr>
				<tr v-show="countMisc('double-faced')">
					<th>Double-Faced</th>
					<td>{{ countMisc('double-faced') }}</td>
					<td>{{ calculatePercentage(countMisc('double-faced')) }}</td>
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
				this.countMisc('monocolored') === 0 &&
				this.countMisc('multicolored') === 0 &&
				this.countMisc('basic land') === 0 &&
				this.countMisc('legendary') === 0 &&
				this.countMisc('double-faced') === 0
			) {
				return true
			}
			return false
		}
	},
	methods: {
		countMisc (givenValue) {
			const counts = {
				monocolored: 0,
				multicolored: 0,
				basicLand: 0,
				legendary: 0,
				doubleFaced: 0
			}
			const regexBasicLand = RegExp(/\bBasic (\w* )?Land\b/)
			const regexLegendary = RegExp(/\bLegendary\b/)
			const regexDoubleFaced = RegExp(/\w\s\/\s\w/)

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (card.colors.length === 1) {
						counts.monocolored++
					}
					if (card.colors[0] === 'multicolor') {
						counts.multicolored++
					}
					if (regexBasicLand.test(card.type)) {
						counts.basicLand++
					}
					if (regexLegendary.test(card.type)) {
						counts.legendary++
					}
					if (regexDoubleFaced.test(card.name)) {
						counts.doubleFaced++
					}
				}
			})

			switch (givenValue) {
			case 'monocolored':
				return counts.monocolored
			case 'multicolored':
				return counts.multicolored
			case 'basic land':
				return counts.basicLand
			case 'legendary':
				return counts.legendary
			case 'double-faced':
				return counts.doubleFaced
			}
		}
	}
}
</script>
