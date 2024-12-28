<template>
	<div class="list-editor">
		<card-image :deck="deck" />

		<div class="layout-column">
			<div class="control-panel viewing-controls">
				<card-sorter :deck="deck" />
				<card-group-switch :deck="deck" />
			</div>

			<section
				v-if="$store.state.showSideboard"
				class="card-list-section"
				@mouseenter="attentionAddCard()"
			>
				<sideboard-header :deck="deck" />
				<div
					v-if="deck.sideboard.cards.length <= 0"
					class="no-cards"
					key="sideboard-no-cards"
				>
					<p>No cards have been added here yet.</p>
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
				@mouseenter="attentionAddCard()"
			>
				<header class="screen-readers-only">
					<h3>Main Card List</h3>
				</header>
				<div
					v-if="deck.cards.length <= 0"
					class="no-cards"
					key="main-deck-no-cards"
				>
					<p>No cards have been added yet.</p>
					<p>For help on how to use any part of the List Editor, see the <router-link to="/manual/#list-editor">user manual</router-link>.</p>
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
				<list-entry-button />
			</div>
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
import ListEntryButton from '@/components/deck-page/ListEntryButton.vue'
import CardAdder from '@/components/deck-page/CardAdder.vue'
import cardListFunctions from '@/mixins/cardListFunctions'

export default {
	components: { CardImage, CardSorter, CardGroupSwitch, SideboardHeader, CardListItems, ScryfallButton, ListEntryButton, CardAdder },
	mixins: [cardListFunctions],
	props: {
		deck: Object
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-list-editor.scss';
</style>
