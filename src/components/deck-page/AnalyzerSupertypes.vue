<template>
	<section>
		<h4>Supertypes</h4>
		<div
			v-if="noData"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody>
				<template v-for="(supertype, supertypeName) in supertypeStats">
					<tr
						v-if="supertype.ct > 0"
						:key="supertypeName"
						:ref="`supertypes-${supertypeName}`"
						@click="filterBySupertype(supertypeName)"
					>
						<th>{{ supertypeName }}</th>
						<td>{{ supertype.ct }}</td>
						<td>{{ calculatePercentage(supertype.ct) }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tbody class="total">
				<tr>
					<th>All cards</th>
					<td>{{ totalCards }}</td>
					<td>100.0<span>%</span></td>
				</tr>
			</tbody>
		</table>
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
			this.countSupertypes()

			this.supertypeStats = this.sortTableByCounts(this.supertypeStats)
		}
	},
	computed: {
		noData () {
			return Object.values(this.supertypeStats).every(
				stat => stat.ct === 0
			)
		}
	},
	mounted () {
		this.countSupertypes()

		this.supertypeStats = this.sortTableByCounts(this.supertypeStats)
	},
	methods: {
		countSupertypes () {
			for (const supertype in this.supertypeStats) {
				const stat = this.supertypeStats[supertype]

				if (stat.ct) {
					stat.ct = 0
				}
			}

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
		},
		filterBySupertype (name) {
			const store = this.$store
			const rowClassList = this.$refs[`supertypes-${name}`][0].classList

			if (
				store.state.analyzerFilter &&
				store.state.analyzerFilter[1] === name
			) { // If the user has clicked on the same table row that's currently filtering...
				store.commit('analyzerFilter', null)

				rowClassList.remove('filtering')
			} else { // Else the user has clicked on a different table row.
				const prevFilter = store.state.analyzerFilter

				if (
					prevFilter &&
					prevFilter[0] === 'supertypes'
				) {
					const prevName = prevFilter[1]

					this.$refs[`supertypes-${prevName}`][0].classList.remove('filtering')
				}

				store.commit('analyzerFilter', ['supertypes', name])

				rowClassList.add('filtering')
			}
		}
	}
}
</script>
