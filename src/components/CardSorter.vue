<template>
	<div class="card-sorter">
		<form>
			<label for="attributeSelect">Sort cards by:</label>
			<select v-model="sortAttribute" @change="sortCards()" id="attributeSelect">
				<option v-if="sortAttribute == ''" value="">
					(Select an attribute)
				</option>
				<option value="name">Name</option>
				<option value="cmc">Converted mana cost</option>
				<option value="colors">Mana color</option>
				<option value="type">Type</option>
				<option value="subtype">Subtype</option>
				<option value="rarity">Rarity</option>
				<option value="qty">Quantity</option>
			</select>
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
			const attribute = this.sortAttribute
			store.commit('setSortAttribute', attribute)

			store.state.decks.forEach(deck => {
				deck.cards.sort((a, b) => {
					switch (attribute) {
					case 'colors': return sortByColor(a, b)
					case 'type': return sortByType(a, b)
					case 'subtype': return sortBySubtype(a, b)
					case 'rarity': return sortByRarity(a, b)
					case 'qty': return sortByQuantity(a, b)
					default: return defaultSorting(a, b)
					}
				})
			})
			store.commit('setDecks', store.state.decks)

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
				const typeA = typeOrder.indexOf(determineType(a.type))
				const typeB = typeOrder.indexOf(determineType(b.type))

				function determineType (card) {
					const regexCreature = RegExp(/\bCreature\b/)
					const regexPlaneswalker = RegExp(/\bPlaneswalker\b/)
					const regexEnchantment = RegExp(/\bEnchantment\b/)
					const regexArtifact = RegExp(/\bArtifact\b/)
					const regexSorcery = RegExp(/\bSorcery\b/)
					const regexInstant = RegExp(/\bInstant\b/)
					const regexLand = RegExp(/\bLand\b/)

					if (regexCreature.test(card)) return 'creature'
					else if (regexPlaneswalker.test(card)) return 'planeswalker'
					else if (regexEnchantment.test(card)) return 'enchantment'
					else if (regexArtifact.test(card)) return 'artifact'
					else if (regexSorcery.test(card)) return 'sorcery'
					else if (regexInstant.test(card)) return 'instant'
					else if (regexLand.test(card)) return 'land'
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
				if (a[attribute] < b[attribute]) {
					return -1
				} else if (a[attribute] > b[attribute]) {
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
