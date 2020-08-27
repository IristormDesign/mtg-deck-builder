<template>
	<div class="deck-list">
		<div v-if="activeDeck.cards.length == 0" class="no-cards">
			<p>This deck currently has no cards.</p>
		</div>
		<div v-else>
			<div class="labels">
				<div class="button-group">
					<div>Card Name</div>
					<div>Mana Cost</div>
					<div>Type</div>
				</div>
				<div class="qty-group">Quantity</div>
			</div>
			<ul>
				<li v-for="card in activeDeck.cards" :key="card.name">
					<button
						@click="$emit('card-clicked', card, activeDeck)"
					>
						<h3 class="name">{{ card.name }}</h3>
						<div class="mana">{{ card.mana }}</div>
						<div class="type">{{ card.type }}</div>
					</button>

					<div class="qty">
						<span>&times;</span>
						<input
							type="number" v-model="card.qty"
							min="0" :max="card.maxQty"
							@input="validateQty(card, activeDeck)"
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
		activeDeck: Object
	},
	methods: {
		validateQty: function (card, deck) {
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
					if (confirmRemoval === true) {
						deck.cards = deck.cards.filter(
							eachCard => eachCard.name !== card.name
						)
					} else {
						card.qty = 1
					}
				})
			}
		}
	}
}
</script>
