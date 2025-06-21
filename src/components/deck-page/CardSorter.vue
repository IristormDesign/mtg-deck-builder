<template>
	<section class="card-sorter">
		<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
			<symbol id="right-triangle-icon" viewBox="0 -960 960 960">
				<path d="M356-252.16v-455.68L707.07-480 356-252.16Z"/>
			</symbol>
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M145.39-490.54q0 87.23 61.34 145.73 61.35 58.5 147.58 57.73H377l-68.69-70.69 31.61-32 121.77 124.38L338.08-140l-32-32 67.08-70.08h-22.7q-103.46.77-176.96-71.31Q100-385.46 100-490.54 100-593 170.27-666.5 240.54-740 341-740h138.54v45.39H341q-82 0-138.81 59.73-56.8 59.73-56.8 144.34Zm425.07 248.46v-45.38H860v45.38H570.46Zm0-225.77v-46.38H860v46.38H570.46Zm-17.84-226.76V-740H860v45.39H552.62Z"/></svg>
		<fieldset
			:disabled="(deck.cards.length <= 1 && deck.sideboard.cards.length <= 1)"
			ref="dropdownToggleRegion"
		>
			<label
				class="section-label"
				for="sorterMenuInput"
			>
				Sort cards by:
			</label>
			<div class="tip">
				<button
					type="button"
					@click="$store.commit('idOfShowingDialog', 'sorterTip')"
					title="About card-sorting options"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M450-290h60v-230h-60v230Zm30-298.46q13.73 0 23.02-9.29t9.29-23.02q0-13.73-9.29-23.02-9.29-9.28-23.02-9.28t-23.02 9.28q-9.29 9.29-9.29 23.02t9.29 23.02q9.29 9.29 23.02 9.29Zm.07 488.46q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
				</button>
			</div>
			<dropdown-menu
				:isShowingDropdown="isMenuOpen"
				togglerRef="sorterMenuInput"
				togglerRegionRef="dropdownToggleRegion"
				@hideDropdown="isMenuOpen = false"
			>
				<template #menuToggler>
					<input
						id="sorterMenuInput"
						ref="sorterMenuInput"
						type="text"
						v-model="deckSortAttribute"
						@click="toggleSorterMenu()"
						@keydown.enter="toggleSorterMenu()"
						readonly
						title="[Q]"
					/>
					<svg
						v-show="(deck.cards.length > 1 || deck.sideboard.cards.length > 1)"
						class="dropdown-arrow"
						@click="toggleSorterMenu()"
						xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-373.85 303.85-550h352.3L480-373.85Z"
					/></svg>
				</template>
				<ul
					slot="menuList"
					v-show="isMenuOpen"
					role="menu"
				>
					<li
						v-for="option in sorterMenuOptions"
						v-show="option !== 'Starred' || listHasStarredCard"
						:key="option"
						:class="deck.sortBy === option ? 'selected' : ''"
						role="menuitem"
					>
						<button
							type="button"
							@click="selectSorterMenuOption(option)"
						>
							<svg><use href="#right-triangle-icon" /></svg>
							<span>{{ option }}</span>
						</button>
					</li>
				</ul>
			</dropdown-menu>
		</fieldset>

		<standard-dialog dialogID="sorterTip">
			<div class="scrollable-region">
				<h4>About Card-Sorting Options</h4>
				<p>You can instantly rearrange the card names in your deck’s lists according to a certain card attribute you choose. The sorting options and their effects are the following:</p>
				<guide-card-sorter-options :displayAsDialog="true" class="small" />
				<p>For more info about the card sorter tool, see the <router-link to="/guide/list-editor#card-sorter">User Guide</router-link>.</p>
			</div>
		</standard-dialog>
	</section>
</template>

<script>
import DropdownMenu from '@/components/DropdownMenu.vue'
import StandardDialog from '@/components/StandardDialog.vue'
import GuideCardSorterOptions from '@/views/guide-chapters/CardSorterOptions.vue'
import sortingClusterGaps from '@/mixins/sortingClusterGaps.js'

