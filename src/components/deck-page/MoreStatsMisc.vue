<template>
	<section>
		<h4>Miscellaneous</h4>
		<table>
			<thead v-html="tableHeadCommon" />
			<tbody v-html="markupTableRows" />
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
			miscProps: {}
		}
	},
	computed: {
		markupTableRows () {
			let markup = ''

			for (const key in this.miscProps) {
				const prop = this.miscProps[key]

				if (prop.count > 0) {
					markup += `
						<tr>
							<th>${prop.name}</th>
							<td>${prop.count}</td>
							<td>${this.calculatePercentage(prop.count)}</td>
						</tr>
					`
				}
			}

			if (markup === '') {
				return this.tableBodyEmpty
			} else {
				return markup
			}
		}
	},
	created () {
		this.setUpMiscProps()
	},
	methods: {
		setUpMiscProps () {
			this.miscProps = {
				basicLand: new MiscProp('Basic land', matchesBasicLand),
				legendary: new MiscProp('Legendary', matchesLegendary),
				monocolored: new MiscProp('Monocolored', matchesMonocolored),
				multicolored: new MiscProp('Multicolored', matchesMulticolored),
				variableCost: new MiscProp('Variable cost', matchesVariableCost),
				variablePT: new MiscProp('Variable P/T', matchesVariablePT),
				doubleFaced: new MiscProp('Double-faced', matchesDoubleFaced)
			}

			this.deck.cards.forEach(card => {
				for (const key in this.miscProps) {
					const prop = this.miscProps[key]

					if (prop.matches(card)) {
						for (let i = 0; i < card.qty; i++) {
							prop.count++
						}
					}
				}
			})

			/**
			 * @param {string} name
			 * @param {Function} matches
			 */
			function MiscProp (name, matches) {
				this.name = name
				this.matches = matches
				this.count = 0
			}

			function matchesBasicLand (card) {
				const regex = /\bBasic (\w* )?Land\b/
				return regex.test(card.type)
			}
			function matchesLegendary (card) {
				const regex = /\bLegendary\b/
				return regex.test(card.type)
			}
			function matchesMonocolored (card) {
				return card.colors.length === 1
			}
			function matchesMulticolored (card) {
				return card.colors.length > 1
			}
			function matchesVariableCost (card) {
				const regex = /\{X\}/
				return regex.test(card.mana)
			}
			function matchesVariablePT (card) {
				return card.power === '*' || card.toughness === '*'
			}
			function matchesDoubleFaced (card) {
				const regex = /\w\s\/\s\w/
				return regex.test(card.name)
			}
		}
	}
}
</script>
