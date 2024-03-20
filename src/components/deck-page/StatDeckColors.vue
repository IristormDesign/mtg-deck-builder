<template>
	<section class="deck-info deck-colors">
		<h3>Mana Colors</h3>

		<div
			v-if="deck.colors.length === 0"
			class="output no-colors"
		>0</div>
		<div
			v-else
			class="output" :class="sizeManaSymbols(deck)"
			v-html="renderManaSymbols(deck)"
		/>
	</section>
</template>

<script>
import deckColors from '@/mixins/deckColors.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [deckColors, symbolsMarkup],
	props: {
		deck: Object
	}
}
</script>
