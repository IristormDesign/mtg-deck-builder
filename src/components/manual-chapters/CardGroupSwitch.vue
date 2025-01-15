<template>
	<section id="card-groups">
		<h4>Card Group Switch</h4>
		<p>Each deck has two independent groups of cards called “main” and “<a href="#sideboard-uses">sideboard</a>.” The <a href="#list-editor">List Editor</a> displays only one card group at a time.</p>
		<p>The card group switch is a pair of buttons that appears in the section of the List Editor labeled “View card group.” The switch lets you toggle between your deck’s main and sideboard groups for viewing in the List Editor. The <a href="#card-list">card list</a> and <a href="#card-adder">card adder</a> interact with whichever group is currently visible.</p>
		<p>Alternatively, press the <kbd>R</kbd> key to switch card groups via <a href="#keyboard-shortcuts">keyboard shortcut</a>.</p>
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
