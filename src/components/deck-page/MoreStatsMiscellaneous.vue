<template>
	<section>
		<h4>Miscellaneous</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody
				v-if="noData"
				v-html="tableBodyEmpty"
			/>
			<tbody v-else>
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
				'Basic Land': {
					ct: 0,
					isMatch: (card) => {
						const regex = /\bBasic (\w* )?Land\b/

						return regex.test(card.type)
					}
				},
				Legendary: {
					ct: 0,
					isMatch: (card) => {
						const regex = /\bLegendary\b/

						return regex.test(card.type)
					}
				},
				Monocolored: {
					ct: 0,
					isMatch: (card) => {
						return card.colors.length === 1
					}
				},
				Multicolored: {
					ct: 0,
					isMatch: (card) => {
						return card.colors.length > 1
					}
				},
				'Variable cost': {
					ct: 0,
					isMatch: (card) => {
						const regex = /\{X\}/

						return regex.test(card.mana)
					}
				},
				'Variable P/T': {
					ct: 0,
					isMatch: (card) => {
						return (
							card.power === '*' ||
							card.toughness === '*'
						)
					}
				},
				'Double-faced': {
					ct: 0,
					isMatch: (card) => {
						const regex = /\w\s\/\s\w/

						return regex.test(card.name)
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
	},
	methods: {
		countMisc () {
			this.deck.cards.forEach(card => {
				for (const attrName in this.miscAttributes) {
					const attr = this.miscAttributes[attrName]

					if (attr.isMatch(card)) {
						attr.ct += card.qty
					}
				}
			})
		}
	}
}
</script>
