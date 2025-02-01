<template functional>
	<section id="create-deck" key="create-deck">
		<h3>“Create Deck” Page</h3>
		<p>The Create Deck page is where you <a href="#start-new-deck">begin new <i>Magic</i> decks</a> and <a href="#replicate-archived-decks">remake archived ones</a>. Whenever you create a deck by either method, the app <router-link to="storage-of-deck-data">preserves the deck’s data</router-link> in your web browser and adds the deck to the <router-link to="app-header#deck-menu">deck menu</router-link>.</p>

		<section id="start-new-deck">
			<h4>Start New Deck</h4>
			<p>To start a new deck, go to the <a href="#create-deck">Create Deck page</a>. In the “New Deck” section, enter a name for your deck in the text input field, and click the Start button. Your deck is then created, and you’re automatically taken to its vacant <router-link to="deck-pages">deck page</router-link>.</p>
			<p>Every deck you have in MTG Deck Builder must have a unique name. If you try to submit a deck name that another one of your decks already has, you’ll be prompted to give a different name instead.</p>
			<p>Assemble your new deck in the <router-link to="list-editor">List Editor mode</router-link> using the <router-link to="list-editor#card-adder">card adder tool</router-link> or the <router-link to="list-editor#add-multiple">card list entry form</router-link>. For gaining ideas of cards to include, you can also browse through a <router-link to="list-editor#scryfall-button">Scryfall advanced search</router-link>.</p>
		</section>

		<section id="replicate-archived-decks">
			<h4>Replicate Archived Decks</h4>
			<p>If you have a <router-link to="storage-of-deck-data#deck-archive-files">deck archive file</router-link>—whether yours or someone else’s—you can view any of the decks contained in its data.</p>
			<p>To do so, click the “Open Deck Archive File” button on the <a href="#create-deck">Create Deck page</a>. This displays your computer’s or phone’s file browser, from where you can find the deck archive file (“.deck” extension) to open.</p>
			<p>When opening an archive file, the app instantly creates replicas of every deck from that archive, putting the replicas’ data into this app’s <router-link to="storage-of-deck-data">data storage</router-link>. If an archive contains multiple decks but you don’t want to replicate <em>all</em> of them, you can <router-link to="deck-page-header#delete-action">delete</router-link> the unwanted ones afterward.</p>
			<p>If you replicate an archived deck that happens to have the same name as an existing deck, then the replica <router-link to="deck-page-header#deck-name">deck’s name</router-link> is automatically changed to have a unique number within parentheses appended to it.</p>
			<p>You can <router-link to="#list-editor">edit</router-link> replicated decks as you want, since their data is made independent of the archived decks’ data.</p>
			<p>Note that this app can replicate decks only from archive files that were <router-link to="deck-page-header#archive-action">saved</router-link> specifically from MTG Deck Builder by Iristorm Design. You can’t replicate decks from files saved from other apps, even if those other apps involve <i>Magic: The Gathering</i> or if they export files with a “.deck” extension. If you’d want to view a <i>Magic</i> deck that comes from somewhere other than MTG Deck Builder by Iristorm Design, you can <a href="#create-from-plain-text-list">create from a plain-text card list</a> instead.</p>
		</section>

		<section id="create-from-plain-text-list">
			<h4>Create Deck from Plain-Text List</h4>
			<p>If you have a deck’s card list in the form of plain text, then you can display that deck in MTG Deck Builder. To do so, first <a href="#start-new-deck">start a new deck</a>, which begins empty. Then paste the text list into the submission form of the <router-link to="card-list-entry">Card List Entry</router-link> page, which you can access by clicking the <router-link to="list-editor#add-multiple">“Add Multiple” button</router-link> in the <router-link to="list-editor">List Editor mode</router-link>.</p>
		</section>
	</section>
</template>
