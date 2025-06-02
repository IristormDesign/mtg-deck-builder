<template>
	<transition v-if="hasBrowserSupport">
		<div
			class="fade-bg"
			:class="this.$route.name === 'home' ? 'root-home-page' : null"
		>
			<global-svg-symbols />
			<update-notif />
			<app-header />
			<main>
				<router-view />
			</main>
			<app-footer />
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
import GlobalSvgSymbols from '@/components/GlobalSvgSymbols.vue'
import UpdateNotif from '@/components/AppUpdateNotif.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

export default {
	components: { GlobalSvgSymbols, UpdateNotif, AppHeader, AppFooter, ScrollToTop },
	metaInfo: {
		title: 'MTG Deck Builder by Iristorm Design',
		titleTemplate: '%s · MTG Deck Builder'
	},
	computed: {
		hasBrowserSupport () {
			return ('HTMLDialogElement' in window)
		}
	},
	watch: {
		'$route' (to, from) {
			this.automaticallyHideUpdateNotif(to, from)
		}
	},
	created () {
		this.showUpToDateNotifForReturningUsersFromOldVersion()

		window.addEventListener('storage', this.syncStorage)
	},
	mounted () {
		this.loadDefaultDecks()
	},
	methods: {
		automaticallyHideUpdateNotif (to, from) {
			if (
				this.$store.state.updateJustInstalled &&
				from.name !== null
			) {
				this.$store.commit('updateJustInstalled', false)
			}
		},
		/**
		 * Show the "up to date" notification banner for returning users who've just updated the app from a version older than the version that introduced the "up to date" banner.
		 * This method is only necessary for returning users who don't have the store state `updateJustInstalled` in their browser's localstorage because they're on an old version where that state wasn't created yet. In the future, this method could be removed because everyone should be off of those very old versions by then. */
		showUpToDateNotifForReturningUsersFromOldVersion () {
			if (
				!this.$store.state.loadDefaultDecks && // If the default decks don't need to be loaded, that implies the user is a returning user rather than a new one.
				this.$store.state.updateJustInstalled === undefined // This state would be `undefined` if the returning user hasn't updated the app to the newest version yet.
			) {
				this.$store.commit('updateJustInstalled', true)
			}
		},
		/**
		 * Listen to the storage event to sync the Vuex store with the browser's localStorage. This is needed for when the app is opened in multiple browser tabs at once.
		 */
		syncStorage (event) {
			if (event.key === 'vuex') {
				const newStates = JSON.parse(event.newValue)
				const store = this.$store

				if (newStates.timeAppLastModified > store.state.timeAppLastModified) {
					window.__mdbSyncingFromStorage = true

					store.commit('decks', newStates.decks)
					store.commit('loadDefaultDecks', newStates.loadDefaultDecks)
					store.commit('timeAppLastModified', newStates.timeAppLastModified)

					window.__mdbSyncingFromStorage = false
				}
			}
		},
		/**
		 * Load the two default decks if needed.
		 */
		loadDefaultDecks () {
			const store = this.$store

			if (!store.state.loadDefaultDecks) return

			import('@/js/default-decks.json')
				.then(data => {
					data.decks.forEach(deck => {
						deck.editDate = new Date()
					})

					store.commit('decks', data.decks)
				})

			store.commit('loadDefaultDecks', false)
			store.commit('updateJustInstalled', false) // Needed to prevent showing the "up to date" notification banner, which can conditionally appear based on the state of `loadDefaultDecks`, but shouldn't appear at this time.
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/index.scss';
</style>
