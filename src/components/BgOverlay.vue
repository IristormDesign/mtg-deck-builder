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
