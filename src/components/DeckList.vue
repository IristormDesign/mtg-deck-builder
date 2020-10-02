<template>
	<div class="deck-list">
		<div v-if="deck.cards.length == 0" class="no-cards">
			<p>This deck currently has no cards.</p>
		</div>
		<div v-else>
			<div class="labels">
				<div class="button-group">
					<div>Name</div>
					<div>Mana Cost</div>
					<div>Type</div>
				</div>
				<div class="qty-group">Quantity</div>
			</div>
			<ul>
				<li v-for="card in deck.cards" :key="card.name">
					<button @click="selectedCard(card, deck)">
						<h3 class="name">{{ card.name }}</h3>
						<div class="mana">{{ card.mana }}</div>
						<div class="type">{{ card.type }}</div>
					</button>

					<div class="qty">
						<span>&times;</span>
						<input
							type="number" v-model="card.qty"
							min="0" :max="card.maxQty"
							@input="validateQty(card, deck)"
						/>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-list',
	props: {
		deck: Object,
		decks: Array
	},
	methods: {
		removeCard (card, deck) {
			let cardIndex = deck.cards.indexOf(card)

			// Remove the card from the deck.
			deck.cards = deck.cards.filter(
				eachCard => eachCard.name !== card.name
			)

			const numOfCards = deck.cards.length

			// If the removed card happens to be the currently viewed card, then view another card instead.
			if (deck.viewedCard === card.name && numOfCards > 0) {
				if (cardIndex >= numOfCards) {
					cardIndex = numOfCards - 1
				}
				deck.viewedCard = deck.cards[cardIndex].name
			}
		},
		selectedCard (card, deck) {
			deck.viewedCard = card.name
		},
		validateQty (card, deck) {
			card.qty = Math.round(card.qty)

			if (RegExp(/^Basic Land\b/).test(card.type)) {
				if (card.qty > 99) {
					card.qty = 99
				}
			} else {
				if (card.qty > 4) {
					card.qty = 4
				}
			}

			if (card.qty < 1) {
				const confirmRemoval = confirm('Are you sure you want to remove ' + card.name + ' from the deck?')

				this.$nextTick(function () {
					if (confirmRemoval) {
						this.removeCard(card, deck)
					} else {
						card.qty = 1
					}
				})
			}

			deck.editDate = new Date()
		}
	}
}
</script>
