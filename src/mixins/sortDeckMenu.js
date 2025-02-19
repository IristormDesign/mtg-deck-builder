export default {
	methods: {
		sortDeckMenu () {
			this.$store.state.decks.sort((a, b) => {
				const deckA = a.name.toUpperCase()
				const deckB = b.name.toUpperCase()

				// return deckA - deckB

				if (deckA > deckB) return 1
				else if (deckA < deckB) return -1
				else return 0
			})
		}
	}
}
