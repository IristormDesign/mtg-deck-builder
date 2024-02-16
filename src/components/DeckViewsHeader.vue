<template>
	<section class="deck-views content-box">
		<h3>{{ deckViewHeading }}</h3>

		<nav>
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
						:class="($route.name === 'drawSimulator') ? 'current-page' : null"
						:to="{ name: 'drawSimulator' }"
					>Draw Simulator</router-link>
				</li>
			</ul>
		</nav>
	</section>
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
				case 'drawSimulator':
					return 'Draw Simulator'
				default:
					return null
			}
		}
	}
}
</script>
