export default {
	computed: {
		deck () {
			return this.$store.state.decks.find(deck =>
				regexDeckPage(`/deck/${deck.path}`).test(this.$route.path)
			)

			function regexDeckPage (path) {
				return new RegExp('^' + path, 'i')
			}
		}
	}
}
