<template>
	<section id="stats-types">
		<h4>Types</h4>
		<div
			v-if="noData()"
			class="no-data"
		>
			(No data)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(type, typeName) in typeStats">
					<tr
						v-if="type.ct > 0"
						:key="typeName"
						:class="activeFilterClass('types', typeName)"
						@click="handleRowClick('types', typeName)"
					>
						<th>{{ typeName }}</th>
						<td>{{ type.ct }}</td>
						<td>{{ calculatePercentage(type.ct) }}<span>%</span></td>
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
			typeStats: {
				Creature: {},
				Planeswalker: {},
				Battle: {},
				Enchantment: {},
				Artifact: {},
				Sorcery: {},
				Instant: {},
				'Kindred/Tribal': {},
				Land: {},
				Other: {}
			}
		}
	},
	watch: {
		analyzerFilter () {
			this.countTypes()
		}
	},
	mounted () {
		this.countTypes()

		this.typeStats = this.sortTableByCounts(this.typeStats)
	},
	methods: {
		noData () {
			this.filteredCards() // This is needed here to make the table's data update after filtering.

			return Object.values(this.typeStats).every(
				stat => stat.ct === 0
			)
		},
		initializeCounts () {
			for (const stat in this.typeStats) {
				this.typeStats[stat].ct = 0
			}
		},
		countTypes () {
			this.initializeCounts()

			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				const typesPerFace = (typeLine) => {
					if (!typeLine) return

					let recognizedType = false

					for (const typeName in this.typeStats) {
						const typeRegex = this.regexCardTypes[typeName]

						if (
							typeRegex &&
							typeRegex.test(typeLine)
						) {
							if (!countedOnFrontFace[typeName]) {
								this.typeStats[typeName].ct += card.qty
								countedOnFrontFace[typeName] = true
							}

							recognizedType = true
						}
					}

					if (!recognizedType) {
						this.typeStats.Other.ct += card.qty
						countedOnFrontFace.Other = true
					}
				}

				typesPerFace(card.type)
				typesPerFace(card.type2)
			})
		}
	}
}
</script>
