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
				Creature: { ct: 0 },
				Planeswalker: { ct: 0 },
				Battle: { ct: 0 },
				Enchantment: { ct: 0 },
				Artifact: { ct: 0 },
				Sorcery: { ct: 0 },
				Instant: { ct: 0 },
				'Kindred/Tribal': { ct: 0 },
				Land: { ct: 0 },
				Other: { ct: 0 }
			}

			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				const processTypes = (typeLine) => {
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

				processTypes(card.type)
				processTypes(card.type2)
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
