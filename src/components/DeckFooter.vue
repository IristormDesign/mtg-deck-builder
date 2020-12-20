<template>
	<footer class="deck-footer">
		<card-adder :deck="deck" @card-added="addCard" />

		<div class="deck-actions">
			<button @click="duplicateDeck">Duplicate Deck</button>
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
			this.setupCardProps(card)
			this.deck.cards.push(card)
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

				this.$store.commit('mutateDeletedDeckName', deletedDeckName)

				this.$router.replace({ name: 'deckDeleted' })
			}
		},
		duplicateDeck () {
			const srcDeck = this.deck
			const duplicate = confirm(`Make a new deck that’s a copy of “${srcDeck.name}”?`)

			if (duplicate) {
				const dupDeckName = srcDeck.name + ' (copy)'

				this.$store.state.decks.push({
					name: dupDeckName,
					path: this.$store.getters.stringToPath(dupDeckName),
					cards: srcDeck.cards,
					editDate: new Date(),
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
		},
		setupCardProps (card) {
			card.img = this.$store.getters.stringToPath(card.name) + '.png'

			if (card.qty === undefined) {
				card.qty = 1
			}

			if (RegExp(/^Basic Land\b/).test(card.type)) {
				card.maxQty = 99
			} else {
				card.maxQty = 4
			}
		}
	},
	mounted () {
		this.$store.state.decks.forEach(deck => {
			deck.cards.forEach(card => {
				this.setupCardProps(card, deck)
			})
		})
	}
}
</script>
