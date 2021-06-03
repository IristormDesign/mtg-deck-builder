<template>
	<section
		class="deck-info more-stats-button"
		@auxclick.prevent.stop="goto"
	>
		<router-link
			:to="{
				name: 'moreStats',
				params: { deckPath: deck.path },
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
