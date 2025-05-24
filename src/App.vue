<template>
	<transition
		v-if="hasBrowserSupport"
		appear name="fade-from-black"
	>
		<div
			class="fade-bg"
			:class="this.$route.name === 'home' ? 'root-home-page' : null"
		>
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
