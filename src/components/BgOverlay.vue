<template>
	<transition name="overlay">
		<div
			v-show="popup"
			class="bg-overlay"
			@click="hideOverlay(true)"
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
		hideOverlay (triggeredByClick) {
			function anyFocusedDeckLink () {
				const deckMenuLinks = document.querySelector('.app-header .deck-menu').querySelectorAll('a, button')

				for (const link of deckMenuLinks) {
					if (link === document.activeElement) {
						return true
					}
				}
				return false
			}

			if (!this.transitionActive && !anyFocusedDeckLink()) {
				// In this context, mouseout means the mouse pointer is hovering out of a menu, over the overlay. Thus, if the mouseout event is active, then hide the overlay. (And clicking the overlay hides it too.)
				if (triggeredByClick || this.$store.state.mouseoutEventActive) {
					this.transitionActive = true
					this.$emit('closePopups', true)

					setTimeout(() => {
						this.transitionActive = false
					}, 250) // Equal to transition's duration
				}
			}
		}
	}
}
</script>
