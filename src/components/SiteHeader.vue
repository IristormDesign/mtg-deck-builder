<template>
	<header class="site-header">
		<div class="wrap">
			<div class="site-title">
				<h1 @auxclick.prevent.stop="goto">
					<router-link :to="{name: 'home'}">MTG Deck Builder</router-link>
				</h1>
				<span class="by-iristorm">by <a href="https://iristormdesign.com/" target="_blank" rel="noopener">Iristorm Design</a></span>
			</div>

			<button class="toggler primary-btn" @click="toggleSiteMenu()">Menu</button>

			<nav v-show="showSiteMenu" class="site-menu">
				<ul>
					<li @auxclick.prevent.stop="goto" class="site-header-link">
						<button
							v-if="$router.currentRoute.name === 'manual'" @click="scrollToTop()"
						>Manual</button>
						<router-link
							v-else :to="{name: 'manual'}"
						>Manual</router-link>
					</li>
					<li class="add-new-deck site-header-link">
						<button class="primary-btn" @click="createDeck()">
							Create Deck
						</button>
					</li>
					<li class="deck-menu site-header-link">
						<button
							class="deck-selector primary-btn"
							@click="toggleDeckMenu()" :disabled="disableMenuButton"
							:title="disabledMenuButtonTitle"
						>
							Open Deck
						</button>

						<div class="open-deck-heading">Open Deck:</div>

						<ul v-show="showDeckMenu">
							<li
								v-for="deck in $store.state.decks" :key="deck.name"
								@auxclick.prevent.stop="goto"
							>
								<router-link
									v-if="$route.params.deckPath !== deck.path"
									:to="{ name: 'deck', params: { deckPath: deck.path } }"
									@click.native="toggleDeckMenu()"
								>
									{{ deck.name }}
								</router-link>
							</li>
						</ul>
					</li>
					<li @auxclick.prevent.stop="goto" class="site-header-link">
						<router-link :to="{name: 'contact'}">
							Contact
						</router-link>
					</li>
				</ul>

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
	data () {
		return {
			showSiteMenu: false,
			showDeckMenu: false,
			overlayTransitionActive: false
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
		})

		const headerLinks = document.querySelectorAll('.site-title a, .site-header-link')

		headerLinks.forEach((link) => {
			// If the Open Deck menu is open and if the user tab focuses onto another link or button in the site header, then close the Open Deck menu.
			link.addEventListener('focus', (event) => {
				if (this.showDeckMenu && link === event.target) {
					this.showDeckMenu = false
					this.$store.commit('toggleOverlay')
				}
			})

			link.addEventListener('click', (event) => {
				setTimeout(() => {
					this.showSiteMenu = false
				}, 125)
				// this.$store.commit('toggleOverlay')
			})
		})
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
					return 'You currently have no other deck to open.'
				}
			} else {
				return null
			}
		}
	},
	methods: {
		scrollToTop () {
			window.scrollTo(0, 0)
		},
		toggleSiteMenu () {
			if (this.showSiteMenu) {
				this.showSiteMenu = false
			} else {
				this.showSiteMenu = true
			}
		},
		toggleDeckMenu () {
			if (!this.overlayTransitionActive) {
				this.overlayTransitionActive = true

				if (this.showDeckMenu) {
					this.showDeckMenu = false
				} else {
					this.showDeckMenu = true
				}

				this.$store.commit('toggleOverlay')

				setTimeout(() => {
					this.overlayTransitionActive = false
				}, 250) // Equal to transition's duration
			}
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
