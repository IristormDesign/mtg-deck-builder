<template>
	<article class="page-not-found content-box wrap">
		<h2>Page Not Found</h2>

		<figure>
			<img class="intro-illustration" src="~@/img/one-with-nothing.jpg" width="616" height="412" alt="One with Nothing" />
			<figcaption>(Illustration: <i><a href="https://scryfall.com/card/sok/84/one-with-nothing" target="_blank">One with Nothing</a></i> by Jim Nelson)</figcaption>
		</figure>

		<p>Your web browser tried to go to a page that doesn’t exist at the given URL. If a page existed here before, it has since been deleted or moved.</p>
		<p v-if="this.$route.path.includes(`/deck/`)">Did you arrive on this error page expecting to see a deck page created by another user? If so, ask that user to export his or her deck as a deck data file and send it to you. For more info, <router-link to="/manual#m-storage-of-deck-data">see the user manual on storage of deck data</router-link>.</p>
	</article>
</template>

<script>
export default {
	created () {
		// Scroll the page to the top in case the 404 page is accessed from the back button and the page had been previously scrolled down.
		this.$nextTick(() => {
			window.scrollTo(0, 0)
		})
	}
}
</script>
