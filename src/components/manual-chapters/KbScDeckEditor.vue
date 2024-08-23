<template>
	<section id="m-kbsc-deck-editor">
		<h4>Keyboard Shortcuts: Deck Editor Actions</h4>
		<p>The <a href="#m-deck-editor">Deck Editor mode</a> makes use of several keyboard shortcuts. These shortcuts are divided among three categories, explained in the following subchapters.</p>

		<h5>Highlighting Rows in the Card List</h5>
		<p>For the card name in the row that’s currently highlighted, its card image is shown, and actions triggered by other keyboard shortcuts can be done to that card name. No more than one one row is highlighted at a time.</p>
		<ul class="keyboard-shortcuts">
			<li><kbd>W</kbd>: Move the highlight up to the previous row.</li>
			<li><kbd>S</kbd>: Move the highlight down to the next row.</li>
			<li><kbd>Esc</kbd>: Quit highlighting any row.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>W</kbd>: Move the highlight up to the 2nd-previous row.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>W</kbd>: Move the highlight down to the 2nd-next row.</li>
		</ul>
		<p>If the highlighted row is either the first or the last row of the card list, and you do a keyboard shortcut that would seem to move the highlight out of the list, then the shortcut highlights the row at the opposite end of the list instead.</p>

		<h5>Actions to Highlighted Row of Card List</h5>
		<p>These keyboard shortcuts do actions that apply to the card name in the currently highlighted row of the card list. If no card list row is highlighted yet, then doing any of these shortcuts will highlight the row belonging to the currently shown card image.</p>
		<ul class="keyboard-shortcuts">
			<li><kbd>E</kbd>: Raise the <a href="#m-card-quantities">quantity</a> by 1.</li>
			<li><kbd>D</kbd>: Lower the quantity by 1.</li>
			<li><kbd>A</kbd>: Toggle the <a href="#m-card-stars">star label</a> on or off.</li>
			<li><kbd>Q</kbd>: View the <a href="#m-card-image">card image</a> up closer.</li>
			<li><kbd>Z</kbd>: Turn over the card image (if double-faced).</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>E</kbd>: Raise the quantity by 2.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>D</kbd>: Lower the quantity by 2.</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>Q</kbd>: Open the card’s page on Scryfall in a new tab.</li>
		</ul>

		<h5>Other Deck Editor Actions</h5>
		<p>The following keyboard shortcuts work anytime in the Deck Editor, regardless of whichever card list row is highlighted, if any.</p>
		<ul class="keyboard-shortcuts">
			<li><kbd>R</kbd>: Toggle the active <a href="#m-card-groups">card group</a> between main and sideboard.</li>
			<li><kbd>X</kbd>: Focus onto the <a href="#m-card-adder">card adder</a>’s text input (Press <kbd class="">Esc</kbd> to stop the focus, which then lets you do keyboard shortcuts again.)</li>
			<li><kbd class="shift-key">Shift</kbd>+<kbd>X</kbd>: Open the <a href="#m-scryfall-button">Scryfall advanced search</a> page in a new tab.</li>
		</ul>
	</section>
</template>
