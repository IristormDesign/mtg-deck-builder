<template>
	<article class="create-deck-page content-box">
		<h2>Create Deck</h2>

		<div class="intro">
			<figure>
				<img class="card-illustration" src="~@/img/terramorphic-expanse.jpg" width="626" height="457" alt="An illustration of a landscape magically transforming into various types of terrain" />
				<figcaption>Illustration from <i><a href="https://scryfall.com/card/j25/156/terramorphic-expanse" target="_blank">Terramorphic Expanse<svg><use href="#open-in-new-icon" /></svg></a></i> by Alayna Danner</figcaption>
			</figure>
			<p>Create a deck in two ways: Either start from a new, empty deck page and add cards to it, or replicate the pre-constructed decks from a deck archive file. <router-link to="/guide/create-deck">(More info&hellip;)</router-link></p>
		</div>
		<div class="columns">
			<start-new-deck />
			<replicate-archives />
		</div>
	</article>
</template>

<script>
import StartNewDeck from '@/components/StartNewDeck.vue'
import ReplicateArchives from '@/components/ReplicateArchives.vue'
import sortDeckMenu from '@/mixins/sortDeckMenu.js'

export default {
	components: { StartNewDeck, ReplicateArchives },
	mixins: [sortDeckMenu],
	methods: {
		goToDeckPage (path) {
			this.sortDeckMenu()

			this.$router.push({
				name: 'listEditor',
				params: { deckPath: path }
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-create-deck.scss';
</style>
