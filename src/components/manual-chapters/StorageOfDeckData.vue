<template>
	<section id="m-storage-of-deck-data">
		<h3>Storage of Deck Data</h3>
		<p>In MTG Deck Builder, the data for your customized decks is stored only locally in the data cache of the web browser you’re using, not remotely in a database over the Internet. This means there’s no need to log onto a user account to save your decks in this app. It also means other users of the app on their own web browsers won’t be able to see your decks, or you theirs, except by sharing <a href="#m-deck-data-files">deck data files</a>.</p>

		<deck-data-files />
	</section>
</template>

<script>
import DeckDataFiles from '@/components/manual-chapters/DeckDataFiles.vue'

export default {
	components: { DeckDataFiles }
}
</script>
