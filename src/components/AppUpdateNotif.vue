<template>
	<aside
		v-if="updateExists"
		class="update-notification"
	>
		<p>✨ There’s an <strong>app update ready</strong>! Reload the page to use the newest version now.</p>
		<div class="button-container">
			<button
				v-if="!reloading"
				@click="activateNewServiceWorker()"
			>Reload</button>
			<p
				v-else
				class="reloading"
			>Reloading&hellip;</p>
		</div>
	</aside>
</template>

<script>
export default {
	data () {
		return {
			reloading: false,
			registration: null,
			updateExists: false
		}
	},
	created () {
		document.addEventListener('swUpdated', this.updateAvailable, { once: true })

		this.reloadPage()
	},
	methods: {
		activateNewServiceWorker () {
			// Make sure we only send a 'skip waiting' message if the Service Worker is waiting.
			if (!this.registration || !this.registration.waiting) return

			// Send message to Service Worker to skip the waiting and activate the new Service Worker.
			this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
		},
		updateAvailable (event) {
			this.registration = event.detail
			this.updateExists = true
		},
		reloadPage () {
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (!this.reloading) {
					this.reloading = true

					window.location.reload()
				}
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/app-update-notification.scss';
</style>
