<template>
	<section id="m-card-adder">
		<h4>Card Adder</h4>
		<p>
			<img class="screenshot"
				src="@/img/manual-card-adder.jpg" width="810" height="173"
				alt="Snippet of card adder" title="Screenshot" loading="lazy" />
		</p>
		<p>The card adder (“Add a Card to This Deck”) section is where you can indicate a new <i>Magic</i> card to put in your deck.</p>
		<p>The new card will appear in the <a href="#m-card-list">card list</a> for either the main or the sideboard group, whichever is currently active via the <a href="#m-group-toggler">card group toggler</a>. The background color of the card adder section changes with the group: It’s dark gray when on main, and brown when on sideboard.</p>
		<p>The card adder has a simple form including a text input where you can enter a query for a card. Then, submit your query by clicking on the Add button or by pressing the Enter/Return key on your keyboard.</p>
		<p>The card adder accepts the following kinds of queries:</p>
		<ul>
			<li>
				<h5>Card Name</h5>
				<p>The standard kind of query: Just enter the name of a certain <i>Magic</i> card, and that card will be added to your deck. While you start typing letters into the text input, a small list of selectable suggestions for card names will appear by it.</p>
				<p>When you submit a card name query, if it’s not a valid name of a <i>Magic</i> card, then no card will be added to your deck, but the app notifies you of the error. If a card of a particular name has been printed in multiple sets, then the card from the latest released set is retrieved.</p>
			</li>
			<li>
				<h5>Scryfall Card Page URL</h5>
				<p>The website <a href="https://scryfall.com" target="_blank">Scryfall</a> has individual pages for every printing of every card in <i>Magic</i>. From a card’s page on Scryfall, you can copy its URL in your web browser’s address bar, then paste that URL into the card adder on MTG Deck Builder. The respective card will be added to your deck.</p>
				<p>A URL to a Scryfall card page is a useful kind of query for any card of a certain name that has had multiple printings, but the printing you get by default through the card name query isn’t the one you prefer. This may be because, for example, the <a href="#m-card-image">card image</a> of another printing shows a different illustration or card set symbol.</p>
			</li>
			<li>
				<h5>Random Card Code</h5>
				<p>Add any <i>Magic</i> card at random (among Modern tournament-legal cards) by entering the code “<strong>#random</strong>” in the card adder. Your web browser may also show this as a selectable option when the card adder’s text input has focus.</p>
			</li>
		</ul>
		<p>Other notes about using the card adder:</p>
		<ul>
			<li>Card queries are case insensitive (meaning it doesn’t matter whether you type letters as uppercase or lowercase.)</li>
			<li>The card adder won’t add a card of a certain name when it already exists in the card list. (If you want to have duplicates of a card, increase its <a href="#m-card-quantities">quantity</a> instead.)</li>
			<li>After submitting a query, as MTG Deck Builder sends an external data request to the Scryfall web servers, retrieving your card’s data may take a second or two to complete.</li>
			<li>A newly added card is always put at the bottom of the card list. You can use the <a href="#m-card-sorter">card sorter</a> afterward to rearrange the newly added cards among the rest.</li>
		</ul>
	</section>
</template>
