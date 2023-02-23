export default {
	methods: {
		determineDeckColors (deck) {
			let deckColors = []

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
				else return 0
			})

			// Remove the `multicolor` array item if it exists.
			if (deckColors.length >= 3) {
				deckColors = deckColors.filter(
					value => value !== 'multicolor'
				)
			}

			deck.colors = deckColors
			this.$store.commit('setDecks', this.$store.state.decks)
		},
		renderManaSymbols (deck) {
			if (deck.colors) {
				let html = ''
				const sym = this.manaSymbol

				deck.colors.forEach(color => {
					switch (color) {
						case 'W': html += sym.w; break
						case 'U': html += sym.u; break
						case 'B': html += sym.b; break
						case 'R': html += sym.r; break
						case 'G': html += sym.g; break
					}
				})

				return html
			} else {
				this.determineDeckColors(deck)
			}
		},
		resizeManaSymbols (deck) {
			if (deck.colors) {
				const className = 'resize-mana-symbols '

				switch (deck.colors.length) {
					case 1: return className + ' one-mana'
					case 2: return className + ' two-mana'
					case 3: return className + ' three-mana'
					case 4: return className + ' four-mana'
					case 5: return className + ' five-mana'
					default: return className
				}
			} else {
				this.determineDeckColors(deck)
			}
		}
	}
}
