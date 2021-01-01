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
					<button
						@click="deck.viewedCard = card.name"
						:class="colorButton(card)"
					>
						<h3 class="name">{{ card.name }}</h3>
						<div class="mana" v-html="styleManaSymbols(card)"></div>
						<div class="type">{{ card.type }}</div>
					</button>

					<div class="qty">
						<span>&times;</span>
						<input
							type="number" v-model.lazy="card.qty"
							min="0" :max="card.maxQty"
							@change="validateQty(card)"
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
		colorButton (card) {
			const colors = card.colors
			const w = colors.find((c) => c === 'W')
			const u = colors.find((c) => c === 'U')
			const b = colors.find((c) => c === 'B')
			const r = colors.find((c) => c === 'R')
			const g = colors.find((c) => c === 'G')

			if (colors.length > 1) return 'multicolored'
			else if (w) return 'white'
			else if (u) return 'blue'
			else if (b) return 'black'
			else if (r) return 'red'
			else if (g) return 'green'
		},
		styleManaSymbols (card) {
			return card.mana
				.replaceAll(
					RegExp('{W}', 'g'),
					'<span class="mana-symbol white">W</span>'
				)
				.replaceAll(
					RegExp('{U}', 'g'),
					'<span class="mana-symbol blue">U</span>'
				)
				.replaceAll(
					RegExp('{B}', 'g'),
					'<span class="mana-symbol black">B</span>'
				)
				.replaceAll(
					RegExp('{R}', 'g'),
					'<span class="mana-symbol red">R</span>'
				)
				.replaceAll(
					RegExp('{G}', 'g'),
					'<span class="mana-symbol green">G</span>'
				)
				.replaceAll(
					RegExp('{(./.)}', 'g'), // Find hybrid mana symbols (like `{G/W}`). The parentheses in the regex mark the variable `$1`.
					'<span class="mana-symbol generic hybrid">$1</span>'
				)
				.replaceAll(
					RegExp('{(.)}', 'g'), // Find any single character directly between a pair of curly brackets. This catches all other mana symbols that the previous regex replacements have missed.
					'<span class="mana-symbol generic">$1</span>'
				)
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

						// If the card to be removed happens to be the currently displayed card, then display the next card in the list.
						if (deck.viewedCard === cardName && totalCards > 0) {
							if (cardIndex === totalCards) { // If this card is last in the list...
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
