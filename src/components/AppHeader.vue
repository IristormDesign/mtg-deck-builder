<template>
	<header class="app-header">
		<div class="wrap">
			<div class="app-title">
				<h1><a href="/">MTG Deck Builder</a></h1>
				<div class="by-iristorm">by <a href="https://iristormdesign.com/" target="_blank">Iristorm Design</a></div>
			</div>
			<div class="app-menu-positioner">
				<button
					class="app-menu-toggler"
					@click="toggleAppMenu()"
				>
					Menu
				</button>

				<nav v-show="showAppMenu" class="app-menu">
					<div v-show="showAppMenu" class="hover-shield" />
					<ul>
						<li>
							<router-link
								:to="{name: 'manual'}"
								class="header-menu-item"
								@click.native="manualButtonClicked()"
							>
								User Manual
							</router-link>
						</li>
						<li class="create-deck">
							<router-link
								:to="{name: 'createDeck'}"
								class="header-menu-item"
							>
								Create Deck
							</router-link>
						</li>
						<li class="deck-menu">
							<button
								class="deck-menu-toggler header-menu-item"
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
							<div v-show="showDeckMenu" class="hover-shield" />
							<ul v-show="showDeckMenu">
								<li v-for="deck in $store.state.decks" :key="deck.name">
									<router-link
										v-show="$route.params.deckPath !== deck.path"
										:to="{
											name: 'deckMain',
											params: {
												deck: deck,
												deckPath: deck.path
											}
										}"
										@click.native="closeAllPopups()"
									>
										<span class="deck-menu-deck-name">{{ deck.name }}</span>
										<div class="deck-menu-deck-colors">
											<div
												:class="sizeManaSymbols(deck)"
												v-html="renderManaSymbols(deck)"
											/>
										</div>
									</router-link>
								</li>
							</ul>
						</li>
						<li>
							<router-link
								:to="{name: 'contact'}"
								class="header-menu-item"
							>
								Contact
							</router-link>
						</li>
					</ul>
				</nav>
			</div>
		</div>

		<bg-overlay :popup="showingAnyPopup" @closePopups="closeAllPopups()" />
	</header>
</template>

<script>
import debounce from 'debounce'
import deckColors from '@/mixins/deckColors.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'
import BgOverlay from '@/components/BgOverlay.vue'

