<template functional>
	<section id="keyboard-shortcuts" key="keyboard-shortcuts">
		<h3>Keyboard Shortcuts</h3>
		<p>If you’re using MTG Deck Builder on a computer with a physical keyboard (instead of on a touchscreen device), then you have the option to use keyboard shortcuts. With keyboard shortcuts, you can press designated keys to perform tasks in the app, which let you interact with the app faster than by a mouse or trackpad alone.</p>
		<p>Special keyboard shortcuts are available for <a href="#kbsc-deck-page-modes">switching between deck page modes</a> and for doing various actions each within the <a href="#kbsc-list-editor">List Editor</a>, <a href="#kbsc-stats-analyzer">Stats Analyzer</a>, and <a href="#kbsc-draw-sim">Draw Simulator</a> modes. (There are no shortcut actions within the Text Renderer.)</p>
		<p>Be aware that the app’s keyboard shortcuts can’t work while your web browser is actively focused on any kind of text field, such as the ones in the <a href="#card-adder">card adder</a>, <a href="#card-quantities">card quantities</a>, or your browser’s web address bar. Under that condition, pressing a letter or digit key will enter that key’s character into the text field instead of doing the shortcut’s action. If you’d want to use a keyboard shortcut but your browser is focusing on a text field, stop the focus by pressing the <kbd>Esc</kbd> key or by clicking on a spot elsewhere on the page.</p>
		<p>The app’s scheme of keyboard shortcuts is designed for left-hand ergonomics on the standard English-language (QWERTY) layout of keys. If your keyboard has a different layout, then the shortcuts may be less ergonomic.</p>

		<section id="kbsc-deck-page-modes">
			<h4>Keyboard Shortcuts: Deck Page Modes</h4>
			<p>When you’re viewing a <a href="#deck-pages">deck page</a>, you can switch between the <a href="#deck-page-modes">deck page modes</a> by pressing one of the following keys:</p>
			<ul class="keyboard-shortcuts">
				<li><kbd>1</kbd>: Set to the <a href="#list-editor">List Editor</a>.</li>
				<li><kbd>2</kbd>: Set to the <a href="#stats-analyzer">Stats Analyzer</a>.</li>
				<li><kbd>3</kbd>: Set to the <a href="#draw-sim">Draw Simulator</a>.</li>
				<li><kbd>4</kbd>: Set to the <a href="#text-renderer">Text Renderer</a>.</li>
			</ul>
			<p>If you use any of these mode-setting <a href="#keyboard-shortcuts">keyboard shortcuts</a> for the mode that’s already active, then the shortcut will scroll the page upward to the <a href="#mode-menu">mode menu</a> (if it’s not already in view).</p>
		</section>

		<section id="kbsc-list-editor">
			<h4>Keyboard Shortcuts: List Editor Actions</h4>
			<p>The <a href="#list-editor">List Editor mode</a> accepts several special <a href="#keyboard-shortcuts">keyboard shortcuts</a>. These shortcuts are divided between three categories, all to be explained in the next subchapters of this user guide.</p>
			<p>Among the List Editor’s keyboard shortcuts, the majority of them do actions that in some way involve the <a href="#card-list">card list</a>’s currently highlighted row. If you’d use one of these shortcuts when no row is highlighted yet, then the row associated with the currently displayed <a href="#card-image">card image</a> becomes highlighted.</p>

			<h5>Highlighting Rows in the Card List</h5>
			<p>A <a href="#card-list">card list</a> comprises one row for each card name in your deck, and one row at a time can be highlighted via keyboard shortcuts. When a row is highlighted, the card name in that row has its <a href="#card-image">card image</a> shown, and you can use other keyboard shortcuts to do actions to that card name.</p>
			<ul class="keyboard-shortcuts">
				<li><kbd>W</kbd>: Move the highlight up to the previous row.</li>
				<li><kbd>S</kbd>: Move the highlight down to the next row.</li>
				<li><kbd class="shift-key">Shift</kbd>+<kbd>W</kbd>: Move the highlight up to a distant row above. (Specifically, the distance moved is equal to one-fifth of the card list’s total number of rows, to a maximum limit of 10 rows and a minimum of 2.)</li>
				<li><kbd class="shift-key">Shift</kbd>+<kbd>S</kbd>: Move the highlight down to a distant row below. (This works the same as <span class="no-text-break"><kbd class="shift-key">Shift</kbd>+<kbd>W</kbd></span> but in the opposite direction.)</li>
				<li><kbd>Esc</kbd>: Quit highlighting any row.</li>
			</ul>
			<p>If the highlighted row is at either the first or last position of the card list, and you use a keyboard shortcut that would seem to move the highlight out of the list, then the shortcut highlights the row at the list’s opposite end instead.</p>

			<h5>Actions to Highlighted Row</h5>
			<p>The following keyboard shortcuts do actions that affect the card name in the currently highlighted row of the card list.</p>
			<ul class="keyboard-shortcuts">
				<li><kbd>C</kbd>: View the <a href="#card-image">card image</a> up closer.</li>
				<li><kbd class="shift-key">Shift</kbd>+<kbd>C</kbd>: Open the card’s page on Scryfall in a new browser tab.</li>
				<li><kbd>Z</kbd>: Turn over the card image (only when it’s double-faced).</li>
				<li><kbd>A</kbd>: Toggle the card name’s <a href="#card-stars">star label</a> on or off.</li>
				<li><kbd>E</kbd>: Raise the card name’s <a href="#card-quantities">quantity</a> by 1.</li>
				<li><kbd>D</kbd>: Lower the card name’s quantity by 1.</li>
				<li><kbd class="shift-key">Shift</kbd>+<kbd>E</kbd>: Raise the card name’s quantity by 2.</li>
				<li><kbd class="shift-key">Shift</kbd>+<kbd>D</kbd>: Lower the card name’s quantity by 2.</li>
				<li><kbd>F</kbd>: Move 1 of the card name into the inactive <a href="#card-groups">card group</a>.</li>
			</ul>

			<h5>Other List Editor Actions</h5>
			<p>The following keyboard shortcuts work in the List Editor regardless of whichever card list row is highlighted, if any.</p>
			<ul class="keyboard-shortcuts">
				<li><kbd>Q</kbd>: Toggle the <a href="#card-sorter">card sorter</a>’s menu between visible and hidden.</li>
				<li><kbd>R</kbd>: Toggle the active <a href="#card-groups">card group</a> between main and sideboard.</li>
				<li><kbd>X</kbd>: Focus onto the <a href="#card-adder">card adder</a>’s text field.</li>
				<li><kbd class="shift-key">Shift</kbd>+<kbd>X</kbd>: Open <a href="#scryfall-button">Scryfall’s advanced card search</a> page in a new browser tab.</li>
			</ul>
		</section>

		<section id="kbsc-stats-analyzer">
			<h4>Keyboard Shortcuts: Stats Analyzer Actions</h4>
			<p>There’s only one <a href="#keyboard-shortcuts">keyboard shortcut</a> specially for the <a href="#stats-analyzer">Stats Analyzer mode</a>.</p>

			<ul class="keyboard-shortcuts">
				<li><kbd>Esc</kbd>: Stop the active <a href="#statistics-filter">statistics filter</a>.</li>
			</ul>
		</section>

		<section id="kbsc-draw-sim">
			<h4>Keyboard Shortcuts: Draw Simulator Actions</h4>
			<p>The <a href="#draw-sim">Draw Simulator mode</a> accepts the following <a href="#keyboard-shortcuts">keyboard shortcuts</a>:</p>

			<h5>Unique Shortcuts to Draw Simulator</h5>
			<ul class="keyboard-shortcuts">
				<li><kbd class="space-bar">Space</kbd>: <a href="#draw-a-card">Draw a card</a>.</li>
				<li><kbd>R</kbd>: <a href="#restart">Restart</a> as a new testing round.</li>
			</ul>

			<h5>Matching Shortcuts with List Editor</h5>
			<ul class="keyboard-shortcuts">
				<li><kbd>C</kbd>: View the <a href="#card-image">card image</a> up closer.</li>
				<li><kbd class="shift-key">Shift</kbd>+<kbd>C</kbd>: Open the displayed card’s page on Scryfall in a new browser tab.</li>
				<li><kbd>Z</kbd>: Turn over the card image (only when it’s double-faced).</li>
			</ul>
		</section>
	</section>
</template>
