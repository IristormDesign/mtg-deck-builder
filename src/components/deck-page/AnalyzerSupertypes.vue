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
					ct: 0,
					regex: /\bBasic .+/
				},
				Elite: {
					ct: 0,
					regex: /\bElite .+/
				},
				Host: {
					ct: 0,
					regex: /\bHost .+/
				},
				Legendary: {
					ct: 0,
					regex: /\bLegendary .+/
				},
				Ongoing: {
					ct: 0,
					regex: /\bOngoing .+/
				},
				Snow: {
					ct: 0,
					regex: /\bSnow .+/
				},
				Token: {
					ct: 0,
					regex: /\bToken .+/
				},
				World: {
					ct: 0,
					regex: /\bWorld .+/
				}
			}

			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				const processSupertypes = (typeLine) => {
					if (!typeLine) return

					for (const supertypeName in stats) {
						const stat = stats[supertypeName]

						if (
							stat.regex.test(typeLine) &&
							!countedOnFrontFace[supertypeName]
						) {
							stat.ct += card.qty
							countedOnFrontFace[supertypeName] = true
						}
					}
				}

				processSupertypes(card.type)
				processSupertypes(card.type2)
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
