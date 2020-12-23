<template>
	<div class="deck">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckPath == deck.path">

				<header class="deck-header">
					<deck-name :deck="deck" />
					<deck-card-sorter :deck="deck" />
					<deck-date-edited :deck="deck" />
					<deck-card-total :deck="deck" />
				</header>
				<div class="deck-main">
					<deck-description :deck="deck" />
					<deck-card-list :deck="deck" />
				</div>
				<deck-card-display :deck="deck" />
				<deck-footer :deck="deck" />

			</article>
		</div>
	</div>
</template>

<script>
import DeckName from './DeckName.vue'
import DeckCardSorter from './DeckCardSorter.vue'
import DeckDateEdited from './DeckDateEdited.vue'
import DeckCardTotal from './DeckCardTotal.vue'
import DeckDescription from './DeckDescription.vue'
import DeckCardList from './DeckCardList.vue'
import DeckCardDisplay from './DeckCardDisplay.vue'
import DeckFooter from './DeckFooter.vue'

export default {
	name: 'deck',
	components: {
		DeckName,
		DeckCardSorter,
		DeckDateEdited,
		DeckCardTotal,
		DeckDescription,
		DeckCardList,
		DeckCardDisplay,
		DeckFooter
	}
}
</script>
