<template functional>
	<section id="app-header" key="app-header">
		<h3>App Header</h3>
		<p>At the top of any page of MTG Deck Builder is the app header, which has the following links:</p>
		<ul>
			<li><strong>Create Deck</strong> – Takes you to the <router-link to="create-deck">Create Deck page</router-link> (to be explained in the next chapter of this User Guide).</li>
			<li><strong>Open Deck&hellip;</strong> – Shows the <a href="#deck-menu">deck menu</a>.</li>
			<li><strong>User Guide</strong> – Takes you to the <router-link to="intro#intro">User Guide</router-link> (as you know).</li>
			<li><strong>Donate</strong> – Takes you to a page explaining why and how to donate.</li>
		</ul>

		<section id="deck-menu">
			<h4>Deck Menu</h4>
			<p>When you click the Open Deck link in the <a href="#app-header">app header</a>, the deck menu appears, which lists of all of your decks whose data is <router-link to="storage-of-deck-data">stored</router-link> in MTG Deck Builder. The menu has the decks ordered by name alphabetically.</p>
			<p>Each deck listed in the deck menu is a link that takes you to the respective <router-link to="deck-pages">deck page</router-link>. Beside each deck’s name are the symbols of the mana colors required by any of the deck’s spells, ordered from the most frequent color to the least.</p>
			<p>If you’re using MTG Deck Builder on a phone, the deck menu appears as a submenu within the whole menu of the app header instead of as a separate menu.</p>
			<p>When you visit MTG Deck Builder for the first time ever, it provides you two sample decks: <i>Dimir Espionage</i> and <i>Primal Genesis (Commander)</i>. You may <router-link to="list-editor">modify</router-link> these decks however you like, or <router-link to="deck-page-header#delete-action">delete</router-link> them.</p>
			<p>Note that you can’t use the deck menu to open a deck directly from an <router-link to="storage-of-deck-data#deck-archive-files">archive file</router-link>. If you have an archived deck you’d like to open, <router-link to="create-deck#replicate-archived-decks">replicate</router-link> it first.</p>
			<p>If all decks in the app have been deleted, the Open Deck link in the app header becomes temporarily disabled until you <router-link to="create-deck">create a deck</router-link>.</p>
		</section>
	</section>
</template>
