<template>
	<div class="deck-info average-cmc">
		<h3>Average conv. <br>mana cost</h3>

		<div class="output">
			{{ averageCmc }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'average-cmc',
	props: {
		deck: Object
	},
	computed: {
		averageCmc () {
			// Any card with a mana cost counts as a spell.
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
				avg /= (totalSpells)
			}

			avg = avg.toFixed(1)

			return avg
		}
	}
}
</script>
