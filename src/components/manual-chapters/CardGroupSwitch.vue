<template>
	<section id="m-card-groups">
		<h4>Card Group Switch</h4>
		<p>Every deck has two groups of cards called “main” and “<a href="#m-sideboard-uses">sideboard</a>.” These card groups are independent of each other, and only one is active on the <a href="#m-deck-pages">deck page</a> at a time.</p>
		<p>The card group switch (the section labeled “Switch card group” in the <a href="#m-deck-editor">Deck Editor</a>) has a pair of buttons that lets you toggle between your deck’s main and sideboard groups. The <a href="#m-card-list">card list</a> and <a href="#m-card-adder">card adder</a> interact with the group that’s currently selected in the switch.</p>
		<p>Whenever you arrive on any deck page, the card group is automatically set to main at first. Whenever you switch to the sideboard, the <a href="#m-sideboard-header">sideboard header</a> appears.</p>

		<sideboard-uses />
	</section>
</template>

<script>
import SideboardUses from '@/components/manual-chapters/SideboardUses.vue'

export default {
	components: { SideboardUses }
}
</script>
