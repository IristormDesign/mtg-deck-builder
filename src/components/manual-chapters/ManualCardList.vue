<template>
	<section id="m-card-list">
		<h4>Card List</h4>
		<p>The card list shows a column of the names of <i>Magic</i> cards belonging to the currently <a href="#m-card-groups">selected card group</a> of your currently <a href="#m-deck-menu">open deck</a>.</p>
		<p>Each card name in the list has three interactive elements: a <a href="#m-card-buttons">button</a>, a <a href="#m-card-quantities">quantity</a>, and a <a href="#m-card-stars">star</a>. These elements will be explained in more detail.</p>
		<p>Card lists are populated by the <a href="#m-card-adder">card adder</a>.</p>

		<manual-card-stars />
		<manual-card-buttons />
		<manual-card-quantities />
	</section>
</template>

<script>
import ManualCardButtons from '@/components/manual-chapters/ManualCardButtons.vue'
import ManualCardQuantities from '@/components/manual-chapters/ManualCardQuantities.vue'
import ManualCardStars from '@/components/manual-chapters/ManualCardStars.vue'

export default {
	components: { ManualCardButtons, ManualCardQuantities, ManualCardStars }
}
</script>
