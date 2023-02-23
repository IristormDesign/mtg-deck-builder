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
				const cards = deck.cards

				switch (sortAttribute) {
				case 'colors':
					sortByColor(cards); break
				case 'type':
					sortByType(cards); break
				case 'subtype':
					sortBySubtype(cards); break
				case 'rarity':
					sortByRarity(cards); break
				case 'qty':
					sortByQuantity(cards); break
				default:
					sortByDefault(cards)
				}

				this.addSectionalGaps(deck, sortAttribute)
			})

			store.commit('setDecks', store.state.decks)

			function sortByColor (cards) {
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

				cards.sort((a, b) => {
					let colorA = colorOrder.indexOf(a.colors[0])
					let colorB = colorOrder.indexOf(b.colors[0])

					if (isColorlessLand(a)) colorA++
					if (isColorlessLand(b)) colorB++

					return colorA - colorB
				})
			}
			function sortByType (cards) {
				const typeOrder = ['creature', 'planeswalker', 'enchantment', 'artifact', 'sorcery', 'instant', 'other', 'land']

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

				cards.sort((a, b) => {
					const typeA = typeOrder.indexOf(determineType(a))
					const typeB = typeOrder.indexOf(determineType(b))

					return typeA - typeB
				})
			}
			function sortBySubtype (cards) {
				const regexSubtypeMarker = /\s—\s\w+/ // Finds ` — ` followed by at least one word

				// First, sort between cards with subtypes and cards without subtypes.
				cards.sort((a, b) => {
					const aHasSubtype = regexSubtypeMarker.test(a.type)
					const bHasSubtype = regexSubtypeMarker.test(b.type)

					return bHasSubtype - aHasSubtype
				})

				// Next, sort the cards with subtypes alphabetically by subtype.
				cards.sort((a, b) => {
					const subtypeA = a.type.match(regexSubtypeMarker)
					const subtypeB = b.type.match(regexSubtypeMarker)

					if (subtypeA < subtypeB) {
						return -1
					} else if (subtypeA > subtypeB) {
						return 1
					} else {
						return 0
					}
				})
			}
			function sortByRarity (cards) {
				const rarityOrder = ['mythic', 'rare', 'uncommon', 'common']

				cards.sort((a, b) => {
					const rarityA = rarityOrder.indexOf(a.rarity)
					const rarityB = rarityOrder.indexOf(b.rarity)

					return rarityA - rarityB
				})
			}
			function sortByQuantity (cards) {
				cards.sort((a, b) => {
					return b.qty - a.qty
				})
			}
			function sortByDefault (cards) { // For card name and mana value
				cards.sort((a, b) => {
					const cardA = a[sortAttribute]
					const cardB = b[sortAttribute]

					if (cardA < cardB) {
						return -1
					} else if (cardA > cardB) {
						return 1
					} else {
						return 0
					}
				})
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
