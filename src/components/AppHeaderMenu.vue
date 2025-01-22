<template>
	<div class="header-menu-positioner">
		<button
			class="header-menu-toggler"
			@click="toggleHeaderMenu()"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M118.67-242.62v-67.58h722.66v67.58H118.67Zm0-204.25v-67.59h722.66v67.59H118.67Zm0-204.26v-67.59h722.66v67.59H118.67Z"/></svg>
			<span>Menu</span>
		</button>

		<nav v-show="showHeaderMenu" class="header-menu">
			<div v-show="showHeaderMenu" class="hover-shield"></div>
			<ul>
				<li class="create-deck">
					<router-link
						:to="{name: 'createDeck'}"
						class="header-menu-item"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M454.87-290h50.26v-164.87H670v-50.26H505.13V-670h-50.26v164.87H290v50.26h164.87V-290ZM140-140v-680h680v680H140Zm50.26-50.26h579.48v-579.48H190.26v579.48Zm0 0v-579.48 579.48Z"/></svg>
						Create Deck
					</router-link>
				</li>
				<li class="deck-menu">
					<button
						class="deck-menu-toggler header-menu-item"
						@click="toggleDeckMenu()"
						:disabled="disableMenuButton"
						:title="disabledMenuLinkTooltip"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-58.08v-843.46h50.26v81.93h579.48v-81.93H820v843.46h-50.26V-140H190.26v81.92H140Zm50.26-456.64h106.92V-670.1h205.64v155.38h266.92v-254.64H190.26v254.64Zm0 324.46h266.92v-155.38h205.64v155.38h106.92v-274.2H190.26v274.2Zm157.18-324.46h105.12v-105.13H347.44v105.13Zm160 324.46h105.12v-105.13H507.44v105.13Zm-160-324.46h105.12-105.12Zm160 324.46h105.12-105.12Z"/></svg>
						Open Deck&hellip;
						<div class="mouseover-area"></div>
					</button>
					<div class="open-deck-heading">
						<strong>Open Deck:</strong>
					</div>
					<transition name="hover-shield-transition">
						<div v-show="showDeckMenu" class="hover-shield"></div>
					</transition>
					<transition name="dropdown-transition">
						<ul v-show="showDeckMenu">
							<li
								v-for="deck in $store.state.decks"
								:key="deck.name"
								:class="{selected: $route.params.deckPath === deck.path}"
							>
								<router-link
									:to="{
										name: 'listEditor',
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
										></div>
									</div>
								</router-link>
							</li>
						</ul>
					</transition>
				</li>
				<li>
					<router-link
						:to="{name: 'manual'}"
						class="header-menu-item"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M482.53-258.77q14.57 0 24.69-10.27 10.11-10.26 10.11-24.83 0-14.31-10.13-24.55-10.14-10.25-24.71-10.25t-24.81 10.27q-10.24 10.26-10.24 24.58 0 14.56 10.26 24.81 10.27 10.24 24.83 10.24Zm-27.91-139.44h49.12q.52-26.15 7.99-45.08 7.47-18.94 37.45-45.53 28.69-26.38 41.78-49.47t13.09-52.04q0-50.16-33.93-80.14-33.94-29.99-85.04-29.99-46.28 0-80.04 24.09-33.76 24.09-49.24 60.73L400.82-598q10.03-24.54 29.95-40.78 19.92-16.25 52.05-16.25 36.28 0 55.68 19.84 19.4 19.83 19.4 47.19 0 21.21-12.03 39.21-12.02 18-33.41 36.48-32.61 29.18-45.23 53.11-12.61 23.92-12.61 60.99ZM480.07-100q-78.43 0-147.67-29.92-69.24-29.92-120.89-81.54-51.64-51.63-81.58-120.84Q100-401.51 100-479.93q0-78.84 29.92-148.21t81.54-120.68q51.63-51.31 120.84-81.25Q401.51-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.43-29.92 147.67-29.92 69.24-81.21 120.89-51.29 51.64-120.63 81.58Q558.9-100 480.07-100Zm-.07-50.26q137.79 0 233.77-96.18 95.97-96.18 95.97-233.56 0-137.79-95.97-233.77-95.98-95.97-233.77-95.97-137.38 0-233.56 95.97-96.18 95.98-96.18 233.77 0 137.38 96.18 233.56T480-150.26ZM480-480Z"/></svg>
						User Manual
					</router-link>
				</li>
			</ul>
		</nav>

		<bg-overlay @closePopups="closeAllPopups()" />
	</div>
</template>

