<template>
	<label class="card-star" title="[A]">
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
			this.$set(this.activeCardList, 'viewedCard', card)
			this.$set(this.activeCardList, 'viewedStarredCard', card)

			if (deck.sortBy === 'Starred') {
				deck.sortBy = '(Unsorted)'

				deck.cards.forEach(eachCard => {
					delete eachCard.gapAfter
				})
				deck.sideboard.cards.forEach(eachCard => {
					delete eachCard.gapAfter
				})
			}

			if (!card.starred) {
				this.activeCardList.viewedStarredCard = this.anotherStarredCard

				delete card.starred
			}

			this.$store.commit('decks', this.$store.state.decks)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/card-stars.scss';
</style>
