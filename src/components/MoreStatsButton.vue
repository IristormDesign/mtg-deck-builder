<template>
	<section class="deck-info more-stats-button">
		<router-link
			:to="{
				name: 'moreStats',
				params: { deckPath: deck.path },
			}"
		>More Stats</router-link>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	}
}
</script>
