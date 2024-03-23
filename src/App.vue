<template>
	<transition appear name="fade-from-black">
		<div class="fade-bg" :class="homePageClass">
			<div class="paint-container">
				<update-notif />
				<app-header />
				<main>
					<router-view />
				</main>
				<app-footer />
			</div>
			<scroll-to-top />
		</div>
	</transition>
</template>

<script>
import UpdateNotif from '@/components/AppUpdateNotif.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

export default {
	components: { UpdateNotif, AppHeader, AppFooter, ScrollToTop },
	computed: {
		homePageClass () {
			if (this.$route.name === 'home') {
				return 'root-home-page'
			} else {
				return 'texture-bg' // For better performance, don't let the background texture image load on the home page.
			}
		}
	},
	mounted () {
		this.preventMiddleClicking()
		this.loadDefaultDecks()
	},
	methods: {
		/**
		 * Prevent all links from opening a new tab via middle-click, with the exception of the links that are always set to open in a new tab.
		 */
		preventMiddleClicking () {
			document.addEventListener('auxclick', (event) => {
				function conditions (el) {
					if (el !== null) {
						return (el.matches('a') && el.getAttribute('target') !== '_blank')
					}
				}

				if (
					conditions(event.target) ||
					conditions(event.target.closest('a'))
				) {
					event.preventDefault()
				}
			})
		},
		/**
		 * Load the two default decks if needed.
		 */
		loadDefaultDecks () {
			const store = this.$store

			if (store.state.loadDefaultDecks) {
				import('@/js/default-decks.json')
					.then(data => {
						store.commit('decks', data.decks)
						store.commit('loadDefaultDecks', false)
					})
					.then(() => {
						store.state.decks.forEach(deck => {
							deck.editDate = new Date()
							store.commit('decks', store.state.decks)
						})
					})
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/index.scss';
</style>
