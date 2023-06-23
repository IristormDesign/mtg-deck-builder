<template>
	<section id="m-card-adder">
		<h4>Card Adder</h4>
		<p>
			<img class="screenshot"
				src="@/img/manual-card-adder.jpg" width="810" height="173"
				alt="Snippet of card adder" title="Screenshot" loading="lazy" />
		</p>
		<p>This section has a simple form where you can type a card’s name in the text box, then click on the Add Card button to make that card appear in the active <a href="#m-card-list">card list</a> of your deck.</p>
		<p>The card adder puts cards into either the main or the sideboard group of your deck depending on whichever you have selected in the <a href="#m-group-toggler">card group toggler</a>. The card adder’s background color changes with the active card group: It’s dark gray on main, and brown on sideboard.</p>
		<p>Whenever you start typing letters of a card’s name into the card adder’s text box, a small list of card suggestions based on those initial letters appears. Typing names in the card adder is case insensitive. (It doesn’t matter whether letters are uppercase or lowercase.)</p>
		<p>When you submit a card name&hellip;</p>
		<ul>
			<li>If a card by that name has been printed in multiple <i>Magic</i> sets, the card from the latest released set is retrieved.</li>
			<li>As MTG Deck Builder sends an external data request to the <a href="https://scryfall.com/" target="_blank" rel="noopener noreferrer">Scryfall</a> web servers, retrieving your card’s data may take a couple of seconds to complete.</li>
			<li>Only a valid name of a <i>Magic: The Gathering</i> card can add the card to your deck. If a name you submit is invalid, the app notifies you of the error.</li>
			<li>The card adder won’t add a card of a certain name when it already exists in the card list. (If you want to have duplicates of a card, increase its <a href="#m-card-quantities">quantity</a> instead.)</li>
		</ul>
		<p>To add any <i>Magic</i> card at random (among Modern tournament-legal cards), submit the code “#random” as the name in the card adder. Your web browser may also show this as a selectable option when the card adder’s text box has focus.</p>
		<p>A newly added card is always put at the bottom of the card list. You can use the <a href="#m-card-sorter">card sorter</a> afterward to rearrange the newly added cards with the rest.</p>
	</section>
</template>
