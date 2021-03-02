<template>
	<header class="site-header">
		<div class="wrap">
			<h1>
				<router-link :to="{name: 'home'}">MTG Deck Organizer</router-link>
			</h1>

			<nav class="site-menu">
				<div class="deck-menu">
					<button
						class="deck-selector" @click="toggleDeckMenu()"
						:disabled="disableMenuButton"
						:title="disabledMenuButtonTitle"
					>📂 Open Deck</button>

					<ul v-show="showDeckMenu">
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
					➕ Create Deck
				</button>

				<transition name="overlay">
					<div
						v-show="$store.state.showOverlay"
						class="bg-overlay" @click="toggleDeckMenu()"
					></div>
				</transition>
			</nav>
		</div>
	</header>
</template>

<script>
export default {
	name: 'site-header',
	data () {
		return {
			showDeckMenu: false
		}
	},
	mounted () {
		document.addEventListener('keyup', (event) => {
			const keyEvent = event.key

			if (keyEvent === 'Escape' || keyEvent === 'Esc') {
				if (this.showDeckMenu) {
					this.toggleDeckMenu()
				}
			}
		}, false)
	},
	computed: {
		disableMenuButton () {
			if (
				this.$store.state.decks.length <= 1 &&
				this.$route.params.deckPath
			) {
				return true
			} else if (this.$store.state.decks.length <= 0) {
				return true
			} else {
				return false
			}
		},
		disabledMenuButtonTitle () {
			if (this.disableMenuButton) {
				if (this.$store.state.decks.length <= 0) {
					return 'You have no more decks. Create a new one!'
				} else {
					return 'You currently don’t have another deck.'
				}
			} else {
				return null
			}
		}
	},
	methods: {
		toggleDeckMenu () {
			if (this.showDeckMenu) {
				this.showDeckMenu = false
			} else {
				this.showDeckMenu = true
			}

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
					store.commit('sortDeckMenu')

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
