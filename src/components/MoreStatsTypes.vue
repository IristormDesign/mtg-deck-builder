<template>
	<section>
		<h4>Types</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Count</th>
					<th>Percent</th>
				</tr>
			</thead>
			<tbody v-if="!emptyTable">
				<tr v-show="countTypes('creature')">
					<th>Creature</th>
					<td>{{ countTypes('creature') }}</td>
					<td>{{ calculatePercentage(countTypes('creature')) }}</td>
				</tr>
				<tr v-show="countTypes('planeswalker')">
					<th>Planeswalker</th>
					<td>{{ countTypes('planeswalker') }}</td>
					<td>{{ calculatePercentage(countTypes('planeswalker')) }}</td>
				</tr>
				<tr v-show="countTypes('enchantment')">
					<th>Enchantment</th>
					<td>{{ countTypes('enchantment') }}</td>
					<td>{{ calculatePercentage(countTypes('enchantment')) }}</td>
				</tr>
				<tr v-show="countTypes('artifact')">
					<th>Artifact</th>
					<td>{{ countTypes('artifact') }}</td>
					<td>{{ calculatePercentage(countTypes('artifact')) }}</td>
				</tr>
				<tr v-show="countTypes('sorcery')">
					<th>Sorcery</th>
					<td>{{ countTypes('sorcery') }}</td>
					<td>{{ calculatePercentage(countTypes('sorcery')) }}</td>
				</tr>
				<tr v-show="countTypes('instant')">
					<th>Instant</th>
					<td>{{ countTypes('instant') }}</td>
					<td>{{ calculatePercentage(countTypes('instant')) }}</td>
				</tr>
				<tr v-show="countTypes('land')">
					<th>Land</th>
					<td>{{ countTypes('land') }}</td>
					<td>{{ calculatePercentage(countTypes('land')) }}</td>
				</tr>
				<tr v-show="countTypes('other')">
					<th>Other</th>
					<td>{{ countTypes('other') }}</td>
					<td>{{ calculatePercentage(countTypes('other')) }}</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<th><i>(None)</i></th>
					<td>—</td>
					<td>—</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import calculatePercentage from '@/mixins/calculatePercentage.js'

export default {
	mixins: [calculatePercentage],
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
			const regexCreature = RegExp(/\bCreature\b/)
			const regexPlaneswalker = RegExp(/\bPlaneswalker\b/)
			const regexEnchantment = RegExp(/\bEnchantment\b/)
			const regexArtifact = RegExp(/\bArtifact\b/)
			const regexSorcery = RegExp(/\bSorcery\b/)
			const regexInstant = RegExp(/\bInstant\b/)
			const regexLand = RegExp(/\bLand\b/)

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
