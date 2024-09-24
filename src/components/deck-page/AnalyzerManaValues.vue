<template>
	<section id="stats-manaValues">
		<h4>Mana Values of Spells</h4>
		<div
			v-if="Object.keys(mvStats).length === 0"
			class="no-data"
		>
			(No data)
		</div>
		<div
			v-else
			class="height-limiter"
			tabindex="0"
		>
			<table>
				<thead v-html="tableHeadCommon"></thead>
				<tbody class="filterable-stats">
					<tr
						v-for="(stats, name) in mvStats"
						:key="name"
						:class="activeFilterClass('manaValues', name)"
						@click="handleRowClick('manaValues', name)"
					>
						<th>
							<span class="mana-symbol">
								<span
									v-if="name.length > 1"
									class="double-digits"
								>
									{{ name }}
								</span>
								<template v-else>
									{{ name }}
								</template>
							</span>
						</th>
						<td>{{ stats.ct }}</td>
						<td>{{ stats.pct }}<span>%</span></td>
					</tr>
				</tbody>
				<tbody
					v-show="variableStat.ct"
					class="filterable-stats"
				>
					<tr
						:class="activeFilterClass('manaValues', 'variable')"
						@click="handleRowClick('manaValues', 'variable')"
					>
						<th>
							<small>Variable</small>
							<span class="mana-symbol">X</span>
						</th>
						<td>{{ variableStat.ct }}</td>
						<td>{{ variableStat.pct }}<span>%</span></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>{{ totalRowLabel('spells') }}</th>
						<td>{{ allSpellsCount }}</td>
						<td>100.0<span>%</span></td>
					</tr>
				</tfoot>
			</table>
		</div>
	</section>
</template>

<script>
import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			mvStats: {},
			variableStat: { ct: 0 },
			allSpellsCount: 0
		}
	},
	watch: {
		analyzerFilter () {
			this.mvStats = {}
			this.variableStat.ct = 0
			this.allSpellsCount = 0

			this.prepareManaValueStats()
		}
	},
	created () {
		this.prepareManaValueStats()
	},
	methods: {
		prepareManaValueStats () {
			this.countManaValues()
			this.calculatePercentageOfSpells()
		},
		countManaValues () {
			const regexVariableCost = /\{X\}/

			this.filteredCards().forEach(({ mana, cmc, type, qty }) => {
				const isNotSpell = /\bLand\b/.test(type)

				if (isNotSpell) return

				if (!this.mvStats[cmc]) {
					this.mvStats[cmc] = {
						ct: 0
					}
				}

				this.mvStats[cmc].ct += qty

				if (regexVariableCost.test(mana)) {
					this.variableStat.ct += qty
				}

				this.allSpellsCount += qty
			})
		},
		calculatePercentageOfSpells () {
			const returnPct = (stat) => {
				return ((stat.ct / this.allSpellsCount) * 100).toFixed(1)
			}

			for (const statName in this.mvStats) {
				this.mvStats[statName].pct = returnPct(this.mvStats[statName])
			}

			this.variableStat.pct = returnPct(this.variableStat)
		}
	}
}
</script>
