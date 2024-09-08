export default {
	computed: {
		analyzerFilter () {
			return this.$store.state.analyzerFilter
		}
	},
	methods: {
		filteredCards () {
			if (this.analyzerFilter) {
				switch (this.analyzerFilter[0]) {
					case 'colors':
						return this.filteredCardsByColorOfSpells()
					case 'colorSymbols':
						return this.filteredCardsByColorSymbols()
					case 'supertypes':
						return this.filteredCardsBySupertype()
					default:
						return null
				}
			} else {
				return this.deck.cards
			}
		},
		filterFromTableRow (table, selectedRow) {
			const rowRef = (row) => { // Inconsistently, `$refs` may return either an array of elements (even if it contains only one element) or an element directly.
				const ref = this.$refs[`${table}-${row}`]

				return ref[0] || ref
			}

			const rowClassList = rowRef(selectedRow).classList
			const store = this.$store

			if (
				store.state.analyzerFilter &&
				store.state.analyzerFilter[1] === selectedRow
			) { // If the user has clicked on the same table row that's currently filtering...
				store.commit('analyzerFilter', null)

				rowClassList.remove('filtering')
			} else { // Else the user has clicked on a different table row.
				const prevFilter = store.state.analyzerFilter

				if (
					prevFilter &&
					prevFilter[0] === table
				) {
					const prevSelectedRow = prevFilter[1]

					rowRef(prevSelectedRow).classList.remove('filtering')
				}

				store.commit('analyzerFilter', [table, selectedRow])

				rowClassList.add('filtering')
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
