<template>
	<section id="stats-supertypes">
		<h4>Supertypes</h4>
		<div
			v-if="noData()"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(supertype, supertypeName) in supertypeStats">
					<tr
						v-if="supertype.ct > 0"
						:key="supertypeName"
						:class="activeFilterClass('supertypes', supertypeName)"
						@click="handleRowClick('supertypes', supertypeName)"
					>
						<th>{{ supertypeName }}</th>
						<td>{{ supertype.ct }}</td>
						<td>{{ calculatePercentage(supertype.ct) }}<span>%</span></td>
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

export default {
	mixins: [statsAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			supertypeStats: {
				Basic: {
					regex: /\bBasic .+/
				},
				Elite: {
					regex: /\bElite .+/
				},
				Host: {
					regex: /\bHost .+/
				},
				Legendary: {
					regex: /\bLegendary .+/
				},
				Ongoing: {
					regex: /\bOngoing .+/
				},
				Snow: {
					regex: /\bSnow .+/
				},
				Token: {
					regex: /\bToken .+/
				},
				World: {
					regex: /\bWorld .+/
				}
			}
		}
	},
	watch: {
		analyzerFilter () {
			for (const supertype in this.supertypeStats) {
				this.supertypeStats[supertype].ct = 0
			}

			this.countSupertypes()
		}
	},
	mounted () {
		this.countSupertypes()

		this.supertypeStats = this.sortTableByCounts(this.supertypeStats)
	},
	methods: {
		noData () {
			this.filteredCards() // This is needed here to make the table's data update after filtering.

			return Object.values(this.supertypeStats).every(
				stat => stat.ct === 0
			)
		},
		countSupertypes () {
			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				const supertypesPerFace = (typeLine) => {
					if (!typeLine) return

					for (const supertypeName in this.supertypeStats) {
						const stat = this.supertypeStats[supertypeName]

						if (!stat.ct) {
							stat.ct = 0
						}

						if (
							stat.regex.test(typeLine) &&
							!countedOnFrontFace[supertypeName]
						) {
							stat.ct += card.qty
							countedOnFrontFace[supertypeName] = true
						}
					}
				}

				supertypesPerFace(card.type)
				supertypesPerFace(card.type2)
			})
		}
	}
}
</script>
