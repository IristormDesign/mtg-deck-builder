<template>
	<section v-show="deck.colors.length > 0" class="deck-info deck-colors">
		<h3>Using Colors</h3>

		<div
			class="output" :class="resizeManaSymbols(deck)"
			v-html="renderManaSymbols(deck)"
		/>
	</section>
</template>

<script>
import deckColorMixins from '@/mixins/deckColorMixins.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [deckColorMixins, symbolsMarkup],
	props: {
		deck: Object
	}
}
</script>
