export default {
	computed: {
		analyzerFilter () {
			return this.$store.state.analyzerFilter
		}
	},
	methods: {
		activeFilterClass (category, attribute) {
			const filter = this.$store.state.analyzerFilter

			if (
				filter.category === category &&
				filter.attribute === attribute
			) {
				return 'filtering'
			}
		},
		handleRowClick (category, attribute) {
			const store = this.$store

			if (
				store.state.analyzerFilter.category === category &&
				store.state.analyzerFilter.attribute === attribute
			) {
				this.$store.commit('analyzerFilter', {
					category: null,
					attribute: null
				})
			} else {
				this.$store.commit('analyzerFilter', {
					category: category,
					attribute: attribute
				})
			}
		},
		filteredCards () {
			switch (this.analyzerFilter.category) {
				case 'colors':
					return this.filteredCardsByColorsOfSpells()
				case 'manaSymbols':
					return this.filteredCardsByManaSymbols()
				case 'manaValues':
					return this.filteredCardsByManaValues()
				case 'supertypes':
					return this.filteredCardsBySupertypes()
				case 'types':
					return this.filteredCardsByTypes()
				case 'creatureSubtypes':
				case 'otherSubtypes':
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
					return this.deck.cards
			}
		},
		filteredCardsByColorsOfSpells () {
			return this.deck.cards.filter(card => {
				const perFace = (type, colors) => {
					if (!type) return null

					if (/\bLand\b/.test(type)) {
						return null
					}

					if (!colors) return null

					const colorName = (colorCode) => {
						switch (colorCode) {
							case 'W': return 'White'
							case 'U': return 'Blue'
							case 'B': return 'Black'
							case 'R': return 'Red'
							case 'G': return 'Green'
						}
					}

					for (const color of colors) {
						if (this.analyzerFilter.attribute === colorName(color)) {
							return card
						}
					}

					switch (this.analyzerFilter.attribute) {
						case 'Colorless':
							if (colors.length < 1) {
								return card
							}
							break
						case 'Monocolored':
							if (colors.length === 1) {
								return card
							}
							break
						case 'Multicolored':
							if (colors.length > 1) {
								return card
							}
					}

					return null
				}

				const front = perFace(card.type, card.colors)
				const back = perFace(card.type2, card.colors2)

				return front || back
			})
		},
		filteredCardsByManaSymbols () {
			return this.deck.cards.filter(card => {
				const regexSymbols = this.$store.state.regex.manaSymbols

				for (const symbol in regexSymbols) {
					if (this.analyzerFilter.attribute === symbol) {
						if (card.mana.match(regexSymbols[symbol])) {
							return card
						} else if (
							card.mana2 &&
							card.mana2.match(regexSymbols[symbol])
						) {
							return card
						}
					}
				}

				return null
			})
		},
		filteredCardsByManaValues () {
			const regexVariableCost = /\{X\}/

			return this.deck.cards.filter(card => {
				switch (this.analyzerFilter.attribute) {
					case String(card.cmc):
						return card

					case 'variable':
						if (regexVariableCost.test(card.mana)) {
							return card
						} else if (
							card.mana2 &&
							regexVariableCost.test(card.mana2)
						) {
							return card
						}
				}

				return null
			})
		},
		filteredCardsBySupertypes () {
			return this.deck.cards.filter(card => {
				if (card.type.includes(`${this.analyzerFilter.attribute} `)) {
					return card
				} else if (
					card.type2 &&
					card.type2.includes(`${this.analyzerFilter.attribute} `)
				) {
					return card
				}

				return null
			})
		},
		filteredCardsByTypes () {
			return this.deck.cards.filter(card => {
				const regexTypes = this.$store.state.regex.cardTypes

				for (const type in regexTypes) {
					if (this.analyzerFilter.attribute === type) {
						if (card.type.match(regexTypes[type])) {
							return card
						} else if (
							card.type2 &&
							card.type2.match(regexTypes[type])
						) {
							return card
						}
					}
				}

				return null
			})
		},
		filteredCardsBySubtypes () {
			return this.deck.cards.filter(card => {
				if (card.type.includes(` ${this.analyzerFilter.attribute}`)) {
					return card
				} else if (
					card.type2 &&
					card.type2.includes(` ${this.analyzerFilter.attribute}`)
				) {
					return card
				}

				return null
			})
		},
		filteredCardsByRarities () {
			return this.deck.cards.filter(card => {
				const filter = this.analyzerFilter.attribute.toLowerCase()

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
					if (this.analyzerFilter.attribute === card.keywords[kw]) {
						return card
					}
				}

				return null
			})
		},
		filteredCardsByPowerToughness () {
			return this.deck.cards.filter(card => {
				if (
					this.analyzerFilter.attribute === 'variable' &&
					this.determineVariablePowerToughness(card) > 0
				) {
					return card
				}

				return null
			})
		},
		filteredCardsByLayouts () {
			return this.deck.cards.filter(card => {
				if (this.analyzerFilter.attribute === card.layout) {
					return card
				}

				return null
			})
		}
	}
}