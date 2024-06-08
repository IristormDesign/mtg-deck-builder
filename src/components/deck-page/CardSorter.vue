<template>
	<section class="card-sorter">
		<form>
			<fieldset
				:disabled="(deck.cards.length <= 1 && deck.sideboard.cards.length <= 1)"
			>
				<label for="sortMenu">Sort cards by:</label>
				<select
					v-model="sortMenu" id="sortMenu"
					@change="sortCards()"
				>
					<option
						v-if="sortMenu === ''"
						value=""
					>(None)</option>
					<option
						v-if="listHasStarredCard"
						value="starred">Starred
					</option>
					<option value="name">Name</option>
					<option value="color">Mana Color</option>
					<option value="cmc">Mana Value</option>
					<option value="supertype">Supertype</option>
					<option value="type">Type</option>
					<option value="subtype">Subtype</option>
					<option value="rarity">Rarity</option>
					<option value="pt-sum">P/T Sum</option>
					<option value="qty">Quantity</option>
				</select>
			</fieldset>
		</form>
	</section>
</template>

<script>
import sortingClusterGaps from '@/mixins/sortingClusterGaps.js'

export default {
	mixins: [sortingClusterGaps],
	props: {
		deck: Object
	},
	data () {
		return {
			sortMenu: this.deck.sortBy
		}
	},
	computed: {
		deckObject () {
			return this.deck
		},
		deckSortAttribute () {
			return this.deck.sortBy
		},
		listHasStarredCard () {
			const starredInMain = this.deck.cards.find(
				card => card.starred
			)

			if (starredInMain) {
				return true
			} else {
				return this.deck.sideboard.cards.find(
					card => card.starred
				)
			}
		}
	},
	watch: {
		deckSortAttribute (attribute) {
			// Make the card sorter menu change to the "(None)" value when the deck's sorting attribute has been automatically set to an empty string. (For example, that could occur when a card's quantity changes while the list has been sorted by quantity.)
			if (attribute === '') {
				this.sortMenu = attribute
			}
		}
	},
	created () {
		if (!this.sortMenu) {
			this.sortMenu = ''
		}
	},
	updated () {
		// When going from one deck page to another, the card sorter is to change to the current deck's sorting option, which may differ from the previous deck's.
		this.sortMenu = this.deck.sortBy
	},
	methods: {
		sortCards () {
			const sortMenu = this.sortMenu

			this.deckObject.sortBy = sortMenu

			const deck = this.deck
			const mainList = deck.cards
			const sbList = deck.sideboard.cards

			switch (sortMenu) {
				case 'starred':
					sortByStarred(mainList)
					sortByStarred(sbList)
					break
				case 'color':
					sortByColor(mainList)
					sortByColor(sbList)
					break
				case 'supertype':
					sortBySupertype(mainList)
					sortBySupertype(sbList)
					break
				case 'type':
					sortByType(mainList)
					sortByType(sbList)
					break
				case 'subtype':
					sortBySubtype(mainList)
					sortBySubtype(sbList)
					break
				case 'rarity':
					sortByRarity(mainList)
					sortByRarity(sbList)
					break
				case 'pt-sum':
					sortByPTSum(mainList)
					sortByPTSum(sbList)
					break
				case 'qty':
					sortByQuantity(mainList)
					sortByQuantity(sbList)
					break
				default:
					sortDefault(mainList)
					sortDefault(sbList)
			}

			this.addSortingClusterGaps(deck, sortMenu)
			this.$store.commit('decks', this.$store.state.decks)

			function sortByColor (cards) {
				function isColorlessLand (card) {
					const regexLand = /\bLand\b/

					return regexLand.test(card.type)
				}
				const colorOrder = ['W', 'U', 'B', 'R', 'G']

				cards.sort((a, b) => {
					if (a.colors.length === 0 && isColorlessLand(a)) {
						return 1
					} else if (b.colors.length === 0 && isColorlessLand(b)) {
						return -1
					} else if (a.colors.length === 0 && !isColorlessLand(a)) {
						return 1
					} else if (b.colors.length === 0 && !isColorlessLand(b)) {
						return -1
					} else if (a.colors.length > 1) {
						return 1
					} else if (b.colors.length > 1) {
						return -1
					} else {
						const colorA = colorOrder.indexOf(a.colors[0])
						const colorB = colorOrder.indexOf(b.colors[0])

						return colorA - colorB
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
			function sortByType (cards) {
				const typeOrder = ['creature', 'planeswalker', 'battle', 'enchantment', 'artifact', 'sorcery', 'instant', 'land', 'other']

				function determineType (card) {
					const cardType = card.type.match(/[^/]*/)[0] // Front-face only.
					const regexCreature = /\bCreature\b/
					const regexPlaneswalker = /\bPlaneswalker\b/
					const regexBattle = /\bBattle\b/
					const regexEnchantment = /\bEnchantment\b/
					const regexArtifact = /\bArtifact\b/
					const regexSorcery = /\bSorcery\b/
					const regexInstant = /\bInstant\b/
					const regexLand = /\bLand\b/

					if (regexCreature.test(cardType)) {
						return 'creature'
					} else if (regexPlaneswalker.test(cardType)) {
						return 'planeswalker'
					} else if (regexBattle.test(cardType)) {
						return 'battle'
					} else if (regexEnchantment.test(cardType)) {
						return 'enchantment'
					} else if (regexArtifact.test(cardType)) {
						return 'artifact'
					} else if (regexSorcery.test(cardType)) {
						return 'sorcery'
					} else if (regexInstant.test(cardType)) {
						return 'instant'
					} else if (regexLand.test(cardType)) {
						return 'land'
					} else {
						return 'other'
					}
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
			function sortByRarity (cards) {
				const rarityOrder = ['special', 'mythic', 'rare', 'uncommon', 'common', '']

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
			function sortByStarred (cards) {
				cards.sort((a, b) => {
					// Use a series of `if`/`else` statements for this sorting method, because the shorter subtraction sorting method doesn't always work properly if a `card` object lacks the `starred` property.
					if (b.starred) {
						return 1
					} else if (a.starred) {
						return -1
					} else {
						return 0
					}
				})
			}
			function sortDefault (cards) { // For card name and mana value
				cards.sort((a, b) => {
					const cardA = a[sortMenu]
					const cardB = b[sortMenu]

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
	}
}
</script>
