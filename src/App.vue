<template>
	<div id="app">
		<header class="site-header">
			<h1><a href="/">MTG Deck List Organizer</a></h1>
			<nav>
				<tabs
					:activeTab="$store.state.activeTab"
					@create-deck="createDeck" @activated-tab="assignActiveTab"
				/>
			</nav>
		</header>
		<main>
			<welcome v-if="$store.state.activeTab == null"></welcome>

			<div v-for="(deck, i) in $store.state.decks" :key="i">
				<tab-contents
					:deck="deck"
					v-show="$store.state.activeTab == deck.name"
				>
					<div class="tab-contents-main">
						<deck-header
							:deck="deck" @sort-cards="sortCards"
							@renamed-tab="assignActiveTab"
						/>
						<deck-list :deck="deck" />
						<card-display :deck="deck" />
					</div>
					<deck-footer
						:deck="deck" @deck-deleted="deleteDeck"
						@setup-new-card="setupCardProps"
					/>
				</tab-contents>
			</div>

			<tab-contents v-if="$store.state.deletedDeckMessage">
				<p class="deleted-deck-message">{{ $store.state.deletedDeckMessage }}</p>
			</tab-contents>
		</main>
		<site-footer />
	</div>
</template>

<script>
import Tabs from './components/Tabs.vue'
import TabContents from './components/TabContents.vue'
import Welcome from './components/Welcome.vue'
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
		Welcome,
		DeckHeader,
		DeckList,
		CardDisplay,
		DeckFooter,
		SiteFooter
	},
	methods: {
		assignActiveTab (deck) {
			this.$store.commit('changeDeletedDeckMessage', null)
			this.$store.commit('changeActiveTab', deck.name)
		},
		createDeck () {
			const newDeckName = prompt('Name this new deck:')

			if (newDeckName) {
				this.applyNewDeckName(newDeckName, this.checkExistingDeckNames(newDeckName))

				this.$nextTick(function () {
					this.switchToNewDeck(newDeckName)
				})
			}
		},
		checkExistingDeckNames (newDeckName) {
			const decks = this.$store.state.decks

			for (let i = 0; i < decks.length; i++) {
				if (newDeckName.toUpperCase() === decks[i].name.toUpperCase()) {
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
				this.$store.state.decks.push({
					name: newDeckName,
					cards: [],
					editDate: new Date(),
					previousSortProp: 'type'
				})
			}
		},
		switchToNewDeck (newDeckName) {
			this.$store.commit('changeDeletedDeckMessage', null)

			const decks = this.$store.state.decks

			for (let i = 0; i < decks.length; i++) {
				const deck = decks[i]

				if (deck.name === newDeckName) {
					this.$store.commit('changeActiveTab', newDeckName)
					deck.editDate = new Date()
					break
				}
			}
		},
		deleteDeck (deletedDeckName) {
			const deletionConfirmed = confirm('Are you sure you want to permanently delete the deck “' + deletedDeckName + '”?')

			if (deletionConfirmed) {
				this.$store.state.decks = this.$store.state.decks.filter(deck =>
					deck.name !== deletedDeckName
				)
				this.$store.commit('changeDeletedDeckMessage', `“${deletedDeckName}” is now deleted.`)
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
		this.$store.state.decks.forEach(deck => {
			this.sortCards('type', deck)

			deck.cards.forEach(card => {
				this.setupCardProps(card, deck)
			})
		})
	}
}
</script>

<style lang="scss">
	/* CSS gets inserted here. Don't remove this line. */
</style>
