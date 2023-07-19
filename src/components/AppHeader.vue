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
							<ul
								v-show="showDeckMenu"
								@mouseover="mouseoutEventActiveEffect"
							>
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

		<bg-overlay :popup="showingAnyPopup()" @closePopups="closeAllPopups()" />
	</header>
</template>

<script>
import debounce from 'debounce'
import deckColorMixins from '@/mixins/deckColorMixins.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'
import BgOverlay from '@/components/BgOverlay.vue'

export default {
	mixins: [deckColorMixins, symbolsMarkup],
	components: { BgOverlay },
	data () {
		return {
			freezeDeckMenu: false,
			showAppMenu: true
		}
	},
	created () {
		if (this.mobileView()) {
			this.showAppMenu = false
		}
	},
	mounted () {
		// Users can press the "Esc" key to close any popups.
		document.addEventListener('keyup', (event) => {
			if (event.key === 'Escape' || event.key === 'Esc') {
				if (this.showingAnyPopup()) {
					this.closeAllPopups()
				}
			}
		})

		document.querySelectorAll(
			'.app-menu > ul > li > a'
		).forEach((link) => {
			// Close the mobile header or deck popup menu whenever any of their contained links are clicked. (Links to decks in the decks menu have Vue `@click` events instead, in case a deck gets renamed and thus its link loses the event listener.)
			link.addEventListener('click', this.closeAllPopups)

			// If the user tab-focuses onto another first-level menu link in the app header, then close the Open Deck menu.
			link.addEventListener('focus', () => {
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
		// const appHeader = document.querySelector('.app-header')
		let previousScrollPos = window.scrollY

		window.onscroll = () => {
			const currentScrollPos = window.scrollY
			const store = this.$store

			if (
				currentScrollPos === 0 || // If the viewport is at the very top of the page, or...
				( // ...if the user scrolls the page downward and the decks menu isn't open...
					previousScrollPos <= currentScrollPos &&
					!this.showDeckMenu
				)
			) {
				store.commit('setStickAppHeader', false)
			} else if (!store.state.pageScrollByAnchors) { // If the page is scrolling upward caused by the user's direct scrolling interaction...
				store.commit('setStickAppHeader', true)
			}

			previousScrollPos = currentScrollPos
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
		}
	},
	watch: {
		showDeckMenu (val) {
			if (val) {
				// This is needed so that the "Open Deck" button in the home page's intro section opens the menu on mobile viewports.
				this.showAppMenu = true
			}
		},
		stickAppHeader (val) {
			const appHeader = document.querySelector('.app-header')

			if (val) {
				appHeader.style.top = '0px'
				appHeader.classList.add('sticky')
			} else {
				appHeader.style.top = `-${appHeader.offsetHeight}px`

				if (window.scrollY === 0) {
					appHeader.classList.remove('sticky')
				} else {
					setTimeout(() => {
						appHeader.classList.remove('sticky')
					}, 250) // Match this timeout duration with .app-header's CSS transition duration.
				}
			}
		}
	},
	methods: {
		closeAllPopups () {
			const store = this.$store

			store.commit('setShowDeckMenu', false)
			store.commit('setMouseoutEventActive', true)

			if (this.mobileView()) {
				this.showAppMenu = false
			}
			if (this.stickAppHeader) {
				store.commit('setStickAppHeader', false)
			}
		},
		mobileView () {
			return window.innerWidth <= 512 // This number must match the CSS media query width.
		},
		toggleAppMenu () {
			if (this.showAppMenu) {
				this.showAppMenu = false
				this.closeAllPopups()
			} else {
				this.showAppMenu = true
				this.$store.commit('setShowDeckMenu', true)

				// If the mobile app menu is opened and the user tab-focuses onto any link anywhere on the page, then close the menu.
				document.querySelectorAll(
					'a, button'
				).forEach(link => {
					link.addEventListener('focus', this.closeAppMenuWhenFocusLost)
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
		closeAppMenuWhenFocusLost () {
			const appMenuLinks = document.querySelectorAll(
				'.app-menu-toggler, .app-menu a, .app-menu button'
			)

			function anyFocus () {
				for (let i = 0; i < appMenuLinks.length; i++) {
					const link = appMenuLinks[i]

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
		showingAnyPopup () {
			return this.showDeckMenu || (this.mobileView() && this.showAppMenu)
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
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
				history.replaceState('', document.title, window.location.pathname)
			}
		}
	}
}
</script>
