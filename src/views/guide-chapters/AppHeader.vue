<template functional>
	<section id="app-header" key="app-header">
		<h3>App Header</h3>
		<p>At the top of any page of MTG Deck Builder is the app header, which has the following links:</p>
		<ul>
			<li><strong>Create Deck</strong> – Takes you to the <router-link to="create-deck">Create Deck page</router-link>.</li>
			<li><strong>Open Deck</strong> – Shows the <a href="#deck-menu">deck menu</a>.</li>
			<li><strong>User Guide</strong> – Takes you to the page you’re reading right now.</li>
		</ul>

		<section id="deck-menu">
			<h4>Deck Menu</h4>
			<p>When you click the Open Deck link in the <a href="#app-header">app header</a>, the deck menu appears. It lists of all of your currently unopened decks, in alphabetical order by name, that are <router-link to="storage-of-deck-data">stored</router-link> in MTG Deck Builder.</p>
			<p>Beside each deck’s name are the symbols of the mana colors required by any of the deck’s spells, ordered from the most frequent color to the least.</p>
			<p>If you’re using MTG Deck Builder on a phone, the deck menu appears as a section within the whole menu of the app header instead of as a separate menu.</p>
			<p>Each deck listed in the deck menu is a link that takes you to the respective <router-link to="deck-pages">deck page</router-link>.</p>
			<p>When you visit MTG Deck Builder for the first time ever, it provides you two sample decks: <i>Dimir Espionage</i> and <i>Primal Genesis (Commander)</i>. You may <router-link to="list-editor">modify</router-link> these decks however you like, or <router-link to="deck-page-header#deck-action">delete</router-link> them.</p>
			<p>If all decks in the app have been deleted, the Open Deck link in the app header becomes temporarily disabled until you <router-link to="create-deck">create a deck</router-link>.</p>
		</section>
	</section>
</template>
