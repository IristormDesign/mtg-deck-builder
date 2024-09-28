<template functional>
	<section id="kbsc-deck-editor" key="kbsc-deck-editor">
		<h4>Keyboard Shortcuts: Deck Editor Actions</h4>
		<p>The <a href="#deck-editor">Deck Editor</a> accepts several special <a href="#keyboard-shortcuts">keyboard shortcuts</a>. These shortcuts are divided among three categories, explained in the next subchapters.</p>

		<h5>Highlighting Rows in the Card List</h5>
		<p>A <a href="#card-list">card list</a> comprises one row for each card name in your deck, and one row at a time can be highlighted via keyboard shortcuts. When a row is highlighted, the card name in that row has its <a href="#card-image">card image</a> shown, and you can use other keyboard shortcuts to do actions to that card name.</p>
		<ul class="keyboard-shortcuts">
			<li><kbd>W</kbd>: Move the highlight up to the previous row.</li>
			<li><kbd>S</kbd>: Move the highlight down to the next row.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>W</kbd>: Move the highlight up to the 2nd-previous row.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>S</kbd>: Move the highlight down to the 2nd-next row.</li>
			<li><kbd>Esc</kbd>: Quit highlighting any row.</li>
		</ul>
		<p>If the highlighted row is at either the first or last position of the card list, and you use a keyboard shortcut that would seem to move the highlight out of the list, then the shortcut highlights the row at the opposite end of the list instead.</p>

		<h5>Actions to Highlighted Row</h5>
		<p>The following keyboard shortcuts do actions that affect the card name in the currently highlighted row of the card list. If no row is highlighted yet, then using any of these shortcuts will highlight the row having the card name that’s associated with the currently displayed card image.</p>
		<ul class="keyboard-shortcuts">
			<li><kbd>E</kbd>: Raise the <a href="#card-quantities">quantity</a> by 1.</li>
			<li><kbd>D</kbd>: Lower the quantity by 1.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>E</kbd>: Raise the quantity by 2.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>D</kbd>: Lower the quantity by 2.</li>
			<li><kbd>A</kbd>: Toggle the <a href="#card-stars">star label</a> on or off.</li>
			<li><kbd>Q</kbd>: View the <a href="#card-image">card image</a> up closer.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>Q</kbd>: Open a new tab for the card’s page on Scryfall.</li>
			<li><kbd>Z</kbd>: Turn over the card image (if it’s double-faced).</li>
		</ul>

		<h5>Other Deck Editor Actions</h5>
		<p>The following keyboard shortcuts work in the Deck Editor regardless of whichever card list row is highlighted, if any.</p>
		<ul class="keyboard-shortcuts">
			<li><kbd>R</kbd>: Toggle the active <a href="#card-groups">card group</a> between main and sideboard.</li>
			<li><kbd>X</kbd>: Focus onto the <a href="#card-adder">card adder</a>’s text field.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>X</kbd>: Open a new tab for <a href="#scryfall-button">Scryfall’s advanced search</a> page.</li>
		</ul>
	</section>
</template>
