<template>
	<div class="card-sorter">
		<form>
			<fieldset :disabled="(deck.cards.length <= 1)">
				<label for="attributeSelect">Sort cards by:</label>
				<select v-model="sortAttribute" @change="sortCards()" id="attributeSelect">
					<option v-if="sortAttribute == ''" value="">
						(Select)
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
import cardListSectionalGaps from '@/mixins/cardListSectionalGaps.js'

export default {
	mixins: [cardListSectionalGaps],
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

				this.addSectionalGaps(deck, sortAttribute)
			})

			store.commit('setDecks', store.state.decks)

			function sortByColor (a, b) {
				function isColorlessLand (card) {
					const hasLandType = /\bLand\b/.test(card.type)
					const isColorless = !card.colors[0]

					return (hasLandType && isColorless)
				}
				const colorOrder = [
					'W', 'U', 'B', 'R', 'G',
					'multicolor',
					undefined // `undefined` means colorless
				]
				let colorA = colorOrder.indexOf(a.colors[0])
				let colorB = colorOrder.indexOf(b.colors[0])

				if (isColorlessLand(a)) colorA++
				if (isColorlessLand(b)) colorB++

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
					const cardType = card.type.match(/[^/]*/)[0] // Front-face only.
					const regexCreature = /\bCreature\b/
					const regexPlaneswalker = /\bPlaneswalker\b/
					const regexEnchantment = /\bEnchantment\b/
					const regexArtifact = /\bArtifact\b/
					const regexSorcery = /\bSorcery\b/
					const regexInstant = /\bInstant\b/
					const regexLand = /\bLand\b/

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
				const regexSubtypeMarker = /\s—\s\w+/ // Finds ` — ` followed by at least one word
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
			if (mutation.type === 'setSortAttribute' && mutation.payload === '') {
				this.sortAttribute = mutation.payload
			}
		})
	}
}
</script>
