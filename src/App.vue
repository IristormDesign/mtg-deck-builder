<template>
	<div id="app">
		<header class="site-header">
			<h1>
				<a href="/">“Magic: The Gathering” Deck List Organizer</a>
			</h1>
		</header>
		<main>
			<tabs
				@create-deck="createDeck"
				@tab-active="noActiveTabs = false"
			>
				<tab-contents
					v-for="(deck, i) in decks"
					:key="i" :name="deck.name"
				>
					<deck-header
						:decks="decks" :deck="deck"
						@deck-deleted="deleteDeck"
					/>
					<deck-list
						:activeDeck="deck"
						@card-selected="selectedCard"
						@qty-decreased="decQty"
						@qty-increased="incQty"
					/>
					<card-display
						:activeDeck="deck"
					/>
					<card-adder
						:activeDeck="deck" @card-added="addCard"
					/>
				</tab-contents>
			</tabs>

			<div v-if="noActiveTabs" class="welcome">
				<header>
					<h2>Welcome</h2>
				</header>
				<p>This is an app for building and managing deck lists for the collectible card game <a href="https://magic.wizards.com" target="_blank" rel="noopener"><i>Magic: The Gathering</i></a>.</p>
				<p>To view a pre-made deck list, click on one of the tabs above. To make a new deck list, click the “+” tab.</p>
			</div>
		</main>
		<site-footer />
	</div>
</template>

<script>
import Tabs from './components/Tabs.vue'
import TabContents from './components/TabContents.vue'
import DeckHeader from './components/DeckHeader.vue'
import DeckList from './components/DeckList.vue'
import CardDisplay from './components/CardDisplay.vue'
import CardAdder from './components/CardAdder.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
	name: 'App',
	components: {
		Tabs,
		TabContents,
		DeckHeader,
		DeckList,
		CardDisplay,
		CardAdder,
		SiteFooter
	},
	data () {
		return {
			noActiveTabs: true,
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
							qty: 1
						},
						{
							name: 'Jaya’s Greeting',
							type: 'Instant',
							mana: '1 🔴',
							qty: 3
						},
						{
							name: 'Leafkin Avenger',
							type: 'Creature — Elemental',
							mana: '2 🔴🟢',
							qty: 3
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
							qty: 3
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
					name: 'Air Force',
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
			renaming: null,
			editingDefaultCard: null
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
			setCardImageURL(newCard)
		},
		createDeck () {
			const newDeckName = prompt('Give this new deck a name:')

			if (newDeckName) {
				this.applyNewDeckName(newDeckName, this.checkExistingDeckNames(newDeckName))

				this.$nextTick(function () {
					this.switchToNewDeck(newDeckName)
				})
			}
		},
		checkExistingDeckNames (newDeckName) {
			for (let i = 0; i < this.decks.length; i++) {
				if (newDeckName.toUpperCase() === this.decks[i].name.toUpperCase()) {
					return true
				}
			}
			return false
		},
		applyNewDeckName (newDeckName, existingDeckName) {
			if (existingDeckName) {
				newDeckName = prompt('Another deck already has the name “' + newDeckName + '.” Please give a different name.')

				if (newDeckName) {
					this.applyNewDeckName(newDeckName, this.checkExistingDeckNames(newDeckName))
				}
			} else {
				this.decks.push({
					name: newDeckName,
					cards: [],
					defaultCard: ''
				})
			}
		},
		switchToNewDeck (newDeckName) {
			const tabs = this.$children[0].$children

			for (let i = 0; i < tabs.length; i++) {
				const tab = tabs[i]

				if (tab.name === newDeckName) {
					tab.isActive = true
				} else {
					tab.isActive = false
				}
			}
		},
		deleteDeck (deletedDeckName) {
			const confirmDeletion = confirm('Are you sure you want to delete the deck “' + deletedDeckName + '”?')

			if (confirmDeletion) {
				this.decks = this.decks.filter(deck =>
					deck.name !== deletedDeckName
				)
			}
		}
	},
	mounted () {
		this.decks.forEach(deck => {
			this.setShowCardToFalse(deck)

			deck.cards.forEach(card => {
				// Give each card data the name of the card image file which is based on the card's name.
				setCardImageURL(card)

				// Show the deck's default card.
				if (deck.defaultCard === card.name) {
					card.showCard = true
				}
			})
		})
	}
}
function setCardImageURL (card) {
	card.img = card.name.toLowerCase().replace(/ /g, '-') + '.png'
}
</script>

<style lang="scss">
	@import 'sass/index';
</style>
