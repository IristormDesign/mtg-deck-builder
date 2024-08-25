<template>
	<nav class="mode-menu">
		<ul>
			<li>
				<router-link
					:to="{ name: 'deckEditor' }"
					:class="($route.name === 'deckEditor') ? 'current-page' : null"
				>Deck Editor</router-link>
			</li>
			<li>
				<router-link
					:to="{ name: 'deckAnalyzer' }"
					:class="($route.name === 'deckAnalyzer') ? 'current-page' : null"
				>Deck Analyzer</router-link>
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
