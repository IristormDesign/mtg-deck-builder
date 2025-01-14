<template functional>
	<section id="text-renderer" key="text-renderer">
		<h3>Text Renderer</h3>
		<p>The Text Renderer is a <a href="#deck-page-modes">deck page mode</a> where you can view the cards in your deck’s <a href="#card-groups">main and sideboard groups</a> in the form of simplified card lists in plain text.</p>
		<p>These plain-text lists have one card name per line, with each name preceded by its <a href="#card-quantities">quantity</a>. (This textual card list format is the same one used for <a href="#card-list-entry">adding card lists</a> to your deck.)</p>
		<p>Why would you want to see your deck in the form of plain text?</p>
		<ul>
			<li>
				<p><strong>Shop online faster for your deck’s cards.</strong> On some online stores that sell <i>Magic</i> card singles, they provide you a way to search for a list of cards at once. Stores may call this list-searching method “mass entry,” “deck builder,” etc. You can copy your plain-text deck lists from this app, then paste it into an online store’s mass entry search.</p>
			</li>
			<li>
				<p><strong>Print out a hard copy of your deck lists.</strong> A text document is better suited for printing on paper than the web page of the <a href="#list-editor">List Editor</a>.</p>
			</li>
			<li>
				<p><strong>Share your deck over the Internet.</strong> A plain-text card list is in a human-readable format as it is. It doesn’t require other people to use MTG Deck Builder to see the list, unlike <a href="#deck-archive-files">deck archive files</a>. (However, an archive file can <a href="#archive-action">save</a> and <a href="#create-deck">reproduce</a> multiple decks together, and has additional data about decks that’s missing from plain-text lists.)</p>
			</li>
		</ul>
		<p>If you want to take these plain-text card lists outside MTG Deck Builder, the Text Renderer has various buttons you can click that let you readily do that:</p>
		<ul>
			<li>
				<p><strong>Export Deck as Text File</strong> – Have the app generate a plain-text file (.txt) that has your deck’s main and sideboard card lists. The file gets saved to wherever your web browser puts downloads.</p>
			</li>
			<li>
				<p><strong>Print Deck</strong> – Print your deck’s main and sideboard card lists onto paper. Doing this method automatically applies some basic styling to the text. Any card names you’ve <a href="#card-stars">starred</a> (from the List Editor) will appear in a bold font in the printed list.</p>
				<p>If a list has a large number of card names, then the list’s printed version will be automatically laid out as three columns to conserve paper. (However, if you’re on Apple’s Safari browser, then it’ll always print the lists in only one column, because unfortunately, Safari doesn’t support multi-column layouts in printing. Other modern web browsers will print multi-column layouts normally.) </p>
			</li>
			<li>
				<p><strong>Copy</strong> – For either the main or the sideboard list of your deck, click the “Copy” button beside that list in the Text Renderer to instantly select and copy the whole text list to the clipboard of your computer or phone. (Then you can paste that text list elsewhere.)</p>
			</li>
		</ul>
		<p>The order of card names in the Text Renderer’s card lists matches that of the List Editor’s <a href="#card-list">card lists</a>. If you care about the order, use the List Editor’s <a href="#card-sorter">card sorter</a> to rearrange the names in the way you prefer before you <a href="#mode-menu">switch to</a> the Text Renderer.</p>
	</section>
</template>
