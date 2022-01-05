export default {
	methods: {
		determineDeckColors (deck) {
			let deckColors = deck.colors

			deckColors = [] // For older versions of deck data that lack the `colors` array.

			deck.cards.forEach(card => {
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

			// Remove the `multicolor` array item if it exists.
			if (deckColors.length >= 3) {
				deckColors = deckColors.filter(
					value => value !== 'multicolor'
				)
			}

			this.deck.colors = deckColors
			this.$store.commit('setDecks', this.$store.state.decks)
		},
		renderManaSymbols (deck) {
			let htmlOutput = ''
			const symbol = this.manaSymbol

			deck.colors.forEach(color => {
				switch (color) {
				case 'W':
					htmlOutput += symbol.w; break
				case 'U':
					htmlOutput += symbol.u; break
				case 'B':
					htmlOutput += symbol.b; break
				case 'R':
					htmlOutput += symbol.r; break
				case 'G':
					htmlOutput += symbol.g; break
				}
			})

			return htmlOutput
		},
		resizeManaSymbols (deck) {
			const className = 'resize-mana-symbols '

			switch (deck.colors.length) {
			case 1:
				return className + ' one-mana'
			case 2:
				return className + ' two-mana'
			case 3:
				return className + ' three-mana'
			case 4:
				return className + ' four-mana'
			case 5:
				return className + ' five-mana'
			default:
				return className
			}
		}
	}
}
