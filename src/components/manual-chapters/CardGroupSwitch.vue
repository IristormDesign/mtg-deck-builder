<template>
	<section id="card-groups">
		<h4>Card Group Switch</h4>
		<p>Each deck has two groups of cards called “main” and “<a href="#sideboard-uses">sideboard</a>.” These groups are independent of each other, and only one can be active at a time in the <a href="#list-editor">List Editor</a>.</p>
		<p>The card group switch has a pair of buttons that lets you toggle between your deck’s main and sideboard groups. It appears in the section labeled “Switch Group” in the List Editor.</p>
		<p>The <a href="#card-list">card list</a> and <a href="#card-adder">card adder</a> interact with the group that’s currently active.</p>
		<p>To do the card group switch’s action as a <a href="#keyboard-shortcuts">keyboard shortcut</a>, press <kbd>R</kbd>.</p>
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
