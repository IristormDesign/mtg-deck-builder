<template>
	<section id="card-groups">
		<h4>Card Group Switch</h4>
		<p>Each deck has two independent groups of cards called “main” and “<a href="#sideboard-uses">sideboard</a>.” The <a href="#list-editor">List Editor</a> displays only one of these groups at a time.</p>
		<p>The card group switch is a pair of buttons that appears in the List Editor section labeled “View card group,” and it lets you toggle between your deck’s main and sideboard groups for viewing. Alternatively, press the <kbd>R</kbd> key to do that same action as a <a href="#keyboard-shortcuts">keyboard shortcut</a>.</p>
		<p>The <a href="#card-list">card list</a> and <a href="#card-adder">card adder</a> interact with whichever group you’re currently viewing.</p>
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
