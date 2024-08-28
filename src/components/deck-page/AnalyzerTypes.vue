<template>
	<section>
		<h4>Types</h4>
		<table>
			<thead v-html="tableHeadCommon"></thead>
			<tbody>
				<template v-for="(type, typeName) in typeStats">
					<tr
						v-if="type.ct > 0"
						:key="typeName"
					>
						<th>{{ typeName }}</th>
						<td>{{ type.ct }}</td>
						<td>{{ calculatePercentage(type.ct) }}<span>%</span></td>
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
			typeStats: {
				Creature: {
					ct: 0,
					regex: /\bCreature\b/
				},
				Planeswalker: {
					ct: 0,
					regex: /\bPlaneswalker\b/
				},
				Battle: {
					ct: 0,
					regex: /\bBattle\b/
				},
				Enchantment: {
					ct: 0,
					regex: /\bEnchantment\b/
				},
				Artifact: {
					ct: 0,
					regex: /\bArtifact\b/
				},
				Sorcery: {
					ct: 0,
					regex: /\bSorcery\b/
				},
				Instant: {
					ct: 0,
					regex: /\bInstant\b/
				},
				Land: {
					ct: 0,
					regex: /\bLand\b/
				},
				Other: {
					ct: 0
				}
			}
		}
	},
	mounted () {
		this.countTypes()

		this.typeStats = this.sortTableByCounts(this.typeStats)
	},
	methods: {
		countTypes () {
			this.deck.cards.forEach(card => {
				const countedOnFrontFace = {}

				const typesPerFace = (typeLine) => {
					if (!typeLine) return

					let recognizedType = false

					for (const typeName in this.typeStats) {
						const stat = this.typeStats[typeName]

						if (
							stat.regex &&
							stat.regex.test(typeLine)
						) {
							if (!countedOnFrontFace[typeName]) {
								stat.ct += card.qty
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
