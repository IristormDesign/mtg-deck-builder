<template>
	<section id="card-list">
		<h4>Card List</h4>
		<p>The card list is a major section of the <a href="#list-editor">List Editor</a>. It displays the names and some attributes of every <i>Magic</i> card belonging to the currently selected card group (either main or sideboard) of your currently <a href="#deck-menu">open deck</a>.</p>
		<p>Each distinct card name among your deck’s cards has a row in the list, and each row has three interactive elements: a <a href="#card-bars">card bar</a>, a <a href="#card-quantities">card quantity</a>, and a <a href="#card-stars">card star</a>. These elements are going to be explained in more detail in the next subchapters of this user manual.</p>
		<p>You can also manipulate the card list in ways with the <a href="#card-sorter">card sorter</a>, the <a href="#card-groups">card group switch</a>, and the <a href="#card-adder">card adder</a>.</p>
		<p>Many <a href="#kbsc-list-editor">keyboard shortcuts</a> are available for doing actions involving the card list’s currently highlighted row. A row is highlighted when the card bar in that row has its colored outline appear, and the adjacent card quantity and star elements have an orange outline appear. You can change which row is highlighted by pressing the <kbd>S</kbd> key to move the highlight down the list by one row, or <kbd>W</kbd> to move it up. Hold <kbd class="shift-key">Shift</kbd> while pressing <kbd>S</kbd> or <kbd>W</kbd> to double the highlight’s movement rate. Press <kbd>Esc</kbd> to stop highlighting.</p>

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
