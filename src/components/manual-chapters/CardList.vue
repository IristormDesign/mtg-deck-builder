<template>
	<section id="m-card-list">
		<h4>Card List</h4>
		<p>The card list is a section of the <a href="#m-deck-editor">Deck Editor</a> that shows a column of the names of <i>Magic</i> cards belonging to the currently <a href="#m-card-groups">selected card group</a> of your currently <a href="#m-deck-menu">open deck</a>.</p>
		<p>Each card name in the list has three interactive elements: a <a href="#m-card-buttons">button</a>, a <a href="#m-card-quantities">quantity</a>, and a <a href="#m-card-stars">star</a>. These elements will be explained in more detail.</p>
		<p>You can modify the contents of card lists using the <a href="#m-card-adder">card adder</a> and <a href="#m-card-quantities">card quantity</a> buttons.</p>

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
