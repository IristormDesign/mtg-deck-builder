<template>
	<section>
		<h4>Types</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody
				v-if="noData"
				v-html="tableBodyEmpty"
			/>
			<tbody v-else>
				<template v-for="(type, typeName) in types">
					<tr
						v-if="type.count > 0"
						:key="typeName"
					>
						<th>{{ typeName }}</th>
						<td>{{ type.count }}</td>
						<td>{{ calculatePercentage(type.count) }}</td>
					</tr>
				</template>
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
			types: {
				Creature: {
					count: 0,
					regex: /\bCreature\b/
				},
				Planeswalker: {
					count: 0,
					regex: /\bPlaneswalker\b/
				},
				Battle: {
					count: 0,
					regex: /\bBattle\b/
				},
				Enchantment: {
					count: 0,
					regex: /\bEnchantment\b/
				},
				Artifact: {
					count: 0,
					regex: /\bArtifact\b/
				},
				Sorcery: {
					count: 0,
					regex: /\bSorcery\b/
				},
				Instant: {
					count: 0,
					regex: /\bInstant\b/
				},
				Land: {
					count: 0,
					regex: /\bLand\b/
				},
				Other: {
					count: 0
				}
			}
		}
	},
	computed: {
		noData () {
			return Object.values(this.types).every(
				type => type.count === 0
			)
		}
	},
	mounted () {
		this.countTypes()
	},
	methods: {
		countTypes () {
			this.deck.cards.forEach(card => {
				let recognizedType = false

				for (const typeName in this.types) {
					const type = this.types[typeName]

					if (type.regex && type.regex.test(card.type)) {
						type.count += card.qty
						recognizedType = true
					}
				}

				if (!recognizedType) {
					this.types.Other.count += card.qty
				}
			})
		}
	}
}
</script>
