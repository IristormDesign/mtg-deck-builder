export default {
	computed: {
		sortedManaSymbols () {
			const colorCounts = {
				W: 0,
				U: 0,
				B: 0,
				R: 0,
				G: 0
			}

			this.deck.cards.forEach(({ colors, qty }) => {
				colors.forEach(color => {
					switch (color) {
						case 'W':
							colorCounts.W += qty
							break
						case 'U':
							colorCounts.U += qty
							break
						case 'B':
							colorCounts.B += qty
							break
						case 'R':
							colorCounts.R += qty
							break
						case 'G':
							colorCounts.G += qty
					}
				})
			})

			const symbolCounts = {
				W: 0,
				U: 0,
				B: 0,
				R: 0,
				G: 0
			}

			this.deck.cards.forEach(card => {
				const matchedSymbols = card.mana.match(/[WUBRG]/g) || []

				matchedSymbols.forEach(symbol => {
					symbolCounts[symbol] += card.qty
				})
			})

			const combinedCounts = {
				W: colorCounts.W + symbolCounts.W,
				U: colorCounts.U + symbolCounts.U,
				B: colorCounts.B + symbolCounts.B,
				R: colorCounts.R + symbolCounts.R,
				G: colorCounts.G + symbolCounts.G
			}

			const result = []

			for (const count in combinedCounts) {
				if (combinedCounts[count] === 0) continue

				result.push({
					symbol: count,
					count: combinedCounts[count]
				})
			}

			return result.sort((a, b) => b.count - a.count)
		}
	},
	methods: {
		determineDeckColors () {
			this.deck.colors = this.sortedManaSymbols
				.map(color => color.symbol)

			this.$store.commit('decks', this.$store.state.decks)
		},
		renderManaSymbols (deck) {
			if (deck.colors) {
				const sym = this.manaSymbol

				if (deck.colors.length > 0) {
					const getSymbolHTML = (color) => {
						switch (color) {
							case 'W': return sym.w
							case 'U': return sym.u
							case 'B': return sym.b
							case 'R': return sym.r
							case 'G': return sym.g
						}
					}

					return deck.colors.map(
						color => getSymbolHTML(color)
					).join('')
				} else {
					return sym.c
				}
			} else {
				this.determineDeckColors()
			}
		},
		sizeManaSymbols (deck) {
			if (deck.colors) {
				const getClassName = () => {
					switch (deck.colors.length) {
						case 0: return 'one' // For colorless mana symbol
						case 1: return 'one'
						case 2: return 'two'
						case 3: return 'three'
						case 4: return 'four'
						case 5: return 'five'
					}
				}

				return 'size-mana-symbols ' + getClassName()
			} else {
				this.determineDeckColors()
			}
		}
	}
}
