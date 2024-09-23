<template>
	<section id="m-card-list">
		<h4>Card List</h4>
		<p>The card list is a section of the <a href="#m-deck-editor">Deck Editor</a> that shows a column of the names of <i>Magic</i> cards belonging to the currently <a href="#m-card-groups">selected card group</a> of your currently <a href="#m-deck-menu">open deck</a>.</p>
		<p>Each row of the card list has three interactive elements: a <a href="#m-card-bars">card bar</a>, a <a href="#m-card-quantities">quantity</a>, and a <a href="#m-card-stars">star</a>. You can include specific card names into the list by using the <a href="#m-card-adder">card adder</a>. Each of those elements is going to be explained in more detail in the next chapters of this user manual.</p>
		<p>There are many <a href="#m-kbsc-deck-editor">keyboard shortcuts</a> you can use to do actions to the card name in the currently highlighted row of the card list. A row is highlighted when the card bar in that row has its colored border appear, and the adjacent card quantity and star elements have an orange border appear. The highlight can be moved from row to row by pressing the <kbd>S</kbd> key to move it down the list, or <kbd>W</kbd> to move it up. Hold <kbd class="shift-key">Shift</kbd> while pressing <kbd>S</kbd> or <kbd>W</kbd> to double the highlight’s movement rate. Press <kbd>Esc</kbd> to stop highlighting.</p>

		<card-stars />
		<card-bars />
		<card-quantities />
	</section>
</template>

<script>
import CardBars from '@/components/manual-chapters/CardBars.vue'
import CardQuantities from '@/components/manual-chapters/CardQuantities.vue'
import CardStars from '@/components/manual-chapters/CardStars.vue'

export default {
	components: { CardBars, CardQuantities, CardStars }
}
</script>
