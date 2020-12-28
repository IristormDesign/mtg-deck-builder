<template>
	<h2>
		<button
			@click="renameDeck()" class="rename-btn"
			title="Change the name of this deck"
		><span>{{ deck.name }}</span> <small>Rename</small></button>
	</h2>
</template>

<script>
export default {
	name: 'deck-name',
	props: {
		deck: Object
	},
	methods: {
		renameDeck (redo) {
			const deck = this.deck
			const get = this.$store.getters
			let message = 'Change the name of this deck:'
			if (redo) {
				message = get.alertNameExists(redo)
			}
			const newName = prompt(message, deck.name).trim()

			if (newName) { // If the user provided any name...
				const newPath = get.stringToPath(newName)
				const deckExists = get.existingDeck(newPath)
				const theActiveDeck = () => newPath === this.$route.params.deckPath

				if (!deckExists || theActiveDeck()) {
					deck.name = newName
					deck.path = newPath
					deck.editDate = new Date()

					if (!theActiveDeck()) {
						this.$router.replace({
							name: 'deck',
							params: { deckPath: newPath }
						})
					}
				} else {
					this.renameDeck(deckExists.name) // Start over this method.
				}
			}
		}
	}
}
</script>
