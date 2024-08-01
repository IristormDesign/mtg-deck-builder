<template>
	<section>
		<h4>Supertypes</h4>
		<table>
			<thead v-html="tableHeadCommon" />
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
import moreStats from '@/mixins/moreStats.js'

export default {
	mixins: [moreStats],
	props: {
		deck: Object
	},
	data () {
		return {
			supertypeStats: {
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
				World: {
					ct: 0,
					regex: /\bWorld .+/
				}
			}
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

						if (stat.regex.test(typeLine)) {
							if (!countedOnFrontFace[supertypeName]) {
								stat.ct += card.qty
								countedOnFrontFace[supertypeName] = true
							}
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
