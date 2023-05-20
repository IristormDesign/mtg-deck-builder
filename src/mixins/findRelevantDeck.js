export default {
	computed: {
		deck () {
			const currentURL = this.$route.path.toLowerCase()

			return this.$store.state.decks.find(deck =>
				currentURL.includes(`/deck/${deck.path}/`)
			)
		}
	}
}
