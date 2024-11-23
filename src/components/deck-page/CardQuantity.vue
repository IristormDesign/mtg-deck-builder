<template>
	<div class="qty">
		<label :for="qtyCardID(i)">&times;</label>
		<input
			type="number"
			:id="qtyCardID(i)"
			min="0"
			v-model.lazy="cardObject.qty"
			@focus="focusedOnQtyInput()"
			@blur="blurredFromQtyInput()"
		/>
		<div
			class="hover-extension"
		></div>
		<div class="qty-button-cluster">
			<button
				class="increment"
				title="Increase quantity (E)"
				@click="cardObject.qty++"
				:disabled="card.qty >= card.maxQty"
			>
				<div>+</div>
			</button>
			<button
				class="decrement"
				title="Decrease quantity (D)"
				@click="cardObject.qty--"
			>
				<div>&minus;</div>
			</button>
			<button
				v-if="$store.state.showSideboard"
				class="move-to-group"
				title="Move 1 to main group (F)"
				@click="moveToOtherGroup()"
			>
				<div>◀<br>M</div>
			</button>
			<button
				v-else
				class="move-to-group"
				title="Move 1 to sideboard (F)"
				@click="moveToOtherGroup()"
			>
				<div>▶<br>SB</div>
			</button>
		</div>
	</div>
</template>

<script>
import cardListFunctions from '@/mixins/cardListFunctions.js'
import removeCard from '@/mixins/removeCard.js'
import deckColors from '@/mixins/deckColors.js'

export default {
	mixins: [cardListFunctions, removeCard, deckColors],
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
		cardQtyValue () { // Needed for keyboard shortcuts.
			return this.cardObject.qty
		}
	},
	watch: {
		cardQtyValue () {
			this.validateQty()

			if (this.$store.state.highlightedCardLIIndex > -1) {
				this.flashQty()
			}
		}
	},
	methods: {
		listenForKeyboardShortcuts (event) {
			if (event.repeat) return

			switch (event.key) {
				case 'Enter':
					document.activeElement.blur()
					return
			}

			if (event.key) {
				this.pressedKeyForQty = true

				return
			}

			const disallowedKeyEvents = () => {
				const regexDisallowed = /[^e.-]/i // A character that's NOT the letter E, or a period (decimal point), or a hyphen (minus sign). These are the certain non-digit characters that are allowed by a number-type input, but that should never be used for the card quantity inputs.

				return !regexDisallowed.test(event.key) // Having the regex be negative ("^") and this function's return value also be negative ("!") is intentional. This lets certain keyboard events that regex can't test to still be used as normal, such as the events for the backspace, enter, and arrow keys.
			}

			if (disallowedKeyEvents()) {
				event.preventDefault()
			}
		},
		determineMaxQty () {
			const card = this.card

			function isBasicLand () {
				const regexBasicLand = /^Basic (\w* )?Land\b/ // Finds "Basic Land", or any other phrase starting with "Basic" and ending with "Land" (such as "Basic Snow Land").

				return regexBasicLand.test(card.type)
			}
			// For future app updates, periodically check for new cards that modify the standard quantity limit, and add those cards' names here. See: https://scryfall.com/search?q=%28oracle%3A%22a+deck+can+have%22+oracle%3A%22cards+named%22%29+%28game%3Apaper%29&order=released&as=grid
			function isException () {
				switch (card.name) {
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

			if (isBasicLand() || isException()) {
				card.maxQty = 99
			} else {
				card.maxQty = 4
			}
		},
		validateQty () {
			const card = this.card

			card.qty = Math.round(card.qty)
			this.activeCardList.viewedCard = card

			if (card.qty < 0) {
				card.qty = 0 // Don't allow negative numbers.
			} else if (card.qty === 0) {
				if (this.movingLastCardToOtherGroup) {
					this.removeCard(this.i)

				/* The `setTimeout()` function causes the card-removal `confirm()` dialog to appear twice when the quantity input has been set to 0 by the user pressing the "0" key, or by the user pressing the backspace or delete keys to clear the quantity number. It seems the only way around this bug is to avoid `setTimeout()` under that condition. */
				} else if (this.pressedKeyForQty) {
					this.effectOfRemovalConfirm()
				} else {
					setTimeout(() => {
						this.effectOfRemovalConfirm()
					}, 100) // This split-second delay lets the quantity input display "0" and the card image show the to-be-removed card before the confirmation dialog to remove the card appears.
				}
			} else if (isNaN(card.qty)) { // If the user somehow entered non-digits for the quantity, reset the quantity to 1 instead.
				card.qty = 1
			} else {
				if (!card.maxQty) {
					this.determineMaxQty()
				}

				if (card.maxQty === 99) {
					if (card.qty > 99) {
						card.qty = 99
					}
				} else {
					if (card.qty > 4) {
						setTimeout(() => {
							alert('A deck cannot have more than 4 cards of a particular name, except if they’re basic land cards.')
						}, 100)

						card.qty = 4
					}
				}
			}

			const deck = this.deck

			if (deck.sortBy === 'qty') {
				this.resetListSorting()
			}

			this.pressedKeyForQty = false

			// Save the changes.
			deck.editDate = new Date()
			this.determineDeckColors()
			this.$store.commit('decks', this.$store.state.decks)
		},
		effectOfRemovalConfirm () {
			const card = this.card

			function cardName () {
				switch (card.layout) {
					case 'modal_dfc': case 'split':
						return `${card.name} // ${card.name2}`
					default:
						return card.name
				}
			}

			const removalConfirmed = confirm(`Remove “${cardName()}” from this card list?`)

			if (removalConfirmed) {
				this.removeCard(this.i)
			} else {
				card.qty = 1
			}
		},
		focusedOnQtyInput () {
			if (!this.$store.state.isMobileLayout()) {
				this.viewCard(this.card)
			}

			document.addEventListener('keydown', this.listenForKeyboardShortcuts)
		},
		blurredFromQtyInput () {
			document.removeEventListener('keydown', this.listenForKeyboardShortcuts)
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
		moveToOtherGroup () {
			this.focusedOnQtyInput()

			const card = this.cardObject

			if (card.qty === 1) {
				this.movingLastCardToOtherGroup = true

				const cardGroupName = (other) => {
					if (this.$store.state.showSideboard) {
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

				if (this.$store.state.showNoticeAboutMovingLastCard) {
					alert(`You’re moving “${card.name}” out of the ${cardGroupName()} into the ${cardGroupName(true)}.`)

					this.$store.commit('showNoticeAboutMovingLastCard', false)
				}
			}

			card.qty--

			const doMove = (originGroup, destGroup) => {
				const existingDestCard = destGroup.cards.find(
					foundCard => foundCard.name === card.name
				)

				if (existingDestCard) {
					existingDestCard.qty++
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

			if (this.$store.state.showSideboard) {
				doMove(deck.sideboard, deck)
			} else {
				doMove(deck, deck.sideboard)
			}

			this.$store.commit('decks', this.$store.state.decks)

			this.$nextTick(() => {
				this.movingLastCardToOtherGroup = false
			})
		},
		resetListSorting () {
			this.deckObject.sortBy = ''

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
	@import '@/sass/card-quantities.scss';
</style>
