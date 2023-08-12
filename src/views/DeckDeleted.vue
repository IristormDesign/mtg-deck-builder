<template>
	<article
		class="deck-deleted content-box wrap"
		@click="$store.getters.attentionHeaderButton"
	>
		<figure>
			<img class="intro-illustration" src="~@/img/planar-cleansing.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
			<figcaption>(Illustration: <a href="https://scryfall.com/card/m20/33/planar-cleansing" target="_blank"><i>Planar Cleansing</i></a> by Michael Komarck)</figcaption>
		</figure>
		<p class="bigger">“{{ $store.state.deletedDeckName }}” is now deleted.</p>
	</article>
</template>

<script>
export default {
	created () {
		this.removeDeckFromDecks()
	},
	destroyed () {
		// When leaving this page, reset the store variable `deletedDeckName` so that router functions work properly.
		this.$store.commit('setDeletedDeckName', null)
	},
	methods: {
		removeDeckFromDecks () {
			const remainingDecks = this.$store.state.decks.filter(
				deck => deck.name !== this.$store.state.deletedDeckName
			)

			this.$store.commit('setDecks', remainingDecks)
		}
	}
}
</script>
