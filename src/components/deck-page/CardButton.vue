<template>
	<button
		@click="clickCardButton()"
		:class="['card-button', setButtonColor]"
	>
		<div class="card-label-group">
			<h4 class="name" v-html="cardName"></h4>
			<div class="mana" v-html="styleManaSymbols(card.mana)"></div>
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
			function colorPerFace (colors, type) {
				if (colors.length > 1) {
					return 'multicolor'
				} else if (colors.find(c => c === 'W')) {
					return 'white'
				} else if (colors.find(c => c === 'U')) {
					return 'blue'
				} else if (colors.find(c => c === 'B')) {
					return 'black'
				} else if (colors.find(c => c === 'R')) {
					return 'red'
				} else if (colors.find(c => c === 'G')) {
					return 'green'
				} else if (/\bLand\b/.test(type)) {
					return 'land'
				} else {
					return null
				}
			}

			const frontFaceColor = colorPerFace(this.card.colors, this.card.type)
			const backFaceColor = () => {
				if (this.card.name2) {
					return colorPerFace(this.card.colors2, this.card.type2)
				}
			}

			if (this.card.name2 && frontFaceColor !== backFaceColor()) {
				return 'multicolor'
			} else {
				return frontFaceColor
			}
		},
		cardName () {
			let output = this.card.name

			if (this.hasDoubleCastableFaces) {
				output += `<span title="${this.card.name2}"> / ${this.card.name2}</span>`
			}

			return output
		},
		cardType () {
			let output = this.card.type

			if (this.hasDoubleCastableFaces) {
				output += `<span title="${this.card.type2}"> / ${this.card.type2}</span>`
			}

			return output
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
				default:
					return null
			}
		},
		focusCardButton () {
			return this.$store.state.focusCardButton
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
		clickCardButton () {
			this.viewCard(this.card)

			this.$store.commit('focusCardButton', this.i)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/card-buttons.scss';
</style>
