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
			this.deck.cards.forEach(card => {
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
