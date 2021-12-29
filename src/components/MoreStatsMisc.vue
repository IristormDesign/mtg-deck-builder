<template>
	<section>
		<h4>Miscellaneous</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody v-html="markupTableRows([
				'Basic land', 'Legendary', 'Monocolored', 'Multicolored', 'Double-faced'
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
				this.countMisc('monocolored') === 0 &&
				this.countMisc('multicolored') === 0 &&
				this.countMisc('basic land') === 0 &&
				this.countMisc('legendary') === 0 &&
				this.countMisc('double-faced') === 0
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
		countMisc (givenValue) {
			const counts = {
				monocolored: 0,
				multicolored: 0,
				basicLand: 0,
				legendary: 0,
				doubleFaced: 0
			}
			const regexBasicLand = RegExp(/\bBasic (\w* )?Land\b/)
			const regexLegendary = RegExp(/\bLegendary\b/)
			const regexDoubleFaced = RegExp(/\w\s\/\s\w/)

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (card.colors.length === 1) {
						counts.monocolored++
					}
					if (card.colors[0] === 'multicolor') {
						counts.multicolored++
					}
					if (regexBasicLand.test(card.type)) {
						counts.basicLand++
					}
					if (regexLegendary.test(card.type)) {
						counts.legendary++
					}
					if (regexDoubleFaced.test(card.name)) {
						counts.doubleFaced++
					}
				}
			})

			switch (givenValue) {
			case 'monocolored':
				return counts.monocolored
			case 'multicolored':
				return counts.multicolored
			case 'basic land':
				return counts.basicLand
			case 'legendary':
				return counts.legendary
			case 'double-faced':
				return counts.doubleFaced
			}
		}
	}
}
</script>
