<template>
	<header class="sideboard-header">
		<h3>Sideboard</h3>

		<section class="sideboard-card-total">
			<h4>Total Cards<br> in Sideboard</h4>
			<div class="output">
				{{ sideboardTotalCards }}
				<span
					class="warning-symbol" v-show="sideboardTotalCards > 15"
					title="Sideboards cannot have more than 15 cards."
				>⚠</span>
			</div>
		</section>
	</header>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	computed: {
		sideboardTotalCards () {
			let total = 0

			this.deck.sideboard.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					total++
				}
			})
			return total
		}
	}
}
</script>
