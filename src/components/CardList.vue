<template>
	<section
		v-if="deck.cards.length <= 0"
		class="card-list no-cards"
		@mouseover="attentionAddCard(true)"
		@mouseleave="attentionAddCard(false)"
	>
		<p>This deck has no cards yet.</p>
	</section>
	<section v-else class="card-list">
		<h3>Card List</h3>
		<header class="list-headings">
			<div class="card-label-group">
				<strong class="name">Name</strong>
				<strong class="mana">Mana Cost</strong>
			</div>
			<div class="card-label-group">
				<strong class="type">Type</strong>
				<strong class="rarity">Rarity</strong>
			</div>
			<strong class="qty" title="Quantity">Qty.</strong>
		</header>
		<transition-group tag="ul">
			<li
				v-for="(card, i) in deck.cards" :key="card.name"
				:class="(card.gapAfter) ? 'gap-after' : null"
			>
				<button
					@click="viewCard(card)"
					:class="['card-button', colorButton(card)]"
				>
					<div class="card-label-group">
						<h4 class="name">{{ card.name }}</h4>
						<div class="mana" v-html="styleManaSymbols(card)"></div>
					</div>
					<div class="card-label-group">
						<div class="type">{{ card.type }}</div>
						<div class="rarity" v-html="setRaritySymbol(card)"></div>
					</div>
				</button>
				<div class="qty">
					<label :for="`qty-c${i}`">Quantity</label>
					<span>&times;</span>
					<input
						type="number" min="0" :id="`qty-c${i}`"
						v-model.lazy="card.qty" @change="validateQty(card)"
					/>
				</div>
			</li>
		</transition-group>
	</section>
</template>

<script>
import symbolsMarkup from '@/mixins/symbolsMarkup.js'
import cardListSectionalGaps from '@/mixins/cardListSectionalGaps.js'

export default {
	mixins: [symbolsMarkup, cardListSectionalGaps],
	props: {
		deck: Object
	},
	methods: {
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
		viewCard (card) {
			this.deck.viewedCard = card.name
			this.$store.commit('setDecks', this.$store.state.decks)
			this.$store.commit('setShowCard', true)
		},
		colorButton (card) {
			const colors = card.colors
			const mc = colors.find((c) => c === 'multicolor')
			const w = colors.find((c) => c === 'W')
			const u = colors.find((c) => c === 'U')
			const b = colors.find((c) => c === 'B')
			const r = colors.find((c) => c === 'R')
			const g = colors.find((c) => c === 'G')
			const land = RegExp(/\bLand\b/).test(card.type)

			if (mc) return 'multicolor'
			else if (w) return 'white'
			else if (u) return 'blue'
			else if (b) return 'black'
			else if (r) return 'red'
			else if (g) return 'green'
			else if (land) return 'land'
		},
		styleManaSymbols (card) {
			const symbol = this.manaSymbol

			return card.mana
				.replaceAll(RegExp(/{W}/, 'g'), symbol.w)
				.replaceAll(RegExp(/{U}/, 'g'), symbol.u)
				.replaceAll(RegExp(/{B}/, 'g'), symbol.b)
				.replaceAll(RegExp(/{R}/, 'g'), symbol.r)
				.replaceAll(RegExp(/{G}/, 'g'), symbol.g)
				.replaceAll(
					RegExp(/{(\w+)}/, 'g'), // Find any other string having a pair of curly brackets with any other alphanumeric characters in between. This gets generic mana in both single and multiple digits and colorless mana ({C}).
					'<span class="mana-symbol">$1</span>' // `$1` is a variable referring to the characters within the parentheses in the regex.
				)
				.replaceAll(
					RegExp(/{(\w+\/\w+)}/, 'g'), // Find any hybrid mana symbols (mana symbols containing a slash), such as `{G/W}`.
					'<span class="mana-symbol hybrid" title="Hybrid mana symbol">$1</span>'
				)
		},
		setRaritySymbol (card) {
			const symbol = this.raritySymbol

			switch (card.rarity) {
			case 'common': return symbol.c
			case 'uncommon': return symbol.u
			case 'rare': return symbol.r
			case 'mythic': return symbol.m
			default: return symbol.s
			}
		},
		validateQty (card) {
			const store = this.$store
			const deck = this.deck
			const cardName = card.name
			card.qty = Math.round(card.qty)
			deck.viewedCard = cardName

			if (store.state.sortAttribute === 'qty') {
				store.commit('setSortAttribute', '') // Reset the sort-by select box.
			}

			if (card.qty <= 0) {
				const confirmRemoval = confirm(`Remove “${cardName}” from the deck?`)

				if (confirmRemoval) {
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
					setTimeout(() => {
						cards.splice(cardIndex, 1)

						if (store.state.sortAttribute !== '') {
							this.addSectionalGaps(deck, store.state.sortAttribute)
						}

						saveChanges() // Needed here when inside `setTimeout()`.
					}, 375) // The timeout duration should be as long as the transition duration of the new card's image overlapping the image of the just-removed card in the card display.
				} else {
					card.qty = 1
				}
			} else {
				const basicLandType = RegExp(/^Basic (\w* )?Land\b/) // Finds `Basic Land`, or any phrase starting with `Basic` and ending with `Land`, such as `Basic Snow Land`.

				if (
					basicLandType.test(card.type) ||
					cardName === 'Dragon’s Approach' ||
					cardName === 'Persistent Petitioners' ||
					cardName === 'Rat Colony' ||
					cardName === 'Relentless Rats' ||
					cardName === 'Seven Dwarves' ||
					cardName === 'Shadowborn Apostle'
				) {
					if (card.qty > 99) {
						card.qty = 99
						alert('⚠ 99 is plenty, don’t you think?')
					}
				} else {
					if (card.qty > 4) {
						card.qty = 4
						alert('⚠ A deck can have no more than 4 of any card with a particular name other than basic land cards.')
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
