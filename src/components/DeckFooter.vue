<template>
	<footer class="deck-footer">
		<card-adder :deck="deck" @card-added="addCard" />

		<button
			title="Delete this deck"
			@click="$emit('deck-deleted', deck.name)"
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
			this.$emit('setup-new-card', newCard)
			deck.cards.push(newCard)
			deck.editDate = new Date()
			deck.viewedCard = newCard.name
		}
	}
}
</script>
