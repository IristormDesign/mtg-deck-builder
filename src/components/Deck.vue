<template>
	<div class="deck">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckPath == deck.path">

				<header class="deck-header">
					<deck-name :deck="deck" />
					<deck-date-edited :deck="deck" />
					<button class="deck-action" @click="copyDeck(deck)">Copy Deck</button>
					<button class="deck-action" @click="deleteDeck(deck)">Delete Deck</button>
				</header>
				<deck-card-list :deck="deck" />
				<div class="card-list-controls">
					<deck-card-adder :deck="deck" />
					<deck-card-sorter :deck="deck" />
					<deck-card-total :deck="deck" />
				</div>
				<deck-card-display :deck="deck" />
				<deck-description :deck="deck" />
			</article>
		</div>
	</div>
</template>

<script>
import DeckName from './DeckName.vue'
import DeckCardAdder from './DeckCardAdder.vue'
import DeckCardSorter from './DeckCardSorter.vue'
import DeckDateEdited from './DeckDateEdited.vue'
import DeckCardTotal from './DeckCardTotal.vue'
import DeckDescription from './DeckDescription.vue'
import DeckCardList from './DeckCardList.vue'
import DeckCardDisplay from './DeckCardDisplay.vue'

export default {
	name: 'deck',
	components: {
		DeckName,
		DeckCardAdder,
		DeckCardSorter,
		DeckDateEdited,
		DeckCardTotal,
		DeckDescription,
		DeckCardList,
		DeckCardDisplay
	},
	methods: {
		deleteDeck (deck) {
			const deletedDeckName = deck.name
			const deletionConfirmed = confirm(`Are you sure you want to permanently delete the deck “${deletedDeckName}”?`)

			if (deletionConfirmed) {
				const remainingDecks = this.$store.state.decks.filter(
					deck => deck.name !== deletedDeckName
				)
				this.$store.state.decks = remainingDecks // Triggers watcher of decksLocalStorage.
				localStorage.setItem(
					'decks', JSON.stringify(this.$store.state.decks)
				)
				this.$store.commit('mutateDeletedDeckName', deletedDeckName)
				this.$router.replace({ name: 'deckDeleted' })
			}
		},
		copyDeck (srcDeck) {
			const duplicate = confirm(`Create a new deck that’s a copy of “${srcDeck.name}”?`)

			if (duplicate) {
				const dupDeckName = `${srcDeck.name} (copy)`

				this.$store.state.decks.push({
					name: dupDeckName,
					path: this.$store.getters.stringToPath(dupDeckName),
					cards: srcDeck.cards,
					editDate: new Date(),
					description: srcDeck.description,
					viewedCard: srcDeck.viewedCard
				})
				this.$store.state.decks.find((deck) => {
					if (deck.name === dupDeckName) {
						this.$router.push({
							name: 'deck',
							params: { deckPath: deck.path }
						})
					}
				})
			}
		}
	}
}
</script>
