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
				case 'listEditor':
					return 'List Editor'
				case 'deckAnalyzer':
					return 'Deck Analyzer'
				case 'drawSim':
					return 'Draw Simulator'
				default:
					return null
			}
		}
	}
}
</script>
