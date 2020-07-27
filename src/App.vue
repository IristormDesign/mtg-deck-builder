<template>
	<div id="app">
		<header>
			<h1>“Magic: The Gathering” Deck List Organizer</h1>
		</header>

		<main>
			<tabs>
				<tab-contents
					v-for="deck in decks"
					v-bind:key="deck.name"
					v-bind:name="deck.name"
				>
					<h2>{{ deck.name }}</h2>
					<deck-list
						v-bind:activeDeck="deck"
						v-on:showCardEvent="showCardMethod"
						v-on:decQtyEvent="decQtyMethod"
						v-on:incQtyEvent="incQtyMethod"
					/>
					<card-adder
						v-bind:activeDeck="deck"
						v-on:addCardEvent="addCardMethod"
					/>
				</tab-contents>
			</tabs>
		</main>
	</div>
</template>

<script>
import Tabs from './components/Tabs.vue'
import TabContents from './components/TabContents.vue'
import DeckList from './components/DeckList.vue'
import CardAdder from './components/CardAdder.vue'

export default {
	name: 'App',
	components: {
		Tabs,
		TabContents,
		DeckList,
		CardAdder
	},
	data () {
		return {
			decks: [
				{
					name: 'Mana Overload',
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
							name: 'Almighty Bushwagg',
							type: 'Creature — Bushwagg',
							mana: '🟢',
							qty: 2
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
							name: 'Shivan Dragon',
							type: 'Creature — Dragon',
							mana: '4 🔴🔴',
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
				},
				{
					name: 'High Life',
					cards: [
						{
							name: 'Plains',
							type: 'Basic Land — Plains',
							mana: '0',
							qty: 13
						},
						{
							name: 'Island',
							type: 'Basic Land — Island',
							mana: '0',
							qty: 10
						},
						{
							name: 'Azorious Guildgate',
							type: 'Land – Gate',
							mana: '0',
							qty: 2
						},
						{
							name: 'Healer’s Hawk',
							type: 'Creature — Bird',
							mana: '⚪',
							qty: 2
						},
						{
							name: 'Tide Skimmer',
							type: 'Creature — Drake',
							mana: '2 🔵🔵',
							qty: 2
						},
						{
							name: 'Baneslayer Angel',
							type: 'Creature — Angel',
							mana: '3 ⚪⚪',
							qty: 1
						}
					]
				}
			]
		}
	},
	methods: {
		addCardMethod (newCard, activeDeck) {
			activeDeck.cards.push(newCard)
		},
		showCardMethod (card) {
			// console.log(card.img)
			// return card.img
		},
		decQtyMethod (card, deck) {
			card.qty--

			if (card.qty <= 0) {
				const confirmRemoval = confirm('Are you sure you want to remove ' + card.name + ' from the deck?')

				if (confirmRemoval === true) {
					deck.cards = deck.cards.filter(
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
@import 'sass/normalize';
@import 'sass/variables';
@import 'sass/general';

#app {
	background: #333;

	> header {
		background: linear-gradient(orangered, #000, #000, orangered);
		color: #ddd;
		padding: 1em;
		text-align: center;
	}
}
main {
	padding: 0 1.5em 1.5em;
	max-width: 1280px;
	margin: 0 auto;
}
h1 {
	line-height: 1;
	font-size: 1.5em;
	margin: 0;
	text-transform: uppercase;
}
</style>
