<template functional>
	<section id="deck-actions" key="deck-actions">
		<h4>Deck Actions</h4>
		<p>In the <a href="#deck-page-header">deck page header</a>, the deck actions section has a button with a drop-down menu with options that let you do special actions to your decks. These options are <a href="#copy-action">copy</a>, <a href="#export-action">export</a>, and <a href="#delete-action">delete</a>.</p>

		<section id="copy-action">
			<h5>Copy</h5>
			<p>From the <a href="#deck-actions">deck actions</a> menu, select Copy to create another deck that’s identical to the <a href="#deck-menu">deck you’re currently viewing</a> at the time of copying. The app lets you give the deck copy a <a href="#deck-name">new name</a>.</p>
			<p>Immediately after copying, the app takes you to the copy’s <a href="#deck-pages">deck page</a>.</p>
		</section>

		<section id="export-action">
			<h5>Export</h5>
			<p>From the <a href="#deck-actions">deck actions</a> menu, select Export to go to the Export Decks page. From there, you can select any of your decks in MTG Deck Builder to “export,” which means to have the app generate a <a href="#deck-data-files">deck data file</a> for those decks. The file is saved on your computer or device to wherever your web browser puts downloads.</p>
			<p>Once you have a deck data file, you—or anyone whom you give the file to—can later “<a href="#create-deck">import</a>” it, which means to have the app recreate the decks from the data contained in that file.</p>
			<p>If you export a single deck alone, then the deck data file is named after that deck’s name. If you export multiple decks together, then the file is named “My Decks.” In either case, the file has “.deck” as its file extension.</p>
		</section>

		<section id="delete-action">
			<h5>Delete</h5>
			<p>From the <a href="#deck-actions">deck actions</a> menu, select Delete to go to the Delete Decks page, where you can select any of your decks to permanently erase from MTG Deck Builder.</p>
			<p>(After a deck has been deleted, if you’d try to access the URL that belonged to the deck page of that deck, then you’d be redirected to a “Page Not Found” error page instead.)</p>
		</section>
	</section>
</template>
