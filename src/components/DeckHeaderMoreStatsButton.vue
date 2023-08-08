<template>
	<section class="deck-info more-stats-button">
		<router-link
			v-if="$route.name === 'moreStats'"
			:to="{ name: 'deckMain' }"
		>
			Card List
		</router-link>
		<button
			v-else-if="this.deck.cards.length <= 0"
			disabled
			title="First add cards to this deck to see more deck statistics."
		>
			More Stats
		</button>
		<router-link
			v-else
			:to="{ name: 'moreStats' }"
		>
			More Stats
		</router-link>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	mounted () {
		const moreStatsButton = document.querySelector('.more-stats-button a')

		if (moreStatsButton) { // This check is needed to prevent an error whenever the More Stats button is an actual `<button>` element (though a disabled one) rather than an `<a>`.
			moreStatsButton.addEventListener('click', () => {
				const article = document.querySelector('.more-stats h3')

				if (article) {
					article.scrollIntoView({
						behavior: 'smooth'
					})
				}
			})
		}
	}
}
</script>
