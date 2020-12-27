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
		selectedCard (card) {
			if (!card.img) { // If the image file hasn't been downloaded yet...
				console.log('🎴 Requesting image from Scryfall.')

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
				this.deck.viewedCard = card.name
				console.log('🎴 Loaded image from cache.')
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

			if (card.qty <= 0) {
				setTimeout(() => {
					const cardName = card.name
					const confirmRemoval = confirm(`Are you sure you want to remove ${cardName} from the deck?`)

					if (confirmRemoval) {
						const deck = this.deck
						const cards = deck.cards
						const cardIndex = cards.indexOf(card)
						const totalCards = cards.length - 1

						// If the removed card happens to be the currently displayed card, then display the next card in the list.
						if (deck.viewedCard === cardName && totalCards > 0) {
							if (cardIndex === totalCards) { // If the card is last in the list...
								deck.viewedCard = cards[cardIndex - 1].name
							} else {
								deck.viewedCard = cards[cardIndex + 1].name
							}
						}

						// Now remove the card from the deck.
						cards.splice(cardIndex, 1)
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
