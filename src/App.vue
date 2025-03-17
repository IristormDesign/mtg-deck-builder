<template>
	<transition
		v-if="hasBrowserSupport"
		appear name="fade-from-black"
	>
		<div
			class="fade-bg"
			:class="this.$route.name === 'home' ? 'root-home-page' : null"
		>
			<div class="paint-container">
				<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
					<symbol id="open-in-new-icon" viewBox="0 -960 960 960">
						<path d="M228.31-164q-27.01 0-45.66-18.65Q164-201.3 164-228.31v-503.38q0-27.01 18.65-45.66Q201.3-796 228.31-796h236.3v52h-236.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v503.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h503.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-236.3h52v236.3q0 27.01-18.65 45.66Q758.7-164 731.69-164H228.31Zm159.46-186.62-37.15-37.15L706.85-744H576v-52h220v220h-52v-130.85L387.77-350.62Z"/>
					</symbol>
				</svg>
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
	<article v-else class="browser-unsupported">
		<h2>Browser Unsupported</h2>
		<p>Sorry, but <strong>MTG Deck Builder by Iristorm Design</strong> can’t be displayed because the web browser you’re currently using doesn’t pass the technical requirements to run it.</p>
		<p>To use this web app, please do it on one of the major web browsers, and ensure that the browser is updated to the newest version.</p>
	</article>
</template>

<script>
import UpdateNotif from '@/components/AppUpdateNotif.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

export default {
	components: { UpdateNotif, AppHeader, AppFooter, ScrollToTop },
	computed: {
		hasBrowserSupport () {
			return ('HTMLDialogElement' in window)
		}
	},
	mounted () {
		document.addEventListener(
			'auxclick', this.preventMiddleClicking
		)

		this.loadDefaultDecks()
	},
	methods: {
		/**
		 * Prevent all links from opening a new tab via middle-click, with the exception of the links that are always set to open in a new tab.
		 */
		preventMiddleClicking (event) {
			function conditions (el) {
				if (el !== null) {
					return (
						el.matches('a') &&
						!el.getAttribute('target')
					)
				}
			}

			if (
				conditions(event.target) ||
				conditions(event.target.closest('a'))
			) {
				event.preventDefault()
			}
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
