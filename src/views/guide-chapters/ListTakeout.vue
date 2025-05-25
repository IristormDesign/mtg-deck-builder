<template functional>
	<section id="list-takeout" key="list-takeout">
		<h3>List Takeout</h3>
		<p>As you finish constructing a deck in MTG Deck Builder, that’s not the end of managing your deck—it’s the beginning! Now you’ll probably want to do something more with these cards beyond just looking at their virtual representations within this app. So, that’s when List Takeout enters the battlefield.</p>
		<p>List Takeout is a <router-link to="deck-pages#deck-page-modes">deck page mode</router-link> where you can view your deck’s card lists in the form of plain text. Why would you want this? Here are some possibilities:</p>
		<ul>
			<li>
				<p><strong>Shop online faster for your deck’s cards.</strong> On some online stores that sell <i>Magic</i> card singles, they provide you a way to search for a list of cards at once. Stores may variously call this list-searching method “mass entry,” “deck builder,” etc. You can copy your deck’s plain-text list from List Takeout, then paste the list into an online store’s mass entry search.</p>
			</li>
			<li>
				<p><strong>Print out a hard copy of your deck lists.</strong> A text document is well suited for printing on paper (unlike the web page of the <router-link to="list-editor">List Editor</router-link>).</p>
			</li>
			<li>
				<p><strong>Easily share your deck over the Internet.</strong> A plain-text card list is in a simple, human-readable format, so you can show it to other people just as it is. They don’t need to use MTG Deck Builder to see it, unlike <router-link to="storage-of-deck-data#deck-archive-files">deck archive files</router-link>. (However, a deck archive file can <router-link to="deck-page-header#archive-action">save</router-link> and <router-link to="create-deck#replicate-archived-decks">replicate</router-link> multiple decks together, and includes extra data that’s missing from plain-text lists.)</p>
			</li>
		</ul>
		<p>To set the <router-link to="deck-pages">deck page</router-link> to the List Takeout mode, click the “List Takeout” tab in the <router-link to="deck-page-header#mode-menu">mode menu</router-link>, or <router-link to="keyboard-shortcuts">press the <kbd>4</kbd> key</router-link> (while on the deck page).</p>
		<p>The plain-text card lists from List Takeout have one card name per line, with each name preceded by its <router-link to="list-editor#card-quantities">quantity</router-link>. (This textual list format is the same one used by the <router-link to="card-list-entry">Card List Entry page</router-link>.) Lists are provided for both the main and <router-link to="list-editor#sideboard-uses">sideboard</router-link> card groups.</p>
		<p>The order of card names in List Takeout’s card lists matches that of the List Editor’s <router-link to="list-editor#card-list">card lists</router-link>. So, if you care about the order, use the <router-link to="list-editor#card-sorter">card sorter</router-link> in the List Editor to rearrange the names in the way you prefer before you switch to List Takeout.</p>
		<p>If you want to move copies of these plain-text card lists beyond MTG Deck Builder, then List Takeout provides you various ways to <a href="#export-deck-as-text-file">export</a>, <a href="#print-deck">print</a>, or <a href="#copy-card-lists">copy</a> your deck’s contents. These methods are explained in the next subchapters.</p>

		<section id="export-deck-as-text-file">
			<h4>Export Deck as Text File</h4>
			<p>Click the “Export Deck as Text File” button to have the app generate a plain-text file (.txt) that has your deck’s main and sideboard card lists. The file gets saved to wherever your web browser puts downloads.</p>
		</section>

		<section id="print-deck">
			<h4>Print Deck</h4>
			<p>You can get your deck’s main and sideboard card lists out on paper and ink. To do so, click the “Print Deck” button, which opens your web browser’s print dialog box. There you can choose a printer and your print settings, and look at a preview of the result.</p>
			<p>When you print from List Takeout, it automatically applies some basic styling to the card lists’ text. For any card names you’ve <router-link to="list-editor#card-stars">starred</router-link> (from the List Editor), the print will render their lettering in bold. If your deck has a large total number of names, the print will lay out the lists into three adjacent columns to conserve paper.</p>
			<p>Large card lists are best printed in the portrait (rather than landscape) orientation. A singular deck’s lists (barring those with an extraordinarily huge number of card names) can fit on one sheet in the common paper sizes of U.S. Letter and A4. Some smaller paper sizes may also work if your lists are short enough.</p>
		</section>

		<section id="copy-card-lists">
			<h4>Copy Card Lists</h4>
			<p>List Takeout has sections displaying the plain-text card lists for your deck’s main and sideboard groups. Both sections have a Copy button, either one of which you can click to have the respective section’s whole list instantly copied to the clipboard of your computer or phone. (Then you can paste that list elsewhere.)</p>
		</section>
	</section>
</template>
