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
		<p>A deck page’s contents has two major sections—the <router-link to="deck-page-header">deck page header</router-link> and the <a href="#deck-page-modes">deck page mode</a> section—and both have their own subsections. The next chapters of this user guide are going to explain every part of a deck page.</p>
		<p>Whenever you’re viewing a deck page, you’re optionally able to use special <router-link to="keyboard-shortcuts">keyboard shortcuts</router-link>, which let you do commands by pressing keys on a keyboard.</p>

		<section id="deck-page-modes">
			<h4>Deck Page Modes</h4>
			<p>A <a href="#deck-pages">deck page</a> can be set to any one of four “deck page modes” at a time. The deck page modes are the following:</p>
			<ul>
				<li><router-link to="list-editor">List Editor</router-link></li>
				<li><router-link to="stats-analyzer">Stats Analyzer</router-link></li>
				<li><router-link to="draw-sim">Draw Simulator</router-link></li>
				<li><router-link to="text-renderer">Text Renderer</router-link></li>
			</ul>
			<p>These modes each provide you a different way to interact with your deck through MTG Deck Builder. The later chapters of this user guide explain in detail how each mode works.</p>
			<p>A deck page mode’s content appears below the <router-link to="deck-page-header">deck page header</router-link>. Switch from one mode to another via the <router-link to="deck-page-header#mode-menu">mode menu</router-link> or a <router-link to="keyboard-shortcuts#kbsc-deck-page-modes">keyboard shortcut</router-link>.</p>
		</section>
	</section>
</template>
