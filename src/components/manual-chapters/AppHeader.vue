<template>
	<section id="m-app-header">
		<h3>App Header</h3>
		<p>At the top of every page of MTG Deck Builder is the app header, which has the following buttons you can click:</p>
		<ul>
			<li><strong>User Manual</strong> – Takes you to the page you’re reading right now.</li>
			<li><strong>Create Deck</strong> – Takes you to the <a href="#m-create-deck">Create Deck</a> page.</li>
			<li><strong>Open Deck</strong> – Shows the <a href="#m-deck-menu">deck menu</a>.</li>
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
