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
			<sideboard-header :deck="deck" />
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

		<div class="control-panel adder-controls">
			<scryfall-button />
			<card-adder :deck="deck" />
			<!-- <deck-actions :deck="deck" /> -->
		</div>
	</div>
</template>

<script>
import CardImage from '@/components/deck-page/CardImage.vue'
import CardSorter from '@/components/deck-page/CardSorter.vue'
import CardGroupSwitch from '@/components/deck-page/CardGroupSwitch.vue'
import SideboardHeader from '@/components/deck-page/SideboardHeader.vue'
import CardListItems from '@/components/deck-page/CardListItems.vue'
import ScryfallButton from '@/components/deck-page/ScryfallButton.vue'
import CardAdder from '@/components/deck-page/CardAdder.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { CardImage, CardSorter, CardGroupSwitch, SideboardHeader, CardListItems, ScryfallButton, CardAdder },
	mixins: [getActiveDeck],
	methods: {
		attentionAddCard (attention) {
			const cardAdderInput = document.querySelector('#card-input')

			if (!cardAdderInput) return // Check for this condition to prevent errors when in the middle of loading a submitted card name.

			if (attention) {
				cardAdderInput.classList.add('attention')
			} else {
				cardAdderInput.classList.remove('attention')
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-editor.scss';
</style>
