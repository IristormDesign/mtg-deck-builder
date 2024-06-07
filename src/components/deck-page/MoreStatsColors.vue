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
				<template v-for="(stats, name) in colorStats">
					<tr
						v-if="stats.ct > 0"
						:key="name"
					>
						<th>{{ name }}</th>
						<td>{{ stats.ct }}</td>
						<td>{{ stats.pct }}<span>%</span></td>
					</tr>
				</template>
				<tr class="total">
					<th>All spells</th>
					<td>{{ allSpellsCount }}</td>
					<td>100.0<span>%</span></td>
				</tr>
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
			colorStats: {
				White: {
					ct: 0,
					pct: 0
				},
				Blue: {
					ct: 0,
					pct: 0
				},
				Black: {
					ct: 0,
					pct: 0
				},
				Red: {
					ct: 0,
					pct: 0
				},
				Green: {
					ct: 0,
					pct: 0
				},
				Colorless: {
					ct: 0,
					pct: 0
				}
			},
			allSpellsCount: 0
		}
	},
	computed: {
		noData () {
			return Object.values(this.colorStats).every(
				count => count === 0
			)
		}
	},
	mounted () {
		this.countColors()
		this.calculatePercentageOfSpells()
	},
	methods: {
		countColors () {
			const stats = this.colorStats

			this.deck.cards.forEach(({ mana, colors, qty }) => {
				if (mana !== '') { // Exclude non-spell cards
					if (colors.length > 0) {
						colors.forEach(color => {
							switch (color) {
								case 'W':
									stats.White.ct += qty
									break
								case 'U':
									stats.Blue.ct += qty
									break
								case 'B':
									stats.Black.ct += qty
									break
								case 'R':
									stats.Red.ct += qty
									break
								case 'G':
									stats.Green.ct += qty
							}
						})
					} else {
						stats.Colorless.ct += qty
					}

					this.allSpellsCount += qty
				}
			})
		},
		calculatePercentageOfSpells () {
			for (const statName in this.colorStats) {
				const stat = this.colorStats[statName]

				stat.pct = ((stat.ct / this.allSpellsCount) * 100).toFixed(1)
			}
		}
	}
}
</script>
