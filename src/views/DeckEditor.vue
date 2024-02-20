<template>
	<section class="deck-editor">
		<div class="card-image-scroll-view">
			<card-image :deck="deck" />
			<div class="deck-main">
				<div class="deck-control-panel viewing-controls">
					<card-sorter :deck="deck" />
					<card-group-switch :deck="deck" />
				</div>
				<card-list-section :deck="deck" />
				<div class="deck-control-panel action-controls">
					<scryfall-opener />
					<card-adder :deck="deck" />
					<deck-actions :deck="deck" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import CardImage from '@/components/DeckCardImage.vue'
import CardSorter from '@/components/DeckCardSorter.vue'
import CardGroupSwitch from '@/components/DeckCardGroupSwitch.vue'
import CardListSection from '@/components/DeckCardListSection.vue'
import ScryfallOpener from '@/components/DeckScryfallOpener.vue'
import CardAdder from '@/components/DeckCardAdder.vue'
import DeckActions from '@/components/DeckDeckActions.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { CardImage, CardSorter, CardGroupSwitch, CardListSection, ScryfallOpener, CardAdder, DeckActions },
	mixins: [getActiveDeck]
}
</script>
