export default {
	computed: {
		analyzerFilter () {
			return this.$store.state.analyzerFilter
		}
	},
	methods: {
		activeFilterClass (category, attribute) {
			const filter = this.$store.state.analyzerFilter

			if (!filter) return

			if (
				filter[0] === category &&
				filter[1] === attribute
			) {
				return 'filtering'
			}
		},
		handleRowClick (category, attribute) {
			const store = this.$store

			if (
				store.state.analyzerFilter &&
				store.state.analyzerFilter[1] === attribute
			) {
				store.commit('analyzerFilter', null)
			} else {
				store.commit('analyzerFilter', [category, attribute])
			}
		},
		filteredCards () {
			if (this.analyzerFilter) {
				switch (this.analyzerFilter[0]) {
					case 'colors':
						return this.filteredCardsByColorOfSpells()
					case 'colorSymbols':
						return this.filteredCardsByColorSymbols()
					case 'manaValues':
						return this.filteredCardsByManaValues()
					case 'supertypes':
						return this.filteredCardsBySupertype()
					default:
						return null
				}
			} else {
				return this.deck.cards
			}
		},
		filteredCardsByColorOfSpells () {
			return this.deck.cards.filter(card => {
				if (/\bLand\b/.test(card.type)) {
					return null
				}

				const colorName = (colorCode) => {
					switch (colorCode) {
						case 'W': return 'White'
						case 'U': return 'Blue'
						case 'B': return 'Black'
						case 'R': return 'Red'
						case 'G': return 'Green'
					}
				}

				for (const color of card.colors) {
					if (this.analyzerFilter[1] === colorName(color)) {
						return card
					}
				}

				const length = card.colors.length

				switch (this.analyzerFilter[1]) {
					case 'Monocolored':
						if (length === 1) {
							return card
						}
						break
					case 'Multicolored':
						if (length > 1) {
							return card
						}
						break
					case 'Colorless':
						if (length < 1) {
							return card
						}
				}

				return null
			})
		},
		filteredCardsByManaValues () {
			return this.deck.cards.filter(card => {
				console.log(card.cmc, this.analyzerFilter[1])

				if (String(card.cmc) === this.analyzerFilter[1]) {
					return card
				} else {
					return null
				}
			})
		},
		filteredCardsBySupertype () {
			return this.deck.cards.filter(card => {
				const supertypeString = card.type + ' '

				if (supertypeString.includes(this.analyzerFilter[1])) {
					return card
				} else {
					return null
				}
			})
		},
		filteredCardsByColorSymbols () {
			return this.deck.cards.filter(card => {
				const regexSymbols = this.$store.state.regex.manaSymbols

				for (const symbol in regexSymbols) {
					if (
						this.analyzerFilter[1] === symbol &&
						card.mana.match(regexSymbols[symbol])
					) {
						return card
					}
				}

				return null
			})
		}
	}
}
