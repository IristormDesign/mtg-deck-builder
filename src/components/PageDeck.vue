<template>
	<div class="deck wrap">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckPath == deck.path">
				<header class="deck-header">
					<deck-name :deck="deck" />
					<deck-colors :deck="deck" />
					<average-cmc :deck="deck" />
					<date-edited :deck="deck" />
					<card-total :deck="deck" />
				</header>
				<div class="card-display-scroll-view">
					<card-display :deck="deck" />
					<div class="deck-main">
						<deck-description :deck="deck" />
						<card-list :deck="deck" />
						<div class="card-list-controls">
							<card-adder :deck="deck" />
							<card-sorter :deck="deck" />
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
import AverageCmc from './AverageCmc.vue'
import DateEdited from './DateEdited.vue'
import DeckActions from './DeckActions.vue'

import CardDisplay from './CardDisplay.vue'
import CardList from './CardList.vue'
import CardAdder from './CardAdder.vue'
import CardSorter from './CardSorter.vue'
import CardTotal from './CardTotal.vue'

import DeckDescription from './DeckDescription.vue'

export default {
	name: 'page-deck',
	components: {
		DeckName,
		DeckColors,
		AverageCmc,
		DateEdited,
		DeckActions,
		CardDisplay,
		CardList,
		CardAdder,
		CardSorter,
		CardTotal,
		DeckDescription
	}
}
</script>
