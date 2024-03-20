<template>
	<nav class="deck-modes deck-info">
		<h3>{{ deckViewHeading }}</h3>
		<ul>
			<li>
				<router-link
					:to="{ name: 'deckEditor' }"
					:class="($route.name === 'deckEditor') ? 'current-page' : null"
				>Deck Editor</router-link>
			</li>
			<li>
				<router-link
					:class="($route.name === 'moreStats') ? 'current-page' : null"
					:to="{ name: 'moreStats' }"
				>More Statistics</router-link>
			</li>
			<li>
				<router-link
					:class="($route.name === 'drawSim') ? 'current-page' : null"
					:to="{ name: 'drawSim' }"
				>Draw Simulator</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	computed: {
		deckViewHeading () {
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
