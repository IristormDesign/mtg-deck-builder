<template>
	<section class="deck-info average-mana-value">
		<h3>Average<br>Mana Value</h3>

		<div class="output">
			{{ averageManaValue }}
		</div>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	computed: {
		averageManaValue () {
			/* Any card with a mana cost counts as a spell. */
			const spellsOnly = this.deck.cards.filter(card => card.mana)
			let avg = 0
			let totalSpells = 0

			spellsOnly.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					avg += card.cmc
					totalSpells++
				}
			})

			if (totalSpells > 0) {
				avg /= totalSpells
			}

			avg = avg.toFixed(1)

			return avg
		}
	}
}
</script>
