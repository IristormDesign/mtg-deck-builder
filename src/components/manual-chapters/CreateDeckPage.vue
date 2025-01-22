<template functional>
	<section id="create-deck" key="create-deck">
		<h3>“Create Deck” Page</h3>
		<p>The Create Deck page is where you can begin new decks and remake archived decks. Either method adds the deck to the <a href="#deck-menu">deck menu</a> and <a href="#storage-of-deck-data">stores its data</a> in your web browser.</p>

		<h4>Create New Deck</h4>
		<p>To create a new deck, enter a name for it in the text input field in the “New Deck” section, then click the Start button. The app takes you to an empty <a href="#deck-pages">deck page</a> assigned to your new deck. You can build up the deck using the <a href="#card-adder">card adder</a>.</p>
		<p>Every deck you have in MTG Deck Builder must have a unique name. If you try to submit a deck name that another one of your decks already has, you’ll be prompted to give a different name instead.</p>

		<h4>Reproduce Archived Decks</h4>
		<p>If you have a <a href="#deck-archive-files">deck archive file</a> and you want to see any of the decks contained in its data, click the “Open Deck Archive File” button. This displays your computer’s or phone’s file browser, from where you can find the deck archive file (“.deck” extension) to open.</p>
		<p>Upon opening an archive file, the app instantly creates duplicates of every deck from that archive, putting the duplicates’ data into this app’s <a href="#storage-of-deck-data">data storage</a>. If an archive contains multiple decks but you don’t want to reproduce <em>all</em> of them, then you can <a href="#delete-action">delete</a> the unwanted ones.</p>
		<p>If you reproduce an archived deck that happens to have the same name as an existing deck, then the reproduced deck’s name will automatically have a unique number within parentheses appended to it. (You could <a href="#deck-name">rename</a> it afterward.)</p>
		<p>Note that this app can reproduce decks only from archive files that were saved specifically from MTG Deck Builder by Iristorm Design. You can’t reproduce decks from files saved from other apps, even if those other apps relate to <i>Magic: The Gathering</i> or if they export files with a “.deck” extension. If you’d want to use decks from other apps, consider adding plain-text card lists in this app instead.</p>

		<h4>Create Deck from Plain-Text List</h4>
		<p>If you have a deck’s card list in the form of plain text, then you can display that deck in MTG Deck Builder. To do so, start a new deck (as explained above), and then paste the text list into the submission form of the <a href="#card-list-entry">Card List Entry</a> page. You can access that page by clicking the <a href="#add-multiple">“Add Multiple” button</a> in the <a href="#list-editor">List Editor mode</a>.</p>
	</section>
</template>
