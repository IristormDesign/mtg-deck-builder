<template>
	<button
		@click="clickCardBar()"
		:class="['card-bar', setButtonColor]"
	>
		<div class="card-label-group">
			<h4 class="name" v-html="cardName"></h4>
			<div class="mana" v-html="cardMana"></div>
		</div>
		<div class="card-label-group">
			<div class="type" v-html="cardType"></div>
			<div class="rarity" v-html="setRaritySymbol"></div>
		</div>
	</button>
</template>

<script>
import cardListFunctions from '@/mixins/cardListFunctions.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [cardListFunctions, symbolsMarkup],
	props: {
		card: Object,
		deck: Object,
		i: Number
	},
	data () {
		return {
			backFaceIsLandType: /\bLand\b/.test(this.card.type2)
		}
	},
	computed: {
		hasDoubleCastableFaces () {
			switch (this.card.layout) {
				case 'adventure': case 'modal_dfc': case 'split':
					return true
				default:
					return false
			}
		},
		setButtonColor () {
			const found = (colorSymbol) => {
				return this.card.colors.find(
					color => color === colorSymbol
				)
			}

			if (this.card.colors.length > 1) {
				return 'multi'
			} else if (found('W')) {
				return 'white'
			} else if (found('U')) {
				return 'blue'
			} else if (found('B')) {
				return 'black'
			} else if (found('R')) {
				return 'red'
			} else if (found('G')) {
				return 'green'
			} else if (/\bLand\b/.test(this.card.type)) {
				return 'land'
			} else {
				return 'colorless'
			}
		},
		cardName () {
			return this.card.name + (
				this.hasDoubleCastableFaces
					? `<span title="${this.card.name2}"> // ${this.card.name2}</span>`
					: ''
			)
		},
		cardMana () {
			return this.styleManaSymbols(this.card.mana) + (
				this.hasDoubleCastableFaces
					? ` // ${this.styleManaSymbols(this.card.mana2)}`
					: ''
			)
		},
		cardType () {
			return this.card.type + (
				this.hasDoubleCastableFaces
					? `<span title="${this.card.type2}"> // ${this.card.type2}</span>`
					: ''
			)
		},
		setRaritySymbol () {
			const symbol = this.raritySymbol

			switch (this.card.rarity) {
				case 'common':
					return symbol.c
				case 'uncommon':
					return symbol.u
				case 'rare':
					return symbol.r
				case 'mythic':
					return symbol.m
				case 'special':
					return symbol.s
				case 'bonus':
					return symbol.b
				default:
					return null
			}
		}
	},
	methods: {
		styleManaSymbols (cardFaceMana) {
			const symbol = this.manaSymbol

			return cardFaceMana
				.replaceAll(/{W}/g, symbol.w)
				.replaceAll(/{U}/g, symbol.u)
				.replaceAll(/{B}/g, symbol.b)
				.replaceAll(/{R}/g, symbol.r)
				.replaceAll(/{G}/g, symbol.g)
				.replaceAll(
					/{(\w)}/g, // Find a string having any singular alphanumeric character between two curly braces. This gets single-digit generic mana and required colorless mana ("{C}").
					'<span class="mana-symbol">$1</span>' // `$1` is a variable referring to the characters within the parentheses in the regex.
				)
				.replaceAll(
					/{(\w\w+)}/g, // Find a string having two or more alphanumeric characters between a pair of curly braces. This is for finding double-digit generic mana symbols. (A slash doesn't count as an alphanumeric character, so this regex doesn't find hybrid mana symbols.)
					'<span class="mana-symbol"><div class="double-digits">$1</div></span>'
				)
				.replaceAll(
					/{(\w+\/\w+)}/g, // Find any hybrid mana symbols (mana symbols containing a slash), such as `{G/W}`.
					'<span class="mana-symbol hybrid"><div>$1</div></span>'
				)
				.replaceAll(
					/{\w+\/\w+\/.*}/g, // Find hybrid mana symbols having 2 or more slashes, such as `{G/U/P}`. (These symbols are very rare but they do exist.)
					'<span class="mana-symbol long-hybrid"><div>…</div></span>'
				)
		},
		clickCardBar () {
			this.viewCard(this.card)

			this.$store.commit('highlightedCardLIIndex', -1)
			this.$store.commit('focusCardBar', this.i)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/card-bars.scss';
</style>
