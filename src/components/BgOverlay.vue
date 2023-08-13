<template>
	<transition name="overlay">
		<div
			v-show="$store.state.showingAnyPopup"
			class="bg-overlay"
			@click="hideOverlay(true)"
			@mouseover="hideOverlay(false)"
		></div>
	</transition>
</template>

<script>
export default {
	data () {
		return {
			transitionActive: false
		}
	},
	methods: {
		hideOverlay (triggeredByClick) {
			if (!this.transitionActive && !anyDeckLinkFocused()) {
				if (triggeredByClick || (!triggeredByClick && this.$store.state.overlayHoverEnabled)) {
					this.transitionActive = true
					this.$emit('closePopups', true)
					this.$store.commit('setOverlayHoverEnabled', true)
					this.$store.commit('setShowingAnyPopup', false)

					setTimeout(() => {
						this.transitionActive = false
					}, 250) // Equal to transition's duration
				}
			}

			function anyDeckLinkFocused () {
				const deckMenuLinks = document.querySelectorAll('.deck-menu a')

				for (const link of deckMenuLinks) {
					if (link === document.activeElement) {
						return true
					}
				}
				return false
			}
		}
	}
}
</script>
