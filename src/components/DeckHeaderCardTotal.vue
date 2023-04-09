<template>
	<section class="deck-info card-total">
		<h3>Total Cards</h3>

		<div class="output">
			{{ totalCards }}
			<span
				class="warning-symbol" v-show="totalCards < 60"
				title="Decks cannot have fewer than 60 cards."
			>⚠</span>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	computed: {
		totalCards () {
			let total = 0

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					total++
				}
			})
			return total
		}
	}
}
</script>
