<template>
	<section id="stats-producibleMana">
		<h4>Producible Mana Colors</h4>
		<div
			v-if="this.totalManaSources === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(stat, letter) in producibleManaStats">
					<tr
						v-if="stat.ct > 0"
						:key="stat.name"
						:class="activeFilterClass('producibleMana', letter)"
						@click="handleRowClick(
							'producibleMana', letter, stat.name
						)"
					>
						<th>
							<div
								class="vert-center-cell"
								v-html="`
									<small>${stat.name}</small>
									${manaSymbol[letter.toLowerCase()]}
								`"
							></div>
						</th>
						<td>{{ stat.ct }}</td>
						<td>{{ stat.pct.toFixed(1) }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tfoot>
				<tr>
					<th>{{ totalRowLabel('sources') }}</th>
					<td>{{ totalManaSources }}</td>
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
			producibleManaStats: {
				W: {
					ct: 0,
					name: 'White'
				},
				U: {
					ct: 0,
					name: 'Blue'
				},
				B: {
					ct: 0,
					name: 'Black'
				},
				R: {
					ct: 0,
					name: 'Red'
				},
				G: {
					ct: 0,
					name: 'Green'
				},
				C: {
					ct: 0,
					name: 'Colorless'
				}
			},
			totalManaSources: 0
		}
	},
	watch: {
		analyzerFilter () {
			for (const color in this.producibleManaStats) {
				this.producibleManaStats[color].ct = 0
			}

			this.prepareProducibleManaStats()
		}
	},
	mounted () {
		this.prepareProducibleManaStats()

		this.producibleManaStats = this.sortTableByCounts(this.producibleManaStats)
	},
	methods: {
		prepareProducibleManaStats () {
			this.totalManaSources = 0

			this.countManaProduced()
			this.calculatePercentage()
		},
		countManaProduced () {
			this.filteredCards().forEach(card => {
				if (!card.prodMana) return

				card.prodMana.forEach(color => {
					const mana = this.producibleManaStats[color]

					if (mana) {
						this.producibleManaStats[color].ct += card.qty
					}
				})

				this.totalManaSources += card.qty
			})
		},
		calculatePercentage () {
			const pm = this.producibleManaStats

			for (const color in pm) {
				pm[color].pct = (pm[color].ct / this.totalManaSources * 100)
			}
		}
	}
}
</script>
