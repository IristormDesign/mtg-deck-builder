export default {
	computed: {
		sortColorsByTotals () {
			const counts = {
				white: 0,
				blue: 0,
				black: 0,
				red: 0,
				green: 0
			}

			this.deck.cards.forEach(card => {
				if (card.mana !== '') { // Exclude land cards
					for (let i = 0; i < card.qty; i++) {
						card.colors.forEach(color => {
							switch (color) {
								case 'W': counts.white++; break
								case 'U': counts.blue++; break
								case 'B': counts.black++; break
								case 'R': counts.red++; break
								case 'G': counts.green++; break
							}
						})
					}
				}
			})

			const sortedColors = []

			for (const color in counts) {
				sortedColors.push([color, counts[color]])
			}

			sortedColors.sort((a, b) => {
				return b[1] - a[1]
			})

			return sortedColors
		}
	},
	methods: {
		determineDeckColors () {
			const output = []

			this.sortColorsByTotals.forEach(color => {
				if (color[1] > 0) {
					switch (color[0]) {
						case 'white':
							output.push('W'); break
						case 'blue':
							output.push('U'); break
						case 'black':
							output.push('B'); break
						case 'red':
							output.push('R'); break
						case 'green':
							output.push('G'); break
					}
				}
			})

			this.deck.colors = output
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
