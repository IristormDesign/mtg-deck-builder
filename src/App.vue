<template>
	<div id="app">
		<header>
			<h1>“Magic: The Gathering” Deck List Organizer</h1>
		</header>
		<main>
			<h2>{{ deck.name }}</h2>
			<deck-list
				v-bind:deckProp="deck.cards"
				v-on:showCardEvent="showCardMethod"
				v-on:decQtyEvent="decQtyMethod"
				v-on:incQtyEvent="incQtyMethod"
			/>
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
				name: 'My Nyxbloom Deck',
				cards: [
					{
						name: 'Forest',
						type: 'Basic Land — Forest',
						mana: '0',
						qty: 12,
						img: 'forest.jpg'
					},
					{
						name: 'Mountain',
						type: 'Basic Land — Mountain',
						mana: '0',
						qty: 10
					},
					{
						name: 'Jaya’s Greeting',
						type: 'Instant',
						mana: '1 🔴',
						qty: 4
					},
					{
						name: 'Leafkin Avenger',
						type: 'Creature — Elemental',
						mana: '2 🔴🟢',
						qty: 2
					},
					{
						name: 'Nyxbloom Ancient',
						type: 'Creature — Elemental',
						mana: '4 🟢🟢🟢',
						qty: 2,
						img: 'nxybloom-ancient.jpg'
					},
					{
						name: 'Stonecoil Serpent',
						type: 'Artifact Creature — Snake',
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
		},
		showCardMethod (card) {
			// console.log(card.img)
			// return card.img
		},
		decQtyMethod (card) {
			card.qty--

			if (card.qty <= 0) {
				const confirmRemoval = confirm('Are you sure you want to remove ' + card.name + ' from the deck?')

				if (confirmRemoval === true) {
					this.deck.cards = this.deck.cards.filter(
						eachCard => eachCard.name !== card.name
					)
				} else {
					card.qty = 1
				}
			}
		},
		incQtyMethod (card) {
			card.qty++
		}
	}
}
</script>

<style lang="scss">
*, *::before, *::after {
	box-sizing: border-box;
}

@import 'sass/normalize';
@import 'sass/variables';

html {
	font: 16px/1.5 $font-family-standard;
	background: #000;
	color: #eee;
}
#app {
	background: #333;

	> header {
		background: #000;
		color: #f39135;
		padding: 1.5em 1em;
		text-align: center;
		border-bottom: 2px solid #f39135;
	}
}
main {
	padding: 0 1.5em 1.5em;
	max-width: 1280px;
	margin: 0 auto;
}
h1 {
	line-height: 1;
	font-size: 2em;
	margin: 0;
	font-family: $font-family-heading;
	text-transform: uppercase;
}
h2 {
	font-family: $font-family-heading;
	color: tan;
}
button {
	cursor: pointer;
}
</style>
