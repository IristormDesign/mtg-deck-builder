<template>
	<section id="card-list">
		<h4>Card List</h4>
		<p>The card list is a section of the <a href="#deck-editor">Deck Editor</a> that displays the names and some attributes of the <i>Magic</i> cards belonging to the currently <a href="#card-groups">selected card group</a> of your currently <a href="#deck-menu">open deck</a>. Each distinct card name among your deck’s cards has a row in the card list.</p>
		<p>Every row in the list has three interactive elements: a <a href="#card-bars">card bar</a>, a <a href="#card-quantities">card quantity</a>, and a <a href="#card-stars">card star</a>. All of those interactive elements are going to be explained in more detail in the next chapters of this user manual.</p>
		<p>The card list can also be manipulated in ways by other interactive elements in the Deck Editor, which are the <a href="#card-sorter">card sorter</a>, the <a href="#card-groups">card group switch</a>, and the <a href="#card-adder">card adder</a>.</p>
		<p>Many <a href="#kbsc-deck-editor">keyboard shortcuts</a> are available for doing actions involving the currently highlighted row of the card list. A row is highlighted when the card bar in that row has its colored outline appear, and the adjacent card quantity and star elements have an orange outline appear. You can change which row is highlighted by pressing the <kbd>S</kbd> key to move the highlight down the list by one row, or <kbd>W</kbd> to move it up. Hold <kbd class="shift-key">Shift</kbd> while pressing <kbd>S</kbd> or <kbd>W</kbd> to double the highlight’s movement rate. Press <kbd>Esc</kbd> to stop highlighting.</p>

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
