<template>
	<section class="deck-info more-stats-button">
		<router-link
			v-if="$route.name === 'moreStats'"
			:to="{ name: 'deckMain' }"
		>
			Card List
		</router-link>
		<button
			v-else-if="this.deck.cards.length <= 0"
			disabled
			title="Add at least one card to the deck to view more statistics."
		>
			More Stats
		</button>
		<router-link
			v-else
			:to="{ name: 'moreStats' }"
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
