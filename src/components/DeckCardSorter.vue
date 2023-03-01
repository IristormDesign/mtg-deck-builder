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
					<option value="supertype">Supertype</option>
					<option value="rarity">Rarity</option>
					<option value="pt-sum">P/T Sum</option>
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
					case 'supertype':
						sortBySupertype(cards); break
					case 'rarity':
						sortByRarity(cards); break
					case 'pt-sum':
						sortByPTSum(cards); break
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
				const typeOrder = ['creature', 'planeswalker', 'enchantment', 'artifact', 'sorcery', 'instant', 'land', 'other']

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
				const regexSubtype = / — \w/ // Finds ` — ` followed by a word.

				// First, sort between cards with subtypes and cards without subtypes.
				cards.sort((a, b) => {
					const aHasSubtype = regexSubtype.test(a.type)
					const bHasSubtype = regexSubtype.test(b.type)

					return bHasSubtype - aHasSubtype
				})

				// Next, sort the cards with subtypes alphabetically by subtype.
				cards.sort((a, b) => {
					const subtypeA = a.type.match(regexSubtype)
					const subtypeB = b.type.match(regexSubtype)

					if (subtypeA < subtypeB) {
						return -1
					} else if (subtypeA > subtypeB) {
						return 1
					} else {
						return 0
					}
				})
			}
			function sortBySupertype (cards) {
				const regexSupertype = /^\b(Basic|Elite|Legendary|Ongoing|Snow|Token|World)\b \w/ // Finds a string beginning with certain supertype terms such as "Legendary" followed by a space and any word.

				// First, sort between cards with supertypes and cards without supertypes.
				cards.sort((a, b) => {
					const aHasSupertype = regexSupertype.test(a.type)
					const bHasSupertype = regexSupertype.test(b.type)

					return bHasSupertype - aHasSupertype
				})

				// Next, sort the cards with supertypes alphabetically by supertype.
				cards.sort((a, b) => {
					const supertypeA = a.type.match(regexSupertype)
					const supertypeB = b.type.match(regexSupertype)

					if (supertypeA < supertypeB) {
						return -1
					} else if (supertypeA > supertypeB) {
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
			function sortByPTSum (cards) {
				// First, sort between cards that have the power attribute and cards that don't.
				cards.sort((a, b) => {
					if (a.power !== undefined) {
						return -1
					} else if (b.power === undefined) {
						return 1
					} else {
						return 0
					}
				})

				// Next, sort the cards by their P/T sum.
				cards.sort((a, b) => {
					let cardAPower = a.power
					let cardBPower = b.power
					let cardATough = a.toughness
					let cardBTough = b.toughness

					if (isNaN(cardAPower)) {
						cardAPower = 0
					} else {
						cardAPower = Number(cardAPower)
					}
					if (isNaN(cardBPower)) {
						cardBPower = 0
					} else {
						cardBPower = Number(cardBPower)
					}
					if (isNaN(cardATough)) {
						cardATough = 0
					} else {
						cardATough = Number(cardATough)
					}
					if (isNaN(cardBTough)) {
						cardBTough = 0
					} else {
						cardBTough = Number(cardBTough)
					}

					const cardASum = cardAPower + cardATough
					const cardBSum = cardBPower + cardBTough

					if (cardASum < cardBSum) {
						return 1
					} else if (cardASum > cardBSum) {
						return -1
					} else { // If cards A and B have equal P/T sums, then sort them by power alone.
						return cardBPower - cardAPower
					}
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
