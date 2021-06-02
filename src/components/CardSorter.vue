<template>
	<div class="card-sorter">
		<form>
			<fieldset :disabled="(deck.cards.length <= 1)">
				<label for="attributeSelect">Sort cards by:</label>
				<select v-model="sortAttribute" @change="sortCards()" id="attributeSelect">
					<option v-if="sortAttribute == ''" value="">
						(Select an attribute)
					</option>
					<option value="name">Name</option>
					<option value="colors">Mana Color</option>
					<option value="cmc">Mana Value</option>
					<option value="type">Type</option>
					<option value="subtype">Subtype</option>
					<option value="rarity">Rarity</option>
					<option value="qty">Quantity</option>
				</select>
			</fieldset>
		</form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			sortAttribute: this.$store.state.sortAttribute
		}
	},
	props: {
		deck: Object
	},
	methods: {
		sortCards () {
			const store = this.$store
			const sortAttribute = this.sortAttribute
			store.commit('setSortAttribute', sortAttribute)

			store.state.decks.forEach(deck => {
				deck.cards.sort((a, b) => {
					switch (sortAttribute) {
					case 'colors': return sortByColor(a, b)
					case 'type': return sortByType(a, b)
					case 'subtype': return sortBySubtype(a, b)
					case 'rarity': return sortByRarity(a, b)
					case 'qty': return sortByQuantity(a, b)
					default: return defaultSorting(a, b)
					}
				})

				addSectionalGaps(deck, sortAttribute)
			})

			store.commit('setDecks', store.state.decks)

			function addSectionalGaps (deck, sortAttribute) {
				function isCreature (string) {
					return RegExp(/\bCreature\b/).test(string)
				}
				function isPlaneswalker (string) {
					return RegExp(/\bPlaneswalker\b/).test(string)
				}
				function isEnchantment (string) {
					return RegExp(/\bEnchantment\b/).test(string)
				}
				function isArtifact (string) {
					return RegExp(/\bArtifact\b/).test(string)
				}
				function isSorcery (string) {
					return RegExp(/\bSorcery\b/).test(string)
				}
				function isInstant (string) {
					return RegExp(/\bInstant\b/).test(string)
				}
				function isLand (string) {
					return RegExp(/\bLand\b/).test(string)
				}

				for (let i = 0; i < deck.cards.length; i++) {
					const card = deck.cards[i]
					const nextCard = deck.cards[(i + 1)]

					card.gapAfter = false

					if (nextCard) {
						if (sortAttribute === 'cmc') {
							if (card.cmc < nextCard.cmc) {
								card.gapAfter = true
							}
						} else if (sortAttribute === 'type') {
							const regexFrontFaceType = (card) => {
								// If the card is double-faced, get only the type of its front face (any string up to a slash character).
								return card.type.match(RegExp(/[^/]*/))[0]
							}
							const cardType = regexFrontFaceType(card)
							const nextCardType = regexFrontFaceType(nextCard)

							if (isCreature(cardType)) {
								if (!isCreature(nextCardType)) {
									card.gapAfter = true
								}
							} else if (isPlaneswalker(cardType)) {
								if (!isPlaneswalker(nextCardType)) {
									card.gapAfter = true
								}
							} else if (isEnchantment(cardType)) {
								if (!isEnchantment(nextCardType)) {
									card.gapAfter = true
								}
							} else if (isArtifact(cardType)) {
								if (!isArtifact(nextCardType)) {
									card.gapAfter = true
								}
							} else if (isSorcery(cardType)) {
								if (!isSorcery(nextCardType)) {
									card.gapAfter = true
								}
							} else if (isInstant(cardType)) {
								if (!isInstant(nextCardType)) {
									card.gapAfter = true
								}
							} else if (isLand(cardType)) {
								if (!isLand(nextCardType)) {
									card.gapAfter = true
								}
							} else { // A card type other than any of the standard card types
								if (isCreature(nextCardType) || isPlaneswalker(nextCardType) || isEnchantment(nextCardType) || isArtifact(nextCardType) || isSorcery(nextCardType) || isInstant(nextCardType) || isLand(nextCardType)) {
									card.gapAfter = true
								}
							}
						} else if (sortAttribute === 'subtype') {
							const hasSubtype = (card) => {
								return RegExp(/\s—\s.*/).test(card.type)
							}

							if (hasSubtype(card) && !hasSubtype(nextCard)) {
								card.gapAfter = true
							}
						}
					} else { // The last card in the list (before any newly added cards)
						card.gapAfter = true
					}
				}
			}
			function sortByColor (a, b) {
				const colorOrder = [
					'W', 'U', 'B', 'R', 'G', 'multicolor',
					undefined // `undefined` means colorless
				]
				const colorA = colorOrder.indexOf(a.colors[0])
				const colorB = colorOrder.indexOf(b.colors[0])

				if (colorA < colorB) {
					return -1
				} else if (colorA > colorB) {
					return 1
				}
			}
			function sortByType (a, b) {
				const typeOrder = ['creature', 'planeswalker', 'enchantment', 'artifact', 'sorcery', 'instant', 'other', 'land']
				const typeA = typeOrder.indexOf(determineType(a))
				const typeB = typeOrder.indexOf(determineType(b))

				function determineType (card) {
					const cardType = card.type.match(RegExp(/[^/]*/))[0] // Front-face only.
					const regexCreature = RegExp(/\bCreature\b/)
					const regexPlaneswalker = RegExp(/\bPlaneswalker\b/)
					const regexEnchantment = RegExp(/\bEnchantment\b/)
					const regexArtifact = RegExp(/\bArtifact\b/)
					const regexSorcery = RegExp(/\bSorcery\b/)
					const regexInstant = RegExp(/\bInstant\b/)
					const regexLand = RegExp(/\bLand\b/)

					if (regexCreature.test(cardType)) return 'creature'
					else if (regexPlaneswalker.test(cardType)) return 'planeswalker'
					else if (regexEnchantment.test(cardType)) return 'enchantment'
					else if (regexArtifact.test(cardType)) return 'artifact'
					else if (regexSorcery.test(cardType)) return 'sorcery'
					else if (regexInstant.test(cardType)) return 'instant'
					else if (regexLand.test(cardType)) return 'land'
					else return 'other'
				}

				if (typeA < typeB) {
					return -1
				} else if (typeA > typeB) {
					return 1
				}
			}
			function sortBySubtype (a, b) {
				const regexSubtypeMarker = RegExp(/\s—\s\w+/) // Finds ` — ` followed by at least one word
				const subtypeA = a.type.match(regexSubtypeMarker)
				const subtypeB = b.type.match(regexSubtypeMarker)

				if (subtypeA < subtypeB || subtypeB === null) {
					return -1
				} else if (subtypeA > subtypeB || subtypeA === null) {
					return 1
				}
			}
			function sortByRarity (a, b) {
				const rarityOrder = ['mythic', 'rare', 'uncommon', 'common']
				const rarityA = rarityOrder.indexOf(a.rarity)
				const rarityB = rarityOrder.indexOf(b.rarity)

				if (rarityA < rarityB) {
					return -1
				} else if (rarityA > rarityB) {
					return 1
				}
			}
			function sortByQuantity (a, b) {
				if (a.qty < b.qty) {
					return 1
				} else if (a.qty > b.qty) {
					return -1
				}
			}
			function defaultSorting (a, b) { // For card name and CMC
				if (a[sortAttribute] < b[sortAttribute]) {
					return -1
				} else if (a[sortAttribute] > b[sortAttribute]) {
					return 1
				}
			}
		}
	},
	mounted () {
		// Using `$store.subscribe` seems to be the only way that gets the <select> element to change its value other than clicking its options.
		this.$store.subscribe((mutation) => {
			// `$store.subscribe` will activate when anything in the store is mutated; this `if` statement narrows down to the relevant type and payload.
			if (mutation.type === 'setSortAttribute' &&
				mutation.payload === '') {
				this.sortAttribute = mutation.payload
			}
		})
	}
}
</script>
