<template>
	<section>
		<h4>Types</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody v-html="markupTableRows([
				'Creature', 'Planeswalker', 'Enchantment', 'Artifact', 'Sorcery', 'Instant', 'Other', 'Land'
			])" />
		</table>
	</section>
</template>

<script>
import moreStatsMixins from '@/mixins/moreStatsMixins.js'

export default {
	mixins: [moreStatsMixins],
	props: {
		deck: Object
	},
	computed: {
		emptyTable () {
			if (
				this.countTypes('creature') === 0 &&
				this.countTypes('planeswalker') === 0 &&
				this.countTypes('enchantment') === 0 &&
				this.countTypes('artifact') === 0 &&
				this.countTypes('sorcery') === 0 &&
				this.countTypes('instant') === 0 &&
				this.countTypes('land') === 0 &&
				this.countTypes('other') === 0
			) {
				return true
			}
			return false
		}
	},
	methods: {
		markupTableRows (headings) {
			let markup = ''

			if (this.emptyTable) {
				markup += this.tableBodyEmpty
			} else {
				headings.forEach(heading => {
					const count = this.countTypes(heading.toLowerCase())

					if (count > 0) {
						markup += `
							<tr>
								<th>${heading}</th>
								<td>${count}</td>
								<td>${this.calculatePercentage(count)}</td>
							</tr>
						`
					}
				})
			}

			return markup
		},
		countTypes (givenType) {
			const counts = {
				creature: 0,
				planeswalker: 0,
				enchantment: 0,
				artifact: 0,
				sorcery: 0,
				instant: 0,
				land: 0,
				other: 0
			}
			const regexCreature = /\bCreature\b/
			const regexPlaneswalker = /\bPlaneswalker\b/
			const regexEnchantment = /\bEnchantment\b/
			const regexArtifact = /\bArtifact\b/
			const regexSorcery = /\bSorcery\b/
			const regexInstant = /\bInstant\b/
			const regexLand = /\bLand\b/

			function otherType (cardType) {
				if (
					!regexCreature.test(cardType) &&
					!regexPlaneswalker.test(cardType) &&
					!regexEnchantment.test(cardType) &&
					!regexArtifact.test(cardType) &&
					!regexSorcery.test(cardType) &&
					!regexInstant.test(cardType) &&
					!regexLand.test(cardType)
				) {
					return true
				}
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					const cardType = card.type

					if (regexCreature.test(cardType)) {
						counts.creature++
					}
					if (regexPlaneswalker.test(cardType)) {
						counts.planeswalker++
					}
					if (regexEnchantment.test(cardType)) {
						counts.enchantment++
					}
					if (regexArtifact.test(cardType)) {
						counts.artifact++
					}
					if (regexSorcery.test(cardType)) {
						counts.sorcery++
					}
					if (regexInstant.test(cardType)) {
						counts.instant++
					}
					if (regexLand.test(cardType)) {
						counts.land++
					}
					if (otherType(cardType)) {
						counts.other++
					}
				}
			})

			switch (givenType) {
			case 'creature':
				return counts.creature
			case 'planeswalker':
				return counts.planeswalker
			case 'enchantment':
				return counts.enchantment
			case 'artifact':
				return counts.artifact
			case 'sorcery':
				return counts.sorcery
			case 'instant':
				return counts.instant
			case 'land':
				return counts.land
			case 'other':
				return counts.other
			}
		}
	}
}
</script>
