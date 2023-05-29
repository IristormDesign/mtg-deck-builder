<template>
	<section id="m-storage-of-deck-data">
		<h3>Storage of Deck Data</h3>
		<p>The data for your customized decks in MTG Deck Builder are stored only locally in the web browser you’re using, not over the internet. This means there’s no need to log onto a personal account to save your decks. It also means other users of MTG Deck Builder on their own web browsers won’t be able to see your decks, or you theirs, except by sharing <a href="#m-deck-data-files">deck data files</a>.</p>
		<p>When you’ve opened the app for the first time, you’ll find it comes with two sample decks (“Boros Equipment” and “Sultai Ramp”). You may modify these decks however you like or delete them.</p>
		<p>To delete all of your data in MTG Deck Builder at once, click on the “Clear Stored Data” link that’s in the app footer on any page. Before the data gets erased, you’ll be asked to confirm that you want to go ahead with this irreversible process. After the data has been cleared, the two sample decks will be restored in their original states.</p>

		<manual-deck-data-files />
	</section>
</template>

<script>
import ManualDeckDataFiles from '@/components/ManualDeckDataFiles.vue'

export default {
	components: { ManualDeckDataFiles }
}
</script>
