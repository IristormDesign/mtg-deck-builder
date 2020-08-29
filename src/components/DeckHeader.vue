<template>
	<header class="deck-header">
		<h2>{{ deck.name }}</h2>

		<div class="total-cards">
			<h3>Total Cards</h3>

			<div class="amount">
				{{ totalCards }}
				<span
					class="warning-symbol" v-show="totalCards < 60"
					title="The minimum card limit in a deck is 60."
				>⚠</span>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'deck-header',
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
