<template>
	<div class="qty">
		<label :for="qtyCardID(i)">Quantity</label>
		<span>&times;</span>
		<input
			type="number"
			:id="qtyCardID(i)"
			min="0"
			v-model.lazy="cardObject.qty"
			@change="validateQty()"
			@click="qtyInputFocused($event)"
		/>
		<div class="qty-buttons">
			<button
				class="increment"
				title="Increase quantity"
				@click="increaseQty()"
				:disabled="disableIncreaseQtyBtn()"
			><div>+</div></button>
			<button
				class="decrement"
				title="Decrease quantity"
				@click="decreaseQty()"
			><div>&minus;</div></button>
		</div>
	</div>
</template>

<script>
import cardListFunctions from '@/mixins/cardListFunctions.js'
import deckColors from '@/mixins/deckColors.js'
import sortingClusterGaps from '@/mixins/sortingClusterGaps.js'

export default {
	mixins: [cardListFunctions, deckColors, sortingClusterGaps],
	props: {
		card: Object,
		deck: Object,
		i: Number
	},
	computed: {
		getDeckNumberID () {
			const decks = this.$store.state.decks

			for (let i = 0; i < decks.length; i++) {
				if (this.deck === decks[i]) {
					return i
				}
			}
			return null
		}
	},
	methods: {
		determineMaxQty () {
			const card = this.card

			function isBasicLand () {
				const regexBasicLand = /^Basic (\w* )?Land\b/ // Finds "Basic Land", or any other phrase starting with "Basic" and ending with "Land" (such as "Basic Snow Land").

				return regexBasicLand.test(card.type)
			}
			function isException () {
				switch (card.name) {
					case 'Dragon’s Approach':
					case 'Nazgûl':
					case 'Persistent Petitioners':
					case 'Rat Colony':
					case 'Relentless Rats':
					case 'Seven Dwarves':
					case 'Shadowborn Apostle':
					case 'Slime Against Humanity':
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
			const deck = this.deck

			card.qty = Math.round(card.qty)
			this.activeCardList.viewedCard = card

			if (card.qty < 0) {
				card.qty = 0 // Don't allow negative numbers.
			} else if (card.qty === 0) {
				setTimeout(() => {
					const confirmRemoval = confirm(`Remove “${card.name}” from the deck?`)

					if (confirmRemoval) {
						this.removeCard()
					} else {
						card.qty = 1
					}
				}, 250) // This split-second delay lets the quantity input display "0" and the card image show the to-be-removed card before the confirmation dialog to remove the card appears.
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
						alert('Each card name in a deck cannot have a quantity greater than 4, unless it’s a basic land card.')
						card.qty = 4
					}
				}
			}

			if (deck.sortBy === 'qty') {
				deck.sortBy = ''

				deck.cards.forEach(eachCard => {
					eachCard.gapAfter = false
				})
				deck.sideboard.cards.forEach(eachCard => {
					eachCard.gapAfter = false
				})
			}

			// Save the changes.
			deck.editDate = new Date()
			this.determineDeckColors()
			this.$store.commit('decks', this.$store.state.decks)
		},
		removeCard () {
			const list = this.activeCardList
			const cards = list.cards
			const index = this.i
			const totalCards = cards.length - 1

			// If the card to be removed happens to be the currently displayed card, then display the next card in the list.
			if (list.viewedCard.name === this.card.name && totalCards > 0) {
				if (index === totalCards) { // If this card is last in the list...
					list.viewedCard = cards[index - 1]
				} else {
					list.viewedCard = cards[index + 1]
				}
			} else {
				list.viewedCard = null
			}

			// Now remove the card from the deck.
			cards.splice(index, 1)

			if (this.$store.state.sortAttribute !== '') {
				this.addSortingClusterGaps(this.deck, this.$store.state.sortAttribute)
			}

			this.determineDeckColors()
		},
		qtyInputFocused (event) {
			event.target.select()

			if (!this.$store.state.isMobileLayout()) {
				this.viewCard(this.card)
			}
		},
		increaseQty () {
			const card = this.card

			card.qty++
			this.validateQty()
		},
		decreaseQty () {
			const card = this.card

			card.qty--
			this.validateQty()
		},
		disableIncreaseQtyBtn () {
			return this.card.qty >= this.card.maxQty
		},
		qtyCardID (cardI) {
			return `qty-d${this.getDeckNumberID}c${cardI}`
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/card-quantities.scss';
</style>
