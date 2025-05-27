<template>
	<article class="create-deck-page content-box">
		<h2>Create Deck</h2>

		<div class="intro">
			<figure class="card-illustration">
				<img
					src="@/img/terramorphic-expanse.jpg"
					srcset="@/img/terramorphic-expanse.jpg 1x, @/img/terramorphic-expanse@2x.jpg 2x"
					width="469" height="343"
					alt="An illustration of a landscape magically transforming into various types of terrain, with a burst of light emanating from the center"
				/>
				<figcaption>Illustration from <a href="https://scryfall.com/card/j25/156/terramorphic-expanse" target="_blank">Terramorphic Expanse<svg><use href="#open-in-new-icon" /></svg></a> by Alayna Danner</figcaption>
			</figure>
			<p>Create a deck in two ways: Either start from a new, empty deck page and add cards to it, or replicate the pre-constructed decks from a deck archive file you may have. <router-link to="/guide/create-deck">(More info&hellip;)</router-link></p>
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
	metaInfo: {
		title: 'Create Deck'
	},
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
	@use '@/sass/page-create-deck.scss';
</style>
