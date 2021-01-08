<template>
	<div class="card-total">
		<h3>Total cards:</h3>
		<div class="amount">
			{{ totalCards() }}
			<span
				class="warning-symbol" v-show="totalCards() < 60"
				title="The minimum card limit is 60."
			>⚠</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-card-total',
	props: {
		deck: Object
	},
	methods: {
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
