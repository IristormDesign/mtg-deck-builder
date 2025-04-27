<template functional>
	<section id="storage-of-deck-data" key="storage-of-deck-data">
		<h3>Storage of Deck Data</h3>
		<p>In MTG Deck Builder, the data for your decks is stored only in your web browser’s local data cache. The data isn’t stored in a remote database over the Internet.</p>
		<p>That means this app’s storage of deck data has the following conditions:</p>
		<ul>
			<li>
				<p>Anyone can <router-link to="create-deck">create</router-link> and save their decks in MTG Deck Builder right away, without even needing to register for a user account.</p>
			</li>
			<li>
				<p>The custom decks you’ve made in MTG Deck Builder are available only in the particular web browser on the particular computer or phone that you’ve been using this app on. If you’d need to access the decks you’ve made elsewhere, there’s a way you can do that: Transfer their data at the original location by <router-link to="deck-page-header#archive-action">archiving the decks</router-link> beforehand, then have those decks <router-link to="create-deck#replicate-archived-decks">replicated from the archive</router-link> at the new location.</p>
			</li>
			<li>
				<p>Similarly, other users of MTG Deck Builder on their own web browsers can’t view your decks, or you theirs—except by sharing <a href="#deck-archive-files">deck archive files</a>, or by the list-sharing methods via the <router-link to="text-renderer">Text Renderer mode</router-link>.</p>
			</li>
		</ul>
		<p>Be aware that, due to how this app stores data, you should never have MTG Deck Builder opened in multiple tabs at once in your web browser. Otherwise, you’ll accidentally undo any recent changes you may have made for any decks in this app on the inactive tabs. So, always use MTG Deck Builder on only one browser tab at a time.</p>

		<section id="deck-archive-files">
			<h4>Deck Archive Files</h4>
			<p>A deck archive file is a file that has data for certain decks that have been <router-link to="deck-page-header#archive-action">archived</router-link> by a user of MTG Deck Builder. A single archive file can contain data for multiple decks.</p>
			<p>You might want to have a deck archive file for any of the following reasons:</p>
			<ul>
				<li>
					<p>Send the file to other users of MTG Deck Builder to let them see the decks you’ve made, or vice versa.</p>
				</li>
				<li>
					<p>Keep the file as a backup copy of all your decks. You should want a backup copy in case you somehow lose access to your decks’ original <a href="#storage-of-deck-data">stored data</a> in your web browser on your computer or phone.</p>
				</li>
				<li>
					<p>Use the file to migrate all your decks from one web browser to another (if you’re switching your preferred browser, for example).</p>
				</li>
			</ul>
			<p>To make an archive file from a deck, click the <router-link to="deck-page-header#deck-actions">Deck Actions button</router-link> in the <router-link to="deck-page-header">deck page header</router-link>, which makes a menu appear. From that menu, select the “Archive&hellip;” option.</p>
			<p>To view a deck from an archive, go to the <router-link to="create-deck">Create Deck page</router-link>. From there, click the button in the <router-link to="create-deck#replicate-archived-decks">Replicate Archived Decks</router-link> section.</p>
		</section>
	</section>
</template>
