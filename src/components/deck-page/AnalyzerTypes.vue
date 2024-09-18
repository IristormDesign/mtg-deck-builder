<template>
	<section id="stats-types">
		<h4>Types</h4>
		<table>
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
import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
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
						const typeRegex = this.$store.state.regex.cardTypes[typeName]

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
