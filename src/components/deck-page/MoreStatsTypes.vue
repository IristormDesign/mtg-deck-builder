<template>
	<section>
		<h4>Types</h4>
		<table>
			<thead v-html="tableHeadCommon" />
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
				<tr class="total">
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
				const typePerFace = (cardType) => {
					if (!cardType) return

					let recognizedType = false

					for (const typeName in this.typeStats) {
						const stat = this.typeStats[typeName]

						if (stat.regex && stat.regex.test(cardType)) {
							stat.ct += card.qty
							recognizedType = true
						}
					}

					if (!recognizedType) {
						this.typeStats.Other.ct += card.qty
					}
				}

				typePerFace(card.type)
				typePerFace(card.type2)
			})
		}
	}
}
</script>
