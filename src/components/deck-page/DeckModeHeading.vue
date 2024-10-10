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
				case 'deckAnalyzer':
					return 'Deck Analyzer'
				case 'drawSim':
					return 'Draw Simulator'
				case 'listAsText':
					return 'Card List as Text'
				default:
					return null
			}
		}
	}
}
</script>
