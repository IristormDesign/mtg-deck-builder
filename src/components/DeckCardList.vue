<template>
	<div class="deck-list">
		<div v-if="deck.cards.length == 0" class="no-cards">
			<p>This deck currently has no cards. (Add a card to start building.)</p>
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
					<button @click="selectedCard(card)">
						<h3 class="name">{{ card.name }}</h3>
						<div class="mana">{{ card.mana }}</div>
						<div class="type">{{ card.type }}</div>
					</button>

					<div class="qty">
						<span>&times;</span>
						<input
							type="number" v-model="card.qty"
							min="0" :max="card.maxQty"
							@input="validateQty(card)"
						/>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-card-list',
	props: {
		deck: Object
	},
	methods: {
		removeCard (rmvCard) {
			const deck = this.deck
			const cards = deck.cards

			// Remove the card from the deck.
			deck.cards = cards.filter(
				eachCard => eachCard.name !== rmvCard.name
			)

			let cardIndex = cards.indexOf(rmvCard)
			const numOfCards = cards.length

			// If the removed card happens to be the currently viewed card, then view another card instead.
			if (deck.viewedCard === rmvCard.name && numOfCards > 0) {
				if (cardIndex >= numOfCards) {
					cardIndex = numOfCards - 1
				}
				deck.viewedCard = cards[cardIndex].name
			}
		},
		selectedCard (card) {
			if (!card.img) { // If the image file hasn't been downloaded yet...
				console.log('> Requesting image from Scryfall.')

				require('axios')
					.get(
						'https://api.scryfall.com/cards/named?fuzzy=' + card.name.replace(/\s/g, '+')
					)
					.then(response => {
						this.deck.viewedCard = card.name
						card.img = response.data.image_uris.normal
					})
					.catch(error => {
						console.log(error)
					})
			} else {
				console.log('> Loaded cached image.')
				this.deck.viewedCard = card.name
			}
		},
		validateQty (card) {
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
						this.removeCard(card)
					} else {
						card.qty = 1
					}
				})
			}

			this.deck.editDate = new Date()
		}
	}
}
</script>
