<template>
	<div class="deck-info deck-name">
		<button
			@click="renameDeck(deck.name)"
			title="Change the name of this deck"
		>
			<h2>{{ deck.name }}</h2>
		</button>
	</div>
</template>

<script>
export default {
	name: 'deck-name',
	props: {
		deck: Object
	},
	methods: {
		renameDeck (failedName, deckNameExists) {
			const store = this.$store
			let message = 'Change the name of this deck:'
			if (deckNameExists) {
				message = store.state.alertNameExists(deckNameExists)
			}
			let newName = prompt(message, failedName)

			if (newName) {
				newName = newName.trim()
				newName = store.state.curlApostrophes(newName)
			}
			if (newName) { // If the user provided any name...
				const newPath = store.state.stringToPath(newName)
				const deckExists = store.getters.existingDeck(newPath)
				const theActiveDeck = () =>
					newPath === this.$route.params.deckPath

				if (newName.length > 50) {
					alert(store.state.alertNameTooLong)
					this.renameDeck(newName)
				} else if (!deckExists || theActiveDeck()) {
					const deck = this.deck

					deck.name = newName
					deck.path = newPath
					deck.editDate = new Date()

					store.commit('setDecks', store.state.decks)
					store.commit('sortDeckMenu')

					if (!theActiveDeck()) {
						this.$router.replace({
							name: 'deck',
							params: { deckPath: newPath }
						})
					}
				} else {
					this.renameDeck(newName, deckExists.name) // Start over this method.
				}
			}
		}
	}
}
</script>
