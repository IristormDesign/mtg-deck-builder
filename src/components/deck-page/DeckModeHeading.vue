<template>
	<header class="mode-heading">
		<h3>{{ deckModeHeading }}</h3>
	</header>
</template>

<script>
export default {
	computed: {
		deckModeHeading () {
			switch (this.$route.name) {
				case 'deckEditor':
					return 'Deck Editor'
				case 'moreStats':
					return 'More Statistics'
				case 'drawSim':
					return 'Draw Simulator'
				default:
					return null
			}
		}
	}
}
</script>
