export default {
	methods: {
		headerButtonAttention () {
			let button

			if (this.$store.state.decks.length > 0) {
				button = document.querySelector('.deck-menu-toggler')
			} else {
				button = document.querySelector('.create-deck a')
			}

			button.classList.add('attention')

			setTimeout(() => {
				button.classList.remove('attention')
			}, 800) // Duration equal to the total animation duration set in CSS.
		}
	}
}
