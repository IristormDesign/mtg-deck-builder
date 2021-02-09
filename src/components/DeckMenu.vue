<template>
	<nav class="deck-menu">
		<div
			class="deck-menu-group"
			v-show="$store.state.decks.length >= 1"
		>
			<button
				class="deck-selector" @click="toggleDeckMenu()"
			>📂 Open Deck</button>

			<ul @blur="toggleDeckMenu()">
				<li v-for="(deck, i) in $store.state.decks" :key="i">
					<router-link
						v-if="$route.params.deckPath !== deck.path"
						:to="{ name: 'deck', params: { deckPath: deck.path } }"
						@click.native="toggleDeckMenu()"
					>{{ deck.name }}</router-link>
				</li>
			</ul>
		</div>
		<button class="add-new-deck" @click="createDeck()">
			➕ New Deck
		</button>
	</nav>
</template>

<script>
export default {
	name: 'deck-menu',
	mounted () {
		document.addEventListener('keyup', (event) => {
			const keyEvent = event.key
			const deckMenu = document.querySelector('.deck-menu ul')

			if (keyEvent === 'Escape' || keyEvent === 'Esc') {
				if (deckMenu.classList.contains('show')) {
					this.toggleDeckMenu()
				}
			}
		}, false)
	},
	methods: {
		toggleDeckMenu () {
			const deckMenu = document.querySelector('.deck-menu ul')

			deckMenu.classList.toggle('show')
			this.$store.commit('toggleOverlay')
		},
		createDeck (failedName, existingDeckName) {
			const store = this.$store
			let message = 'Name this new deck:'
			if (existingDeckName) {
				message = store.state.alertNameExists(existingDeckName)
			}
			let name = prompt(message, failedName)

			// First edit the given name to remove any excess white space.
			if (name) {
				name = name.trim()
				name = store.state.curlApostrophes(name)
			}
			if (name) { // If the user entered any name...
				const path = store.state.stringToPath(name)
				const deckExists = store.getters.existingDeck(path)

				if (deckExists) {
					this.createDeck(failedName, deckExists.name) // Restart.
				} else if (name.length > 50) {
					alert(store.state.alertNameTooLong)
					this.createDeck(name) // Restart.
				} else {
					const updatedDecksArray = store.state.decks

					updatedDecksArray.push({
						name: name,
						path: path,
						cards: [],
						editDate: new Date(),
						description: '',
						viewedCard: ''
					})
					store.commit('setDecks', updatedDecksArray)

					this.$router.push({
						name: 'deck',
						params: { deckPath: path }
					})
				}
			} // Else, if the user left the prompt blank, do nothing.
		}
	}
}
</script>
