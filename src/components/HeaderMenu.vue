<template>
	<div class="header-menu-positioner">
		<button
			class="header-menu-toggler"
			@click="toggleHeaderMenu()"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/></svg>
						Open Deck&hellip;
						<div class="mouseover-area"></div>
					</button>
					<div class="open-deck-heading">
						<strong>Open Deck:</strong>
					</div>
					<div v-show="showDeckMenu" class="hover-shield"></div>
					<ul v-show="showDeckMenu">
						<li v-for="deck in $store.state.decks" :key="deck.name">
							<router-link
								v-show="$route.params.deckPath !== deck.path"
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
				</li>
				<li>
					<router-link
						:to="{name: 'manual'}"
						class="header-menu-item"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
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
	@import '@/sass/header-menu.scss';
</style>
