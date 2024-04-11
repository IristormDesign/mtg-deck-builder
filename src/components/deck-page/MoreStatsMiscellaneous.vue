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
				<template v-for="(atb, atbName) in miscAttributes">
					<tr
						v-if="atb.count > 0"
						:key="atbName"
					>
						<th>{{ atbName }}</th>
						<td>{{ atb.count }}</td>
						<td>{{ calculatePercentage(atb.count) }}</td>
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
			miscAttributes: {
				'Basic Land': {
					count: 0,
					isMatch: (card) => {
						const regex = /\bBasic (\w* )?Land\b/

						return regex.test(card.type)
					}
				},
				Legendary: {
					count: 0,
					isMatch: (card) => {
						const regex = /\bLegendary\b/

						return regex.test(card.type)
					}
				},
				Monocolored: {
					count: 0,
					isMatch: (card) => {
						return card.colors.length === 1
					}
				},
				Multicolored: {
					count: 0,
					isMatch: (card) => {
						return card.colors.length > 1
					}
				},
				'Variable cost': {
					count: 0,
					isMatch: (card) => {
						const regex = /\{X\}/

						return regex.test(card.mana)
					}
				},
				'Variable P/T': {
					count: 0,
					isMatch: (card) => {
						return (
							card.power === '*' ||
							card.toughness === '*'
						)
					}
				},
				'Double-faced': {
					count: 0,
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
				atb => atb.count === 0
			)
		}
	},
	mounted () {
		this.countMisc()
	},
	methods: {
		countMisc () {
			this.deck.cards.forEach(card => {
				for (const atbName in this.miscAttributes) {
					const atb = this.miscAttributes[atbName]

					if (atb.isMatch(card)) {
						atb.count += card.qty
					}
				}
			})
		}
	}
}
</script>
