<template functional>
	<section id="create-deck" key="create-deck">
		<h3>Create Deck Page</h3>
		<p>The Create Deck page is where you can start on a new deck or import a pre-made deck. Either method adds the deck to the <a href="#deck-menu">deck menu</a> and <a href="#storage-of-deck-data">stores its data</a> in your web browser.</p>
		<p>To start a new deck, give it a name, and then the app takes you to an empty <a href="#deck-pages">deck page</a> for that deck.</p>
		<p>If you have a <a href="#deck-data-files">deck data file</a> (.deck) for MTG Deck Builder, you can import it through the Create Deck page, and the app instantly produces the decks from that file.</p>
		<p>If you have a deck’s card list as plain text, such as one copied from the “<a href="#render-as-text-action">render as text</a>” deck action, you can have that deck displayed in MTG Deck Builder. To do this, start a new deck and paste the text list into the submission form of the <a href="#card-list-entry">Card List Entry</a> page. You can access that page by clicking the <a href="#add-card-list">Add Card List</a> button in the <a href="#list-editor">List Editor</a> deck page mode.</p>
		<p>Every deck you have in the app must have a unique name. When you’re starting a new deck, if you try to submit a name that another one of your decks already has, you’ll be asked to give a different name. Or, if you import a deck with the same name as an existing deck, then the imported deck’s name will automatically have a unique number within parentheses appended to it. (You could <a href="#deck-name">rename</a> it afterward.)</p>
	</section>
</template>
