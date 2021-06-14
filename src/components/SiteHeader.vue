<template>
	<header class="site-header">
		<div class="wrap">
			<div class="site-title">
				<h1 @auxclick.prevent.stop="goto">
					<router-link :to="{name: 'home'}">MTG Deck Builder</router-link>
				</h1>
				<span class="by-iristorm">by <a href="https://iristormdesign.com/" target="_blank" rel="noopener">Iristorm Design</a></span>
			</div>

			<button
				class="site-menu-toggler primary-btn tabbable"
				@click="toggleSiteMenu()"
			>Menu</button>

			<nav v-show="showSiteMenu" class="site-menu">
				<ul>
					<li @auxclick.prevent.stop="goto" class="site-header-link">
						<!-- <button
							v-if="$router.currentRoute.name === 'manual'"
							@click="scrollToTop()"
						>Manual</button> -->
						<router-link
							:to="{name: 'manual'}"
							:class="'tabbable'"
						>Manual</router-link>
					</li>
					<li class="add-new-deck site-header-link">
						<button class="primary-btn tabbable" @click="createDeck()">
							Create Deck
						</button>
					</li>
					<li class="deck-menu site-header-link">
						<button
							class="deck-menu-toggler primary-btn tabbable"
							@click="toggleDeckMenu()"
							:disabled="disableMenuButton"
							:title="disabledMenuButtonTitle"
						>
							Open Deck
						</button>

						<div class="open-deck-heading">
							<strong>Open Deck:</strong>
						</div>
						<ul v-show="showDeckMenu">
							<li
								v-for="deck in $store.state.decks" :key="deck.name"
								@auxclick.prevent.stop="goto"
							>
								<router-link
									v-show="$route.params.deckPath !== deck.path"
									:to="{
										name: 'deck',
										params: { deckPath: deck.path }
									}"
									:class="'tabbable'"
									@click.native="closeAllPopups()"
								>
									{{ deck.name }}
								</router-link>
							</li>
						</ul>
					</li>
					<li @auxclick.prevent.stop="goto" class="site-header-link contains-tabbable">
						<router-link :to="{name: 'contact'}" :class="'tabbable'">
							Contact
						</router-link>
					</li>
				</ul>
			</nav>
		</div>

		<bg-overlay :popup="showingAnyPopup" @closePopups="closeAllPopups()" />
	</header>
</template>

<script>
import BgOverlay from '@/components/BgOverlay.vue'

export default {
	components: {
		BgOverlay
	},
	data () {
		return {
			showSiteMenu: false,
			showDeckMenu: false
		}
	},
	mounted () {
		document.addEventListener('keyup', (event) => {
			const keyEvent = event.key

			if (keyEvent === 'Escape' || keyEvent === 'Esc') {
				if (this.showingAnyPopup) {
					this.closeAllPopups()
				}
			}
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
		},
		showingAnyPopup () {
			if (this.showSiteMenu || this.showDeckMenu) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		// scrollToTop () {
		// 	window.scrollTo(0, 0)
		// 	this.closeAllPopups()
		// },
		toggleSiteMenu () {
			if (this.showSiteMenu) {
				this.showSiteMenu = false
			} else {
				this.showSiteMenu = true
			}

			this.setMenuAccessibility()
		},
		toggleDeckMenu () {
			if (this.showDeckMenu) {
				this.showDeckMenu = false
			} else {
				this.showDeckMenu = true
			}

			this.setMenuAccessibility()
		},
		closeAllPopups () {
			this.showDeckMenu = false
			this.showSiteMenu = false
		},
		setMenuAccessibility () {
			const headerLinks = document.querySelectorAll('.site-title a, .site-header-link > a, .add-new-deck button')

			headerLinks.forEach((headerLink) => {
				// When the mobile menu or the deck menu is opened, close it when any of its contained links are clicked.
				headerLink.addEventListener('click', () => {
					this.closeAllPopups()
				})

				// If the Open Deck menu is open and if the user tab-focuses onto another first-level link or button in the site header, then close the Open Deck menu.
				headerLink.addEventListener('focus', () => {
					if (this.showDeckMenu) {
						this.closeAllPopups()
					}
				})
			})

			// If the mobile site menu is opened and the user tab-focuses onto a link that's outside the menu, then close the menu.
			const siteMenuLinksArray = Array.prototype.slice.call(
				document.querySelectorAll('.site-header .tabbable')
			)
			const allLinks = document.querySelectorAll('a, button')

			allLinks.forEach(link => {
				link.addEventListener('focus', () => {
					const anyFocus = siteMenuLinksArray.find(
						link => link === document.activeElement
					)

					console.log(anyFocus)

					if (this.showSiteMenu) {
						if (anyFocus === undefined) {
							this.closeAllPopups()
						}
					}
				})
			})
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
