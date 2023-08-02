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
				this.miscProperties.forEach(heading => {
					const count = this.countMisc(heading)

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
			prop = prop.toLowerCase()
			let count = 0

			this.deck.cards.forEach(card => {
				const regexBasicLand = /\bBasic (\w* )?Land\b/
				const regexLegendary = /\bLegendary\b/
				const regexVariableCost = /\{X\}/
				const regexDoubleFaced = /\w\s\/\s\w/

				const matchesBasicLand = regexBasicLand.test(card.type)
				const matchesLegendary = regexLegendary.test(card.type)
				const matchesMonocolored = card.colors.length === 1
				const matchesMulticolored = card.colors[0] === 'multicolor'
				const matchesVariableCost = regexVariableCost.test(card.mana)
				const matchesVariablePT = card.power === '*' || card.toughness === '*'
				const matchesDoubleFaced = regexDoubleFaced.test(card.name)

				if (
					(prop === 'basic land' && matchesBasicLand) ||
					(prop === 'legendary' && matchesLegendary) ||
					(prop === 'monocolored' && matchesMonocolored) ||
					(prop === 'multicolored' && matchesMulticolored) ||
					(prop === 'variable cost' && matchesVariableCost) ||
					(prop === 'variable p/t' && matchesVariablePT) ||
					(prop === 'double-faced' && matchesDoubleFaced)
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
