<template functional>
	<section id="create-deck" key="create-deck">
		<h3>“Create Deck” Page</h3>
		<p>The Create Deck page is where you begin new decks and reproduce archived ones. Either creation method <a href="#storage-of-deck-data">preserves the decks’ data</a> in your web browser and adds the decks to the <a href="#deck-menu">deck menu</a>.</p>

		<section id="start-new-deck">
			<h4>Start New Deck</h4>
			<p>To start a new deck, go to the <a href="#create-deck">Create Deck page</a>. Enter a name for your new deck in the text input field in the “New Deck” section, then click the Start button. The app takes you to an empty <a href="#deck-pages">deck page</a> assigned to your new deck.</p>
			<p>You can build up your deck using the <a href="#card-adder">card adder</a> or the <a href="#card-list-entry">card list entry form</a>.</p>
			<p>Every deck you have in MTG Deck Builder must have a unique name. If you try to submit a deck name that another one of your decks already has, you’ll be prompted to give a different name instead.</p>
		</section>
		<section id="replicate-archived-decks">
			<h4>Replicate Archived Decks</h4>
			<p>If you have a <a href="#deck-archive-files">deck archive file</a>—whether it be your own or someone else’s—you can view any of the decks contained in its data through MTG Deck Builder.</p>
			<p>To do so, click the “Open Deck Archive File” button on the <a href="#create-deck">Create Deck page</a>. This displays your computer’s or phone’s file browser, from where you can find and open the deck archive file (“.deck” extension).</p>
			<p>When opening an archive file, the app instantly creates replicas of every deck from that archive, putting the replicas’ data into this app’s <a href="#storage-of-deck-data">data storage</a>. If an archive contains multiple decks but you don’t want to replicate <em>all</em> of them, then you can <a href="#delete-action">delete</a> the unwanted ones afterward.</p>
			<p>If you replicate an archived deck that happens to have the same name as an existing deck, then the replica will be automatically <a href="#deck-name">renamed</a> to have a unique number within parentheses appended to its name.</p>
			<p>You can freely <a href="#list-editor">edit</a> replicated decks, as their data is made independent of the archived decks’ data.</p>
			<p>Note that this app can replicate decks only from archive files that were saved specifically from MTG Deck Builder by Iristorm Design. You can’t replicate decks from files saved from other apps, even if those other apps involve <i>Magic: The Gathering</i> or if they export files with a “.deck” extension. If you’d want to view a <i>Magic</i> deck from a source other than MTG Deck Builder by Iristorm Design, you should <a href="#create-from-plain-text-list">create from a plain-text card list</a> instead.</p>
		</section>
		<section id="create-from-plain-text-list">
			<h4>Create Deck from Plain-Text List</h4>
			<p>If you have a deck’s card list in the form of plain text, then you can display that deck in MTG Deck Builder. To do so, first <a href="start-new-deck">start a new deck</a>, which begins empty. Then paste the text list into the submission form of the <a href="#card-list-entry">Card List Entry</a> page, which you can access by clicking the <a href="#add-multiple">“Add Multiple” button</a> in the <a href="#list-editor">List Editor mode</a>.</p>
		</section>
	</section>
</template>
