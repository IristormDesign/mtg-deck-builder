<template>
	<footer class="deck-footer">
		<card-adder :deck="deck" @card-added="addCard" />

		<button
			title="Delete this deck" @click="deleteDeck(deck.name)"
		>Delete Deck</button>
	</footer>
</template>

<script>
import CardAdder from './CardAdder.vue'

export default {
	name: 'deck-footer',
	components: {
		CardAdder
	},
	props: {
		deck: Object
	},
	methods: {
		addCard (newCard, deck) {
			this.setupCardProps(newCard)
			deck.cards.push(newCard)
			deck.viewedCard = newCard.name
			deck.editDate = new Date()
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
