<template>
	<div class="deck wrap">
		<div class="card-display-scroll-view">
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
	</div>
</template>

<script>
import findRelevantDeck from '@/mixins/findRelevantDeck.js'
import CardDisplay from '@/components/CardDisplay.vue'
import CardList from '@/components/CardList.vue'
import CardAdder from '@/components/CardAdder.vue'
import CardSorter from '@/components/CardSorter.vue'
import DeckActions from '@/components/DeckActions.vue'

export default {
	mixins: [findRelevantDeck],
	components: {
		CardDisplay, CardList, CardAdder, CardSorter, DeckActions
	},
	computed: {
		deck () {
			return this.$store.state.decks.find(deck =>
				`/deck/${deck.path}/` === this.$route.path
			)
		}
	}
}
</script>
