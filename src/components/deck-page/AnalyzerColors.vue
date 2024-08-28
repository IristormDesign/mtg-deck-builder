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
			<thead v-html="tableHeadCommon"></thead>
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
			<tbody class="total">
				<tr>
					<th>All spells</th>
					<td>{{ allSpellsCount }}</td>
					<td>100.0<span>%</span></td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import deckAnalyzer from '@/mixins/deckAnalyzer.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [deckAnalyzer, symbolsMarkup],
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
				Green: {}
			},
			colorStatsExtra: {
				Colorless: {},
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

				const colorsPerFace = (faceColors) => {
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

					faceColors.forEach(color => {
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

					statsObject = this.colorStatsExtra

					if (faceColors.length === 1) {
						count('Monocolored')
					} else if (faceColors.length > 1) {
						count('Multicolored')
					} else {
						count('Colorless')
					}
				}

				function faceIsSpell (faceType) {
					if (!faceType) return

					return !/\bLand\b/.test(faceType)
				}

				if (faceIsSpell(card.type)) {
					colorsPerFace(card.colors)
				}
				if (faceIsSpell(card.type2)) {
					colorsPerFace(card.colors2)
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
		}
	}
}
</script>
