<template>
	<section class="deck-info more-stats-button">
		<router-link
			v-if="$route.name === 'moreStats'"
			:to="{ name: 'deckEditor' }"
		>
			Card List
		</router-link>
		<button
			v-else-if="this.deck.cards.length <= 0"
			disabled
			title="First add cards to this deck to see more deck statistics."
		>
			More Stats
		</button>
		<router-link
			v-else
			:to="{
				name: 'moreStats',
				params: { toAutoScrollDown: true }
			}"
		>
			More Stats
		</router-link>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	}
}
</script>
