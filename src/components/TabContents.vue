<template>
	<div class="tab-contents">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckName == deck.name">
				<div class="tab-contents-main">
					<deck-header :deck="deck" />
					<deck-list :deck="deck" />
					<card-display :deck="deck" />
				</div>
				<deck-footer :deck="deck" />
			</article>
		</div>
		<article v-if="$store.state.justDeletedDeck">
			<p class="deleted-deck-message">“{{ $store.state.justDeletedDeck }}” is now deleted.</p>
		</article>
	</div>
</template>

<script>
import DeckHeader from './DeckHeader.vue'
import DeckList from './DeckList.vue'
import CardDisplay from './CardDisplay.vue'
import DeckFooter from './DeckFooter.vue'

export default {
	name: 'tab-contents',
	components: {
		DeckHeader,
		DeckList,
		CardDisplay,
		DeckFooter
	}
}
</script>
