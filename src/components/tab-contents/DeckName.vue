<template>
	<h2>
		<button
			@click="renameDeck(deck, $store.state.decks)"
			class="rename-btn"
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
		renameDeck (deck, decks) {
			const pendingName = prompt('Change the name of this deck:', deck.name)

			function existingDeckName () {
				for (let i = 0; i < decks.length; i++) {
					if (pendingName.toUpperCase() === decks[i].name.toUpperCase()) {
						// Return deck name in its original letter case.
						return decks[i].name
					}
				}
			}

			if (pendingName) {
				if (existingDeckName() && pendingName.toUpperCase() !== deck.name.toUpperCase()) {
					alert(`⚠ Another deck is already named “${existingDeckName()}.” Please give a different name.`)

					this.renameDeck(deck, decks)
				} else { // Apply the new name to the deck.
					deck.name = pendingName
					this.$store.commit('changeActiveTab', deck.name)
					deck.editDate = new Date()
				}
			}
		}
	}
}
</script>
