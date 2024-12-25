<template>
	<section class="card-sorter">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M145.39-490.54q0 87.23 61.34 145.73 61.35 58.5 147.58 57.73H377l-68.69-70.69 31.61-32 121.77 124.38L338.08-140l-32-32 67.08-70.08h-22.7q-103.46.77-176.96-71.31Q100-385.46 100-490.54 100-593 170.27-666.5 240.54-740 341-740h138.54v45.39H341q-82 0-138.81 59.73-56.8 59.73-56.8 144.34Zm425.07 248.46v-45.38H860v45.38H570.46Zm0-225.77v-46.38H860v46.38H570.46Zm-17.84-226.76V-740H860v45.39H552.62Z"/></svg>
		<form>
			<fieldset
				:disabled="(deck.cards.length <= 1 && deck.sideboard.cards.length <= 1)"
			>
				<label class="section-label" for="sortMenu">Sort cards by:</label>
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
					<option value="color">Mana color</option>
					<option value="cmc">Mana value</option>
					<option value="supertype">Supertype</option>
					<option value="type">Type</option>
					<option value="firstSubtype">First subtype</option>
					<option value="lastSubtype">Last subtype</option>
					<option value="rarity">Rarity</option>
					<option value="pt-sum">P/T sum</option>
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
			/* Make the card sorter menu change to the "(None)" value when the deck's sorting attribute has been automatically set to an empty string. (For example, that could occur when a card's quantity changes while the list has been sorted by quantity.) */
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
		/* When going from one deck page to another, the card sorter is to change to the current deck's sorting option, which may differ from the previous deck's. */
		this.sortMenu = this.deck.sortBy
	},
	methods: {
		sortCards () {
			this.deckObject.sortBy = this.sortMenu

			const mainList = this.deck.cards
			const sbList = this.deck.sideboard.cards

			switch (this.sortMenu) {
				case 'starred':
					this.sortByStarred(mainList)
					this.sortByStarred(sbList)
					break
				case 'color':
					this.sortByColor(mainList)
					this.sortByColor(sbList)
					break
				case 'cmc':
					this.sortByManaValue(mainList)
					this.sortByManaValue(sbList)
					break
				case 'supertype':
					this.sortBySupertype(mainList)
					this.sortBySupertype(sbList)
					break
				case 'type':
					this.sortByType(mainList)
					this.sortByType(sbList)
					break
				case 'firstSubtype':
					this.sortByFirstSubtype(mainList)
					this.sortByFirstSubtype(sbList)
					break
				case 'lastSubtype':
					this.sortByLastSubtype(mainList)
					this.sortByLastSubtype(sbList)
					break
				case 'rarity':
					this.sortByRarity(mainList)
					this.sortByRarity(sbList)
					break
				case 'pt-sum':
					this.sortByPTSum(mainList)
					this.sortByPTSum(sbList)
					break
				case 'qty':
					this.sortByQuantity(mainList)
					this.sortByQuantity(sbList)
					break
				default:
					this.sortDefault(mainList)
					this.sortDefault(sbList)
			}

			this.addSortingClusterGaps(this.deck, this.sortMenu)
			this.$store.commit('decks', this.$store.state.decks)
		},
		sortByColor (cards) {
			const colorOrder = ['W', 'U', 'B', 'R', 'G']

			cards.sort((a, b) => {
				if (a.colors.length === 0) {
					return 1
				} else if (b.colors.length === 0) {
					return -1
				} else if (a.colors.length >= 2) {
					return 1
				} else if (b.colors.length >= 2) {
					return -1
				} else {
					const colorA = colorOrder.indexOf(a.colors[0])
					const colorB = colorOrder.indexOf(b.colors[0])

					return colorA - colorB
				}
			})
			cards.sort((a, b) => {
				if (a.colors.length === 0) {
					if (
						this.isLand(a.type) &&
						!this.isLand(b.type)
					) {
						return 1
					} else if (
						!this.isLand(a.type) &&
						this.isLand(b.type)
					) {
						return -1
					}
				}
				return 0
			})
		},
		sortByManaValue (cards) {
			cards.sort((a, b) => {
				const aIsLand = this.isLand(a.type)
				const bIsLand = this.isLand(b.type)

				if (aIsLand && !bIsLand) {
					return -1
				} else if (!aIsLand && bIsLand) {
					return 1
				} else {
					return a.cmc - b.cmc
				}
			})
		},
		sortBySupertype (cards) {
			const regexSupertype = /^\b(?:Basic|Elite|Host|Legendary|Ongoing|Snow|Token|World)\b/ // Finds a string that begins with a supertype term.

			/* First, sort between cards with supertypes and cards without supertypes. */
			cards.sort((a, b) => {
				const aHasSupertype = regexSupertype.test(a.type)
				const bHasSupertype = regexSupertype.test(b.type)

				return bHasSupertype - aHasSupertype
			})

			/* Next, sort the cards with supertypes alphabetically by supertype. */
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
		},
		sortByType (cards) {
			const typeOrder = ['creature', 'planeswalker', 'battle', 'enchantment', 'artifact', 'sorcery', 'instant', 'land', 'other']

			const determineType = (card) => {
				const cardType = card.type.match(/[^/]*/)[0] // Front-face only.
				const regexCreature = /\bCreature\b/
				const regexPlaneswalker = /\bPlaneswalker\b/
				const regexBattle = /\bBattle\b/
				const regexEnchantment = /\bEnchantment\b/
				const regexArtifact = /\bArtifact\b/
				const regexSorcery = /\bSorcery\b/
				const regexInstant = /\bInstant\b/

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
				} else if (this.isLand(cardType)) {
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
		},
		sortByFirstSubtype (cards) {
			const regexFirstSubtype = /— \w+/ // Finds `— ` immediately followed by a word.

			/* First, sort between cards with subtypes and cards without subtypes. */
			cards.sort((a, b) => {
				const aHasSubtype = regexFirstSubtype.test(a.type)
				const bHasSubtype = regexFirstSubtype.test(b.type)

				return bHasSubtype - aHasSubtype
			})

			/* Next, sort the cards with subtypes alphabetically by subtype. */
			cards.sort((a, b) => {
				const subtypeA = a.type.match(regexFirstSubtype)
				const subtypeB = b.type.match(regexFirstSubtype)

				if (subtypeA < subtypeB) {
					return -1
				} else if (subtypeA > subtypeB) {
					return 1
				} else {
					return 0
				}
			})
		},
		sortByLastSubtype (cards) {
			const regexLastSubtype = /— (?:\w+ )*(\w+)$/ // Find a substring starting with an em dash between spaces, followed by zero or more words, and the whole string must end with a word. The final word is captured.

			/* First, sort between cards with subtypes and cards without subtypes. */
			cards.sort((a, b) => {
				const aHasSubtype = regexLastSubtype.test(a.type)
				const bHasSubtype = regexLastSubtype.test(b.type)

				return bHasSubtype - aHasSubtype
			})

			/* Next, sort the cards with subtypes alphabetically by subtype. */
			function lastSubtype (typeLine) {
				if (typeLine.match(regexLastSubtype)) {
					return typeLine.match(regexLastSubtype)[1]
				}
			}

			cards.sort((a, b) => {
				if (lastSubtype(a.type) < lastSubtype(b.type)) {
					return -1
				} else if (lastSubtype(a.type) > lastSubtype(b.type)) {
					return 1
				} else {
					return 0
				}
			})
		},
		sortByRarity (cards) {
			const rarityOrder = ['special', 'mythic', 'rare', 'uncommon', 'common', '']

			cards.sort((a, b) => {
				const rarityA = rarityOrder.indexOf(a.rarity)
				const rarityB = rarityOrder.indexOf(b.rarity)

				return rarityA - rarityB
			})
		},
		sortByPTSum (cards) {
			/* First, sort between cards that have the power attribute and cards that don't. */
			cards.sort((a, b) => {
				if (a.power !== undefined) {
					return -1
				} else if (b.power === undefined) {
					return 1
				} else {
					return 0
				}
			})

			/* Next, sort the cards by their P/T sum. */
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
		},
		sortByQuantity (cards) {
			cards.sort((a, b) => {
				return b.qty - a.qty
			})
		},
		sortByStarred (cards) {
			cards.sort((a, b) => {
				/* Use a series of `if`/`else` statements for this sorting method, because the shorter subtraction sorting method doesn't always work properly if a `card` object lacks the `starred` property. */
				if (b.starred) {
					return 1
				} else if (a.starred) {
					return -1
				} else {
					return 0
				}
			})
		},
		sortDefault (cards) { // For sorting by card name
			cards.sort((a, b) => {
				const cardA = a[this.sortMenu]
				const cardB = b[this.sortMenu]

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
</script>
