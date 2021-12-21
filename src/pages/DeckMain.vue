<template>
	<div class="card-display-scroll-view wrap">
		<card-display :deck="deck" />
		<div class="deck-main">
			<card-list :deck="deck" />
			<section class="card-list-controls">
				<card-adder :deck="deck" />
				<card-sorter :deck="deck" />
				<deck-actions :deck="deck" />
			</section>
		</div>
	</div>
</template>

<script>
import findRelevantDeck from '@/mixins/findRelevantDeck.js'
import CardDisplay from '@/components/DeckCardDisplay.vue'
import CardList from '@/components/DeckCardList.vue'
import CardAdder from '@/components/DeckCardAdder.vue'
import CardSorter from '@/components/DeckCardSorter.vue'
import DeckActions from '@/components/DeckDeckActions.vue'

export default {
	mixins: [findRelevantDeck],
	components: { CardDisplay, CardList, CardAdder, CardSorter, DeckActions },
	computed: {
		deck () {
			return this.$store.state.decks.find(deck =>
				`/deck/${deck.path}/` === this.$route.path
			)
		}
	}
}
</script>
