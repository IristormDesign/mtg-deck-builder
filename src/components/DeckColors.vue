<template>
	<section class="deck-info deck-colors">
		<h3>Using Colors</h3>

		<div
			class="output"
			:class="(lotsOfColors) ? 'four-or-more-colors' : null"
			v-html="getDeckColors()"></div>
	</section>
</template>

<script>
import { symbolsMarkup } from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [symbolsMarkup],
	props: {
		deck: Object
	},
	data () {
		return {
			lotsOfColors: false
		}
	},
	methods: {
		getDeckColors () {
			const deckColors = []

			this.deck.cards.forEach(card => {
				card.colors.forEach(color => {
					if (!deckColors.includes(color)) { // Don't repeat colors already counted.
						deckColors.push(color)
					}
				})
			})
			deckColors.sort((a, b) => {
				const colorOrder = ['W', 'U', 'B', 'R', 'G']
				const colorA = colorOrder.indexOf(a)
				const colorB = colorOrder.indexOf(b)

				if (colorA > colorB) return 1
				else if (colorA < colorB) return -1
			})

			let htmlOutput = ''

			if (deckColors.length === 0) {
				htmlOutput = '<span class="no-colors">0</span>'
			} else {
				const symbol = this.manaSymbol

				deckColors.forEach(color => {
					if (color === 'W') {
						htmlOutput += symbol.w
					} else if (color === 'U') {
						htmlOutput += symbol.u
					} else if (color === 'B') {
						htmlOutput += symbol.b
					} else if (color === 'R') {
						htmlOutput += symbol.r
					} else if (color === 'G') {
						htmlOutput += symbol.g
					}
				})

				if (deckColors.length >= 3) {
					const excludeMulticolorItem = deckColors.filter(
						value => value !== 'multicolor'
					)

					if (excludeMulticolorItem.length >= 4) {
						this.lotsOfColors = true
					} else {
						this.lotsOfColors = false
					}
				}
			}

			return htmlOutput
		}
	}
}
</script>
