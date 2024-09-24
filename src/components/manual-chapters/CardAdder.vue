<template functional>
	<section id="m-card-adder" key="card-adder">
		<h4>Card Adder</h4>
		<p>
			<img class="screenshot"
				src="@/img/manual-card-adder.jpg" width="810" height="173"
				alt="Snippet of card adder" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>The card adder (the section labeled “Add a card name to this deck/sideboard” in the <a href="#m-deck-editor">Deck Editor</a>) is where you can indicate a new <i>Magic</i> card to put into your deck.</p>
		<p>The new card name will appear in the <a href="#m-card-list">card list</a> for either the main or sideboard group, whichever is currently active in the <a href="#m-card-groups">card group switch</a>. The background color of the card adder section changes with the group: It’s dark gray when on main, and brown when on sideboard.</p>
		<p>The card adder has a simple form including a text field where you can enter a query for a card. Then, submit your query by clicking the “Add” button, or by pressing the Enter/Return key on your keyboard.</p>
		<p>The card adder accepts the following three kinds of queries:</p>
		<ul>
			<li>
				<h5>Card Name</h5>
				<p>Simply enter the certain name of a <i>Magic</i> card, and it’ll be added to your deck. While you start typing letters into the card adder’s text field, a small list of selectable suggestions for card names will appear by it.</p>
				<p>When you submit a card name query, if it turns out to be an invalid name, the app will notify you of the mistake. If a card name has been printed in multiple sets, then the card name from the latest released set is retrieved.</p>
			</li>
			<li>
				<h5>Scryfall Card Page URL</h5>
				<p>The website <a href="https://scryfall.com" target="_blank">Scryfall</a> has individual pages for every print of every card in <i>Magic</i>. From any card’s page on Scryfall, you could copy the page’s URL in your web browser’s address bar, then paste that URL into the card adder on MTG Deck Builder. The respective card name will be automatically added to your deck.</p>
				<p>A Scryfall card page URL is a useful kind of query for adding any card of a certain name that has had multiple prints, but the print you get by default through the card name query isn’t the one you prefer. For example, maybe you’d rather see another print’s <a href="#m-card-image">image</a> that shows a different illustration or card set symbol.</p>
				<p>You can submit a Scryfall URL for a card name that already exists in the card list, but is in a different print. In this case, the app will ask you if you want the submitted print to replace the existing print.</p>
			</li>
			<li>
				<h5>Random Card Code</h5>
				<p>Add a name of a <i>Magic</i> card at random (among modern-framed cards legal in Vintage tournaments) by entering the code “<strong>#random</strong>” in the card adder. Your web browser may also show this as a selectable option when the card adder’s text field has focus.</p>
			</li>
		</ul>
		<p>Other notes about using the card adder:</p>
		<ul>
			<li>You can press the <kbd>X</kbd> key to have your web browser focus onto the card adder’s text field. Press <kbd class="">Esc</kbd> to cancel the focus (thus allowing you to use <a href="#m-keyboard-shortcuts">other keyboard shortcuts</a>).</li>
			<li>Card queries are case insensitive (meaning it doesn’t matter whether you type letters as uppercase or lowercase).</li>
			<li>The card adder won’t add a name that already exists in the card list. (To add duplicates of an existing name, <a href="#m-card-quantities">increase its quantity</a> instead.)</li>
			<li>When submitting a query, MTG Deck Builder sends an external data request to the Scryfall web servers, and so retrieving your card’s data may take a second or two to complete.</li>
			<li>Every newly added card name is put at the bottom of the card list. You can use the <a href="#m-card-sorter">card sorter</a> afterward to rearrange the newly added names among the rest.</li>
		</ul>
	</section>
</template>
