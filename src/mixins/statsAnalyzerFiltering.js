import doubleFacedCards from '@/mixins/doubleFacedCards'

export default {
	mixins: [doubleFacedCards],
	computed: {
		analyzerFilter () {
			return this.$store.state.analyzerFilter
		}
	},
	methods: {
		checkForMatchingAttribute (filterAttr, clickedAttr) {
			function objectAttr (value) {
				return (
					filterAttr[value] !== undefined &&
					Number(filterAttr[value]) === Number(clickedAttr[value])
				)
			}

			return (
				filterAttr === clickedAttr ||
				objectAttr('greatestPower') ||
				objectAttr('greatestToughness') ||
				objectAttr('medianPower') ||
				objectAttr('medianToughness') ||
				objectAttr('leastPower') ||
				objectAttr('leastToughness')
			)
		},
		activeFilterClass (category, attribute) {
			const filter = this.$store.state.analyzerFilter

			if (filter.category !== category) return

			if (this.checkForMatchingAttribute(
				filter.attribute, attribute
			)) {
				return 'filtering'
			}
		},
		handleRowClick (category, attribute, extraAttribute) {
			const store = this.$store

			if (
				store.state.analyzerFilter.category === category &&
				this.checkForMatchingAttribute(
					store.state.analyzerFilter.attribute, attribute
				)
			) {
				store.commit('analyzerFilter', {
					category: null,
					attribute: null,
					extraAttribute: null
				})
			} else {
				store.commit('analyzerFilter', {
					category, attribute, extraAttribute
				})
			}
		},
		filteredCards () {
			switch (this.analyzerFilter.category) {
				case 'names':
					return this.filteredCardsByNames()
				case 'colors':
					return this.filteredCardsByColorsOfSpells()
				case 'manaSymbols':
					return this.filteredCardsByManaSymbols()
				case 'manaValues':
					return this.filteredCardsByManaValues()
				case 'producibleMana':
					return this.filteredCardsByProducibleMana()
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
				case 'starred':
					return this.filteredCardsByStarred()
				default:
					return this.deck.cards
			}
		},
		filteredCardsByNames () {
			return this.deck.cards.filter(card => {
				return this.fullCardName(card) === this.analyzerFilter.attribute
			})
		},
		filteredCardsByColorsOfSpells () {
			const perFace = (faceType, faceColors) => {
				if (!faceType || !faceColors) return
				if (/\bLand\b/.test(faceType)) return

				const colorName = (colorCode) => {
					switch (colorCode) {
						case 'W': return 'White'
						case 'U': return 'Blue'
						case 'B': return 'Black'
						case 'R': return 'Red'
						case 'G': return 'Green'
					}
				}

				for (const color of faceColors) {
					if (this.analyzerFilter.attribute === colorName(color)) {
						return true
					}
				}

				switch (this.analyzerFilter.attribute) {
					case 'Colorless':
						if (faceColors.length < 1) {
							return true
						}
						break
					case 'Monocolored':
						if (faceColors.length === 1) {
							return true
						}
						break
					case 'Multicolored':
						if (faceColors.length > 1) {
							return true
						}
				}

				return false
			}

			return this.deck.cards.filter(card => {
				const front = perFace(card.type, card.colors)
				const back = perFace(card.type2, card.colors2)

				if (front || back) {
					return card
				} else {
					return null
				}
			})
		},
		filteredCardsByManaSymbols () {
			return this.deck.cards.filter(card => {
				const regexSymbols = this.regexManaSymbols

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
				const perFace = (faceType, faceMana) => {
					if (!faceType || !faceMana) return
					if (/\bLand\b/.test(faceType)) return

					switch (this.analyzerFilter.attribute) {
						case String(card.cmc):
							return true
						case 'variable':
							return regexVariableCost.test(faceMana)
					}
				}
				const front = perFace(card.type, card.mana)
				const back = perFace(card.type2, card.mana2)

				if (front || back) {
					return card
				} else {
					return null
				}
			})
		},
		filteredCardsByProducibleMana () {
			const filteredColor = this.analyzerFilter.attribute

			return this.deck.cards.filter(card => {
				return card.prodMana?.includes(filteredColor)
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
			const regexTypes = this.regexCardTypes

			const perFace = (faceType) => {
				if (!faceType) return

				switch (this.analyzerFilter.attribute) {
					case 'Other':
						for (const type in regexTypes) {
							if (faceType.match(regexTypes[type])) {
								return false
							}
						}
						return true

					default:
						for (const type in regexTypes) {
							if (
								this.analyzerFilter.attribute === type &&
								faceType.match(regexTypes[type])
							) {
								return true
							}
						}
						return false
				}
			}

			return this.deck.cards.filter(card => {
				const front = perFace(card.type)
				const back = perFace(card.type2)

				if (front || back) {
					return card
				} else {
					return null
				}
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
				const rarityLetters = ['c', 'u', 'r', 'm', 's', 'b']
				const cardRarityFirstLetter = card.rarity.charAt(0)

				for (const letter of rarityLetters) {
					if (
						filter.charAt(0) === letter &&
						cardRarityFirstLetter === letter
					) {
						return card
					}
				}

				if (filter === 'other') {
					if (rarityLetters.includes(cardRarityFirstLetter)) {
						return null
					} else {
						return card
					}
				}

				return null
			})
		},
		filteredCardsByKeywords () {
			return this.deck.cards.filter(card => {
				if (!card.keywords) return null

				for (const kw in card.keywords) {
					if (this.analyzerFilter.attribute === card.keywords[kw]) {
						return card
					}
				}

				return null
			})
		},
		filteredCardsByPowerToughness () {
			const filterForPTValue = (ptValue, adjectivePTLabel) => {
				if (ptValue === undefined) return

				const filteredAttr = Number(this.analyzerFilter.attribute[adjectivePTLabel])

				if (isNaN(filteredAttr)) return

				ptValue = Number(ptValue)

				if (Number.isInteger(filteredAttr)) {
					return filteredAttr === ptValue
				} else {
					return (
						Math.floor(filteredAttr) === ptValue ||
						Math.ceil(filteredAttr) === ptValue ||
						filteredAttr === ptValue // This last condition checks for the quirky half-value power/toughness attributes ("Little Girl"), but otherwise wouldn't be needed here.
					)
				}
			}

			return this.deck.cards.filter(card => {
				const perFace = (facePowerLabel, faceToughnessLabel) => {
					switch (this.analyzerFilter.attribute) {
						case 'variable':
							return this.determineVariablePowerToughness(card) > 0

						default:
							return (
								filterForPTValue(card[facePowerLabel], 'greatestPower') ||
								filterForPTValue(card[faceToughnessLabel], 'greatestToughness') ||
								filterForPTValue(card[facePowerLabel], 'medianPower') ||
								filterForPTValue(card[faceToughnessLabel], 'medianToughness') ||
								filterForPTValue(card[facePowerLabel], 'leastPower') ||
								filterForPTValue(card[faceToughnessLabel], 'leastToughness')
							)
					}
				}

				const front = perFace('power', 'toughness')
				const back = perFace('power2', 'toughness2')

				if (front || back) {
					return card
				} else {
					return null
				}
			})
		},
		filteredCardsByLayouts () {
			return this.deck.cards.filter(card => {
				if (
					this.analyzerFilter.attribute === 'normal' &&
					!card.layout
				) {
					return card
				} else if (this.analyzerFilter.attribute === card.layout) {
					return card
				}

				return null
			})
		},
		filteredCardsByStarred () {
			return this.deck.cards.filter(card => {
				if (
					this.analyzerFilter.attribute === 'Starred' &&
					card.starred
				) {
					return card
				} else if (
					this.analyzerFilter.attribute === 'Un-starred' &&
					!card.starred
				) {
					return card
				}

				return null
			})
		}
	}
}
