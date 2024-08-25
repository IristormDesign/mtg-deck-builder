<template>
	<nav class="mode-menu">
		<ul>
			<li>
				<router-link
					:to="{ name: 'deckEditor' }"
					:class="onPage('deckEditor')"
				>Deck Editor</router-link>
			</li>
			<li>
				<router-link
					:to="{ name: 'deckAnalyzer' }"
					:class="onPage('deckAnalyzer')"
				>Deck Analyzer</router-link>
			</li>
			<li>
				<router-link
					:to="{ name: 'drawSim' }"
					:class="onPage('drawSim')"
				>Draw Simulator</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	methods: {
		onPage (routeName) {
			if (this.$route.name === routeName) {
				return 'current-page'
			}
		}
	}
}
</script>
