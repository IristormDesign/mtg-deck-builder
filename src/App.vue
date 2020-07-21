<template>
	<div id="app">
		<header>
			<h1>“Magic: The Gathering” Deck List Organizer</h1>
		</header>
		<main>
			<h2>{{ deck.name }}</h2>
			<deck-list v-bind:deckProp="deck.cards" />

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
			deck: {
				name: 'Nyxbloom Deck',
				cards: [
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
						name: 'Nyxbloom Elemental',
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
	},
	methods: {
		addCardMethod (card) {
			this.deck.cards.push(card)
		}
	}
}
</script>

<style lang="scss">
@import 'sass/normalize';

$font-family-standard: 'Volkhov', 'Georgia', serif;

html {
	font: 16px/1.5 $font-family-standard;
	color: #222;
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
		background: radial-gradient(skyblue, navy);
		color: #fff;
		padding: 2.25em 1em;
		text-align: center;
		text-shadow: 0 0 .75em navy;
	}
	main {
		padding: 0 1.5em 1.5em;
	}
}
h1 {
	line-height: 1;
	font-size: 2em;
	margin: 0;
	text-transform: uppercase;
}
</style>
