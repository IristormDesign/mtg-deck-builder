<template>
	<transition name="overlay">
		<div
			v-show="popup"
			class="bg-overlay"
			@click="hideOverlay()"
			@mouseover="hideOverlay()"
		></div>
	</transition>
</template>

<script>
export default {
	props: {
		popup: Boolean
	},
	data () {
		return {
			transitionActive: false
		}
	},
	methods: {
		hideOverlay () {
			if (!this.transitionActive) {
				this.transitionActive = true
				this.$emit('closePopups', true)

				setTimeout(() => {
					this.transitionActive = false
				}, 250) // Equal to transition's duration
			}
		}
	}
}
</script>
