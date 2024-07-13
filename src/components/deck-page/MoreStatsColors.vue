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

			this.deck.cards.forEach(card => {
				const qty = card.qty
				const countedOnFrontFace = {}

				const colorsPerFace = (faceType, faceColors, cardLayout) => {
					if (!faceType) return // Exit now if this function would try to count the undefined data of a single-faced card's back face.

					if (
						cardLayout === 'adventure' &&
						faceType === card.type2
					) return // Exit now if the current subject of counting is an adventure card's second face. This particular kind of face needs to be ignored for counting mana colors, or else adventure cards always get counted as colorless even when they're not.

					if (faceColors) {
						faceColors.forEach(color => {
							switch (color) {
								case 'W':
									if (!countedOnFrontFace.White) {
										stats.White.ct += qty
										countedOnFrontFace.White = true
									}
									break
								case 'U':
									if (!countedOnFrontFace.Blue) {
										stats.Blue.ct += qty
										countedOnFrontFace.Blue = true
									}
									break
								case 'B':
									if (!countedOnFrontFace.Black) {
										stats.Black.ct += qty
										countedOnFrontFace.Black = true
									}
									break
								case 'R':
									if (!countedOnFrontFace.Red) {
										stats.Red.ct += qty
										countedOnFrontFace.Red = true
									}
									break
								case 'G':
									if (!countedOnFrontFace.Green) {
										stats.Green.ct += qty
										countedOnFrontFace.Green = true
									}
							}
						})
					} else if (!/\bLand\b/.test(faceType)) { // If NOT a land-type card...
						stats.Colorless.ct += qty
					}
				}

				colorsPerFace(card.type, card.colors)
				colorsPerFace(card.type2, card.colors2, card.layout)

				this.allSpellsCount += qty
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
