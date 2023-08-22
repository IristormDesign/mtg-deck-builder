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
			setTimeout(() => { // Putting this function in a `setTimeout` function in order to make it asynchronous, which prevents bugs and improves performance.
				const root = document.documentElement
				const appHeader = document.querySelector('.app-header')
				appHeader.style.top = 'var(--header-top)'

				if (isSticky) {
					requestAnimationFrame(() => {
						root.style.setProperty('--header-top', '0px')
					})
					appHeader.classList.add('sticky')
				} else {
					requestAnimationFrame(() => {
						root.style.setProperty('--header-top', `-${appHeader.offsetHeight}px`)
					})

					if (window.scrollY === 0) {
						appHeader.classList.remove('sticky')
					} else {
						appHeader.classList.add('sliding-up')

						setTimeout(() => {
							appHeader.classList.remove('sliding-up', 'sticky')
						}, 250) // Match this timeout duration with .app-header's transition duration in _app_header.scss.
					}
				}
			}, 0)
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
			const store = this.$store

			window.onscroll = () => {
				const currentScrollPos = window.scrollY

				if (
					currentScrollPos === 0 || // If the viewport is at the very top of the page, or...
					(previousScrollPos <= currentScrollPos &&
					!store.state.showDeckMenu) // ...if the user scrolls the page downward and the deck menu isn't open...
				) {
					if (store.state.stickAppHeader) {
						store.commit('setStickAppHeader', false)
					}
				} else if (!store.state.pageScrollByAnchors) { // If the page is scrolling upward caused by the user's direct scrolling interaction...
					if (!store.state.stickAppHeader) {
						store.commit('setStickAppHeader', true)
					}
				}

				previousScrollPos = currentScrollPos
			}
		}
	}
}
</script>
