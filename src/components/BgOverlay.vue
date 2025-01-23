<template>
	<transition name="overlay">
		<div
			v-show="$store.state.showingAnyPopup && $store.state.showDeckMenu"
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
			if (this.transitionActive) return

			function anyDeckLinkFocused () {
				const deckMenuLinks = document.querySelectorAll('.deck-menu a')

				return [...deckMenuLinks].some(
					link => link === document.activeElement
				)
			}

			if (anyDeckLinkFocused()) return

			if (
				!triggeredByClick &&
				!this.$store.state.overlayHoverEnabled
			) return

			this.transitionActive = true
			this.$emit('closePopups', true)
			this.$store.commit('overlayHoverEnabled', true)
			this.$store.commit('showingAnyPopup', false)

			setTimeout(() => {
				this.transitionActive = false
			}, 250) // Equal to transition's duration
		}
	}
}
</script>
