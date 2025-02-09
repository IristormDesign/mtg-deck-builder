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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M450-290h60v-160h160v-60H510v-160h-60v160H290v60h160v160ZM212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM200-760v560-560Z"/></svg>
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-58.08v-843.46h60v81.93h560v-81.93h60v843.46h-60V-140H200v81.92h-60ZM200-520h92.31v-155.38h215.38V-520H760v-239.62H200V-520Zm0 320h252.31v-155.38h215.38V-200H760v-260H200v260Zm152.31-320h95.38v-95.39h-95.38V-520Zm160 320h95.38v-95.39h-95.38V-200Zm-160-320h95.38-95.38Zm160 320h95.38-95.38Z"/></svg>
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
						:to="{name: 'guide'}"
						class="header-menu-item"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M479.56-255.39q17.13 0 28.94-11.82 11.81-11.83 11.81-28.97 0-17.13-11.83-28.94-11.83-11.8-28.96-11.8-17.13 0-28.94 11.83-11.81 11.83-11.81 28.96 0 17.13 11.83 28.94 11.83 11.8 28.96 11.8Zm-28.33-143.23h56.31q.77-29.53 8.65-47.19 7.89-17.65 38.27-46.8 26.39-26.39 40.42-48.74 14.04-22.34 14.04-52.77 0-51.65-37.11-80.69-37.12-29.03-87.81-29.03-50.08 0-82.88 26.73-32.81 26.73-46.81 62.96l51.38 20.61q7.31-19.92 25-38.81 17.69-18.88 52.54-18.88 35.46 0 52.42 19.42 16.97 19.43 16.97 42.73 0 20.39-11.62 37.31-11.61 16.92-29.61 32.69-39.39 35.54-49.77 56.7-10.39 21.15-10.39 63.76ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
						User Guide
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
		},
		showingAnyPopup () {
			return this.$store.state.showingAnyPopup
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
		},
		showingAnyPopup (isShowing) {
			if (!isShowing) {
				this.closeAllPopups()
			}
		}
	},
	created () {
		if (this.mobileView()) {
			this.showHeaderMenu = false
		}
	},
	mounted () {
		document.addEventListener(
			'keydown', this.letEscKeyClosePopups
		)
		document.addEventListener(
			'focusin', this.closeHeaderMenuOnOutsideFocus
		)
		this.closeMenusAutomatically()
		this.applyHoverEffectToOpenDeckMenu()
		this.debounceWindowResizing()
	},
	methods: {
		/**
		 * Users can press the "Esc" key to close any popups.
		 */
		letEscKeyClosePopups (event) {
			if (!this.$store.state.showingAnyPopup) return

			switch (event.key) {
				case 'Escape':
				case 'Esc':
					this.closeAllPopups()
			}
		},
		closeMenusAutomatically () {
			const headerMenuFirstLevelLinks = document.querySelectorAll('.header-menu > ul > li > a')

			headerMenuFirstLevelLinks.forEach(link => {
				/* Close the mobile header or deck popup menu whenever any of their contained links are clicked. (Links to decks in the deck menu have Vue `@click` events instead, in case a deck gets renamed and thus its link loses the event listener.) */
				link.addEventListener(
					'click', this.closeAllPopups
				)

				link.addEventListener(
					'focus', () => {
						/* If the user tab-focuses onto another first-level link in the app header menu, then close the Open Deck menu. */
						if (this.showDeckMenu && !this.mobileView()) {
							this.closeAllPopups()
						}
					}
				)
			})
		},
		/**
		 * Add hover interaction with the Open Deck button.
		 */
		applyHoverEffectToOpenDeckMenu () {
			const deckMenuToggler = document.querySelector('.deck-menu-toggler')
			const deckMenuMOArea = deckMenuToggler.querySelector('.mouseover-area')
			let deckMenuMOTimer

			const mouseoverDeckMenuMOArea = () => {
				if (deckMenuToggler.hasAttribute('disabled')) return

				deckMenuMOTimer = setTimeout(() => {
					this.toggleDeckMenu(true)
				}, 250)
			}
			const mouseoutDeckMenuMOArea = () => {
				clearTimeout(deckMenuMOTimer)
			}

			deckMenuMOArea.addEventListener(
				'mouseover', mouseoverDeckMenuMOArea
			)
			deckMenuMOArea.addEventListener(
				'mouseout', mouseoutDeckMenuMOArea
			)
		},
		debounceWindowResizing () {
			const resizingViewport = () => {
				this.showHeaderMenu = !this.mobileView()
			}

			window.addEventListener(
				'resize', debounce(resizingViewport, 125)
			)
		},
		closeHeaderMenuOnOutsideFocus (event) {
			if (!this.showHeaderMenu || !this.mobileView()) return

			const headerMenu = document.querySelector('.header-menu')
			const headerMenuToggler = document.querySelector('.header-menu-toggler')

			if (
				headerMenuToggler !== event.target &&
				!headerMenu.contains(event.target)
			) {
				this.closeAllPopups()
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
			this.$store.commit('showingAnyPopup', false) // Always close all popups before opening or closing the app header menu.

			if (this.showHeaderMenu) {
				this.closeAllPopups()
			} else {
				this.$nextTick(() => {
					this.showHeaderMenu = true
					this.$store.commit('showDeckMenu', true)
					this.$store.commit('showingAnyPopup', true)
				})
			}
		},
		toggleDeckMenu (triggeredByHover) {
			if (this.freezeDeckMenu) return

			const store = this.$store

			store.commit('showingAnyPopup', false) // Always close all popups before opening or closing the deck menu.

			if (this.showDeckMenu) {
				store.commit('overlayHoverEnabled', false)
				store.commit('showDeckMenu', false)
			} else {
				this.$nextTick(() => {
					store.commit('overlayHoverEnabled', triggeredByHover)
					store.commit('showDeckMenu', true)
					store.commit('showingAnyPopup', true)
				})
			}

			this.freezeDeckMenu = true
			setTimeout(() => {
				this.freezeDeckMenu = false
			}, 500)
		},
		mobileView () {
			return window.innerWidth <= 480 // This number must match the CSS media query width.
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/app-header-menu.scss';
</style>
