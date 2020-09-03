<template>
	<div id="app">
		<header class="site-header">
			<h1><a href="/">MTG Deck List Organizer</a></h1>
			<tabs
				:decks="decks" @create-deck="createDeck"  :activeTab="activeTab" @activated-tab="assignActiveTab"
			/>
		</header>
		<main>
			<tab-contents
				v-for="(deck, i) in decks" :key="i" :name="deck.name"
				v-show="activeTab == deck.name"
			>
				<div class="tab-contents-main">
					<deck-header :deck="deck" />
					<deck-list :deck="deck" :decks="decks" />
					<card-display :deck="deck" />
				</div>
				<deck-footer
					:deck="deck" :decks="decks" @deck-deleted="deleteDeck"
					@setup-new-card="setupCardProps"
				/>
			</tab-contents>

			<div v-if="activeTab == null" class="welcome contents">
				<header>
					<h2>Welcome</h2>
				</header>
				<p>This is an app for building and managing deck lists for the collectible card game <a href="https://magic.wizards.com" target="_blank" rel="noopener"><i>Magic: The Gathering</i></a>.</p>
				<p>To view a pre-made deck list, click on one of the tabs by the top-right corner. To make a new deck list, click on the “+” tab.</p>
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
import DeckFooter from './components/DeckFooter.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
	name: 'App',
	components: {
		Tabs,
		TabContents,
		DeckHeader,
		DeckList,
		CardDisplay,
		DeckFooter,
		SiteFooter
	},
	data () {
		return {
			activeTab: null,
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
			editingDefaultCard: null,
			renaming: null
		}
	},
	methods: {
		assignActiveTab (deck) {
			this.activeTab = deck.name
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
					defaultCard: '',
					editDate: new Date()
				})
			}
		},
		switchToNewDeck (newDeckName) {
			for (let i = 0; i < this.decks.length; i++) {
				const deck = this.decks[i]

				if (deck.name === newDeckName) {
					this.activeTab = newDeckName
					deck.editDate = new Date()
					return
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
		},
		setupCardProps (card) {
			card.img = card.name.toLowerCase().replace(/ /g, '-') + '.png'

			if (card.qty === undefined) {
				card.qty = 1
			}

			if (RegExp(/^Basic Land\b/).test(card.type)) {
				card.maxQty = 99
			} else {
				card.maxQty = 4
			}

			this.$nextTick(() => {
				this.sortCards()
			})
		},
		sortCards () {
			this.decks.forEach(deck => {
				deck.cards.sort(function (a, b) {
					const cardA = a.name.toUpperCase()
					const cardB = b.name.toUpperCase()

					if (cardA < cardB) {
						return -1
					}
					if (cardA > cardB) {
						return 1
					}
					return 0
				})
			})
		}
	},
	mounted () {
		this.decks.forEach(deck => {
			deck.cards.forEach(card => {
				this.setupCardProps(card)

				if (deck.defaultCard === card.name) {
					card.showCard = true
				}
			})
		})
	}
}
</script>

<style lang="scss">
	/* CSS gets inserted here. Don't remove this line. */
</style>