<script>
import debounce from 'debounce'
import BgOverlay from '@/components/BgOverlay.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import deckColors from '@/mixins/deckColors.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	components: { BgOverlay },
	mixins: [getActiveDeck, deckColors, symbolsMarkup],
	data () {
		return {
			freezeDeckMenu: false,
			showHeaderMenu: true
		}
	},
	computed: {
		showDeckMenu () {
			return this.$store.state.showDeckMenu
		},
		disableMenuButton () {
			if (
				this.$store.state.decks.length <= 1 &&
				this.deck
			) {
				return true
			} else {
				return (this.$store.state.decks.length === 0)
			}
		},
		disabledMenuLinkTooltip () {
			if (this.disableMenuButton) {
				if (this.$store.state.decks.length > 0) {
					return 'You have no other decks to open.'
				} else {
					return 'You have no decks.'
				}
			} else {
				return null
			}
		}
	},
	watch: {
		showHeaderMenu (show) {
			if (show) {
				if (this.mobileView()) {
					this.$store.commit('showingAnyPopup', true)
				}
			} else {
				this.$store.commit('showingAnyPopup', false)
			}
		},
		showDeckMenu (show) {
			if (show) {
				/* This is needed so that the "Open Deck" button in the home page's intro section opens the menu on mobile viewports. */
				this.showHeaderMenu = true
				this.$store.commit('showingAnyPopup', true)
			}
		}
	},
	created () {
		if (this.mobileView()) {
			this.showHeaderMenu = false
		}
	},
	mounted () {
		this.letEscKeyClosePopups()
		this.closeMenusAutomatically()
		this.applyHoverEffectToOpenDeckButton()
		this.debounceWindowResizing()
	},
	methods: {
		/**
		 * Users can press the "Esc" key to close any popups.
		 */
		letEscKeyClosePopups () {
			document.addEventListener('keyup', (event) => {
				if (event.key === 'Escape' || event.key === 'Esc') {
					if (this.$store.state.showingAnyPopup) {
						this.closeAllPopups()
					}
				}
			})
		},
		closeMenusAutomatically () {
			const headerMenuFirstLevelLinks = document.querySelectorAll('.header-menu > ul > li > a')

			headerMenuFirstLevelLinks.forEach(link => {
				/* Close the mobile header or deck popup menu whenever any of their contained links are clicked. (Links to decks in the deck menu have Vue `@click` events instead, in case a deck gets renamed and thus its link loses the event listener.) */
				link.addEventListener('click', this.closeAllPopups)

				link.addEventListener('focus', () => {
					/* If the user tab-focuses onto another first-level link in the app header menu, then close the Open Deck menu. */
					if (this.showDeckMenu && !this.mobileView()) {
						this.closeAllPopups()
					}
				})
			})
		},
		/**
		 * Add hover interaction with the Open Deck button.
		 */
		applyHoverEffectToOpenDeckButton () {
			const deckMenuToggler = document.querySelector('.deck-menu-toggler')
			const deckMenuMOArea = deckMenuToggler.querySelector('.mouseover-area')
			let deckMenuMOTimer

			deckMenuMOArea.addEventListener('mouseover', () => {
				if (!deckMenuToggler.hasAttribute('disabled')) {
					deckMenuMOTimer = setTimeout(() => {
						this.toggleDeckMenu(true)
					}, 250)
				}
			})
			deckMenuMOArea.addEventListener('mouseout', () => {
				clearTimeout(deckMenuMOTimer)
			})
		},
		debounceWindowResizing () {
			const resizingViewport = () => {
				this.showHeaderMenu = !this.mobileView()
			}

			window.addEventListener('resize', debounce(resizingViewport, 125))
		},
		addFocusListenerToClosePopups () {
			const allLinks = document.querySelectorAll('a, button')

			const listenForFocus = (link) => {
				link.addEventListener('focus', this.closePopupsOnFocus)
			}

			for (let i = 1; i < allLinks.length; i++) {
				if (allLinks[i].matches('.header-menu-toggler')) {
					/* Listen for focus on the two links just before the app menu toggler. One of these should be the "Iristorm Design" link, which, depending on the viewport, may not appear. The main app title link is also affected in case the other link is gone. */
					listenForFocus(allLinks[i - 1])
					listenForFocus(allLinks[i - 2])

					for (let j = (i + 3); j < allLinks.length; j++) {
						if (allLinks[j].matches('.header-menu > ul > li:last-child a')) {
							listenForFocus(allLinks[j + 1]) // The link on the page that comes just AFTER the app menu's last link.
							break
						}
					}

					break
				}
			}
		},
		closePopupsOnFocus () {
			if (this.showHeaderMenu) {
				this.closeAllPopups()
			}
		},
		closeAllPopups () {
			this.$store.commit('showDeckMenu', false)
			this.$store.commit('overlayHoverEnabled', false)
			this.$store.commit('showingAnyPopup', false)

			if (this.mobileView()) {
				this.showHeaderMenu = false
			}
		},
		toggleHeaderMenu () {
			if (this.showHeaderMenu) {
				this.closeAllPopups()
			} else {
				this.showHeaderMenu = true
				this.$store.commit('showDeckMenu', true)
				this.$store.commit('overlayHoverEnabled', false)
				this.addFocusListenerToClosePopups()
			}
		},
		toggleDeckMenu (triggeredByHover) {
			if (!this.freezeDeckMenu) {
				const store = this.$store

				if (this.showDeckMenu) {
					store.commit('overlayHoverEnabled', false)
					store.commit('showDeckMenu', false)
					store.commit('showingAnyPopup', false)
				} else {
					if (triggeredByHover) {
						store.commit('overlayHoverEnabled', true)
					} else {
						store.commit('overlayHoverEnabled', false)
					}
					store.commit('showDeckMenu', true)
					store.commit('showingAnyPopup', true)
					this.addFocusListenerToClosePopups()
				}

				this.freezeDeckMenu = true
				setTimeout(() => {
					this.freezeDeckMenu = false
				}, 500)
			}
		},
		mobileView () {
			return window.innerWidth <= 512 // This number must match the CSS media query width.
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/app-header-menu.scss';
</style>
