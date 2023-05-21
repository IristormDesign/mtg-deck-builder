<template>
	<article
		class="deck-deleted content-box wrap"
		@click="$store.getters.attentionHeaderButton"
	>
		<img class="intro-illustration" src="~@/img/planar-cleansing.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
		<p class="bigger">“{{ $store.state.deletedDeckName }}” is now deleted.</p>
		<small>(Illustration: <a href="https://scryfall.com/card/m20/33/planar-cleansing" target="_blank" rel="noopener noreferrer"><i>Planar Cleansing</i></a> by Michael Komarck)</small>
	</article>
</template>

<script>
export default {
	created () {
		const store = this.$store
		const remainingDecks = store.state.decks.filter(
			deck => deck.name !== store.state.deletedDeckName
		)

		store.commit('setDecks', remainingDecks)
	},
	destroyed () {
		// When leaving this page, reset the store variable `deletedDeckName` so that router functions work properly.
		this.$store.commit('setDeletedDeckName', null)
	}
}
</script>
