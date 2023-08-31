<template>
	<section id="m-storage-of-deck-data">
		<h3>Storage of Deck Data</h3>
		<p>In MTG Deck Builder, the data for your customized decks are stored only locally in the web browser you’re using, not remotely in a database over the Internet. This means there’s no need to log onto a user account to save your decks in this app. It also means other users of the app on their own web browsers won’t be able to see your decks, or you theirs, except by sharing <a href="#m-deck-data-files">deck data files</a>.</p>

		<manual-deck-data-files />
	</section>
</template>

<script>
import ManualDeckDataFiles from '@/components/manual-chapters/ManualDeckDataFiles.vue'

export default {
	components: { ManualDeckDataFiles }
}
</script>
