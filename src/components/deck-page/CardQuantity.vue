<template>
	<div class="qty">
		<label :for="qtyCardID(i)">&times;</label>
		<input
			type="number"
			:id="qtyCardID(i)"
			:ref="qtyCardID(i)"
			min="0"
			:max="card.maxQty"
			v-model="cardObject.qty"
			@focus="focusedOnQtyInput()"
			@blur="blurredFromQtyInput()"
			@input="checkForHugeQuantity()"
		/>
		<div class="hover-extension"></div>
		<div class="qty-button-cluster">
			<button
				class="increment"
				title="Increase quantity (E)"
				@click="cardObject.qty++"
				:disabled="card.qty >= card.maxQty"
			>
				<svg><use href="#plus-icon" /></svg>
			</button>
			<button
				class="decrement"
				title="Decrease quantity (D)"
				@click="cardObject.qty--"
			>
				<svg><use href="#minus-icon" /></svg>
			</button>
			<button
				v-if="$store.state.showSideboard"
				class="move-to-group m"
				title="Move 1 to main group (F)"
				@click="moveToOtherGroup()"
				:disabled="disableMoveToGroup"
			>
				<svg><use href="#left-arrow-icon" /></svg>
				<div>
					<span>M</span>
				</div>
			</button>
			<button
				v-else
				class="move-to-group sb"
				title="Move 1 to sideboard (F)"
				@click="moveToOtherGroup()"
				:disabled="disableMoveToGroup"
			>
				<svg><use href="#right-arrow-icon" /></svg>
				<div>
					<span>SB</span>
				</div>
			</button>
		</div>
	</div>
</template>

<script>
import cardListFunctions from '@/mixins/cardListFunctions.js'
import doubleFacedCards from '@/mixins/doubleFacedCards'
import removeCard from '@/mixins/removeCard.js'
import deckColors from '@/mixins/deckColors.js'

