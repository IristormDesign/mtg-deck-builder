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
						return this.filteredCardsByColorsOfSpells()
					case 'colorSymbols':
						return this.filteredCardsByColorSymbols()
					case 'manaValues':
						return this.filteredCardsByManaValues()
					case 'supertypes':
						return this.filteredCardsBySupertypes()
					case 'types':
						return this.filteredCardsByTypes()
					case 'subtypes':
						return this.filteredCardsBySubtypes()
					case 'rarities':
						return this.filteredCardsByRarities()
					case 'keywords':
						return this.filteredCardsByKeywords()
					case 'powerToughness':
						return this.filteredCardsByPowerToughness()
					case 'layouts':
						return this.filteredCardsByLayouts()
					default:
						return null
				}
			} else {
				return this.deck.cards
			}
		},
		filteredCardsByColorsOfSpells () {
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
		},
		filteredCardsByManaValues () {
			const regexVariableCost = /\{X\}/

			return this.deck.cards.filter(card => {
				if (this.analyzerFilter[1] === String(card.cmc)) {
					return card
				} else if (
					this.analyzerFilter[1] === 'variable' &&
					regexVariableCost.test(card.mana)
				) {
					return card
				}

				return null
			})
		},
		filteredCardsBySupertypes () {
			return this.deck.cards.filter(card => {
				if (card.type.includes(`${this.analyzerFilter[1]} `)) {
					return card
				}

				return null
			})
		},
		filteredCardsByTypes () {
			return this.deck.cards.filter(card => {
				const regexTypes = this.$store.state.regex.cardTypes

				for (const type in regexTypes) {
					if (
						this.analyzerFilter[1] === type &&
						card.type.match(regexTypes[type])
					) {
						return card
					}
				}

				return null
			})
		},
		filteredCardsBySubtypes () {
			return this.deck.cards.filter(card => {
				if (card.type.includes(` ${this.analyzerFilter[1]}`)) {
					return card
				}

				return null
			})
		},
		filteredCardsByRarities () {
			return this.deck.cards.filter(card => {
				const filter = this.analyzerFilter[1].toLowerCase()

				if (filter === card.rarity) {
					return card
				} else if (
					filter === 'mythic rare' &&
					card.rarity === 'mythic'
				) {
					return card
				} else if (filter === 'other') {
					switch (card.rarity) {
						case 'common':
						case 'uncommon':
						case 'rare':
						case 'mythic':
						case 'special':
							return null
						default:
							return card
					}
				}

				return null
			})
		},
		filteredCardsByKeywords () {
			return this.deck.cards.filter(card => {
				for (const kw in card.keywords) {
					if (this.analyzerFilter[1] === card.keywords[kw]) {
						return card
					}
				}

				return null
			})
		},
		filteredCardsByPowerToughness () {
			return this.deck.cards.filter(card => {
				if (
					this.analyzerFilter[1] === 'variable' &&
					this.determineVariablePowerToughness(card) > 0
				) {
					return card
				}

				return null
			})
		},
		filteredCardsByLayouts () {
			return this.deck.cards.filter(card => {
				if (this.analyzerFilter[1] === card.layout) {
					return card
				}

				return null
			})
		}
	}
}
