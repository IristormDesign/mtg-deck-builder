<template>
	<div class="deck wrap">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckPath == deck.path">
				<header class="deck-header">
					<deck-name :deck="deck" />
					<deck-colors :deck="deck" />
					<deck-average-cmc :deck="deck" />
					<deck-date-edited :deck="deck" />
					<deck-card-total :deck="deck" />
				</header>
				<div class="card-display-scroll-view">
					<deck-card-display :deck="deck" />
					<div class="deck-main">
						<deck-description :deck="deck" />
						<deck-card-list :deck="deck" />
						<div class="card-list-controls">
							<deck-card-adder :deck="deck" />
							<deck-card-sorter :deck="deck" />
							<deck-actions :deck="deck" />
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script>
import DeckName from './DeckName.vue'
import DeckColors from './DeckColors.vue'
import DeckAverageCmc from './DeckAverageCmc.vue'
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
		DeckColors,
		DeckAverageCmc,
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
