<template>
	<section class="deck-info deck-name">
		<button
			@click="renameDeck(deck.name)"
			title="Rename this deck"
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
		renameDeck (failedName) {
			let submittedName = prompt('Rename this deck:', failedName)

			submittedName = this.removeExcessSpaces(submittedName)

			if (submittedName) { // Check `submittedName` again since it's been trimmed.
				const path = this.stringToPath(submittedName)

				if (this.nameIsApproved(submittedName, path)) {
					const deck = this.deck
					deck.name = submittedName
					deck.path = path
					deck.editDate = new Date()

					this.$store.commit('decks', this.$store.state.decks)
					this.$store.commit('sortDeckMenu')

					if (path !== this.$route.params.deckPath) {
						this.$router.replace({
							name: 'deckEditor',
							params: { deckPath: path }
						})
					}
				} else {
					this.renameDeck(submittedName)
				}
			}
		}
	}
}
</script>
