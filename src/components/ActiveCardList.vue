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
				<input
					type="checkbox"
					class="card-star"
					@change="toggleCardStar(card)"
					v-model="card.starred"
					:name="'s' + i"
				>
				<button
					@click="viewCard(card)"
					:class="['card-button', colorButton(card)]"
					:ref="card.name"
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

				<card-quantity :card="card" :deck="deck" :i="i" />
			</li>
		</transition-group>
	</div>
</template>

<script>
import CardQuantity from '@/components/DeckCardQuantity.vue'
import cardListFunctions from '@/mixins/cardListFunctions.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	components: { CardQuantity },
	mixins: [cardListFunctions, symbolsMarkup],
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
		focusCardButton () {
			return this.$store.state.focusCardButton
		}
	},
	watch: {
		focusCardButton (name) {
			this.$refs[name][0].focus() // Return browser focus to the card's button after the user has closed the card image pop-up (at narrow viewports).
		}
	},
	methods: {
		toggleCardStar (card) {
			const deck = this.deck

			deck.editDate = new Date()
			this.activeCardList.viewedCard = card.name

			if (deck.sortBy === 'starred') {
				deck.sortBy = ''
				deck.cards.forEach(eachCard => {
					eachCard.gapAfter = false
				})
				deck.sideboard.cards.forEach(eachCard => {
					eachCard.gapAfter = false
				})
			}

			this.$store.commit('decks', this.$store.state.decks)
		},
		colorButton (card) {
			const colors = card.colors
			const w = colors.find(c => c === 'W')
			const u = colors.find(c => c === 'U')
			const b = colors.find(c => c === 'B')
			const r = colors.find(c => c === 'R')
			const g = colors.find(c => c === 'G')
			const land = /\bLand\b/.test(card.type)

			if (colors.length > 1) return 'multicolor'
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
					'<span class="mana-symbol hybrid" title="Hybrid mana"><div>$1</div></span>'
				)
				.replaceAll(
					/{\w+\/\w+\/.*}/g, // Find hybrid mana symbols having 2 or more slashes, such as `{G/U/P}`. (These symbols are very rare but they do exist.)
					'<span class="mana-symbol long-hybrid" title="Hybrid mana"><div>…</div></span>'
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
		}
	}
}
</script>
