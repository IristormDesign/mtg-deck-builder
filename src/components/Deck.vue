<template>
	<div class="deck">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckPath == deck.path">
				<header class="deck-header">
					<deck-name :deck="deck" />
					<deck-date-edited :deck="deck" />
					<deck-actions :deck="deck" />
				</header>
				<div class="deck-main">
					<deck-card-display :deck="deck" />
					<deck-card-list :deck="deck" />
					<div class="card-list-controls">
						<deck-card-adder :deck="deck" />
						<deck-card-sorter :deck="deck" />
						<deck-card-total :deck="deck" />
					</div>
				</div>
				<deck-description :deck="deck" />
			</article>
		</div>
	</div>
</template>

<script>
import DeckName from './DeckName.vue'
import DeckDateEdited from './DeckDateEdited.vue'
import DeckActions from './DeckActions.vue'

import DeckCardDisplay from './DeckCardDisplay.vue'
import DeckCardList from './DeckCardList.vue'
import DeckCardAdder from './DeckCardAdder.vue'
import DeckCardSorter from './DeckCardSorter.vue'
import DeckCardTotal from './DeckCardTotal.vue'

import DeckDescription from './DeckDescription.vue'

export default {
	name: 'deck',
	components: {
		DeckName,
		DeckDateEdited,
		DeckActions,
		DeckCardDisplay,
		DeckCardList,
		DeckCardAdder,
		DeckCardSorter,
		DeckCardTotal,
		DeckDescription
	}
}
</script>
