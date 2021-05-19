<template>
	<section class="deck-info deck-colors">
		<h3>Using Colors</h3>

		<div class="output" v-html="deckColors()"></div>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	methods: {
		deckColors () {
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
			const symbol = this.$store.state.manaSymbol

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

			if (htmlOutput === '') {
				htmlOutput = '<span class="no-colors">0</span>'
			}

			return htmlOutput
		}
	}
}
</script>
