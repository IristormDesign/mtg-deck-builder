<template functional>
	<section id="text-renderer" key="text-renderer">
		<h3>Text Renderer</h3>
		<p>The Text Renderer is a <router-link to="deck-pages#deck-page-modes">deck page mode</router-link> where you can view the cards in your deck’s <a href="list-editor#card-groups">main and sideboard groups</a> in the form of simplified card lists in plain text.</p>
		<p>These plain-text lists have one card name per line, with each name preceded by its <router-link to="list-editor#card-quantities">quantity</router-link>. (This textual card list format is the same one used for <router-link to="card-list-entry">adding card lists</router-link> to your deck.)</p>
		<p>Why would you want to see your deck in the form of plain text?</p>
		<ul>
			<li>
				<p><strong>Shop online faster for your deck’s cards.</strong> On some online stores that sell <i>Magic</i> card singles, they provide you a way to search for a list of cards at once. Stores may call this list-searching method “mass entry,” “deck builder,” etc. You can copy your deck’s plain-text list from this app, then paste it into an online store’s mass entry search.</p>
			</li>
			<li>
				<p><strong>Print out a hard copy of your deck lists.</strong> A text document is better suited for printing on paper than the web page of the <router-link to="list-editor">List Editor</router-link>.</p>
			</li>
			<li>
				<p><strong>Share your deck over the Internet.</strong> A plain-text card list is in a human-readable format as it is. It doesn’t require other people to use MTG Deck Builder to see the list, unlike <router-link to="storage-of-deck-data#deck-archive-files">deck archive files</router-link>. (However, an archive file can <router-link to="deck-page-header#archive-action">save</router-link> and <router-link to="create-deck#replicate-archived-decks">replicate</router-link> multiple decks together, and has additional data about decks that’s missing from plain-text lists.)</p>
			</li>
		</ul>
		<p>The order of card names in the Text Renderer’s card lists matches that of the List Editor’s <router-link to="list-editor#card-list">card lists</router-link>. So, if you care about the order, then use the <router-link to="list-editor#card-sorter">card sorter</router-link> in the List Editor to rearrange the names in the way you prefer before you <router-link to="deck-page-header#mode-menu">switch to</router-link> the Text Renderer.</p>
		<p>If you want to take these plain-text card lists outside MTG Deck Builder, the Text Renderer has various buttons you can click that let you readily <a href="#export-deck-as-text-file">export</a>, <a href="#print-deck">print</a>, or <a href="#copy-card-lists">copy</a> them. These controls are explained in the next subchapters.</p>

		<section id="export-deck-as-text-file">
			<h4>Export Deck as Text File</h4>
			<p>Click the “Export Deck as Text File” button to have the app generate a plain-text file (.txt) that has your deck’s main and sideboard card lists. The file gets saved to wherever your web browser puts downloads.</p>
		</section>

		<section id="print-deck">
			<h4>Print Deck</h4>
			<p>Click the “Print Deck” button to print your deck’s main and sideboard card lists onto paper. Doing this method automatically applies some basic styling to the lists’ text. Any card names you’ve <router-link to="list-editor#card-stars">starred</router-link> (from the List Editor) will appear bold in the printed list.</p>
			<p>If a list has a large number of card names, then the list’s printed version will be automatically laid out into three columns to conserve paper. (However, if you’re on Apple’s Safari browser, then it’ll always print the lists in only one column, because unfortunately, Safari doesn’t support multi-column layouts in printing. Other modern web browsers will print multi-column layouts normally.)</p>
		</section>

		<section id="copy-card-lists">
			<h4>Copy Card Lists</h4>
			<p>The Text Renderer has sections displaying the plain-text card lists for your deck’s main and sideboard groups. Both sections have a “Copy” button, either one of which you can click to have the respective section’s whole list instantly copied to the clipboard of your computer or phone. (Then you can paste that list elsewhere.)</p>
		</section>
	</section>
</template>
