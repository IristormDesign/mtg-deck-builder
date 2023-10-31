export default {
	methods: {
		determineDeckColors (deck) {
			const deckColors = []

			deck.cards.forEach(card => {
				card.colors.forEach(color => {
					if (!deckColors.includes(color)) { // Don't repeat colors already counted.
						if (color !== 'multicolor') { // Ignore the obsoleted array item `multicolor`, which may exist from older versions of deck data.
							deckColors.push(color)
						}
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

			deck.colors = deckColors
			this.$store.commit('decks', this.$store.state.decks)
		},
		renderManaSymbols (deck) {
			if (deck.colors) {
				const getSymbolHTML = (color) => {
					const s = this.manaSymbol

					switch (color) {
						case 'W': return s.w
						case 'U': return s.u
						case 'B': return s.b
						case 'R': return s.r
						case 'G': return s.g
					}
				}

				let output = ''

				deck.colors.forEach(color => {
					output += getSymbolHTML(color)
				})

				return output
			} else {
				this.determineDeckColors(deck)
			}
		},
		sizeManaSymbols (deck) {
			if (deck.colors) {
				const getClassName = () => {
					switch (deck.colors.length) {
						case 1: return 'one'
						case 2: return 'two'
						case 3: return 'three'
						case 4: return 'four'
						case 5: return 'five'
					}
				}

				return 'size-mana-symbols ' + getClassName()
			} else {
				this.determineDeckColors(deck)
			}
		}
	}
}
