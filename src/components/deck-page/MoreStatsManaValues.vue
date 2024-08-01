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
									v-if="shrinkSymbolText(name)"
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
			allSpellsCount: 0
		}
	},
	created () {
		this.countManaValues()
		this.calculatePercentageOfSpells()
	},
	methods: {
		countManaValues () {
			this.deck.cards.forEach(({ mana, cmc, qty }) => {
				if (!mana) return // Exclude land cards

				if (!this.mvStats[cmc]) {
					this.mvStats[cmc] = {
						ct: 0
					}
				}

				this.mvStats[cmc].ct += qty
				this.allSpellsCount += qty
			})
		},
		calculatePercentageOfSpells () {
			for (const statName in this.mvStats) {
				const stat = this.mvStats[statName]

				stat.pct = ((stat.ct / this.allSpellsCount) * 100).toFixed(1)
			}
		},
		shrinkSymbolText (string) {
			return string.length > 1
		}
	}
}
</script>
