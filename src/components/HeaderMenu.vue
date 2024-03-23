<template>
	<div class="header-menu-positioner">
		<button
			class="header-menu-toggler"
			@click="toggleHeaderMenu()"
		>
			Menu
		</button>

		<nav v-show="showHeaderMenu" class="header-menu">
			<div v-show="showHeaderMenu" class="hover-shield" />
			<ul>
				<li>
					<router-link
						:to="{name: 'manual'}"
						class="header-menu-item"
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
									name: 'deckEditor',
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
		disabledMenuButtonTooltip () {
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
				// This is needed so that the "Open Deck" button in the home page's intro section opens the menu on mobile viewports.
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

		// Debounce window resizing.
		window.addEventListener('resize', debounce(this.resizingViewport, 125))
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
				// Close the mobile header or deck popup menu whenever any of their contained links are clicked. (Links to decks in the deck menu have Vue `@click` events instead, in case a deck gets renamed and thus its link loses the event listener.)
				link.addEventListener('click', this.closeAllPopups)

				link.addEventListener('focus', () => {
					// If the user tab-focuses onto another first-level link in the app header menu, then close the Open Deck menu.
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
		addFocusListenerToClosePopups () {
			const allLinks = document.querySelectorAll('a, button')

			const listenForFocus = (link) => {
				link.addEventListener('focus', this.closePopupsOnFocus)
			}

			for (let i = 1; i < allLinks.length; i++) {
				if (allLinks[i].matches('.header-menu-toggler')) {
					// Listen for focus on the two links just before the app menu toggler. One of these should be the "Iristorm Design" link, which, depending on the viewport, may not appear. The main app title link is also affected in case the former link is gone.
					listenForFocus(allLinks[i - 1])
					listenForFocus(allLinks[i - 2])

					for (let j = (i + 3); j < allLinks.length; j++) {
						if (allLinks[j].matches('.deck-menu ul li:last-child a')) {
							listenForFocus(allLinks[j + 1]) // The link just AFTER the app menu's last link.
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
		},
		resizingViewport () {
			if (this.mobileView()) {
				this.showHeaderMenu = false
			} else {
				this.showHeaderMenu = true
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/header-menu.scss';
</style>
