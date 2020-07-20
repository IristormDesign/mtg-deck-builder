<template>
	<div id="app">
		<header>
			<h1>Magic: The Gathering Deck List App</h1>
		</header>

		<deck-list :deck="deck" />
	</div>
</template>

<script>
import DeckList from './components/DeckList.vue'

export default {
	name: 'App',
	components: {
		DeckList
	},
	data () {
		return {
			deck: [
				{
					name: 'Forest',
					type: 'Land',
					mana: 0,
					qty: 12
				},
				{
					name: 'Mountain',
					type: 'Land',
					mana: 0,
					qty: 12
				},
				{
					name: 'Jaya’s Greeting',
					type: 'Instant',
					mana: '1R',
					qty: 3
				},
				{
					name: 'Leafkin Avenger',
					type: 'Creature',
					mana: '2RG',
					qty: 2
				},
				{
					name: 'Nyxroot Elemental',
					type: 'Creature',
					mana: '4GGG',
					qty: 2
				},
				{
					name: 'Stonecoil Serpent',
					type: 'Artifact Creature',
					mana: 'X',
					qty: 2
				}
			]
		}
	}
}
</script>

<style lang="scss">
@import 'sass/normalize';

$font-family-standard: 'Vollkorn', 'Sitka Heading', serif;

html {
	font: 18px/1.5 $font-family-standard;
	font-size: calc(.5vw + 12px);
	color: #111;
	background: tan;
}
body {
	padding: .75em;
}
#app {
	margin: 0 auto;
	max-width: 1024px;
	background: antiquewhite;
	padding: 1.5em;
	box-shadow: 0 .375em .75em rgba(#000, .5);
}
h1 {
	line-height: 1;
	font-size: 1.5em;
	margin: 0;
}
</style>
