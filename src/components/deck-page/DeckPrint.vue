<template>
	<aside class="deck-print-area">
		<h2>{{ deck.name }}</h2>

		<section v-if="mainNotEmpty">
			<h3 v-if="sideboardNotEmpty">Main List</h3>

			<div v-if="largeList" class="columns">
				<deck-print-column :columnCards="getSplitList(deck, 1)" />
				<deck-print-column :columnCards="getSplitList(deck, 2)" />
				<deck-print-column :columnCards="getSplitList(deck, 3)" />
			</div>
			<div v-else>
				<deck-print-column :columnCards="deck.cards"/>
			</div>
		</section>
		<section v-if="sideboardNotEmpty">
			<h3 v-if="mainNotEmpty">Sideboard List</h3>

			<div v-if="largeList" class="columns">
				<deck-print-column :columnCards="getSplitList(deck.sideboard, 1)" />
				<deck-print-column :columnCards="getSplitList(deck.sideboard, 2)" />
				<deck-print-column :columnCards="getSplitList(deck.sideboard, 3)" />
			</div>
			<div v-else>
				<deck-print-column :columnCards="deck.sideboard.cards" />
			</div>
		</section>
	</aside>
</template>

<script>
import DeckPrintColumn from '@/components/deck-page/DeckPrintColumn.vue'

export default {
	components: {	DeckPrintColumn	},
	props: {
		deck: Object,
		mainNotEmpty: Boolean,
		sideboardNotEmpty: Boolean
	},
	computed: {
		largeList () {
			return this.deck.cards.length + this.deck.sideboard.cards.length > 33
		}
	},
	methods: {
		/**
		 * Divide the card list into one of three columns.
		 * @param {Object} cardGroup - The card group of the list to divide.
		 * @param {number} columnPosition - The position of the column (1, 2, or 3).
		 * @returns {Array} The cards to display in the specified column.
		 */
		getSplitList (cardGroup, columnPosition) {
			const numberOfCardsPerColumn = Math.ceil(cardGroup.cards.length / 3)

			return cardGroup.cards.slice(
				numberOfCardsPerColumn * (columnPosition - 1),
				numberOfCardsPerColumn * columnPosition
			)
		}
	}
}
</script>
