<template>
	<article class="page-not-found content-box wrap">
		<h2>Page Not Found</h2>

		<figure class="card-illustration">
			<img
				src="@/img/reject.jpg"
				srcset="@/img/reject.jpg 1x, @/img/reject@2x.jpg 2x"
				width="469" height="344"
				alt="An illustration of a befuddled goblin who just got a stamped imprint of a letter X on his forehead"
			/>
			<figcaption>Illustration from <a href="https://scryfall.com/card/stx/50/reject" target="_blank">Reject<svg><use href="#open-in-new-icon" /></svg></a> by Zoltan Boros</figcaption>
		</figure>

		<p class="bigger">Your web browser tried to go to a page that doesn’t exist. If a page did exist at this URL before, it’s been deleted or renamed since then.</p>
		<p v-if="this.$route.path.includes(`/deck/`)" class="small">Or, were you expecting to see the page for a deck made by another user? If so, ask that user to archive his or her deck and send the archive file to you. Then you can open the archive file on the <router-link :to="{name: 'createDeck'}">Create Deck page</router-link> to replicate that user’s deck. <router-link to="/guide/storage-of-deck-data" class="no-text-break">(More info&hellip;)</router-link></p>
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