export default {
	mixins: [cardListFunctions, doubleFacedCards, removeCard, deckColors],
	props: {
		card: Object,
		deck: Object,
		i: Number
	},
	data () {
		return {
			movingLastCardToOtherGroup: false,
			pressedKeyForQty: false
		}
	},
	computed: {
		disableMoveToGroup () {
			let destGroup

			if (this.$store.state.showSideboard) {
				destGroup = this.deck
			} else {
				destGroup = this.deck.sideboard
			}

			const destCard = this.existingDestCard(destGroup)

			if (!destCard) {
				return false
			} else if (destCard.qty < 4) {
				return false
			} else if (
				this.maxQtyException &&
				destCard.qty < 99
			) {
				return false
			} else {
				return true
			}
		},
		maxQtyException () {
			const regexBasicLand = /^Basic (\w* )?Land\b/ // Finds "Basic Land", or any other phrase starting with "Basic" and ending with "Land" (such as "Basic Snow Land").

			if (regexBasicLand.test(this.card.type)) {
				return true
			}

			/* For future app updates, periodically check for new cards that modify the standard quantity limit, and add those cards' names here. See: https://scryfall.com/search?q=%28oracle%3A%22a+deck+can+have%22+oracle%3A%22cards+named%22%29+%28game%3Apaper%29&order=released&as=grid */
			switch (this.card.name) {
				case 'Dragon’s Approach':
				case 'Hare Apparent':
				case 'Nazgûl':
				case 'Persistent Petitioners':
				case 'Rat Colony':
				case 'Relentless Rats':
				case 'Seven Dwarves':
				case 'Shadowborn Apostle':
				case 'Slime Against Humanity':
				case 'Templar Knight':
					return true
				default:
					return false
			}
		}
	},
	watch: {
		'cardObject.qty' () {
			if (this.$store.state.highlightedCardLIIndex > -1) {
				this.flashQty()
			}
			if (document.activeElement !== this.$refs[this.qtyCardID(this.i)]) {
				this.validateQty()
			}
		}
	},
	beforeDestroy () {
		this.$refs[this.qtyCardID(this.i)].removeEventListener(
			'keydown', this.listenForQtyKeydown
		)
	},
	methods: {
		listenForQtyKeydown (event) {
			if (event.repeat) return

			switch (event.key.toLowerCase()) {
				case 'enter':
					document.activeElement.blur()
					return
				case 'e': case '-': case '+': case '.': // These are certain characters that are considered to be the "number" type, but that should be disallowed from appearing in the quantity inputs.
					event.preventDefault()
					return
			}

			if (event.key) {
				this.pressedKeyForQty = true
			}
		},
		/* Prevent the user from entering overly large numbers. They're not only unnecessary, but in extreme cases they can also cause the web page to crash. */
		checkForHugeQuantity () {
			if (this.cardObject.qty > 99) {
				this.cardObject.qty = 99
			}
		},
		validateQty () {
			const card = this.card
			const store = this.$store

			this.activeCardList.viewedCard = card

			if (card.qty < 0) {
				card.qty = 0 // Don't allow negative numbers.
			} else if (card.qty === 0) {
				if (this.movingLastCardToOtherGroup) {
					this.removeCard(this.i)
				} else {
					setTimeout(() => {
						store.commit('idOfShowingDialog', {
							id: 'confirmCardRemoval',
							data: {
								cardName: this.doubleFacedCardName(card),
								cardIndex: this.i,
								callback: () => {
									card.qty = 1
								}
							}
						})
					}, 1) // Timeout is needed here to prevent the dialog from immediately closing if it was opened by entering 0 or deleting the number in the quantity input.
				}
			} else if (isNaN(card.qty)) { // If the user somehow entered non-digit characters for the quantity, set the quantity to 1 instead.
				card.qty = 1
			} else {
				if (!card.maxQty) {
					if (this.maxQtyException) {
						card.maxQty = 99
					} else {
						card.maxQty = 4
					}
				}

				if (card.maxQty === 99) {
					if (card.qty > 99) {
						card.qty = 99
					}
				} else {
					if (card.qty > 4) {
						if (!store.state.hasNotifiedOnceAbout.quantityLimit) {
							store.commit('idOfShowingDialog', 'quantityMaxLimit')
							store.commit('hasNotifiedOnceAbout', { quantityLimit: true })
						}

						card.qty = 4
					}
				}

				card.qty = Math.round(card.qty)
			}

			const deck = this.deck

			if (deck.sortBy === 'Quantity') {
				this.resetListSorting()
			}

			this.pressedKeyForQty = false

			/* Save the changes. */
			deck.editDate = new Date()
			this.determineDeckColors()
			store.commit('decks', store.state.decks)
		},
		focusedOnQtyInput () {
			if (!this.isMobileLayout()) {
				this.viewCard(this.card)
			}

			this.$refs[this.qtyCardID(this.i)].addEventListener(
				'keydown', this.listenForQtyKeydown
			)
		},
		blurredFromQtyInput () {
			this.$refs[this.qtyCardID(this.i)].removeEventListener(
				'keydown', this.listenForQtyKeydown
			)

			this.validateQty()
		},
		qtyCardID (cardIndex) {
			const deckIndex = () => {
				return this.$store.state.decks.findIndex(
					foundDeck => foundDeck === this.deck
				)
			}

			return `qty-d${deckIndex()}c${cardIndex}`
		},
		flashQty () {
			const li = document.querySelector(`.card-li:nth-of-type(${this.i + 1})`)

			li.classList.add('flash')

			setTimeout(() => {
				li.classList.remove('flash')
			}, 125)
		},
		existingDestCard (destGroup) {
			return destGroup.cards.find(
				foundCard => foundCard.name === this.card.name
			)
		},
		moveToOtherGroup () {
			this.focusedOnQtyInput()

			const card = this.cardObject
			const store = this.$store

			if (card.qty === 1) {
				this.movingLastCardToOtherGroup = true

				const cardGroupName = (other) => {
					if (store.state.showSideboard) {
						if (other) {
							return 'main card group'
						} else {
							return 'sideboard'
						}
					} else {
						if (other) {
							return 'sideboard'
						} else {
							return 'main card group'
						}
					}
				}

				if (!store.state.hasNotifiedOnceAbout.movingCardGroup) {
					store.commit('idOfShowingDialog', {
						id: 'movingCardGroup',
						data: {
							card: this.doubleFacedCardName(card),
							activeGroup: cardGroupName(),
							inactiveGroup: cardGroupName(true)
						}
					})
					store.commit('hasNotifiedOnceAbout', { movingCardGroup: true })
				}
			}

			card.qty--

			const doMove = (originGroup, destGroup) => {
				if (this.existingDestCard(destGroup)) {
					this.existingDestCard(destGroup).qty++
				} else {
					const originCard = originGroup.cards.find(
						foundCard => foundCard.name === card.name
					)
					const newCardToDest = { ...originCard }

					newCardToDest.qty = 1

					destGroup.cards.push(newCardToDest)

					this.resetListSorting()
				}

				destGroup.viewedCard = card

				if (card.starred) {
					originGroup.viewedStarredCard = this.anotherStarredCard
					destGroup.viewedStarredCard = card
				}
			}

			const deck = this.deckObject

			if (store.state.showSideboard) {
				doMove(deck.sideboard, deck)
			} else {
				doMove(deck, deck.sideboard)
			}

			store.commit('decks', store.state.decks)

			this.$nextTick(() => {
				this.movingLastCardToOtherGroup = false
			})
		},
		resetListSorting () {
			this.deckObject.sortBy = '(Unsorted)'

			this.deck.cards.forEach(eachCard => {
				eachCard.gapAfter = false
			})
			this.deck.sideboard.cards.forEach(eachCard => {
				eachCard.gapAfter = false
			})
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/card-quantities.scss';
</style>
