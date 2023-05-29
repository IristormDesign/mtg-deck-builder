<template>
	<section id="m-card-adder">
		<h4>Card Adder</h4>
		<p>
			<img class="screenshot"
				src="@/img/manual-card-adder.jpg" width="810" height="173"
				alt="Snippet of card adder" title="Screenshot" loading="lazy" />
		</p>
		<p>This section has a simple form where you can enter a card’s name in the text box, then click on the Add Card button to make that card appear in the active <a href="#m-card-list">card list</a> of your deck.</p>
		<p>The card adder will put cards into either the main deck or the sideboard depending on whichever is currently selected in the <a href="#m-group-toggler">card group toggler</a>. The card adder’s background color changes with the active card group: It’s dark gray on the main deck, or brown on the sideboard.</p>
		<p>Whenever you start typing letters of a card’s name into the card adder’s text box, a small list of card suggestions based on those initial letters will appear. Entering names in the card adder is case insensitive. (It doesn’t matter whether letters are uppercase or lowercase.)</p>
		<p>When you submit a card name, if that card has been printed in multiple <i>Magic</i> sets, then the card from the latest released set will be retrieved. Only a valid name of a <i>Magic</i> card can add the card to your deck. If a name you submit is invalid, the app will notify you of the error.</p>
		<p>To add any <i>Magic</i> card at random (among Modern-legal cards), submit the code “<strong>#random</strong>” as the name in the card adder. Your web browser may also show this as a selectable option when the card adder’s text box has focus.</p>
		<p>The card adder won’t add a card of a certain name when it already exists in the card list. (If you want to have duplicates of a card, increase its <a href="#m-card-quantities">quantity</a> instead.)</p>
		<p>A newly added card is always put at the bottom of the card list. (You can use the <a href="#m-card-sorter">card sorter</a> afterward to rearrange the newly added cards with the rest.)</p>
	</section>
</template>
