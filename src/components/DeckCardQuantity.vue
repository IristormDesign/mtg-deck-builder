<template>
	<div class="qty">
		<label :for="qtyCardID(i)">Quantity</label>
		<span>&times;</span>
		<input
			type="number"
			:id="qtyCardID(i)"
			min="0"
			v-model.lazy="cardObject.qty"
			@change="validateQty(card)"
			@click="qtyInputFocused($event, card)"
		/>
		<div class="qty-buttons">
			<button
				class="increment"
				title="Increase quantity"
				@click="increaseQty(card)"
				:disabled="disableIncreaseQtyBtn(card)"
			>+</button>
			<button
				class="decrement"
				title="Decrease quantity"
				@click="decreaseQty(card)"
			>&minus;</button>
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
		determineMaxQty (card) {
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
		validateQty (card) {
			const store = this.$store
			const deck = this.deck
			const cardName = card.name
			const activeCardList = this.activeCardList
			card.qty = Math.round(card.qty)

			const saveChanges = () => {
				deck.editDate = new Date()
				this.determineDeckColors()
				store.commit('decks', store.state.decks)
			}

			activeCardList.viewedCard = cardName

			if (deck.sortBy === 'qty') {
				deck.sortBy = ''
			}
			if (card.qty <= 0) {
				const confirmRemoval = confirm(`Remove “${cardName}” from the deck?`)

				if (confirmRemoval) {
					const cards = activeCardList.cards
					const cardIndex = cards.indexOf(card)
					const totalCards = cards.length - 1

					// If the card to be removed happens to be the currently displayed card, then display the next card in the list.
					if (activeCardList.viewedCard === cardName && totalCards > 0) {
						if (cardIndex === totalCards) { // If this card is last in the list...
							activeCardList.viewedCard = cards[cardIndex - 1].name
						} else {
							activeCardList.viewedCard = cards[cardIndex + 1].name
						}
					}

					// Now remove the card from the deck.
					setTimeout(() => {
						cards.splice(cardIndex, 1)

						if (store.state.sortAttribute !== '') {
							this.addSortingClusterGaps(deck, store.state.sortAttribute)
						}

						this.determineDeckColors()

						saveChanges() // Needed here when inside `setTimeout()`.
					}, 375) // The timeout duration should be as long as the transition duration of the new card's image overlapping the image of the just-removed card in the card image.
				} else {
					card.qty = 1

					saveChanges()
				}
			} else {
				if (!card.maxQty) {
					this.determineMaxQty(card)
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

				saveChanges()
			}
		},
		qtyInputFocused (event, card) {
			event.target.select()

			if (window.innerWidth > 768) {
				this.viewCard(card)
			}
		},
		increaseQty (card) {
			card.qty++
			this.validateQty(card)
		},
		decreaseQty (card) {
			card.qty--

			setTimeout(() => {
				this.validateQty(card)
			}, 100)
		},
		disableIncreaseQtyBtn (card) {
			return (card.qty >= card.maxQty)
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