export default {
	components: { BgOverlay },
	mixins: [deckColors, symbolsMarkup],
	data () {
		return {
			freezeDeckMenu: false,
			showAppMenu: true
		}
	},
	computed: {
		showDeckMenu () {
			return this.$store.state.showDeckMenu
		},
		stickAppHeader () {
			return this.$store.state.stickAppHeader
		},
		disableMenuButton () {
			if (
				this.$store.state.decks.length <= 1 &&
				this.$route.params.deckPath
			) {
				return true
			} else {
				return (this.$store.state.decks.length <= 0)
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
		},
		showingAnyPopup () {
			return this.showDeckMenu || (this.mobileView() && this.showAppMenu)
		}
	},
	watch: {
		showDeckMenu (show) {
			if (show) {
				// This is needed so that the "Open Deck" button in the home page's intro section opens the menu on mobile viewports.
				this.showAppMenu = true
			}
		},
		stickAppHeader (isSticky) {
			const root = document.documentElement
			const appHeader = document.querySelector('.app-header')

			if (isSticky) {
				root.style.setProperty('--header-top', '0px')
				appHeader.style.top = '0px'
				appHeader.classList.add('sticky')
			} else {
				root.style.setProperty('--header-top', `-${appHeader.offsetHeight}px`)
				appHeader.style.top = `-${appHeader.offsetHeight}px`

				if (window.scrollY === 0) {
					appHeader.classList.remove('sticky')
				} else {
					setTimeout(() => {
						appHeader.classList.remove('sticky')
					}, 251) // Match this timeout duration with .app-header's CSS transition duration, plus one millisecond.
				}
			}
		}
	},
	created () {
		if (this.mobileView()) {
			this.showAppMenu = false
		}
	},
	mounted () {
		// On the app header's initial rendering from opening the page, set its negative `top` value so that it appears to slide down when the user first scrolls upward.
		const appHeader = document.querySelector('.app-header')

		appHeader.style.top = `-${appHeader.offsetHeight}px`

		// Users can press the "Esc" key to close any popups.
		document.addEventListener('keyup', (event) => {
			if (event.key === 'Escape' || event.key === 'Esc') {
				if (this.showingAnyPopup) {
					this.closeAllPopups()
				}
			}
		})

		const appMenuFirstLevelLinks = document.querySelectorAll('.app-menu > ul > li > a')

		appMenuFirstLevelLinks.forEach(link => {
			// Close the mobile header or deck popup menu whenever any of their contained links are clicked. (Links to decks in the decks menu have Vue `@click` events instead, in case a deck gets renamed and thus its link loses the event listener.)
			link.addEventListener('click', this.closeAllPopups)

			link.addEventListener('focus', () => {
				// If the user tab-focuses onto another first-level link in the app header menu, then 	close the Open Deck menu.
				if (this.showDeckMenu && !this.mobileView()) {
					this.closeAllPopups()
				}
			})
		})

		// Debounce window resizing.
		window.addEventListener('resize', debounce(this.resizingViewport, 125))

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

		// Make the app header appear whenever the user scrolls upward.
		let previousScrollPos = window.scrollY

		window.onscroll = () => {
			const currentScrollPos = window.scrollY

			if (
				currentScrollPos === 0 || // If the viewport is at the very top of the page, or...
				( // ...if the user scrolls the page downward and the decks menu isn't open...
					previousScrollPos <= currentScrollPos &&
					!this.showDeckMenu
				)
			) {
				this.$store.commit('setStickAppHeader', false)
			} else if (!this.$store.state.pageScrollByAnchors) { // If the page is scrolling upward caused by the user's direct scrolling interaction...
				this.$store.commit('setStickAppHeader', true)
			}

			previousScrollPos = currentScrollPos
		}
	},
	methods: {
		addFocusListenerToClosePopups () {
			const allLinks = document.querySelectorAll('a, button')

			const listenForFocus = (link) => {
				link.addEventListener('focus', this.closePopupsOnFocus)
			}

			for (let i = 1; i < allLinks.length; i++) {
				if (allLinks[i].matches('.app-menu-toggler')) {
					listenForFocus(allLinks[i - 1]) // The link just BEFORE the app menu toggler.

					for (let j = (i + 3); j < allLinks.length; j++) {
						if (allLinks[j].matches('.app-menu > ul > li:last-child a')) {
							listenForFocus(allLinks[j + 1]) // The link just AFTER the app menu's last link.

							break
						}
					}

					break
				}
			}
		},
		closePopupsOnFocus () {
			if (this.showAppMenu) {
				this.closeAllPopups()
			}
		},
		closeAllPopups () {
			this.$store.commit('setShowDeckMenu', false)

			if (this.mobileView()) {
				this.showAppMenu = false
			}
			if (this.stickAppHeader) {
				this.$store.commit('setStickAppHeader', false)
			}
		},
		mobileView () {
			this.$store.commit('setMobileView', window.innerWidth <= 512) // This number must match the CSS media query width.

			return this.$store.state.mobileView
		},
		toggleAppMenu () {
			if (this.showAppMenu) {
				this.showAppMenu = false
				this.closeAllPopups()
			} else {
				this.showAppMenu = true
				this.$store.commit('setShowDeckMenu', true)
				this.addFocusListenerToClosePopups()
			}
		},
		toggleDeckMenu () {
			if (!this.freezeDeckMenu) {
				if (this.showDeckMenu) {
					this.$store.commit('setShowDeckMenu', false)
				} else {
					this.$store.commit('setShowDeckMenu', true)
				}

				this.freezeDeckMenu = true
				setTimeout(() => {
					this.freezeDeckMenu = false
				}, 500)
			}
		},
		closeAppMenuWhenFocusLost () {
			const appMenuLinks = document.querySelectorAll(
				'.app-menu-toggler, .app-menu a, .app-menu button'
			)

			for (const link of appMenuLinks) {
				if (link === document.activeElement) {
					this.closeAllPopups()
					break
				}
			}
		},
		resizingViewport () {
			if (this.mobileView()) {
				this.showAppMenu = false
			} else {
				this.showAppMenu = true
			}
		},
		manualButtonClicked () {
			if (this.$router.currentRoute.name === 'manual') {
				window.scrollTo({ top: 0 })
				history.replaceState('', document.title, window.location.pathname)
			}
		}
	}
}
</script>
