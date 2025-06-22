export default {
	computed: {
		sortedManaSymbolsByTotals () {
			const counts = {
				W: 0,
				U: 0,
				B: 0,
				R: 0,
				G: 0
			}

			this.deck.cards.forEach(card => {
				const symbols = card.mana.match(/[WUBRG]/g) || []

				symbols.forEach(symbol => {
					counts[symbol] += card.qty
				})
			})

			const result = []

			for (const symbol in counts) {
				if (counts[symbol] === 0) continue

				result.push({
					symbol,
					count: counts[symbol]
				})
			}

			if (result.length === 0) {
				return [{
					symbol: 'C',
					count: 1
				}]
			} else {
				return result.sort((a, b) => b.count - a.count)
			}
		}
	},
	methods: {
		determineDeckColors () {
			this.deck.colors = this.sortedManaSymbolsByTotals
				.map(color => color.symbol)

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
						case 'C': return s.c
					}
				}

				return deck.colors.map(
					color => getSymbolHTML(color)
				).join('')
			} else {
				this.determineDeckColors()
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
				this.determineDeckColors()
			}
		}
	}
}
