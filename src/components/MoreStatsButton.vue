<template>
	<section class="deck-info more-stats-button">
		<router-link
			v-if="this.deck.cards.length > 0"
			:to="{
				name: 'moreStats',
				params: {
					deckPath: deck.path,
					deck: deck
				},
			}">
			More Statistics
		</router-link>
		<button
			v-else
			disabled
			title="Add at least one card to the deck to view more statistics."
		>
			More Statistics
		</button>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	}
}
</script>
