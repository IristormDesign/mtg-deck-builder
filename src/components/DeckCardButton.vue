<template>
	<button
		@click="viewCard(card)"
		:class="['card-button', setButtonColor]"
		:ref="card.name"
	>
		<div class="card-label-group">
			<h4 class="name">{{ card.name }}</h4>
			<div class="mana" v-html="styleManaSymbols"></div>
		</div>
		<div class="card-label-group">
			<div class="type">{{ card.type }}</div>
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
		deck: Object
	},
	computed: {
		setButtonColor () {
			const colors = this.card.colors
			const w = colors.find(c => c === 'W')
			const u = colors.find(c => c === 'U')
			const b = colors.find(c => c === 'B')
			const r = colors.find(c => c === 'R')
			const g = colors.find(c => c === 'G')
			const land = /\bLand\b/.test(this.card.type)

			if (colors.length > 1) return 'multicolor'
			else if (w) return 'white'
			else if (u) return 'blue'
			else if (b) return 'black'
			else if (r) return 'red'
			else if (g) return 'green'
			else if (land) return 'land'
			else return null
		},
		styleManaSymbols () {
			const symbol = this.manaSymbol

			return this.card.mana
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
				default:
					return symbol.s
			}
		},
		focusCardButton () {
			return this.$store.state.focusCardButton
		}
	},
	watch: {
		/**
		 * Return the browser focus to the card's button after the user has closed the card image pop-up (at narrow viewports).
		 * @param {string} cardToFocus
		 */
		focusCardButton (cardToFocus) {
			if (this.card.name === cardToFocus) {
				this.$refs[cardToFocus].focus()
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/card-buttons.scss';
</style>
