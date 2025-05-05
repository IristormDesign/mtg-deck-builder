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
						ref="headerMenuFirstLevelLink"
						@focus.native="conditionallyCloseAllPopups()"
						@click.native="closeAllPopups()"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M450-290h60v-160h160v-60H510v-160h-60v160H290v60h160v160ZM212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM200-760v560-560Z"/></svg>
						Create Deck
					</router-link>
				</li>
				<li
					class="deck-menu"
					aria-haspopup="true"
					:aria-expanded="showDeckMenu"
				>
					<button
						class="deck-menu-toggler header-menu-item"
						@click="toggleDeckMenu()"
						:disabled="disableMenuButton"
						:title="disabledMenuLinkTooltip"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-58.08v-843.46h60v81.93h560v-81.93h60v843.46h-60V-140H200v81.92h-60ZM200-520h92.31v-155.38h215.38V-520H760v-239.62H200V-520Zm0 320h252.31v-155.38h215.38V-200H760v-260H200v260Zm152.31-320h95.38v-95.39h-95.38V-520Zm160 320h95.38v-95.39h-95.38V-200Zm-160-320h95.38-95.38Zm160 320h95.38-95.38Z"/></svg>
						Open Deck&hellip;
						<div class="mouseover-area" ref="deckMenuMOArea"></div>
					</button>
					<div class="open-deck-heading">
						<strong>Open Deck:</strong>
					</div>
					<transition name="hover-shield-transition">
						<div v-show="showDeckMenu" class="hover-shield"></div>
					</transition>
					<transition name="dropdown-transition">
						<ul v-show="showDeckMenu" role="menu">
							<li
								v-for="deck in $store.state.decks"
								:key="deck.name"
								:class="{selected: $route.params.deckPath === deck.path}"
								role="menuitem"
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
									:aria-selected="$route.params.deckPath === deck.path ? 'true' : 'false'"
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
						@focus.native="conditionallyCloseAllPopups()"
						@click.native="closeAllPopups()"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M479.56-255.39q17.13 0 28.94-11.82 11.81-11.83 11.81-28.97 0-17.13-11.83-28.94-11.83-11.8-28.96-11.8-17.13 0-28.94 11.83-11.81 11.83-11.81 28.96 0 17.13 11.83 28.94 11.83 11.8 28.96 11.8Zm-28.33-143.23h56.31q.77-29.53 8.65-47.19 7.89-17.65 38.27-46.8 26.39-26.39 40.42-48.74 14.04-22.34 14.04-52.77 0-51.65-37.11-80.69-37.12-29.03-87.81-29.03-50.08 0-82.88 26.73-32.81 26.73-46.81 62.96l51.38 20.61q7.31-19.92 25-38.81 17.69-18.88 52.54-18.88 35.46 0 52.42 19.42 16.97 19.43 16.97 42.73 0 20.39-11.62 37.31-11.61 16.92-29.61 32.69-39.39 35.54-49.77 56.7-10.39 21.15-10.39 63.76ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
						User Guide
					</router-link>
				</li>
				<li>
					<router-link
						:to="{name: 'donate'}"
						class="header-menu-item"
						@focus.native="conditionallyCloseAllPopups()"
						@click.native="closeAllPopups()"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m629.85-469.31-86.31-77.15q-91.69-84.69-109.77-123.65-18.08-38.96-18.08-64.97 0-46.55 31.69-77.73Q479.06-844 527.61-844q30.57 0 56.4 15.12 25.84 15.11 45.84 38.27 19-24.16 45.42-38.77Q701.69-844 732.32-844q46.53 0 79.11 32.65Q844-778.71 844-732.08q0 26.01-17.27 64.47-17.27 38.46-108.96 121.15l-87.92 77.15Zm0-68.53 52.38-44.85q63.15-54.77 86.46-91.5Q792-710.92 792-732.08q0-25.11-17.4-42.52-17.41-17.4-42.52-17.4-19 0-34.77 9.92-15.77 9.93-27.85 25.16l-39.61 46.3-39.62-46.3q-12.08-15.23-27.85-25.16-15.76-9.92-34.77-9.92-24.69 0-42.3 17.4-17.62 17.41-17.62 42.52 0 15.16 18.31 47.39 18.31 32.23 94.46 102l49.39 44.85ZM276.08-224.92l276.3 87.15 235.77-72q-6.07-25.61-24.58-38.38-18.5-12.77-41.88-12.77H516.8q-16.18 0-35.49-2.5-19.31-2.5-37.62-9.27l-65.3-24.85 17.76-49.77 70 27.16q12.16 5.15 23.43 6.38 11.27 1.23 21.11.85h92q0-13.85-5.19-21.62-5.19-7.77-17.12-12.54l-254.07-91.23q-1.16-.38-2.12-.57-.96-.2-2.11-.2h-46v214.16ZM76.08-116v-375.07h243.54q7.3 0 13.76 1.38 6.47 1.39 12.55 3.34l254.53 90.74q24.23 9.07 39.23 30.9 15 21.83 15 51.79h67q53.5 0 87.9 36.81Q844-239.31 844-188.92v16.3L553.38-83.54l-277.3-86.38V-116h-200Zm52-52h96v-271.08h-96V-168Zm501.77-545.62Z"/></svg>
						Donate
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
			debouncedResizingViewport: debounce(this.heardViewportResize, 50),
			deckMenuMOTimer: 0,
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
		},
		'$store.state.showingAnyPopup' (isShowing) {
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
		window.addEventListener(
			'resize', this.debouncedResizingViewport
		)
		this.$refs.deckMenuMOArea.addEventListener(
			'mouseover', this.mouseoverDeckMenuMOArea
		)
		this.$refs.deckMenuMOArea.addEventListener(
			'mouseout', this.mouseoutDeckMenuMOArea
		)
	},
	beforeDestroy () {
		document.removeEventListener(
			'keydown', this.letEscKeyClosePopups
		)
		document.removeEventListener(
			'focusin', this.closeHeaderMenuOnOutsideFocus
		)
		window.removeEventListener(
			'resize', this.debouncedResizingViewport
		)
		this.$refs.deckMenuMOArea.removeEventListener(
			'mouseover', this.mouseoverDeckMenuMOArea
		)
		this.$refs.deckMenuMOArea.removeEventListener(
			'mouseout', this.mouseoutDeckMenuMOArea
		)
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
		mouseoverDeckMenuMOArea () {
			const deckMenuToggler = document.querySelector('.deck-menu-toggler')

			if (deckMenuToggler.hasAttribute('disabled')) return

			this.deckMenuMOTimer = setTimeout(() => {
				this.toggleDeckMenu(true)
			}, 250)
		},
		mouseoutDeckMenuMOArea () {
			clearTimeout(this.deckMenuMOTimer)
		},
		heardViewportResize () {
			this.showHeaderMenu = !this.mobileView()
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
		conditionallyCloseAllPopups () {
			/* If the user tab-focuses onto another first-level link in the app header menu, then close the Open Deck menu. */
			if (this.showDeckMenu && !this.mobileView()) {
				this.closeAllPopups()
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
			return window.innerWidth <= 576 // This number must match the CSS media query width.
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/app-header-menu.scss';
</style>
