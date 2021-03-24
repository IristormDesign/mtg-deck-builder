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
import DeckName from '@/components/DeckName.vue'
import DeckColors from '@/components/DeckColors.vue'
import AverageCmc from '@/components/AverageCmc.vue'
import DateEdited from '@/components/DateEdited.vue'
import CardTotal from '@/components/CardTotal.vue'
import CardDisplay from '@/components/CardDisplay.vue'
import DeckDescription from '@/components/DeckDescription.vue'
import CardList from '@/components/CardList.vue'
import CardAdder from '@/components/CardAdder.vue'
import CardSorter from '@/components/CardSorter.vue'
import DeckActions from '@/components/DeckActions.vue'

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
