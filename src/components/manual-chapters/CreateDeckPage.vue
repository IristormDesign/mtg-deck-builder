<template functional>
	<section id="create-deck" key="create-deck">
		<h3>“Create Deck” Page</h3>
		<p>The Create Deck page is where you can begin new decks and import pre-made decks. Either method adds the deck to the <a href="#deck-menu">deck menu</a> and <a href="#storage-of-deck-data">stores its data</a> in your web browser.</p>

		<h4>Start a New Deck</h4>
		<p>To create a new deck, you give a name for it, and then the app takes you to an empty <a href="#deck-pages">deck page</a> assigned to that deck. You can build up your deck using the <a href="#card-adder">card adder</a>.</p>

		<h4>Import Deck Data File</h4>
		<p>What if you have a <a href="#deck-data-files">deck data file</a> (“.deck” file extension) and you want to see any of the decks contained in it? Then what you do is import the deck data file. When importing, the app promptly creates all the decks from that file’s data.</p>
		<p>Note that this app can only import deck data files that had been exported from MTG Deck Builder by Iristorm Design. It can’t import files made from any other apps, even if they involve <i>Magic: The Gathering</i>.</p>

		<h4>Create Decks from Plain Text Lists</h4>
		<p>If you have a deck’s card list as plain text, then you can have that deck displayed in MTG Deck Builder. To do this, start a new deck, and then paste the text list into the submission form of the <a href="#card-list-entry">Card List Entry</a> page. You can access that page by clicking the “<a href="#add-multiple">Add multiple</a>” button in the <a href="#list-editor">List Editor</a> deck page mode.</p>

		<h4>Deck Names</h4>
		<p>Every deck you have in the app must have a unique name. When you’re starting a new deck, if you try to submit a name that another one of your decks already has, you’ll be asked to give a different name. Or, if you import a deck with the same name as an existing deck, then the imported deck’s name will automatically have a unique number within parentheses appended to it. (You could <a href="#deck-name">rename</a> it afterward.)</p>
	</section>
</template>
