<template>
	<aside v-if="updateExists" class="update-notification">
		<template v-if="!refreshing">
			<p>✨ This app has an <strong>update ready</strong>! Reload the page to use the newest version now.</p>
			<div class="button-container">
				<button @click="refreshApp">Reload</button>
			</div>
		</template>
		<p class="reloading" v-else>Reloading&hellip;</p>
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
