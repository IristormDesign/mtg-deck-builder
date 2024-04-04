<template>
	<input
		type="checkbox"
		class="card-star"
		@change="toggleCardStar(card)"
		v-model="cardObject.starred"
		:name="'s' + i"
	>
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

			if (deck.sortBy === 'starred') {
				deck.sortBy = ''
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
	@import '@/sass/card-stars.scss';
</style>
