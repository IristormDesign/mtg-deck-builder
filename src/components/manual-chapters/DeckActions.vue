<template functional>
	<section id="m-deck-actions" key="deck-actions">
		<h4>Deck Actions</h4>
		<p>In the <a href="#m-deck-page-header">deck page header</a>, the deck actions section has a button with a drop-down menu with options that let you do special actions to your decks. The options and their effects are the following:</p>
		<ul>
			<li>
				<h5>Copy</h5>
				<p>From the <a href="#m-deck-menu">deck you’re currently viewing</a>, create another deck that’s identical to it at the time of copying. The app lets you give the deck copy a new name.</p>
				<p>Immediately after copying, the app takes you to the copy’s <a href="#m-deck-pages">deck page</a>.</p>
			</li>
			<li>
				<h5>Export</h5>
				<p>You’re taken to the Export Decks page. There you can select any of your decks in MTG Deck Builder to “export,” which means to have the app generate a <a href="#m-deck-data-files">deck data file</a> for those decks. The file is saved on your computer or device to wherever your web browser puts downloads.</p>
				<p>Once you have a deck data file, you—or anyone whom you give the file to—can “<a href="#m-create-deck">import</a>” it, which means to have the app recreate the certain decks from the data contained in that file.</p>
				<p>If you export a single deck alone, then the deck data file is named after that deck’s name. If you export multiple decks together, then the file is named “My Decks.” In either case, the file has “.deck” as its file extension.</p>
			</li>
			<li>
				<h5>Delete</h5>
				<p>You’re taken to the Delete Decks page, where you can select any of your decks to permanently erase from MTG Deck Builder.</p>
				<p>(After a deck has been deleted, if you’d try to access the URL that belonged to the deck page of that deck, then you’d be redirected to a “Page Not Found” error page instead.)</p>
			</li>
		</ul>
	</section>
</template>
