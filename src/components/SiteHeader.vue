<template>
	<header class="site-header">
		<div class="wrap">
			<div class="site-title">
				<h1>
					<router-link :to="{name: 'home'}">MTG Deck Builder</router-link>
				</h1>
				<span class="by-iristorm">by <a href="https://iristormdesign.com/" target="_blank" rel="noopener">Iristorm Design</a></span>
			</div>

			<button
				class="site-menu-toggler primary-btn"
				@click="toggleSiteMenu()"
			>
				Menu
			</button>

			<nav v-show="showSiteMenu" class="site-menu">
				<div class="hover-shield"></div>
				<ul>
					<li class="site-header-link">
						<button
							v-if="$router.currentRoute.name === 'manual'"
							@click="manualButtonClicked()"
						>
							User Manual
						</button>
						<router-link
							v-else
							:to="{name: 'manual'}"
							@click.native="closeAllPopups()"
						>
							User Manual
						</router-link>
					</li>
					<li class="add-new-deck site-header-link">
						<router-link
							:to="{name: 'createDeck'}"
							@click.native="closeAllPopups()"
						>
							Create Deck
						</router-link>
					</li>
					<li class="deck-menu site-header-link">
						<button
							class="deck-menu-toggler"
							@click="toggleDeckMenu()"
							:disabled="disableMenuButton"
							:title="disabledMenuButtonTooltip"
						>
							Open Deck <span>▼</span>
							<div class="mouseover-area"></div>
						</button>

						<div class="open-deck-heading">
							<strong>Open Deck:</strong>
						</div>
						<div v-show="showDeckMenu" class="hover-shield">
							<div class="up-pointing-triangle">
								<ul @mouseover="mouseoutEventActiveEffect">
									<li v-for="deck in $store.state.decks" :key="deck.name">
										<router-link
											v-show="$route.params.deckPath !== deck.path"
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
							</div>
						</div>
					</li>
					<li class="site-header-link">
						<router-link :to="{name: 'contact'}">
							Contact
						</router-link>
					</li>
				</ul>
			</nav>
		</div>

		<bg-overlay :popup="showingAnyPopup()" @closePopups="closeAllPopups()" />
	</header>
</template>

<script>
import scrollToTop from '@/mixins/scrollToTop.js'
import BgOverlay from '@/components/BgOverlay.vue'
import debounce from 'debounce'

export default {
	mixins: [scrollToTop],
	components: {
		BgOverlay
	},
	data () {
		return {
			freezeDeckMenu: false,
			showSiteMenu: true
		}
	},
	created () {
		if (this.mobileView()) {
			this.showSiteMenu = false
		}
	},
	mounted () {
		document.addEventListener('keyup', (event) => {
			const keyEvent = event.key

			if (keyEvent === 'Escape' || keyEvent === 'Esc') {
				if (this.showingAnyPopup()) {
					this.closeAllPopups()
				}
			}
		}, false)

		const headerLinks = document.querySelectorAll(
			'.site-title a, .site-header-link > a, .add-new-deck button')

		headerLinks.forEach((headerLink) => {
			// Close the mobile or deck menu when any of their contained links are clicked.
			headerLink.addEventListener('click', () => {
				this.closeAllPopups()
			}, false)

			// If the Open Deck menu is open and if the user tab-focuses onto another first-level link or button in the site header, then close the Open Deck menu.
			headerLink.addEventListener('focus', () => {
				if (this.showDeckMenu && !this.mobileView()) {
					this.closeAllPopups()
				}
			}, false)
		})

		// Debounce window resizing.
		window.addEventListener('resize', debounce(this.resizingViewport, 125), false)

		// Add hover interaction with the Open Deck button.
		const deckMenuToggler = document.querySelector('.deck-menu-toggler')
		const deckMenuMOArea = deckMenuToggler.querySelector('.mouseover-area')
		let deckMenuMOTimer

		deckMenuMOArea.addEventListener('mouseover', () => {
			if (!deckMenuToggler.hasAttribute('disabled')) {
				deckMenuMOTimer = setTimeout(() => {
					this.toggleDeckMenu()
				}, 250)
			}
		})
		deckMenuMOArea.addEventListener('mouseout', () => {
			clearTimeout(deckMenuMOTimer)
		})
	},
	computed: {
		showDeckMenu () {
			return this.$store.state.showDeckMenu
		},
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
		disabledMenuButtonTooltip () {
			if (this.disableMenuButton) {
				if (this.$store.state.decks.length <= 0) {
					return 'You have no more decks. Create one!'
				} else {
					return 'You currently have no other decks.'
				}
			} else {
				return null
			}
		}
	},
	watch: {
		showDeckMenu (val) {
			if (val) {
				// This is needed so that the "Open Deck" button in the home page's intro section opens the menu on mobile viewports.
				this.showSiteMenu = true
			}
		}
	},
	methods: {
		toggleSiteMenu () {
			if (this.showSiteMenu) {
				this.showSiteMenu = false
			} else {
				this.showSiteMenu = true
				this.$store.commit('setShowDeckMenu', true)

				// If the mobile site menu is opened and the user tab-focuses onto a link that's outside the menu, then close the menu.
				const allLinks = document.querySelectorAll('a, button')

				allLinks.forEach(link => {
					link.addEventListener('focus', this.closeSiteMenuWhenFocusLost)
				})
			}
		},
		toggleDeckMenu () {
			if (!this.freezeDeckMenu) {
				if (this.showDeckMenu) {
					this.$store.commit('setShowDeckMenu', false)
					this.$store.commit('setMouseoutEventActive', true)
				} else {
					this.$store.commit('setShowDeckMenu', true)
				}

				this.freezeDeckMenu = true
				setTimeout(() => {
					this.freezeDeckMenu = false
				}, 500)
			}
		},
		closeAllPopups () {
			this.$store.commit('setShowDeckMenu', false)
			this.$store.commit('setMouseoutEventActive', true)

			if (this.mobileView()) {
				this.showSiteMenu = false
			}
		},
		closeSiteMenuWhenFocusLost () {
			const siteMenuLinks = document.querySelectorAll(
				'.site-menu-toggler, .site-menu a, .site-menu button')

			function anyFocus () {
				for (let i = 0; i < siteMenuLinks.length; i++) {
					const link = siteMenuLinks[i]

					if (link === document.activeElement) {
						return true
					}
				}
			}

			if (!anyFocus()) this.closeAllPopups()
		},
		mouseoutEventActiveEffect () {
			if (!this.$store.state.mouseoutEventActive) {
				this.$store.commit('setMouseoutEventActive', true)
			}
		},
		mobileView () {
			return window.innerWidth <= 720 // Number must match the CSS media query width.
		},
		showingAnyPopup () {
			if (this.showDeckMenu) {
				return true
			} else if (this.mobileView() && this.showSiteMenu) {
				return true
			} else {
				return false
			}
		},
		resizingViewport () {
			if (this.mobileView()) {
				this.showSiteMenu = false
			} else {
				this.showSiteMenu = true
			}
		},
		manualButtonClicked () {
			this.scrollToTop()
			this.closeAllPopups()
		}
	}
}
</script>
