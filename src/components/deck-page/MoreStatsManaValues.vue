<template>
	<section>
		<h4>Mana Values of Spells</h4>
		<div
			v-if="Object.keys(mvStats).length === 0"
			class="no-data"
		>
			(None)
		</div>
		<div
			v-else
			class="height-limiter"
			tabindex="0"
		>
			<table>
				<thead v-html="tableHeadCommon" />
				<tbody>
					<tr
						v-for="(stats, name) in mvStats"
						:key="name"
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
				<tbody v-show="variableStat.ct">
					<tr>
						<th>
							<small>Variable</small>
							<span class="mana-symbol">X</span>
						</th>
						<td>{{ variableStat.ct }}</td>
						<td>{{ variableStat.pct }}<span>%</span></td>
					</tr>
				</tbody>
				<tbody class="total">
					<tr>
						<th>All spells</th>
						<td>{{ allSpellsCount }}</td>
						<td>100.0<span>%</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
import moreStats from '@/mixins/moreStats.js'

export default {
	mixins: [moreStats],
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
	created () {
		this.countManaValues()
		this.calculatePercentageOfSpells()
	},
	methods: {
		countManaValues () {
			const regexVariableCost = /\{X\}/

			this.deck.cards.forEach(({ mana, cmc, type, qty }) => {
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
