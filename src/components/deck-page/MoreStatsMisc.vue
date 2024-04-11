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
				<template v-for="(prop, propName) in miscProps">
					<tr
						v-if="prop.count > 0"
						:key="propName"
					>
						<th>{{ propName }}</th>
						<td>{{ prop.count }}</td>
						<td>{{ calculatePercentage(prop.count) }}</td>
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
			miscProps: {
				'Basic Land': {
					isMatch: (card) => {
						const regex = /\bBasic (\w* )?Land\b/

						return regex.test(card.type)
					}
				},
				Legendary: {
					isMatch: (card) => {
						const regex = /\bLegendary\b/

						return regex.test(card.type)
					}
				},
				Monocolored: {
					isMatch: (card) => {
						return card.colors.length === 1
					}
				},
				Multicolored: {
					isMatch: (card) => {
						return card.colors.length > 1
					}
				},
				'Variable cost': {
					isMatch: (card) => {
						const regex = /\{X\}/

						return regex.test(card.mana)
					}
				},
				'Variable P/T': {
					isMatch: (card) => {
						return (
							card.power === '*' ||
							card.toughness === '*'
						)
					}
				},
				'Double-faced': {
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
			return Object.values(this.miscProps).every(
				prop => prop.count === 0
			)
		}
	},
	created () {
		this.countMiscProps()
	},
	methods: {
		countMiscProps () {
			this.deck.cards.forEach(card => {
				for (const propName in this.miscProps) {
					const prop = this.miscProps[propName]

					if (prop.isMatch(card)) {
						if (!prop.count) {
							prop.count = 0
						}

						prop.count += card.qty
					}
				}
			})
		}
	}
}
</script>
