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
					:to="{ name: 'moreStats' }"
					:class="($route.name === 'moreStats') ? 'current-page' : null"
				>More Statistics</router-link>
			</li>
			<li>
				<router-link
					:to="{ name: 'drawSim' }"
					:class="($route.name === 'drawSim') ? 'current-page' : null"
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
