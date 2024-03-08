<template>
	<section class="deck-info card-total">
		<h3>Total Cards</h3>

		<div class="output">
			{{ totalCards }}
			<span
				class="warning-symbol"
				v-show="showTotalsWarningSymbol"
				:title="totalsWarningTitle"
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
		},
		showTotalsWarningSymbol () {
			const total = this.totalCards

			return (
				total < 60 ||
				(total >= 90 && total < 100) ||
				(total > 100 && total <= 110)
			)
		},
		totalsWarningTitle () {
			const total = this.totalCards

			if (total < 60) {
				return 'Decks for standard Magic games must have 60 cards minimum.'
			} else if (
				(total >= 90 && total < 100) ||
				(total > 100 && total <= 110)
			) {
				return 'Decks for Commander games must have exactly 100 cards.'
			} else {
				return null
			}
		}
	}
}
</script>
