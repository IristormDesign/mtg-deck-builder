<template>
	<section id="storage-of-deck-data">
		<h3>Storage of Deck Data</h3>
		<p>In MTG Deck Builder, the data for your decks is stored in your web browser’s local data cache. The data isn’t stored in a remote database over the Internet.</p>
		<p>Basically, this means you can create and save decks in this app without needing to register a user account. But it also means that other users of MTG Deck Builder on their own browsers can’t see your decks, or you theirs, except by sharing <a href="#deck-archive-files">deck archive files</a>.</p>

		<deck-archive-files />
	</section>
</template>

<script>
import DeckArchiveFiles from '@/components/manual-chapters/DeckArchiveFiles.vue'

export default {
	components: { DeckArchiveFiles }
}
</script>
