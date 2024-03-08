<template>
	<div class="deck-editor">
		<card-image :deck="deck" />

		<div class="control-panel viewing-controls">
			<card-sorter :deck="deck" />
			<card-group-switch :deck="deck" />
		</div>

		<section
			v-if="$store.state.showSideboard"
			class="card-list-section"
		>
			<deck-sideboard-header :deck="deck" />
			<div
				v-if="deck.sideboard.cards.length <= 0"
				class="no-cards"
				key="sideboard-no-cards"
			>
				<p>This deck’s sideboard has no cards yet.</p>
			</div>
			<card-list-items
				v-else
				:deck="deck"
				key="sideboard-cards"
			/>
		</section>
		<section
			v-else
			class="card-list-section main-deck"
		>
			<header class="screen-readers-only">
				<h3>Main Card List</h3>
			</header>
			<div
				v-if="deck.cards.length <= 0"
				class="no-cards"
				@mouseover="attentionAddCard(true)"
				@mouseleave="attentionAddCard(false)"
				key="main-deck-no-cards"
			>
				<p>This deck has no cards yet. (Add some!)</p>
			</div>
			<card-list-items
				v-else
				:deck="deck"
				key="main-deck-cards"
			/>
		</section>

		<div class="control-panel action-controls">
			<scryfall-opener />
			<card-adder :deck="deck" />
			<deck-actions :deck="deck" />
		</div>
	</div>
</template>

<script>
import CardImage from '@/components/DeckCardImage.vue'
import CardSorter from '@/components/DeckCardSorter.vue'
import CardGroupSwitch from '@/components/DeckCardGroupSwitch.vue'
import DeckSideboardHeader from '@/components/DeckSideboardHeader.vue'
import CardListItems from '@/components/DeckCardListItems.vue'
import ScryfallOpener from '@/components/DeckScryfallOpener.vue'
import CardAdder from '@/components/DeckCardAdder.vue'
import DeckActions from '@/components/DeckDeckActions.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { CardImage, CardSorter, CardGroupSwitch, DeckSideboardHeader, CardListItems, ScryfallOpener, CardAdder, DeckActions },
	mixins: [getActiveDeck],
	methods: {
		attentionAddCard (attention) {
			const cardAdderInput = document.querySelector('#card-input')

			if (cardAdderInput) { // Check for this condition to prevent errors when in the middle of loading a submitted card name.
				if (attention) {
					cardAdderInput.classList.add('attention')
				} else {
					setTimeout(() => {
						cardAdderInput.classList.remove('attention')
					}, 500)
				}
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-editor.scss';
</style>
