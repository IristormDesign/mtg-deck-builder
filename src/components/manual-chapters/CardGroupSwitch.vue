<template>
	<section id="card-groups">
		<h4>Card Group Switch</h4>
		<p>Every deck has two groups of cards called “main” and “<a href="#sideboard-uses">sideboard</a>.” These groups are independent of each other, and only one can be active at a time on the <a href="#deck-pages">deck page</a>.</p>
		<p>The card group switch (the section labeled “Switch card group” in the <a href="#deck-editor">Deck Editor</a>) has a pair of buttons that you can click to toggle between your deck’s main and sideboard groups. To do the equivalent <a href="#keyboard-shortcuts">keyboard shortcut,</a> press <kbd>R</kbd>.</p>
		<p>The <a href="#card-list">card list</a> and <a href="#card-adder">card adder</a> interact with the group that’s currently active.</p>
		<p>Whenever you arrive on any deck page, the card group is automatically set to main at first. Whenever you switch to the sideboard, the <a href="#sideboard-header">sideboard header</a> appears.</p>

		<sideboard-uses />
	</section>
</template>

<script>
import SideboardUses from '@/components/manual-chapters/SideboardUses.vue'

export default {
	components: { SideboardUses }
}
</script>
