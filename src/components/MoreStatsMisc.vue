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
import moreStatsMixins from '@/mixins/moreStatsMixins.js'

export default {
	mixins: [moreStatsMixins],
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
			for (let i = 0; i < this.miscProperties.length; i++) {
				const prop = this.miscProperties[i].toLowerCase()

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
				this.miscProperties.forEach(heading => {
					const count = this.countMisc(heading.toLowerCase())

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
		countMisc (prop) {
			let count = 0

			this.deck.cards.forEach(card => {
				const testBasicLand = RegExp(/\bBasic (\w* )?Land\b/).test(card.type)
				const testLegendary = RegExp(/\bLegendary\b/).test(card.type)
				const testMonocolored = card.colors.length === 1
				const testMulticolored = card.colors[0] === 'multicolor'
				const testVariableCost = RegExp(/\{X\}/).test(card.mana)
				const testVariablePT = card.power === '*' || card.toughness === '*'
				const testDoubleFaced = RegExp(/\w\s\/\s\w/).test(card.name)

				if (
					(prop === 'basic land' && testBasicLand) ||
					(prop === 'legendary' && testLegendary) ||
					(prop === 'monocolored' && testMonocolored) ||
					(prop === 'multicolored' && testMulticolored) ||
					(prop === 'variable cost' && testVariableCost) ||
					(prop === 'variable p/t' && testVariablePT) ||
					(prop === 'double-faced' && testDoubleFaced)
				) {
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
