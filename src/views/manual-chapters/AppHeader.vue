<template functional>
	<section id="app-header" key="app-header">
		<h3>App Header</h3>
		<p>At the top of any page of MTG Deck Builder is the app header, which has the following links:</p>
		<ul>
			<li><strong>Create Deck</strong> – Takes you to the <a href="#create-deck">Create Deck page</a>.</li>
			<li><strong>Open Deck</strong> – Shows the <a href="#deck-menu">deck menu</a>.</li>
			<li><strong>User Manual</strong> – Takes you to the page you’re reading right now.</li>
		</ul>

		<section id="deck-menu">
			<h4>Deck Menu</h4>
			<p>When you click the Open Deck link in the <a href="#app-header">app header</a>, the deck menu appears. It lists of all of your currently unopened decks, in alphabetical order by name, that are <a href="#storage-of-deck-data">stored</a> in MTG Deck Builder.</p>
			<p>Beside each deck’s name are the symbols of the mana colors required by any of the deck’s spells, ordered from the most frequent color to the least.</p>
			<p>If you’re using MTG Deck Builder on a phone, the deck menu appears as a section within the whole menu of the app header instead of as a separate menu.</p>
			<p>Each deck listed in the deck menu is a link that takes you to the respective <a href="#deck-pages">deck page</a>.</p>
			<p>When you visit MTG Deck Builder for the first time ever, it provides you two sample decks: <i>Dimir Espionage</i> and <i>Primal Genesis (Commander)</i>. You may <a href="#list-editor">modify</a> these decks however you like, or <a href="#deck-actions">delete</a> them.</p>
			<p>If all decks in the app have been deleted, the Open Deck link in the app header becomes temporarily disabled until you <a href="#create-deck">create a deck</a>.</p>
		</section>
	</section>
</template>
