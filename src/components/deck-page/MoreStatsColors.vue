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
				<template v-for="(stats, name) in colorStatsBasic">
					<tr
						v-if="stats.ct > 0"
						:key="name"
					>
						<th>{{ name }}</th>
						<td>{{ stats.ct }}</td>
						<td>{{ stats.pct }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tbody>
				<template v-for="(stats, name) in colorStatsExtra">
					<tr
						v-if="stats.ct > 0"
						:key="name"
					>
						<th>{{ name }}</th>
						<td>{{ stats.ct }}</td>
						<td>{{ stats.pct }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tbody>
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
			colorStatsBasic: {
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
				}
			},
			colorStatsExtra: {
				Colorless: {
					ct: 0,
					pct: 0
				},
				Monocolored: {
					ct: 0,
					pct: 0,
					isMatch: (card, backFace) => {
						if (backFace && card.colors2) {
							return card.colors2.length === 1
						} else {
							return card.colors.length === 1
						}
					}
				},
				Multicolored: {
					ct: 0,
					pct: 0,
					isMatch: (card, backFace) => {
						if (backFace && card.colors2) {
							return card.colors2.length > 1
						} else {
							return card.colors.length > 1
						}
					}
				}
			},
			allSpellsCount: 0
		}
	},
	computed: {
		noData () {
			return Object.values(this.colorStatsBasic).every(
				stat => stat.ct === 0
			)
		}
	},
	mounted () {
		this.countColors()

		this.calculatePercentageOfSpells(this.colorStatsBasic)
		this.calculatePercentageOfSpells(this.colorStatsExtra)

		this.colorStatsBasic = this.sortTableByCounts(this.colorStatsBasic)
		this.colorStatsExtra = this.sortTableByCounts(this.colorStatsExtra)
	},
	methods: {
		countColors () {
			this.deck.cards.forEach(card => {
				const qty = card.qty
				const countedOnFrontFace = {}

				const colorsPerFace = (faceColors, faceMana) => {
					if (!faceMana) return // Card isn't a spell, so don't count it.
					if (!faceColors) return // Exit now if this function would try to count the undefined data of a single-faced card's back face.

					const stats = this.colorStatsBasic

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

					if (faceColors.length === 1) {
						if (!countedOnFrontFace.Monocolored) {
							this.colorStatsExtra.Monocolored.ct += qty
							countedOnFrontFace.Monocolored = true
						}
					} else if (faceColors.length > 1) {
						if (!countedOnFrontFace.Multicolored) {
							this.colorStatsExtra.Multicolored.ct += qty
							countedOnFrontFace.Multicolored = true
						}
					} else {
						if (!countedOnFrontFace.Colorless) {
							this.colorStatsExtra.Colorless.ct += qty
							countedOnFrontFace.Colorless = true
						}
					}
				}

				colorsPerFace(card.colors, card.mana)
				colorsPerFace(card.colors2, card.mana2)

				if (card.mana || card.mana2) {
					this.allSpellsCount += qty
				}
			})
		},
		calculatePercentageOfSpells (stats) {
			for (const statName in stats) {
				const stat = stats[statName]

				stat.pct = ((stat.ct / this.allSpellsCount) * 100).toFixed(1)
			}
		}
	}
}
</script>
