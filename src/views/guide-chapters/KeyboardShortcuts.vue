<template functional>
	<section id="keyboard-shortcuts" key="keyboard-shortcuts">
		<h3>Keyboard Shortcuts</h3>
		<p>If you’re using MTG Deck Builder on a computer with a physical keyboard (instead of on a touchscreen device), then you have the option to use keyboard shortcuts. With keyboard shortcuts, you can press designated keys to perform tasks in the app, which let you interact with the app faster than by a mouse or trackpad alone.</p>
		<p>Special keyboard shortcuts are available for <a href="#kbsc-deck-page-modes">setting deck page modes</a> and for doing various actions each in the <a href="#kbsc-list-editor">List Editor</a>, <a href="#kbsc-stats-analyzer">Stats Analyzer</a>, and <a href="#kbsc-draw-sim">Draw Simulator</a> modes. (No shortcuts are in the Text Renderer.)</p>
		<p>Be aware that the app’s keyboard shortcuts can’t work while your web browser is actively focused on any kind of text field, such as the ones in the List Editor’s <router-link to="list-editor#card-adder">card adder</router-link> or <router-link to="list-editor#card-quantities">card quantities</router-link>, or your browser’s web address bar. Under that condition, pressing a letter or digit key will enter that key’s character into the text field instead of doing the shortcut’s action.</p>
		<p>If you’d want to use a keyboard shortcut but your web browser is focusing on a text field, you must first stop the browser’s focus. You can do that by pressing the <kbd>Esc</kbd> key or by clicking a spot elsewhere on the page.</p>
		<p>The app’s scheme of keyboard shortcuts is designed for left-handed ergonomics on the standard English-language layout of keys (“QWERTY”). If your keyboard has a different layout, the shortcuts probably won’t be as ergonomic or logical.</p>

		<section id="kbsc-deck-page-modes">
			<h4>Keyboard Shortcuts for Setting Deck Page Modes</h4>
			<p>While viewing a <router-link to="deck-pages">deck page</router-link>, you can switch between the <router-link to="deck-pages#deck-page-modes">deck page modes</router-link> by pressing any of the following keys:</p>
			<ul class="keyboard-shortcuts">
				<li><kbd>1</kbd>: Set to the <router-link to="list-editor">List Editor</router-link>.</li>
				<li><kbd>2</kbd>: Set to the <router-link to="stats-analyzer">Stats Analyzer</router-link>.</li>
				<li><kbd>3</kbd>: Set to the <router-link to="draw-sim">Draw Simulator</router-link>.</li>
				<li><kbd>4</kbd>: Set to the <router-link to="text-renderer">Text Renderer</router-link>.</li>
			</ul>
			<p>If you use any of these mode-setting <a href="#keyboard-shortcuts">keyboard shortcuts</a> for the mode that’s already active, then the shortcut will scroll the page upward to the <router-link to="deck-page-header#mode-menu">mode menu</router-link> (if it’s not already in view).</p>
		</section>

		<section id="kbsc-list-editor">
			<h4>Keyboard Shortcuts for List Editor</h4>
			<p>The <router-link to="list-editor">List Editor mode</router-link> accepts numerous <a href="#keyboard-shortcuts">keyboard shortcuts</a>. These shortcuts are divided between three categories, all explained in the next subchapters.</p>
			<p>The majority of the List Editor’s keyboard shortcuts do actions that in some way involve the <router-link to="list-editor#card-list">card list</router-link>’s currently highlighted row. If you’d use one of these shortcuts when no row is highlighted yet, then the row associated with the currently displayed <router-link to="list-editor#card-image">card image</router-link> becomes highlighted.</p>

			<section id="highlighting-rows">
				<h5>Highlighting Rows in the Card List</h5>
				<p>The <router-link to="list-editor">List Editor</router-link>’s <router-link to="list-editor#card-list">card list</router-link> comprises one row for each card name in your deck. One row at a time can be highlighted via keyboard shortcuts. When a row is highlighted, the card name in that row has its <router-link to="list-editor#card-image">card image</router-link> shown, and you can use other keyboard shortcuts to do actions to that card name.</p>
				<ul class="keyboard-shortcuts">
					<li><kbd>W</kbd>: Move the highlight up to the previous row.</li>
					<li><kbd>S</kbd>: Move the highlight down to the next row.</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>W</kbd>: Move the highlight up to a distant row above. (Specifically, the distance moved is based on the current card list’s total number of rows. If the total is fewer than 8, then the highlight moves by half the total number of rows. If the total is 8 or more, then the highlight moves by 5 rows.)</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>S</kbd>: Move the highlight down to a distant row below. (This works like <span class="no-text-break"><kbd class="shift-key">Shift</kbd>+<kbd>W</kbd></span> in the opposite direction.)</li>
					<li><kbd>Esc</kbd>: Quit highlighting any row.</li>
				</ul>
				<p>If the highlighted row is the row at either the very top or the very bottom of the list, and you use a shortcut to move the highlight where it couldn’t be moved farther in that direction, then the shortcut instead highlights the row at the list’s opposite end.</p>
			</section>

			<section id="actions-to-highlighted-row">
				<h5>Actions to Highlighted Row</h5>
				<p>The following keyboard shortcuts do actions that affect the card name in the currently highlighted row of the card list.</p>
				<ul class="keyboard-shortcuts">
					<li><kbd>C</kbd>: View the <router-link to="list-editor#card-image">card image</router-link> up closer.</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>C</kbd>: Open the card’s page on Scryfall in a new browser tab.</li>
					<li><kbd>Z</kbd>: Turn over the card image (only when it’s double-faced).</li>
					<li><kbd>A</kbd>: Toggle the card name’s <router-link to="list-editor#card-stars">star label</router-link> on or off.</li>
					<li><kbd>E</kbd>: Raise the card name’s <router-link to="list-editor#card-quantities">quantity</router-link> by 1.</li>
					<li><kbd>D</kbd>: Lower the card name’s quantity by 1.</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>E</kbd>: Raise the card name’s quantity by 2.</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>D</kbd>: Lower the card name’s quantity by 2.</li>
					<li><kbd>F</kbd>: Move 1 of the card name into the inactive <router-link to="list-editor#card-groups">card group</router-link>.</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>F</kbd>: Move 2 of the card name into the inactive card group.</li>

				</ul>
			</section>

			<section id="other-list-editor-actions">
				<h5>Other List Editor Actions</h5>
				<p>The following keyboard shortcuts work in the List Editor regardless of whether a card list row is highlighted.</p>
				<ul class="keyboard-shortcuts">
					<li><kbd>Q</kbd>: Show or hide the <router-link to="list-editor#card-sorter">card sorter</router-link>’s menu.</li>
					<li><kbd>R</kbd>: Toggle the active <router-link to="list-editor#card-groups">card group</router-link> between main and sideboard.</li>
					<li><kbd>X</kbd>: Focus onto the <router-link to="list-editor#card-adder">card adder</router-link>’s text field. (Press <kbd>Esc</kbd> to stop the focus.)</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>X</kbd>: Open <router-link to="list-editor#scryfall-button">Scryfall’s advanced card search</router-link> page in a new browser tab.</li>
				</ul>
			</section>
		</section>

		<section id="kbsc-stats-analyzer">
			<h4>Keyboard Shortcuts for Stats Analyzer</h4>
			<p>There’s only one <a href="#keyboard-shortcuts">keyboard shortcut</a> specially for the <router-link to="stats-analyzer">Stats Analyzer mode</router-link>.</p>

			<ul class="keyboard-shortcuts">
				<li><kbd>Esc</kbd>: Stop the active <router-link to="stats-analyzer#statistics-filter">statistics filter</router-link>.</li>
			</ul>
		</section>

		<section id="kbsc-draw-sim">
			<h4>Keyboard Shortcuts for Draw Simulator</h4>
			<p>The <router-link to="draw-sim">Draw Simulator mode</router-link> accepts the following <a href="#keyboard-shortcuts">keyboard shortcuts</a>:</p>

			<section id="unique-shortcuts-to-draw-sim">
				<h5>Unique Shortcuts to Draw Simulator</h5>
				<ul class="keyboard-shortcuts">
					<li><kbd class="space-bar">Space</kbd>: <router-link to="draw-sim#draw-a-card">Draw a card</router-link>.</li>
					<li><kbd>R</kbd>: <router-link to="draw-sim#restart">Restart</router-link> as a new testing round.</li>
				</ul>
			</section>

			<section id="matching-shortcuts-with-list-editor">
				<h5>Matching Shortcuts with List Editor</h5>
				<ul class="keyboard-shortcuts">
					<li><kbd>C</kbd>: View the <router-link to="list-editor#card-image">card image</router-link> up closer.</li>
					<li><kbd class="shift-key">Shift</kbd>+<kbd>C</kbd>: Open the displayed card’s page on Scryfall in a new browser tab.</li>
					<li><kbd>Z</kbd>: Turn over the card image (only when it’s double-faced).</li>
				</ul>
			</section>
		</section>
	</section>
</template>
