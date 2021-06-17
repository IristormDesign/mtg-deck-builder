<template>
	<article
		class="deck-deleted content-box wrap"
		@click="$store.getters.attentionHeaderButton"
	>
		<p>“{{ $store.state.deletedDeckName }}” is now deleted.</p>
	</article>
</template>

<script>
export default {
	destroyed () {
		// When leaving this page, reset the store variable `deletedDeckName` so that router functions work properly.
		this.$store.commit('setDeletedDeckName', null)
	}
}
</script>
