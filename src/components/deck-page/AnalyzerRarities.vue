<template>
	<section id="stats-rarities">
		<h4>Rarities</h4>
		<div
			v-if="noData()"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(ct, name) in rarityCounts">
					<tr
						v-if="ct > 0"
						:key="name"
						:class="activeFilterClass('rarities', name)"
						@click="handleRowClick('rarities', name)"
					>
						<th>
							<div
								v-if="name !== 'Other'"
								class="vert-center-cell"
								v-html="`
									<small>${name}</small>
									${raritySymbol[name.charAt(0).toLowerCase()]}
								`"
							></div>
							<div v-else>Other</div>
						</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentage(ct) }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tfoot>
				<tr>
					<th>{{ totalRowLabel('cards') }}</th>
					<td>{{ totalCards }}</td>
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
			rarityCounts: {
				Common: 0,
				Uncommon: 0,
				Rare: 0,
				'Mythic rare': 0,
				Special: 0,
				Bonus: 0,
				Other: 0
			}
		}
	},
	watch: {
		analyzerFilter () {
			this.resetRarityStats()
			this.countRarities()
		}
	},
	mounted () {
		this.countRarities()
	},
	methods: {
		noData () {
			this.filteredCards() // This is needed here to make the table's data update after filtering.

			return Object.values(this.rarityCounts).every(
				ct => ct === 0
			)
		},
		countRarities () {
			const cts = this.rarityCounts

			this.filteredCards().forEach(({ rarity, qty }) => {
				switch (rarity) {
					case 'common':
					case 'c':
						cts.Common += qty
						return
					case 'uncommon':
					case 'u':
						cts.Uncommon += qty
						return
					case 'rare':
					case 'r':
						cts.Rare += qty
						return
					case 'mythic':
					case 'm':
						cts['Mythic rare'] += qty
						return
					case 'special':
					case 's':
						cts.Special += qty
						return
					case 'bonus':
					case 'b':
						cts.Bonus += qty
						return
					default:
						cts.Other += qty
				}
			})
		},
		resetRarityStats () {
			for (const rarity in this.rarityCounts) {
				this.rarityCounts[rarity] = 0
			}
		}
	}
}
</script>
