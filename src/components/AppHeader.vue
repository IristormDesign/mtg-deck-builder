<template>
	<header class="app-header">
		<div class="wrap">
			<div class="app-title">
				<h1><a href="/">MTG Deck Builder</a></h1>
				<div class="by-iristorm">by <a href="https://iristormdesign.com/" target="_blank">Iristorm Design</a></div>
			</div>

			<header-menu />
		</div>
	</header>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'

export default {
	components: { HeaderMenu },
	computed: {
		stickAppHeader () {
			return this.$store.state.stickAppHeader
		}
	},
	watch: {
		stickAppHeader (isSticky) {
			const root = document.documentElement
			const appHeader = document.querySelector('.app-header')
			appHeader.style.top = 'var(--header-top)'

			if (isSticky) {
				root.style.setProperty('--header-top', '0px')
				appHeader.classList.add('sticky')
			} else {
				root.style.setProperty('--header-top', `-${appHeader.offsetHeight}px`)

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
	mounted () {
		this.setAppHeaderTop()
		this.showAppHeaderOnUpwardScroll()
	},
	methods: {
		/**
		 * Set the app header's `top` value so that it can appear to slide down when the user first scrolls upward.
		 */
		setAppHeaderTop () {
			const appHeader = document.querySelector('.app-header')

			appHeader.style.top = `-${appHeader.offsetHeight}px`
		},
		/**
		 * Make the app header appear whenever the user scrolls upward.
		 */
		showAppHeaderOnUpwardScroll () {
			let previousScrollPos = window.scrollY

			window.onscroll = () => {
				const currentScrollPos = window.scrollY

				if (
					currentScrollPos === 0 || // If the viewport is at the very top of the page, or...
					( // ...if the user scrolls the page downward and the decks menu isn't open...
						previousScrollPos <= currentScrollPos &&
						!this.$store.state.showDeckMenu
					)
				) {
					this.$store.commit('setStickAppHeader', false)
				} else if (!this.$store.state.pageScrollByAnchors) { // If the page is scrolling upward caused by the user's direct scrolling interaction...
					this.$store.commit('setStickAppHeader', true)
				}

				previousScrollPos = currentScrollPos
			}
		}
	}
}
</script>
