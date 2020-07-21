<template>
	<div id="app">
		<header>
			<h1>“Magic: The Gathering” Deck List Organizer</h1>
		</header>
		<main>
			<deck-list v-bind:deck="cardsInDeck" />
			<card-adder v-on:addCardEvent="addCardMethod" />
		</main>
	</div>
</template>

<script>
import DeckList from './components/DeckList.vue'
import CardAdder from './components/CardAdder.vue'

export default {
	name: 'App',
	components: {
		DeckList,
		CardAdder
	},
	data () {
		return {
			cardsInDeck: [
				{
					name: 'Forest',
					type: 'Land',
					mana: '—',
					qty: 12
				},
				{
					name: 'Mountain',
					type: 'Land',
					mana: '—',
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
	},
	methods: {
		addCardMethod (card) {
			this.cardsInDeck.push(card)
		}
	}
}
</script>

<style lang="scss">
@import 'sass/normalize';

$font-family-standard: 'Volkhov', 'Georgia', serif;

html {
	font: 20px/1.5 $font-family-standard;
	color: #111;
	background: gray;
}
body {
	padding: .75em;
}
#app {
	margin: 0 auto;
	max-width: 1024px;
	background: antiquewhite;
	box-shadow: 0 .375em .75em rgba(#000, .5);

	> header {
		background: #000;
		color: orangered;
		padding: 2.25em 1em;
		text-align: center;
	}
	main {
		padding: 0 1.5em 1.5em;
	}
}
h1 {
	line-height: 1;
	font-size: 1.5em;
	margin: 0;
	text-transform: uppercase;
}
</style>
