<template>
	<div id="app">
		<header>
			<h1>“Magic: The Gathering” Deck List Organizer</h1>
		</header>

		<main>
			<tabs>
				<tab-contents
					v-for="(deck, i) in decks"
					v-bind:key="i"
					v-bind:name="deck.name"
				>
					<header v-if="renaming === deck.cachedName">
						<h2>
							<input type="text" v-model="deck.name" />
						</h2>
						<button
							v-on:click="saveRename(deck)"
							title="Save changes"
						>💾</button>
						<button
							v-on:click="cancelRename(deck)"
							title="Cancel" class="cancel-button"
						>↩</button>
					</header>
					<header v-else>
						<h2>{{ deck.name }}</h2>
						<button
							v-on:click="renameDeck(deck)"
							title="Rename this deck"
						>Rename</button>
						<button
							v-on:click="deleteDeck(deck.name)"
							title="Delete this deck"
						>Delete</button>
					</header>

					<deck-list
						v-bind:activeDeck="deck"
						v-on:card-selected="selectedCard"
						v-on:qty-decreased="decQty"
						v-on:qty-increased="incQty"
					/>

					<card-display
						v-bind:activeDeck="deck"
					/>

					<card-adder
						v-bind:activeDeck="deck"
						v-on:card-added="addCard"
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
import CardDisplay from './components/CardDisplay.vue'
import CardAdder from './components/CardAdder.vue'

export default {
	name: 'App',
	components: {
		Tabs,
		TabContents,
		DeckList,
		CardDisplay,
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
							qty: 12
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
							qty: 2
						},
						{
							name: 'Stonecoil Serpent',
							type: 'Artifact Creature — Snake',
							mana: 'X',
							qty: 2
						}
					],
					defaultCard: 'Nyxbloom Ancient'
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
					],
					defaultCard: 'Baneslayer Angel'
				}
			],
			renaming: null
		}
	},
	methods: {
		// Give every card an object property of `showCard` which is set to false by default.
		setShowCardToFalse (deck) {
			deck.cards.forEach(card => {
				this.$set(card, 'showCard', false)
			})
		},
		selectedCard (card, deck) {
			this.setShowCardToFalse(deck)
			card.showCard = true
		},
		renameDeck (deck) {
			deck.cachedName = deck.name
			this.renaming = deck.name
		},
		cancelRename (deck) {
			Object.assign(deck, this.cachedDeck)
			this.renaming = null
		},
		saveRename (deck) {
			if (deck.name === '') return
			this.renaming = null
		},
		deleteDeck (deletedDeckName) {
			this.decks = this.decks.filter(deck => deck.name !== deletedDeckName)
		},
		decQty (card, deck) {
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
		incQty (card) {
			card.qty++
		},
		addCard (newCard, activeDeck) {
			activeDeck.cards.push(newCard)
		}
	},
	created () {
		this.decks.forEach(deck => {
			this.setShowCardToFalse(deck)

			deck.cards.forEach(card => {
				// Give each card data the name of the card image file which is based on the card's name.
				card.img = card.name.toLowerCase().replace(/ /g, '-') + '.png'

				// Show the deck's default card.
				if (deck.defaultCard === card.name) {
					card.showCard = true
				}
			})
		})
		this.decks.push({
			name: 'New Deck',
			cards: [],
			defaultCard: ''
		})
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
.tab-contents {
	header {
		grid-column: span 3;
		display: flex;
		align-items: center;

		h2 {
			margin: 0;
			display: inline-block;
			margin-right: 1em;
		}
		button {
			margin-left: .75em;
			background: #aaa;
			color: #000;
			border-radius: .167em;
			padding: .167em .25em;
			min-width: 4.5em;

			&:hover,
			&:focus {
				background: #777;
				color: #fff;
			}
		}
	}
}
</style>
