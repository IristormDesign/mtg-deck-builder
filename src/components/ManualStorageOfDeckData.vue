<template>
	<section id="m-storage-of-deck-data">
		<h3>Storage of Deck Data</h3>
		<p>In MTG Deck Builder, the data for your customized decks are stored only locally in the web browser you’re using, not in a database over the Internet. This means there’s no need to log onto a user account to save your decks. It also means other users of the app on their own web browsers won’t be able to see your decks, or you theirs, except by sharing <a href="#m-deck-data-files">deck data files</a>.</p>
		<p>To delete all of your data in MTG Deck Builder at once, click on the “Clear Stored Data” link that’s in the app footer on any page. Before the data gets erased, you’ll be asked to confirm that you want to go ahead with this process, which is irreversible. Once the data is cleared, the app’s two sample decks will be restored in their original states.</p>

		<manual-deck-data-files />
	</section>
</template>

<script>
import ManualDeckDataFiles from '@/components/ManualDeckDataFiles.vue'

export default {
	components: { ManualDeckDataFiles }
}
</script>
