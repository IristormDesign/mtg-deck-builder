<template>
	<article class="page-not-found content-box wrap">
		<h2>Error: Page Not Found</h2>

		<figure>
			<img class="card-illustration" src="~@/img/reject.jpg" width="626" height="457" alt="An illustration of a confused man" />
			<figcaption>Illustration from <i><a href="https://scryfall.com/card/stx/50/reject" target="_blank">Reject</a></i> by Zoltan Boros</figcaption>
		</figure>

		<p>Your web browser tried to go to a page that doesn’t exist. If a page did exist at this URL before, it’s been deleted or renamed since then.</p>
		<p v-if="this.$route.path.includes(`/deck/`)">Were you expecting to see a deck page by another user? If so, ask that user to archive his or her deck and send the archive file to you. Then you can open the archive file on the <router-link :to="{name: 'createDeck'}">Create Deck page</router-link> to replicate that user’s deck. <router-link to="/guide/storage-of-deck-data" class="no-text-break">(More info&hellip;)</router-link></p>
	</article>
</template>

<script>
export default {
	beforeCreate () {
		/* Scroll the page to the top in case the 404 page is accessed from the back button and the page had been previously scrolled down. */
		this.$nextTick(() => {
			window.scrollTo(0, 0)
		})
	}
}
</script>
