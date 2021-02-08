<template>
	<nav class="deck-menu">
		<div v-show="$store.state.getDecks.length > 0">
			<button
				class="deck-selector primary-btn"
				@click="toggleDeckMenu()"
			>Select a Deck to View</button>
			<ul @blur="toggleDeckMenu()">
				<li v-for="(deck, i) in $store.state.getDecks" :key="i">
					<div
						v-if="$route.params.deckPath === deck.path"
						class="active-tab"
					>{{ deck.name }}</div>
					<router-link
						v-else
						:to="{ name: 'deck', params: { deckPath: deck.path } }"
						@click.native="toggleDeckMenu()"
					>{{ deck.name }}</router-link>
				</li>
			</ul>
		</div>
		<button class="add-new-deck" @click="createDeck()">
			Create a New Deck
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
			const state = this.$store.state
			const getters = this.$store.getters
			let message = 'Name this new deck:'
			if (existingDeckName) {
				message = getters.alertNameExists(existingDeckName)
			}
			let name = prompt(message, failedName)

			// First edit the given name to remove any excess white space.
			if (name) {
				name = name.trim()
				name = getters.curlApostrophes(name)
			}
			if (name) { // If the user entered any name...
				const path = getters.stringToPath(name)
				const deckExists = getters.existingDeck(path)

				if (deckExists) {
					this.createDeck(failedName, deckExists.name) // Restart.
				} else if (name.length > 50) {
					alert(state.alertNameTooLong)
					this.createDeck(name) // Restart.
				} else {
					const updatedDecks = state.getDecks
					updatedDecks.push({
						name: name,
						path: path,
						cards: [],
						editDate: new Date(),
						description: '',
						viewedCard: ''
					})
					this.$store.commit('setDecks', updatedDecks)

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
