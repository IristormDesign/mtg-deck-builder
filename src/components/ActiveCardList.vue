<template>
	<div class="active-card-list">
		<div class="list-headings">
			<div class="card-label-group">
				<strong class="name">Name</strong>
				<strong class="mana">Mana Cost</strong>
			</div>
			<div class="card-label-group">
				<strong class="type">Type</strong>
				<strong class="rarity">Rarity</strong>
			</div>
			<div class="qty-label-group">
				<strong class="qty" title="Quantity">Qty.</strong>
			</div>
		</div>

		<transition-group tag="ul" name="card-list-main">
			<li
				v-for="(card, i) in activeCardList.cards" :key="card.name"
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
					<label :for="qtyCardID(i)">Quantity</label>
					<span>&times;</span>
					<input
						type="number"
						:id="qtyCardID(i)"
						min="0" :max="maxQty(card)"
						v-model.lazy="card.qty"
						@change="validateQty(card)"
						@focus="qtyInputFocused($event, card)"
					/>
					<div class="qty-buttons">
						<button
							class="increment" title="Increase quantity"
							@click="increaseQty(card)"
							:disabled="disableIncreaseQtyBtn(card)"
						>+</button>
						<button
							class="decrement" title="Decrease quantity"
							@click="decreaseQty(card)"
						>&minus;</button>
					</div>
				</div>
			</li>
		</transition-group>
	</div>
</template>

<script>
import deckColorMixins from '@/mixins/deckColorMixins.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'
import cardListSectionalGaps from '@/mixins/cardListSectionalGaps.js'

export default {
	mixins: [deckColorMixins, symbolsMarkup, cardListSectionalGaps],
	props: {
		deck: Object
	},
	computed: {
		activeCardList () {
			if (this.$store.state.showSideboard) {
				return this.deck.sideboard
			} else {
				return this.deck
			}
		},
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
		viewCard (card) {
			const store = this.$store
			const decks = store.state.decks

			for (let i = 0; i < decks.length; i++) {
				if (decks[i].name === this.deck.name) {
					if (store.state.showSideboard) {
						decks[i].sideboard.viewedCard = card.name
					} else {
						decks[i].viewedCard = card.name
					}
					break
				}
			}

			store.commit('setDecks', decks)
			store.commit('setShowCard', true)
		},
		colorButton (card) {
			const colors = card.colors
			const mc = colors.find((c) => c === 'multicolor')
			const w = colors.find((c) => c === 'W')
			const u = colors.find((c) => c === 'U')
			const b = colors.find((c) => c === 'B')
			const r = colors.find((c) => c === 'R')
			const g = colors.find((c) => c === 'G')
			const land = /\bLand\b/.test(card.type)

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
				.replaceAll(/{W}/g, symbol.w)
				.replaceAll(/{U}/g, symbol.u)
				.replaceAll(/{B}/g, symbol.b)
				.replaceAll(/{R}/g, symbol.r)
				.replaceAll(/{G}/g, symbol.g)
				.replaceAll(
					/{(\w+)}/g, // Find any other string having a pair of curly brackets with any other alphanumeric characters in between. This gets generic mana in both single and multiple digits and colorless mana ({C}).
					'<span class="mana-symbol">$1</span>' // `$1` is a variable referring to the characters within the parentheses in the regex.
				)
				.replaceAll(
					/{(\w+\/\w+)}/g, // Find any hybrid mana symbols (mana symbols containing a slash), such as `{G/W}`.
					'<span class="mana-symbol hybrid" title="Hybrid mana">$1</span>'
				)
		},
		setRaritySymbol (card) {
			const symbol = this.raritySymbol

			switch (card.rarity) {
				case 'common':
					return symbol.c
				case 'uncommon':
					return symbol.u
				case 'rare':
					return symbol.r
				case 'mythic':
					return symbol.m
				default:
					return symbol.s
			}
		},
		maxQty (card) {
			const basicLandType = /^Basic (\w* )?Land\b/ // Finds `Basic Land`, or any phrase starting with `Basic` and ending with `Land`, such as `Basic Snow Land`.
			const cardName = card.name

			if (
				basicLandType.test(card.type) ||
				cardName === 'Dragon’s Approach' ||
				cardName === 'Persistent Petitioners' ||
				cardName === 'Rat Colony' ||
				cardName === 'Relentless Rats' ||
				cardName === 'Seven Dwarves' ||
				cardName === 'Shadowborn Apostle'
			) {
				return 99
			} else {
				return 4
			}
		},
		validateQty (card) {
			const store = this.$store
			const deck = this.deck
			const cardName = card.name
			const activeCardList = this.activeCardList
			card.qty = Math.round(card.qty)

			activeCardList.viewedCard = cardName

			if (deck.sortBy === 'qty') {
				for (let i = 0; i < store.state.decks.length; i++) {
					const deckI = store.state.decks[i]

					if (deckI.path === this.deck.path) {
						deckI.sortBy = 'unsorted'
						break
					}
				}
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
							this.addSectionalGaps(deck, store.state.sortAttribute)
						}

						this.determineDeckColors(deck)

						saveChanges() // Needed here when inside `setTimeout()`.
					}, 375) // The timeout duration should be as long as the transition duration of the new card's image overlapping the image of the just-removed card in the card display.
				} else {
					card.qty = 1
				}
			} else {
				if (this.maxQty(card) === 99) {
					if (card.qty > 99) {
						alert('⚠ 99 is plenty, don’t you think?')
						card.qty = 99
					}
				} else {
					if (card.qty > 4) {
						alert('⚠ A deck can have no more than 4 of any card with a particular name other than basic land cards.')
						card.qty = 4
					}
				}
				saveChanges()
			}
			function saveChanges () {
				deck.editDate = new Date()
				store.commit('setDecks', store.state.decks)
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
			return (card.qty === this.maxQty(card))
		},
		qtyCardID (cardI) {
			return `qty-d${this.getDeckNumberID}c${cardI}`
		}
	}
}
</script>
