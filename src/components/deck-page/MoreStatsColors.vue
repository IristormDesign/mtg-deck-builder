<template>
	<section>
		<h4>Colors of Spells</h4>
		<div
			v-if="noData"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon" />
			<tbody>
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
				stat => stat.ct === 0
			)
		}
	},
	mounted () {
		this.countColors()
		this.calculatePercentageOfSpells()

		this.colorStats = this.sortTableByCounts(this.colorStats)
	},
	methods: {
		countColors () {
			const stats = this.colorStats

			this.deck.cards.forEach(({ mana, mana2, colors, colors2, qty, layout }) => {
				const colorsPerFace = (faceMana, faceColors) => {
					if (faceMana !== '') { // Exclude non-spell cards
						if (faceColors.length > 0) {
							faceColors.forEach(color => {
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
				}

				colorsPerFace(mana, colors)

				if (layout === 'modal_dfc') {
					colorsPerFace(mana2, colors2)
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
