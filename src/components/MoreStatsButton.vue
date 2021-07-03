<template>
	<section class="deck-info more-stats-button">
		<router-link
			:to="{
				name: 'moreStats',
				params: {
					deckPath: deck.path,
					deck: deck
				},
			}"
		>More Statistics</router-link>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	}
}
</script>
