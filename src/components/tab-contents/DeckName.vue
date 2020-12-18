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
			const name = prompt(message, deck.name)

			if (name) {
				const path = get.stringToPath(name)
				const deckExists = get.existingDeck(path)

				if (deckExists && name !== deck.name) { // If the given deck name already exists, AND if the letter casing of the name WASN'T modified...
					this.renameDeck(deckExists.name)
				} else {
					deck.name = name
					deck.path = path
					deck.editDate = new Date()

					if (path !== this.$route.params.deckPath) {
						this.$router.replace({
							name: 'deck',
							params: { deckPath: path }
						})
					}
				}
			}
		}
	}
}
</script>
