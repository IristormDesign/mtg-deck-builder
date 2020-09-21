<template>
	<div id="app">
		<header class="site-header">
			<h1><a href="/">MTG Deck List Organizer</a></h1>
			<nav>
				<tabs
					:decks="decks" @create-deck="createDeck"  :activeTab="activeTab" @activated-tab="assignActiveTab"
				/>
			</nav>
		</header>
		<main>
			<tab-contents
				v-for="(deck, i) in decks" :key="i" :name="deck.name"
				v-show="activeTab == deck.name"
			>
				<div class="tab-contents-main">
					<deck-header :deck="deck" @sort-cards="sortCards" />
					<deck-list :deck="deck" :decks="decks" />
					<card-display :deck="deck" />
				</div>
				<deck-footer
					:deck="deck" :decks="decks" @deck-deleted="deleteDeck"
					@setup-new-card="setupCardProps"
				/>
			</tab-contents>

			<div v-if="activeTab == null" class="welcome">
				<div class="contents">
					<div class="text-box">
						<header>
							<h2>Greetings, planeswalker.</h2>
						</header>
						<p>This is the MTG Deck List Organizer, a web app where you can create and manage deck lists for <a href="https://magic.wizards.com" target="_blank" rel="noopener"><i><u>Magic: The Gathering</u></i></a> (a strategic collectible card game).</p>
						<p>To view a pre-made deck list, click on one of the tabs by the top-right corner.</p>
						<p>To construct a new deck list, click on the “+” tab.</p>
					</div>
				</div>
				<footer>
					<small>Illustration by <a href="https://www.davidrevoy.com/article24/video-timelapse-lezard" target="_blank" rel="noopener">David Revoy</a>; used with <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener" title="Creative Commons Attribution 4.0 International">CC BY 4.0 license</a></small>
				</footer>
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
					editDate: new Date(),
					previousSortProp: 'type'
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
		setupCardProps (card, deck) {
			card.img = card.name.toLowerCase().replace(/ /g, '-') + '.png'

			if (card.qty === undefined) {
				card.qty = 1
			}

			if (RegExp(/^Basic Land\b/).test(card.type)) {
				card.maxQty = 99
			} else {
				card.maxQty = 4
			}
		},
		sortCards (prop, deck) {
			deck.cards.sort((a, b) => {
				let reverseOrder = false

				if (prop === 'qty') {
					reverseOrder = true
				}

				let cardA = a[prop]
				let cardB = b[prop]

				// If prop is a card name, mana cost, or type...
				if (a[prop] instanceof String) {
					cardA = cardA.toUpperCase()
					cardB = cardB.toUpperCase()
				}

				if (cardA < cardB) {
					if (reverseOrder) {
						return 1
					} else {
						return -1
					}
				} else if (cardA > cardB) {
					if (reverseOrder) {
						return -1
					} else {
						return 1
					}
				}

				const prevProp = deck.previousSortProp
				let prevReverseOrder = false

				if (prevProp === 'qty') {
					prevReverseOrder = true
				}

				if (a[prevProp] < b[prevProp]) {
					if (prevReverseOrder) {
						return 1
					} else {
						return -1
					}
				} else if (a[prevProp] > b[prevProp]) {
					if (prevReverseOrder) {
						return -1
					} else {
						return 1
					}
				}

				// Sort by name as a last resort (if name isn't the previously selected property).
				if (prevProp !== 'name') {
					if (a.name < b.name) {
						return -1
					} else if (a.name > b.name) {
						return 1
					}
				}

				return 0
			})

			deck.previousSortProp = prop
		}
	},
	mounted () {
		this.decks.forEach(deck => {
			this.sortCards('type', deck)

			deck.cards.forEach(card => {
				this.setupCardProps(card, deck)

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
