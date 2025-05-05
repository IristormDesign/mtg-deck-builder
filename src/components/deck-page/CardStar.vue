<template>
	<label
		class="card-star"
		title="(A)"
	>
		<input
			type="checkbox"
			@change="toggleCardStar(card)"
			v-model="cardObject.starred"
			:name="'s' + i"
		>
		<svg><use href="#star-icon" /></svg>
	</label>
</template>

<script>
import cardListFunctions from '@/mixins/cardListFunctions.js'

export default {
	mixins: [cardListFunctions],
	props: {
		card: Object,
		deck: Object,
		i: Number
	},
	methods: {
		toggleCardStar (card) {
			const deck = this.deck

			deck.editDate = new Date()
			this.activeCardList.viewedCard = card
			this.activeCardList.viewedStarredCard = card

			if (deck.sortBy === 'Starred') {
				deck.sortBy = '(Unsorted)'

				deck.cards.forEach(eachCard => {
					eachCard.gapAfter = false
				})
				deck.sideboard.cards.forEach(eachCard => {
					eachCard.gapAfter = false
				})
			}

			if (!card.starred) {
				this.activeCardList.viewedStarredCard = this.anotherStarredCard
			}

			this.$store.commit('decks', this.$store.state.decks)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/card-stars.scss';
</style>
