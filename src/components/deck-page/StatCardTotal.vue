<template>
	<section class="deck-info card-total">
		<h3>Total Cards</h3>

		<div
			class="output"
			:title="totalsWarningTitle"
		>
			{{ totalCards }}
			<svg
				v-show="showTotalsWarningSymbol"
				class="warning-symbol"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M22.62-98 480-886 937.38-98H22.62ZM481-220.69q18.73 0 32.02-13.29 13.29-13.29 13.29-32.02 0-18.73-13.29-32.02-13.29-13.29-32.02-13.29-18.73 0-32.02 13.29-13.29 13.29-13.29 32.02 0 18.73 13.29 32.02 13.29 13.29 32.02 13.29Zm-43-127.62h86v-204h-86v204Z"
			/></svg>
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
			return this.deck.cards.reduce(
				(total, card) => total + card.qty,
				0
			)
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
				return 'A deck for the standard Magic game format must have at least 60 cards.'
			} else if (
				(total >= 90 && total < 100) ||
				(total > 100 && total <= 110)
			) {
				return 'A deck for the Commander format must have exactly 100 cards (including the commander).'
			} else {
				return null
			}
		}
	}
}
</script>
