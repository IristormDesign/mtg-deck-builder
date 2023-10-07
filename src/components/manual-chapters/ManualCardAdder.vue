<template>
	<section id="m-card-adder">
		<h4>Card Adder</h4>
		<p>
			<img class="screenshot"
				src="@/img/manual-card-adder.jpg" width="810" height="173"
				alt="Snippet of card adder" title="Screenshot" loading="lazy" />
		</p>
		<p>The card adder (the section labeled “Add a Card to This Deck”) is where you can indicate a new <i>Magic</i> card to put into your deck.</p>
		<p>The new card will appear in the <a href="#m-card-list">card list</a> for either the main group or the sideboard group, whichever is currently active in the <a href="#m-group-switch">card group switch</a>. The background color of the card adder section changes with the group: It’s dark gray when on main, and brown when on sideboard.</p>
		<p>The card adder has a simple form including a text input where you can enter a query for a card. Then, submit your query by clicking on the Add button or by pressing the Enter/Return key on your keyboard.</p>
		<p>The card adder accepts the following kinds of queries:</p>
		<ul>
			<li>
				<h5>Card Name</h5>
				<p>Simply enter the name of a <i>Magic</i> card, and that card will be added to your deck. While you start typing letters into the card adder’s text input, a small list of selectable suggestions for card names will appear by it.</p>
				<p>When you submit a card name query, if it turns out to be an invalid name, then no card will be added to your deck, but the app will notify you of the mistake. If a card of a particular name has been printed in multiple sets, then the card from the latest released set is retrieved.</p>
			</li>
			<li>
				<h5>Scryfall Card Page URL</h5>
				<p>The website <a href="https://scryfall.com" target="_blank">Scryfall</a> has individual pages for every print of every card in <i>Magic</i>. From any card’s page on Scryfall, you can copy the page’s URL in your web browser’s address bar, then paste that URL into the card adder on MTG Deck Builder. The respective card will be automatically added to your deck.</p>
				<p>A Scryfall card page URL is a useful kind of query for adding any card of a certain name that has had multiple prints, but the print you get by default through the card name query isn’t the one you prefer. For example, maybe you’d rather see another print’s <a href="#m-card-image">image</a> that shows a different illustration or card set symbol.</p>
				<p>You can submit a Scryfall URL for a card that has the same name as a card that already exists in the card list, but is in a different print. In this case, the app will ask you if you want the submitted print to replace the existing print.</p>
			</li>
			<li>
				<h5>Random Card Code</h5>
				<p>Add any <i>Magic</i> card at random (among cards legal in Modern tournaments) by entering the code “<strong>#random</strong>” in the card adder. Your web browser may also show this as a selectable option when the card adder’s text input has focus.</p>
			</li>
		</ul>
		<p>Other notes about using the card adder:</p>
		<ul>
			<li>Card queries are case insensitive (meaning it doesn’t matter whether you type letters as uppercase or lowercase.)</li>
			<li>The card adder won’t add a card of a certain name when it already exists in the card list. (If you want to have duplicates of a card, increase its <a href="#m-card-quantities">quantity</a> instead.)</li>
			<li>After submitting a query, as MTG Deck Builder sends an external data request to the Scryfall web servers, retrieving your card’s data may take a second or two to complete.</li>
			<li>Every newly added card is put at the bottom of the card list. You can use the <a href="#m-card-sorter">card sorter</a> afterward to rearrange the newly added cards among the rest.</li>
		</ul>
	</section>
</template>
