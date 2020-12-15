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
		renameDeck () {
			const decks = this.$store.state.decks
			const deck = this.deck
			const pendingName = prompt('Change the name of this deck:', deck.name)

			function existingDeckName () {
				// Try searching for a deck whose name matches the pending deck's name, ignoring letter case. If a match exists, then return that deck's name (in its original letter case).
				const found = decks.find(deck =>
					pendingName.toUpperCase() === deck.name.toUpperCase()
				)
				if (found) return found.name
			}

			if (pendingName) {
				if (existingDeckName() && pendingName.toUpperCase() !== deck.name.toUpperCase()) {
					alert(`⚠ Another deck is already named “${existingDeckName()}.” Please give a different name.`)

					this.renameDeck()
				} else { // Apply the new name to the deck.
					deck.name = pendingName
					deck.editDate = new Date()
				}
			}
		}
	}
}
</script>
