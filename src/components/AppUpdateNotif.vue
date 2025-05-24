<template>
	<aside
		v-if="updateReady"
		class="update-notification"
	>
		<template v-if="!reloading">
			<p>🔔 An <strong>update is ready</strong>! Reload the page to use the newest version now.&nbsp;</p>
			<div class="button-container reload">
				<button @click="activateNewServiceWorker()">Reload</button>
			</div>
		</template>
		<p
			v-else
			class="reloading-message"
		>Reloading…</p>
	</aside>
	<aside
		v-else-if="!reloading && $store.state.updateJustInstalled"
		class="update-notification"
	>
		<p>✅ MTG Deck Builder is now up to date.&nbsp;</p>
		<div class="button-container">
			<router-link
				class="button"
				to="/release-notes"
				@click.native="$store.commit('updateJustInstalled', false)"
			>
				What’s New?
			</router-link>
			<button @click="$store.commit('updateJustInstalled', false)">
				OK
			</button>
		</div>
	</aside>
</template>

<script>
export default {
	data () {
		return {
			reloading: false,
			registration: null,
			updateReady: false
		}
	},
	created () {
		document.addEventListener(
			'swUpdated', this.notifyAboutAppUpdate, { once: true }
		)
		navigator.serviceWorker.addEventListener(
			'controllerchange', this.reloadPageOnNewSWController, { once: true }
		)

		/* For testing purposes only: */
		// this.$store.commit('updateJustInstalled', true)
	},
	methods: {
		activateNewServiceWorker () {
			if (!this.registration || !this.registration.waiting) return

			this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
		},
		notifyAboutAppUpdate (event) {
			this.registration = event.detail
			this.updateReady = true

			this.$store.commit('updateJustInstalled', true)
		},
		reloadPageOnNewSWController () {
			this.reloading = true

			window.location.reload()
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/app-update-notification.scss';
</style>
