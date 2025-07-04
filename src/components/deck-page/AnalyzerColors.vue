<template>
	<section id="stats-colors">
		<h4>Colors of Spells</h4>
		<div
			v-if="this.allSpellsCount === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(stats, name) in colorStatsBasic">
					<tr
						v-if="stats.ct > 0"
						:key="name"
						:class="activeFilterClass('colors', name)"
						@click="handleRowClick('colors', name)"
					>
						<th>{{ name }}</th>
						<td>{{ stats.ct }}</td>
						<td>{{ stats.pct }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tbody class="filterable-stats">
				<template v-for="(stats, name) in colorStatsExtra">
					<tr
						v-if="stats.ct > 0"
						:key="name"
						:class="activeFilterClass('colors', name)"
						@click="handleRowClick('colors', name)"
					>
						<th>{{ name }}</th>
						<td>{{ stats.ct }}</td>
						<td>{{ stats.pct }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tfoot>
				<tr>
					<th>{{ totalRowLabel('spells') }}</th>
					<td>{{ allSpellsCount }}</td>
					<td>100.0<span>%</span></td>
				</tr>
			</tfoot>
		</table>
	</section>
</template>

<script>
import statsAnalyzer from '@/mixins/statsAnalyzer.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [statsAnalyzer, symbolsMarkup],
	props: {
		deck: Object
	},
	data () {
		return {
			colorStatsBasic: {
				White: {},
				Blue: {},
				Black: {},
				Red: {},
				Green: {},
				Colorless: {}
			},
			colorStatsExtra: {
				Monocolored: {
					isMatch: (card, backFace) => {
						if (backFace && card.colors2) {
							return card.colors2.length === 1
						} else {
							return card.colors.length === 1
						}
					}
				},
				Multicolored: {
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
	watch: {
		analyzerFilter () {
			this.resetColorStats()
			this.prepareColorStats()
		}
	},
	mounted () {
		this.prepareColorStats()
	},
	methods: {
		prepareColorStats () {
			this.initializeColorCounts()
			this.countColors()

			this.calculatePercentageOfSpells(this.colorStatsBasic)
			this.calculatePercentageOfSpells(this.colorStatsExtra)

			this.colorStatsBasic = this.sortTableByCounts(this.colorStatsBasic)
			this.colorStatsExtra = this.sortTableByCounts(this.colorStatsExtra)
		},
		initializeColorCounts () {
			for (const color in this.colorStatsBasic) {
				this.colorStatsBasic[color].ct = 0
			}
			for (const color in this.colorStatsExtra) {
				this.colorStatsExtra[color].ct = 0
			}
		},
		countColors () {
			this.filteredCards().forEach(card => {
				const qty = card.qty
				const countedOnFrontFace = {}

				const processColors = (faceColors) => {
					if (!faceColors) return // Exit now if this function would try to count the undefined data of a single-faced card's back face.

					function count (colorProp) {
						if (!countedOnFrontFace[colorProp]) {
							if (!statsObject[colorProp].ct) {
								statsObject[colorProp].ct = 0
							}

							statsObject[colorProp].ct += qty
							countedOnFrontFace[colorProp] = true
						}
					}

					let statsObject = this.colorStatsBasic

					if (faceColors.length < 1) {
						count('Colorless')
					} else {
						faceColors.forEach(color => {
							if (!color) {
								return count('Colorless')
							}
							switch (color) {
								case 'W':
									count('White')
									break
								case 'U':
									count('Blue')
									break
								case 'B':
									count('Black')
									break
								case 'R':
									count('Red')
									break
								case 'G':
									count('Green')
							}
						})
					}

					statsObject = this.colorStatsExtra

					if (faceColors.length === 1) {
						count('Monocolored')
					} else if (faceColors.length > 1) {
						count('Multicolored')
					}
				}

				function faceIsSpell (faceType) {
					if (!faceType) return

					return !/\bLand\b/.test(faceType)
				}

				if (faceIsSpell(card.type)) {
					processColors(card.colors)
				}
				if (faceIsSpell(card.type2)) {
					processColors(card.colors2)
				}

				if (
					faceIsSpell(card.type) ||
					faceIsSpell(card.type2)
				) {
					this.allSpellsCount += qty
				}
			})
		},
		calculatePercentageOfSpells (stats) {
			for (const statName in stats) {
				const stat = stats[statName]

				stat.pct = ((stat.ct / this.allSpellsCount) * 100).toFixed(1)
			}
		},
		resetColorStats () {
			for (const stat in this.colorStatsBasic) {
				this.colorStatsBasic[stat].ct = 0
			}
			for (const stat in this.colorStatsExtra) {
				this.colorStatsExtra[stat].ct = 0
			}

			this.allSpellsCount = 0
		}
	}
}
</script>
