<template>
	<section>
		<h4>Types</h4>
		<table>
			<thead v-html="tableHeadCommon" />
			<tbody v-html="tableRowMarkup" />
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
			typeCounts: {
				Creature: 0,
				Planeswalker: 0,
				Battle: 0,
				Enchantment: 0,
				Artifact: 0,
				Sorcery: 0,
				Instant: 0,
				Land: 0,
				Other: 0
			}
		}
	},
	computed: {
		tableIsEmpty () {
			for (const type in this.typeCounts) {
				if (this.typeCounts[type] > 0) {
					return false
				}
			}
			return true
		},
		tableRowMarkup () {
			let markup = ''

			if (this.tableIsEmpty) {
				markup = this.tableBodyEmpty
			} else {
				for (const typeName in this.typeCounts) {
					const count = this.typeCounts[typeName]

					if (count > 0) {
						markup += `
							<tr>
								<th>${typeName}</th>
								<td>${count}</td>
								<td>${this.calculatePercentage(count)}</td>
							</tr>
						`
					}
				}
			}

			return markup
		}
	},
	mounted () {
		this.countTypes()
	},
	methods: {
		countTypes () {
			const regexCreature = /\bCreature\b/
			const regexPlaneswalker = /\bPlaneswalker\b/
			const regexBattle = /\bBattle\b/
			const regexEnchantment = /\bEnchantment\b/
			const regexArtifact = /\bArtifact\b/
			const regexSorcery = /\bSorcery\b/
			const regexInstant = /\bInstant\b/
			const regexLand = /\bLand\b/
			const count = this.typeCounts

			this.deck.cards.forEach(card => {
				const type = card.type
				const qty = card.qty

				if (regexCreature.test(type)) {
					count.Creature += qty
				}
				if (regexPlaneswalker.test(type)) {
					count.Planeswalker += qty
				}
				if (regexBattle.test(type)) {
					count.Battle += qty
				}
				if (regexEnchantment.test(type)) {
					count.Enchantment += qty
				}
				if (regexArtifact.test(type)) {
					count.Artifact += qty
				}
				if (regexSorcery.test(type)) {
					count.Sorcery += qty
				}
				if (regexInstant.test(type)) {
					count.Instant += qty
				}
				if (regexLand.test(type)) {
					count.Land += qty
				}
				if (
					!regexCreature.test(type) &&
					!regexPlaneswalker.test(type) &&
					!regexBattle.test(type) &&
					!regexEnchantment.test(type) &&
					!regexArtifact.test(type) &&
					!regexSorcery.test(type) &&
					!regexInstant.test(type) &&
					!regexLand.test(type)
				) {
					count.Other += qty
				}
			})
		}
	}
}
</script>
