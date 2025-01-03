<template functional>
	<section id="deck-actions" key="deck-actions">
		<h4>Deck Actions</h4>
		<p>In the <a href="#deck-page-header">deck page header</a>, the deck actions section has a button with a drop-down menu with options that let you do special actions to your decks. These options are “<a href="#render-as-text-action">Render as text</a>,” “<a href="#duplicate-action">Duplicate</a>,” “<a href="#export-action">Export</a>,” and “<a href="#delete-action">Delete</a>.” The effects of each are explained in the next subchapters.</p>

		<section id="render-as-text-action">
			<h5>Render as Text</h5>
			<p>In the <a href="#deck-actions">Deck Actions</a> menu, select the “Render as text” option to go to the “Deck in Plain Text” page. From there, you can view the cards in your deck’s <a href="#card-groups">main and sideboard groups</a> in the form of simple lists in plain text.</p>
			<p>These plain-text card lists have one card name per line, with each name preceded by its <a href="#card-quantities">quantity</a>. (This textual card list format is the same one used for <a href="#add-multiple">adding card lists</a> to your deck.)</p>
			<p>Why would you want to see your deck in the form of plain text?</p>
			<ul>
				<li>
					<p><strong>Shop online faster for your deck’s cards.</strong> On some online stores that sell <i>Magic</i> card singles, they provide you a way to search for a list of cards at once. Stores may call this list-searching method “mass entry,” “deck builder,” etc. You can copy your plain-text deck lists from this app, then paste it into an online store’s mass entry search.</p>
				</li>
				<li>
					<p><strong>Print out your deck lists.</strong> A text document is better suited for printing on paper than the web page of the <a href="#list-editor">List Editor</a>.</p>
				</li>
				<li>
					<p><strong>Share over the Internet.</strong> Plain-text card lists are in a human-readable format that doesn’t require other people to use MTG Deck Builder, unlike <a href="#deck-data-files">deck data files</a>. (However, a deck data file can <a href="#export-action">export</a> and import multiple decks together, and includes extra data about decks that a plain-text list lacks.)</p>
				</li>
			</ul>
			<p>If you want to take these plain-text card lists outside MTG Deck Builder, there are easy ways to do that:</p>
			<ul>
				<li>
					<p>You can download a text file (.TXT) that lists the cards in both the deck’s main and sideboard groups. The file is saved to wherever your web browser puts downloads.</p>
				</li>
				<li>
					<p>For either the main or the sideboard group of your deck, you can click the Copy button beside the list to instantly select and copy the whole text list to the clipboard of your computer or mobile device. (Then you can paste it elsewhere.)</p>
				</li>
			</ul>
			<p>The order of card names in the plain-text card lists matches that of the List Editor’s <a href="#card-list">card lists</a>. If you care about the order, use the List Editor’s <a href="#card-sorter">card sorter</a> to rearrange the names in the way you prefer before you render your deck as text.</p>
		</section>

		<section id="duplicate-action">
			<h5>Duplicate</h5>
			<p>In the <a href="#deck-actions">Deck Actions</a> menu, select the “Duplicate” option to create another whole deck that’s an identical copy of the <a href="#deck-menu">deck you’re currently viewing</a> at the time of duplication. The app prompts you to give the duplicate deck a <a href="#deck-name">unique name</a>.</p>
			<p>Immediately after duplicating, you’re directed to the duplicate’s <a href="#deck-pages">deck page</a>.</p>
		</section>

		<section id="export-action">
			<h5>Export</h5>
			<p>In the <a href="#deck-actions">Deck Actions</a> menu, select the “Export” option to go to the “Export Decks” page. From there, you can select any of your decks in MTG Deck Builder to “export,” which means to have the app generate a <a href="#deck-data-files">deck data file</a> for those decks. The file is saved on your computer or mobile device to wherever your web browser puts downloads.</p>
			<p>Once you have a deck data file, you—or anyone whom you give the file to—can later “<a href="#create-deck">import</a>” it, which means to have the app recreate the decks from the data contained in that file.</p>
			<p>If you export a single deck alone, then the deck data file is named after that deck’s name. If you export multiple decks together, then the file is named “My Decks.” In either case, the file has “.deck” as its file extension.</p>
		</section>

		<section id="delete-action">
			<h5>Delete</h5>
			<p>In the <a href="#deck-actions">Deck Actions</a> menu, select the “Delete” option to go to the “Delete Decks” page. From there, you can select any of your decks to permanently remove from your web browser’s <a href="#storage-of-deck-data">data storage</a> for MTG Deck Builder.</p>
			<p>After a deck is deleted, if you’d try to go back to the URL that had belonged to that <a href="#deck-pages">deck’s page</a>, then you’d be redirected to a “Page Not Found” error page instead.</p>
		</section>
	</section>
</template>
