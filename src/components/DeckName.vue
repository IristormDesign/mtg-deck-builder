<template>
	<h2>
		<button
			@click="renameDeck(deck.name)" class="rename-btn"
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
		renameDeck (failedName, deckNameExists) {
			const deck = this.deck
			const get = this.$store.getters
			let message = 'Change the name of this deck:'
			if (deckNameExists) {
				message = get.alertNameExists(deckNameExists)
			}
			let newName = prompt(message, failedName)

			if (newName) {
				newName = newName.trim()
			}
			if (newName) { // If the user provided any name...
				const newPath = get.stringToPath(newName)
				const deckExists = get.existingDeck(newPath)
				const theActiveDeck = () => newPath === this.$route.params.deckPath

				if (newName.length > 50) {
					alert(this.$store.state.alertNameTooLong)
					this.renameDeck(newName)
				} else if (!deckExists || theActiveDeck()) {
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
					this.renameDeck(newName, deckExists.name) // Start over this method.
				}
			}
		}
	}
}
</script>
