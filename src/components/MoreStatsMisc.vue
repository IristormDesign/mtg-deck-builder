<template>
	<section>
		<h4>Miscellaneous</h4>
		<table>
			<thead v-html="tableHeadCommon" />
			<tbody v-html="markupTableRows()" />
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
			miscProperties: [
				'Basic land', 'Legendary', 'Monocolored', 'Multicolored', 'Variable cost', 'Variable P/T', 'Double-faced'
			]
		}
	},
	computed: {
		emptyTable () {
			for (const prop of this.miscProperties) {
				if (this.countMisc(prop) > 0) {
					return false
				}
			}
			return true
		}
	},
	methods: {
		markupTableRows () {
			let markup = ''

			if (this.emptyTable) {
				markup += this.tableBodyEmpty
			} else {
				this.miscProperties.forEach(prop => {
					const count = this.countMisc(prop)

					if (count > 0) {
						markup += `
							<tr>
								<th>${prop}</th>
								<td>${count}</td>
								<td>${this.calculatePercentage(count)}</td>
							</tr>
						`
					}
				})
			}

			return markup
		},
		countMisc (prop) {
			switch (prop.toLowerCase()) {
				case 'basic land':
					return this.cardsOfProp(matchesBasicLand)
				case 'legendary':
					return this.cardsOfProp(matchesLegendary)
				case 'monocolored':
					return this.cardsOfProp(matchesMonocolored)
				case 'multicolored':
					return this.cardsOfProp(matchesMulticolored)
				case 'variable cost':
					return this.cardsOfProp(matchesVariableCost)
				case 'variable p/t':
					return this.cardsOfProp(matchesVariablePT)
				case 'double-faced':
					return this.cardsOfProp(matchesDoubleFaced)
			}

			function matchesBasicLand (card) {
				const regexBasicLand = /\bBasic (\w* )?Land\b/
				return regexBasicLand.test(card.type)
			}
			function matchesLegendary (card) {
				const regexLegendary = /\bLegendary\b/
				return regexLegendary.test(card.type)
			}
			function matchesMonocolored (card) {
				return card.colors.length === 1
			}
			function matchesMulticolored (card) {
				return card.colors[0] === 'multicolor'
			}
			function matchesVariableCost (card) {
				const regexVariableCost = /\{X\}/
				return regexVariableCost.test(card.mana)
			}
			function matchesVariablePT (card) {
				return card.power === '*' || card.toughness === '*'
			}
			function matchesDoubleFaced (card) {
				const regexDoubleFaced = /\w\s\/\s\w/
				return regexDoubleFaced.test(card.name)
			}
		},
		cardsOfProp (propMatcher) {
			let count = 0

			this.deck.cards.forEach(card => {
				if (propMatcher(card)) {
					for (let i = 0; i < card.qty; i++) {
						count++
					}
				}
			})

			return count
		}
	}
}
</script>
