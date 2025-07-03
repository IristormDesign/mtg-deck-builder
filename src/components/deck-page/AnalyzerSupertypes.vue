<template>
	<section id="stats-supertypes">
		<h4>Supertypes</h4>
		<div v-if="noData" class="no-data">
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
	computed: {
		supertypeStats () {
			const stats = {
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

			for (const supertype in stats) {
				stats[supertype].ct = 0
			}

			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				const supertypesPerFace = (typeLine) => {
					if (!typeLine) return

					for (const supertypeName in stats) {
						const stat = stats[supertypeName]

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

			return this.sortTableByCounts(stats)
		},
		noData () {
			return Object.values(this.supertypeStats).every(
				stat => stat.ct === 0
			)
		}
	}
}
</script>
