<template>
	<section>
		<h4>Colors of Spells</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody
				v-if="noData"
				v-html="tableBodyEmpty"
			/>
			<tbody v-else>
				<template v-for="(count, colorName) in colorCounts">
					<tr
						v-if="count > 0"
						:key="colorName"
					>
						<th>{{ colorName }}</th>
						<td>{{ count }}</td>
						<td>{{ calculatePercentage(count) }}</td>
					</tr>
				</template>
			</tbody>
		</table>
	</section>
</template>

<script>
import moreStats from '@/mixins/moreStats.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [moreStats, symbolsMarkup],
	props: {
		deck: Object
	},
	data () {
		return {
			colorCounts: {
				White: 0,
				Blue: 0,
				Black: 0,
				Red: 0,
				Green: 0,
				Colorless: 0
			}
		}
	},
	computed: {
		noData () {
			return Object.values(this.colorCounts).every(
				count => count === 0
			)
		}
	},
	mounted () {
		this.countColor()
	},
	methods: {
		countColor () {
			const count = this.colorCounts

			this.deck.cards.forEach(({ mana, colors, qty }) => {
				if (mana !== '') { // Exclude non-spell cards
					if (colors.length > 0) {
						colors.forEach(color => {
							switch (color) {
								case 'W':
									count.White += qty
									break
								case 'U':
									count.Blue += qty
									break
								case 'B':
									count.Black += qty
									break
								case 'R':
									count.Red += qty
									break
								case 'G':
									count.Green += qty
							}
						})
					} else {
						count.Colorless += qty
					}
				}
			})
		}
	}
}
</script>
