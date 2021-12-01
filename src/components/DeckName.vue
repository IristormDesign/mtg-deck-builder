<template>
	<section class="deck-info deck-name">
		<button
			@click="renameDeck(deck.name)"
			title="Change the name of this deck"
		>
			<h2>{{ deck.name }}</h2>
		</button>
	</section>
</template>

<script>
import stringMethods from '@/mixins/stringMethods.js'

export default {
	mixins: [stringMethods],
	props: {
		deck: Object
	},
	methods: {
		renameDeck (failedName, deckNameExists) {
			let message = 'Change the name of this deck:'
			if (deckNameExists) {
				message = this.alertNameExists(deckNameExists)
			}
			let newName = prompt(message, failedName)

			if (newName) {
				newName = newName.trim()
				newName = this.curlApostrophes(newName)
			}
			if (newName) { // If the user provided any name...
				const store = this.$store
				const newPath = this.stringToPath(newName)
				const deckExists = store.getters.existingDeck(newPath)
				const theActiveDeck = () =>
					newPath === this.$route.params.deckPath

				if (newName.length > 50) {
					alert('⚠ That deck name is too long. Please shorten it to fewer than 50 characters.')
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
