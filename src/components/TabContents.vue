<template>
	<div class="tab-contents">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckPath == deck.path">

				<div class="tab-contents-main">
					<header class="deck-header">
						<deck-name :deck="deck" />
						<card-sorter :deck="deck" />
						<date-edited :deck="deck" />
						<card-total :deck="deck" />
					</header>
					<deck-description :deck="deck" />
					<deck-list :deck="deck" />
					<card-display :deck="deck" />
				</div>
				<deck-footer :deck="deck" />

			</article>
		</div>
	</div>
</template>

<script>
import DeckName from './tab-contents/DeckName.vue'
import CardSorter from './tab-contents/CardSorter.vue'
import DateEdited from './tab-contents/DateEdited.vue'
import CardTotal from './tab-contents/CardTotal.vue'
import DeckDescription from './tab-contents/DeckDescription.vue'
import DeckList from './tab-contents/DeckList.vue'
import CardDisplay from './tab-contents/CardDisplay.vue'
import DeckFooter from './tab-contents/DeckFooter.vue'

export default {
	name: 'tab-contents',
	components: {
		DeckName,
		CardSorter,
		DateEdited,
		CardTotal,
		DeckDescription,
		DeckList,
		CardDisplay,
		DeckFooter
	}
}
</script>