export default {
	components: { DropdownMenu, StandardDialog, GuideCardSorterOptions },
	mixins: [sortingClusterGaps],
	props: {
		deck: Object
	},
	data () {
		return {
			isMenuOpen: false,
			sorterMenu: this.deck.sortBy
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
		},
		sorterMenuOptions () {
			return ['Starred', 'Name', 'Mana Color', 'Mana Value', 'Supertype', 'Type', 'First Subtype', 'Last Subtype', 'Rarity', 'P/T', 'Quantity']
		}
	},
	watch: {
		deckSortAttribute (attribute) {
			/* Make the card sorter menu change to the "(Unsorted)" value when the deck's sorting attribute has been automatically set to an empty string. (For example, that can occur when a card's quantity changes while the list has been sorted by quantity.) */
			if (attribute === '(Unsorted)') {
				this.sorterMenu = attribute
			}
		}
	},
	created () {
		if (!this.sorterMenu) {
			this.sorterMenu = '(Unsorted)'
		}
	},
	updated () {
		/* When going from one deck page to another, the card sorter is to change to the current deck's sorting option, which may differ from the previous deck's. */
		this.sorterMenu = this.deck.sortBy
	},
	methods: {
		toggleSorterMenu () {
			this.isMenuOpen = !this.isMenuOpen
		},
		selectSorterMenuOption (attribute) {
			this.isMenuOpen = false

			if (this.sorterMenu === attribute) return // Prevents the sortCards() method from running if the user has selected the currently selected sorting option. This is needed for the P/T option, because it always moves similar cards between each other, even after the list has already been sorted by P/T.

			this.sorterMenu = attribute
			this.sortCards()
		},
		sortCards () {
			this.deckObject.sortBy = this.sorterMenu

			const mainList = this.deck.cards
			const sbList = this.deck.sideboard.cards

			switch (this.sorterMenu.toLowerCase()) {
				case 'starred':
					this.sortByStarred(mainList)
					this.sortByStarred(sbList)
					break
				case 'name':
					this.sortByName(mainList)
					this.sortByName(sbList)
					break
				case 'mana color':
					this.sortByColor(mainList)
					this.sortByColor(sbList)
					break
				case 'mana value':
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
				case 'first subtype':
					this.sortByFirstSubtype(mainList)
					this.sortByFirstSubtype(sbList)
					break
				case 'last subtype':
					this.sortByLastSubtype(mainList)
					this.sortByLastSubtype(sbList)
					break
				case 'rarity':
					this.sortByRarity(mainList)
					this.sortByRarity(sbList)
					break
				case 'p/t':
					this.sortByPT(mainList)
					this.sortByPT(sbList)
					break
				case 'quantity':
					this.sortByQuantity(mainList)
					this.sortByQuantity(sbList)
					break
			}

			this.addSortingClusterGaps(this.deck, this.sorterMenu)
			this.$store.commit('decks', this.$store.state.decks)
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
		sortByName (cards) {
			cards.sort((a, b) => {
				if (a.name < b.name) {
					return -1
				} else if (a.name > b.name) {
					return 1
				} else {
					return 0
				}
			})
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
			const rarityOrder = ['b', 's', 'm', 'r', 'u', 'c', '']

			cards.sort((a, b) => {
				const rarityA = rarityOrder.indexOf(a.rarity.charAt(0))
				const rarityB = rarityOrder.indexOf(b.rarity.charAt(0))

				return rarityA - rarityB
			})
		},
		sortByPT (cards) {
			cards.sort((a, b) => {
				const determineAttributes = (card) => {
					const toNumber = val => {
						if (!isNaN(Number(val))) { // If the value is an actual number...
							return Number(val)
						} else { // Else the value is a string, such as a variable symbol.
							return 0
						}
					}
					let power = 0
					let toughness = 0

					if (card.loyalty !== undefined) {
						toughness = toNumber(card.loyalty)
					} else if (card.toughness !== undefined) {
						power = toNumber(card.power)
						toughness = toNumber(card.toughness)
					}

					return {
						power,
						sum: power + toughness,
						hasPTOrL: (
							card.toughness !== undefined ||
							card.loyalty !== undefined
						)
					}
				}

				const aAtts = determineAttributes(a)
				const bAtts = determineAttributes(b)

				// First, prioritize cards with the power/toughness or loyalty attributes.
				if (aAtts.hasPTOrL && !bAtts.hasPTOrL) {
					return -1
				} else if (!aAtts.hasPTOrL && bAtts.hasPTOrL) {
					return 1
				}

				// Then, sort by P/T sum.
				if (aAtts.sum !== bAtts.sum) {
					return bAtts.sum - aAtts.sum
				}

				// Finally, if P/T sums are equal, sort by power alone.
				return bAtts.power - aAtts.power
			})
		},
		sortByQuantity (cards) {
			cards.sort((a, b) => {
				return b.qty - a.qty
			})
		}
	}
}
</script>
