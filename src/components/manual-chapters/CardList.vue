<template>
	<section id="m-card-list">
		<h4>Card List</h4>
		<p>The card list is a section of the <a href="#m-deck-editor">Deck Editor</a> that shows a column of the names of <i>Magic</i> cards belonging to the currently <a href="#m-card-groups">selected card group</a> of your currently <a href="#m-deck-menu">open deck</a>.</p>
		<p>Each row of the card list has three interactive elements: a <a href="#m-card-buttons">card button</a>, a <a href="#m-card-quantities">quantity</a>, and a <a href="#m-card-stars">star</a>. You can include specific card names into the list by using the <a href="#m-card-adder">card adder</a>. Each of those elements is going to be explained in more detail in the next chapters of this user manual.</p>
		<p>The card list accepts many <a href="#m-kbsc-deck-editor">keyboard shortcuts</a> that involve performing actions by elements in a row of the list that’s currently highlighted. When a row is highlighted, the card button in that row has its colored border become visible, and the adjacent card quantity and star elements gain orange outlines.</p>
		<p>The highlight can be moved from row to row by pressing the <kbd>S</kbd> key to move it down, or <kbd>W</kbd> to move it up. Hold <kbd class="shift-key">Shift</kbd> while pressing <kbd>S</kbd> or <kbd>W</kbd> to double the highlight’s movement rate. Press <kbd>Esc</kbd> to stop highlighting.</p>

		<card-stars />
		<card-buttons />
		<card-quantities />
	</section>
</template>

<script>
import CardButtons from '@/components/manual-chapters/CardButtons.vue'
import CardQuantities from '@/components/manual-chapters/CardQuantities.vue'
import CardStars from '@/components/manual-chapters/CardStars.vue'

export default {
	components: { CardButtons, CardQuantities, CardStars }
}
</script>
