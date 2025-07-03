<template>
	<section id="stats-types">
		<h4>Types</h4>
		<div v-if="noData" class="no-data">
			(None)
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
	computed: {
		typeStats () {
			const stats = {
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

			for (const stat in stats) {
				stats[stat].ct = 0
			}

			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				const typesPerFace = (typeLine) => {
					if (!typeLine) return

					let recognizedType = false

					for (const typeName in stats) {
						const typeRegex = this.regexCardTypes[typeName]

						if (
							typeRegex &&
							typeRegex.test(typeLine)
						) {
							if (!countedOnFrontFace[typeName]) {
								stats[typeName].ct += card.qty
								countedOnFrontFace[typeName] = true
							}

							recognizedType = true
						}
					}

					if (!recognizedType) {
						stats.Other.ct += card.qty
						countedOnFrontFace.Other = true
					}
				}

				typesPerFace(card.type)
				typesPerFace(card.type2)
			})

			return this.sortTableByCounts(stats)
		},
		noData () {
			return Object.values(this.typeStats).every(
				stat => stat.ct === 0
			)
		}
	}
}
</script>
