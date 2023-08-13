<template>
	<div class="card-display-scroll-view wrap">
		<card-display :deck="deck" />
		<div class="deck-main">
			<div class="deck-control-panel viewing-controls">
				<card-sorter :deck="deck" />
				<card-group-switch :deck="deck" />
			</div>
			<card-list :deck="deck" />
			<div class="deck-control-panel action-controls">
				<card-adder :deck="deck" />
				<deck-actions :deck="deck" />
			</div>
		</div>
	</div>
</template>

<script>
import CardDisplay from '@/components/DeckCardDisplay.vue'
import CardSorter from '@/components/DeckCardSorter.vue'
import CardGroupSwitch from '@/components/DeckCardGroupSwitch.vue'
import CardList from '@/components/DeckCardList.vue'
import CardAdder from '@/components/DeckCardAdder.vue'
import DeckActions from '@/components/DeckDeckActions.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { CardDisplay, CardSorter, CardGroupSwitch, CardList, CardAdder, DeckActions },
	mixins: [getActiveDeck]
}
</script>
