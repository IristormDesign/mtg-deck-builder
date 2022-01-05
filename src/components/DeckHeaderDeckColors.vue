<template>
	<section class="deck-info deck-colors">
		<h3>Using Colors</h3>

		<div
			v-if="deck.colors.length > 0"
			class="output" :class="resizeManaSymbols(deck)"
			v-html="renderManaSymbols(deck)"
		/>
		<div v-else class="output">
			<span class="no-colors">0</span>
		</div>
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
