<template>
	<section id="m-app-header">
		<h3>App Header</h3>
		<p>At the top of every page of MTG Deck Builder is the app header, which has the following buttons:</p>
		<ul>
			<li><strong>User Manual</strong> – Takes you to what you’re reading right now.</li>
			<li><strong>Create Deck</strong> – Takes you to the <a href="#m-create-deck">Create Deck</a> page.</li>
			<li><strong>Open Deck</strong> – Shows the <a href="#m-decks-menu">decks menu</a>.</li>
			<li><strong>Contact</strong> – Takes you to the Contact page.</li>
		</ul>

		<manual-decks-menu />
	</section>
</template>

<script>
import ManualDecksMenu from '@/components/manual-chapters/ManualDecksMenu.vue'

export default {
	components: { ManualDecksMenu }
}
</script>
