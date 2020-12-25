<template>
	<footer class="deck-footer">
		<card-adder :deck="deck" @card-added="addCard" />

		<div class="deck-actions">
			<button @click="copyDeck">Copy Deck</button>
			<button @click="deleteDeck">Delete Deck</button>
		</div>
	</footer>
</template>

<script>
import CardAdder from './DeckCardAdder.vue'

export default {
	name: 'deck-footer',
	components: {
		CardAdder
	},
	props: {
		deck: Object
	},
	methods: {
		addCard (card) {
			this.deck.cards.push(card)
			card.qty = 1
			this.deck.viewedCard = card.name
			this.deck.editDate = new Date()
		},
		deleteDeck () {
			const deletedDeckName = this.deck.name
			const deletionConfirmed = confirm('Are you sure you want to permanently delete the deck “' + deletedDeckName + '”?')

			if (deletionConfirmed) {
				this.$store.state.decks = this.$store.state.decks.filter(deck =>
					deck.name !== deletedDeckName
				)
				localStorage.setItem('decks',
					JSON.stringify(this.$store.state.decks)
				)

				this.$store.commit('mutateDeletedDeckName', deletedDeckName)

				this.$router.replace({ name: 'deckDeleted' })
			}
		},
		copyDeck () {
			const srcDeck = this.deck
			const duplicate = confirm(`Create a new deck that’s a copy of “${srcDeck.name}”?`)

			if (duplicate) {
				const dupDeckName = srcDeck.name + ' (copy)'

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
