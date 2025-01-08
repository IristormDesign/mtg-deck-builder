<template>
	<section id="storage-of-deck-data">
		<h3>Storage of Deck Data</h3>
		<p>In MTG Deck Builder, the data for your decks is stored in your web browser’s local data cache. The data isn’t stored over the Internet.</p>
		<p>Basically, this means you can create and save your own decks in this app without needing to log onto a personal user account. But it also means that other users of MTG Deck Builder on their own browsers can’t see your decks, or you theirs, except by sharing <a href="#deck-data-files">deck data files</a>.</p>

		<deck-data-files />
	</section>
</template>

<script>
import DeckDataFiles from '@/components/manual-chapters/DeckDataFiles.vue'

export default {
	components: { DeckDataFiles }
}
</script>
