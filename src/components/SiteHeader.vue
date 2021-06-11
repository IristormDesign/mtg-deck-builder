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
				class="site-menu-toggler primary-btn" @click="toggleSiteMenu()"
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
						>Manual</router-link>
					</li>
					<li class="add-new-deck site-header-link">
						<button class="primary-btn" @click="createDeck()">
							Create Deck
						</button>
					</li>
					<li class="deck-menu site-header-link">
						<button
							class="deck-menu-toggler primary-btn"
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
									v-if="$route.params.deckPath !== deck.path"
									:to="{
										name: 'deck',
										params: { deckPath: deck.path }
									}"
									@click.native="closeAllPopups()"
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

		this.setMenuAccessibility()
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

			// When the mobile menu or the deck menu is opened, close it when any of its contained links are clicked.
			headerLinks.forEach((headerLink) => {
				headerLink.addEventListener('click', (event) => {
					this.closeAllPopups()
				})
			})

			// If the Open Deck menu is open and if the user tab-focuses onto another link or button in the site header, then close the Open Deck menu.
			headerLinks.forEach((headerLink) => {
				headerLink.addEventListener('focus', () => {
					if (this.showDeckMenu) {
						this.closeAllPopups()
					}
				})
			})

			// If the mobile site menu is opened and the user tab-focuses onto a link that's outside the menu (whether before or after it), then close the menu.
			const siteMenuLinks = document.querySelectorAll('.site-menu a, .site-menu button, .site-menu-toggler')

			for (let i = 0; i < siteMenuLinks.length; i++) {
				const linkBeforeMenu = siteMenuLinks[0].previousElementSibling.querySelector('a, button')

				linkBeforeMenu.addEventListener('focus', () => {
					if (this.showSiteMenu) {
						this.closeAllPopups()
					}
				})
			}

			const secondLastMenuLink = siteMenuLinks[siteMenuLinks.length - 2]
			let secondLastMenuLinkFocused = false

			secondLastMenuLink.addEventListener('focus', () => {
				secondLastMenuLinkFocused = true
			})

			const lastMenuLink = siteMenuLinks[siteMenuLinks.length - 1]

			lastMenuLink.addEventListener('focus', () => {
				secondLastMenuLinkFocused = false
			})
			lastMenuLink.addEventListener('blur', () => {
				setTimeout(() => {
					if (!secondLastMenuLinkFocused) {
						if (this.showSiteMenu) {
							this.closeAllPopups()
						}
					}
				}, 0)
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

					this.setMenuAccessibility()
				}
			} // Else, if the user left the prompt blank, do nothing.
		}
	}
}
</script>
