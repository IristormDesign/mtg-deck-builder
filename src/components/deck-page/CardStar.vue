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
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m244-136 89-290L98-595h290l92-305 92 305h290L627-426l89 290-236-179-236 179Z"/></svg>
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
