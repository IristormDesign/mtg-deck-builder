<template>
	<section id="app-header">
		<h3>App Header</h3>
		<p>At the top of any page of MTG Deck Builder is the app header, which has the following links:</p>
		<ul>
			<li><strong>Create Deck</strong> – Takes you to the <a href="#create-deck">Create Deck</a> page.</li>
			<li><strong>Open Deck</strong> – Shows the <a href="#deck-menu">deck menu</a>.</li>
			<li><strong>User Manual</strong> – Takes you to the page you’re reading right now.</li>
		</ul>
		<deck-menu />
	</section>
</template>

<script>
import DeckMenu from '@/components/manual-chapters/DeckMenu.vue'

export default {
	components: { DeckMenu }
}
</script>
