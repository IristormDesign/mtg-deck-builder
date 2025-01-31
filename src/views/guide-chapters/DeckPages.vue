<template functional>
	<section id="deck-pages" key="deck-pages">
		<h3>Deck Pages</h3>
		<p>Deck pages are the central focus of MTG Deck Builder: They’re where you construct, analyze, test, and publish your custom <i>Magic: The Gathering</i> decks.</p>
		<p>Every deck in the app has its own deck page. Whenever you <router-link to="create-deck">create</router-link> or <router-link to="app-header#deck-menu">open</router-link> a deck, you’re directed to its deck page.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 1.5x"
				src="@/img/manual-deck-page.jpg" width="658" height="444"
				alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>A deck page’s contents has two major sections—the <router-link to="deck-page-header">deck page header</router-link> and the <a href="#deck-page-modes">deck page mode</a> section—and both are subdivided into sections of their own. The next chapters of this user guide are going to explain every part of a deck page.</p>
		<p>Whenever you’re viewing a deck page, you’re optionally able to use special <router-link to="keyboard-shortcuts">keyboard shortcuts</router-link>, which let you do commands by pressing keys on a keyboard.</p>

		<section id="deck-page-modes">
			<h4>Deck Page Modes</h4>
			<p>A <a href="#deck-pages">deck page</a> can be set to any one of four deck page modes at a time. These modes are the “<router-link to="list-editor">List Editor</router-link>,” the “<router-link to="stats-analyzer">Stats Analyzer</router-link>,” the “<router-link to="draw-sim">Draw Simulator</router-link>,” and the “<router-link to="text-renderer">Text Renderer</router-link>,” and each provides you a different way to interact with your decks in MTG Deck Builder.</p>
			<p>Later chapters of this user guide explain in detail how each deck page mode works.</p>
			<p>A mode’s contents appears below the <router-link to="deck-page-header">deck page’s header</router-link>. Whenever you arrive on any deck page, the mode displayed first is the List Editor.</p>
			<p>Switch from one mode to another by using the <router-link to="deck-page-header#mode-menu">mode menu</router-link> or a <router-link to="keyboard-shortcuts#kbsc-deck-page-modes">keyboard shortcut</router-link>.</p>
		</section>
	</section>
</template>
