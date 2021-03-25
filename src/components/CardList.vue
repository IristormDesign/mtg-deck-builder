<template>
	<div
		v-if="deck.cards.length <= 0"
		class="card-list no-cards"
		@mouseover="attentionAddCard(true)"
		@mouseleave="attentionAddCard(false)"
	>
		<p>This deck has no cards yet. (Add a card to start building.)</p>
	</div>
	<div v-else class="card-list">
		<header class="labels">
			<div class="button-group">
				<strong class="name">Name</strong>
				<strong class="mana">Mana Cost</strong>
				<strong class="type">Type</strong>
				<strong class="rarity">Rarity</strong>
			</div>
			<strong class="qty" title="Quantity">Qty.</strong>
		</header>
		<transition-group tag="ul">
			<li v-for="card in deck.cards" :key="card.name">
				<button
					@click="viewCard(card)"
					:class="['card-button', colorButton(card)]"
				>
					<h3 class="name">{{ card.name }}</h3>
					<div class="mana" v-html="styleManaSymbols(card)"></div>
					<div class="type">{{ card.type }}</div>
					<div v-if="card.rarity === 'common'"
						class="rarity common" title="Common">C
					</div>
					<div v-else-if="card.rarity === 'uncommon'"
						class="rarity uncommon" title="Uncommon">U
					</div>
					<div v-else-if="card.rarity === 'rare'"
						class="rarity rare" title="Rare">R
					</div>
					<div v-else-if="card.rarity === 'mythic'"
						class="rarity mythic" title="Mythic rare">M
					</div>
				</button>
				<div class="qty">
					<span>&times;</span>
					<input
						type="number" min="0" :max="card.maxQty"
						v-model.lazy="card.qty" @change="validateQty(card)"
					/>
				</div>
			</li>
		</transition-group>
	</div>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	methods: {
		viewCard (card) {
			this.deck.viewedCard = card.name
			this.$store.commit('setDecks', this.$store.state.decks)
		},
		attentionAddCard (doIt) {
			const cardAdderInput = document.querySelector('#card-input')

			if (doIt) {
				cardAdderInput.classList.add('attention')
			} else {
				setTimeout(() => {
					cardAdderInput.classList.remove('attention')
				}, 500)
			}
		},
		colorButton (card) {
			const colors = card.colors
			const mc = colors.find((c) => c === 'multicolor')
			const w = colors.find((c) => c === 'W')
			const u = colors.find((c) => c === 'U')
			const b = colors.find((c) => c === 'B')
			const r = colors.find((c) => c === 'R')
			const g = colors.find((c) => c === 'G')

			if (mc) return 'multicolor'
			else if (w) return 'white'
			else if (u) return 'blue'
			else if (b) return 'black'
			else if (r) return 'red'
			else if (g) return 'green'
		},
		styleManaSymbols (card) {
			const symbol = this.$store.state.manaSymbol

			return card.mana
				.replaceAll(RegExp('{W}', 'g'), symbol.w)
				.replaceAll(RegExp('{U}', 'g'), symbol.u)
				.replaceAll(RegExp('{B}', 'g'), symbol.b)
				.replaceAll(RegExp('{R}', 'g'), symbol.r)
				.replaceAll(RegExp('{G}', 'g'), symbol.g)
				.replaceAll(
					RegExp('{(./.)}', 'g'), // Find hybrid mana symbols (like `{G/W}`). The parentheses in the regex mark the variable `$1`.
					'<span class="mana-symbol hybrid" title="Hybrid mana">$1</span>'
				)
				.replaceAll(
					RegExp('{(.)}', 'g'), // Find any single character directly between a pair of curly brackets. This catches all other mana symbols that the previous regex replacements have missed.
					'<span class="mana-symbol">$1</span>'
				)
		},
		validateQty (card) {
			const store = this.$store
			const deck = this.deck
			card.qty = Math.round(card.qty)
			deck.viewedCard = card.name

			if (store.state.sortProperty === 'qty') {
				store.commit('setSortProperty', '') // Reset the sort-by select box.
			}

			if (card.qty <= 0) {
				const confirmRemoval = confirm(`Are you sure you want to remove ${card.name} from the deck?`)

				if (confirmRemoval) {
					const cards = deck.cards
					const cardIndex = cards.indexOf(card)
					const totalCards = cards.length - 1

					// If the card to be removed happens to be the currently displayed card, then display the next card in the list.
					if (deck.viewedCard === card.name && totalCards > 0) {
						if (cardIndex === totalCards) { // If this card is last in the list...
							deck.viewedCard = cards[cardIndex - 1].name
						} else {
							deck.viewedCard = cards[cardIndex + 1].name
						}
					}

					// Now remove the card from the deck.
					setTimeout(() => {
						cards.splice(cardIndex, 1)
						saveChanges() // Needed here when inside `setTimeout()`.
					}, 375) // The timeout duration should be as long as the transition duration of the new card's image overlapping the image of the just-removed card.
				} else {
					card.qty = 1
				}
			} else {
				const basicLandType = RegExp(/^Basic (\w* )?Land\b/) // Finds `Basic Land`, or any phrase starting with `Basic` and ending with `Land`, such as `Basic Snow Land`.

				if (basicLandType.test(card.type)) {
					if (card.qty > 99) {
						card.qty = 99
						alert('⚠ 99 is more than plenty, don’t you think?')
					}
				} else {
					if (card.qty > 4) {
						card.qty = 4
						alert('⚠ A deck can have no more than four of any card with a particular name other than basic land cards.')
					}
				}
				saveChanges()
			}
			function saveChanges () {
				deck.editDate = new Date()
				store.commit('setDecks', store.state.decks)
			}
		}
	}
}
</script>
