<template functional>
	<section id="deck-actions" key="deck-actions">
		<h4>Deck Actions</h4>
		<p>In the <a href="#deck-page-header">deck page header</a>, the deck actions section has a button with a drop-down menu with options that let you do special actions to your decks. These options are <a href="#convert-to-text-action">convert to text</a>, <a href="#copy-action">copy</a>, <a href="#export-action">export</a>, and <a href="#delete-action">delete</a>.</p>

		<section id="convert-to-text-action">
			<h5>Convert to Text</h5>
			<p>From the <a href="#deck-actions">deck actions</a> menu, select “Convert to Text” to go to the “Deck as Text” page, where you can view the cards in your deck’s <a href="#card-groups">main and sideboard groups</a> as simple lists in the form of plain text. These plain text lists have one card name per line, with each name preceded by its <a href="#card-quantities">quantity</a>.</p>
			<p>To take these text lists outside MTG Deck Builder, you can copy the whole main or sideboard lists to the clipboard of your computer or mobile device, or you can download a text file (.TXT) of both lists. If you choose to download a text file, it’s saved to wherever your web browser puts downloads.</p>
			<p>Why might you want to have your deck in the form of plain text?</p>
			<ul>
				<li>
					<p><strong>Shop for your deck’s cards online faster.</strong> On some online stores that sell <i>Magic</i> card singles, they provide a way to search for a whole list of cards at once. Stores may call this list-searching method “mass entry,” “deck builder,” etc. You can copy your plain-text deck lists from this app, then paste it into a store’s mass entry search.</p>
				</li>
				<li>
					<p><strong>Print out your deck lists.</strong> A plain text document is better suited for printing on paper than the <a href="#deck-editor">Deck Editor</a>’s <a href="#card-list">card list</a>.</p>
				</li>
				<li>
					<p><strong>Share over the Internet.</strong> Plain text lists are in a human-readable format that doesn’t require other people to use MTG Deck Builder to read the card names, unlike <a href="#deck-data-files">deck data files</a>. (However, a deck data file can <a href="#export-action">export</a> and import multiple decks at once, and has extra deck data that plain text lists lack.)</p>
				</li>
			</ul>
			<p>The order of card names in the plain text lists matches that of the Deck Editor’s card lists. If you care about the order, use the Deck Editor’s <a href="#card-sorter">card sorter</a> to arrange the names in the way you prefer before converting your deck to text.</p>
		</section>

		<section id="copy-action">
			<h5>Copy</h5>
			<p>From the <a href="#deck-actions">deck actions</a> menu, select Copy to create another deck that’s identical to the <a href="#deck-menu">deck you’re currently viewing</a> at the time of copying. The app lets you give the deck copy a <a href="#deck-name">new name</a>.</p>
			<p>Immediately after copying, the app takes you to the copy’s <a href="#deck-pages">deck page</a>.</p>
		</section>

		<section id="export-action">
			<h5>Export</h5>
			<p>From the <a href="#deck-actions">deck actions</a> menu, select Export to go to the Export Decks page, where can select any of your decks in MTG Deck Builder to “export.” This means to have the app generate a <a href="#deck-data-files">deck data file</a> for those decks. The file is saved on your computer or mobile device to wherever your web browser puts downloads.</p>
			<p>Once you have a deck data file, you—or anyone whom you give the file to—can later “<a href="#create-deck">import</a>” it, which means to have the app recreate the decks from the data contained in that file.</p>
			<p>If you export a single deck alone, then the deck data file is named after that deck’s name. If you export multiple decks together, then the file is named “My Decks.” In either case, the file has “.deck” as its file extension.</p>
		</section>

		<section id="delete-action">
			<h5>Delete</h5>
			<p>From the <a href="#deck-actions">deck actions</a> menu, select Delete to go to the Delete Decks page, where you can select any of your decks to permanently remove from your web browser’s <a href="#storage-of-deck-data">data storage</a> for MTG Deck Builder.</p>
			<p>After a deck is deleted, if you’d try to go back to the URL that had belonged to that <a href="#deck-pages">deck’s page</a>, then you’d be redirected to a “Page Not Found” error page instead.</p>
		</section>
	</section>
</template>
