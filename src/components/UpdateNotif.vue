<template>
	<aside v-if="updateExists" class="update-notif">
		<template v-if="!refreshing">
			<p>✨ This app has an <strong>update available</strong>! Reload the page now to use the newest version.</p>
			<button @click="refreshApp">Reload</button>
		</template>
		<p class="reloading" v-else>Reloading the page now&hellip;</p>
	</aside>
</template>

<script>
export default {
	data () {
		return {
			refreshing: false,
			registration: null,
			updateExists: false
		}
	},
	created () {
		document.addEventListener('swUpdated', this.updateAvailable, { once: true })

		navigator.serviceWorker.addEventListener('controllerchange', () => {
			if (this.refreshing) return

			this.refreshing = true

			window.location.reload()
		})
	},
	methods: {
		updateAvailable (event) {
			this.registration = event.detail
			this.updateExists = true
		},
		refreshApp () {
			// Make sure we only send a 'skip waiting' message if the SW is waiting
			if (!this.registration || !this.registration.waiting) return

			// Send message to SW to skip the waiting and activate the new SW
			this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
		}
	}
}
</script>
