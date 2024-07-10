<template>
	<section>
		<h4>Miscellaneous</h4>
		<div
			v-if="noData"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon" />
			<tbody>
				<template v-for="(attr, attrName) in miscAttributes">
					<tr
						v-if="attr.ct > 0"
						:key="attrName"
					>
						<th>{{ attrName }}</th>
						<td>{{ attr.ct }}</td>
						<td>{{ calculatePercentage(attr.ct) }}<span>%</span></td>
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
			miscAttributes: {
				'Basic land': {
					ct: 0,
					isMatch: (card, backFace) => {
						const regex = /\bBasic (\w* )?Land\b/

						if (backFace) {
							return regex.test(card.type2)
						} else {
							return regex.test(card.type)
						}
					}
				},
				Legendary: {
					ct: 0,
					isMatch: (card, backFace) => {
						const regex = /\bLegendary\b/

						if (backFace) {
							return regex.test(card.type2)
						} else {
							return regex.test(card.type)
						}
					}
				},
				Monocolored: {
					ct: 0,
					isMatch: (card, backFace) => {
						if (backFace && card.colors2) {
							return card.colors2.length === 1
						} else {
							return card.colors.length === 1
						}
					}
				},
				Multicolored: {
					ct: 0,
					isMatch: (card, backFace) => {
						if (backFace && card.colors2) {
							return card.colors2.length > 1
						} else {
							return card.colors.length > 1
						}
					}
				},
				'Variable cost': {
					ct: 0,
					isMatch: (card, backFace) => {
						const regex = /\{X\}/

						if (backFace) {
							return regex.test(card.mana2)
						} else {
							return regex.test(card.mana)
						}
					}
				},
				'Variable P/T': {
					ct: 0,
					isMatch: (card, backFace) => {
						if (backFace) {
							return (
								card.power2 === '*' ||
								card.toughness2 === '*'
							)
						} else {
							return (
								card.power === '*' ||
								card.toughness === '*'
							)
						}
					}
				},
				'Double-faced': {
					ct: 0,
					isMatch: (card) => {
						return card.name2
					}
				}
			}
		}
	},
	computed: {
		noData () {
			return Object.values(this.miscAttributes).every(
				attr => attr.ct === 0
			)
		}
	},
	mounted () {
		this.countMisc()

		this.miscAttributes = this.sortTableByCounts(this.miscAttributes)
	},
	methods: {
		countMisc () {
			this.deck.cards.forEach(card => {
				for (const attrName in this.miscAttributes) {
					const countedOnFrontFace = {}

					const miscAttrsPerFace = (faceAttrName, forBackFace) => {
						const attr = this.miscAttributes[faceAttrName]

						if (
							!countedOnFrontFace[faceAttrName] &&
							attr.isMatch(card, forBackFace)
						) {
							attr.ct += card.qty
							countedOnFrontFace[faceAttrName] = true
						}
					}

					miscAttrsPerFace(attrName)
					miscAttrsPerFace(attrName, true)
				}
			})
		}
	}
}
</script>
