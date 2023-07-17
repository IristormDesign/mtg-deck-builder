<template>
	<section id="m-card-list">
		<h4>Card List</h4>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-card-list.jpg 1x, @/img/manual-card-list-2x.jpg 1.5x"
				src="@/img/manual-card-list.jpg" width="658" height="339"
				alt="Snippet of card list" title="Screenshot" loading="lazy" />
		</p>
		<p>This section shows a list of the <i>Magic</i> cards belonging to the currently <a href="#m-group-toggler">selected card group</a> of your currently <a href="#m-decks-menu">open deck</a>.</p>
		<p>Each card of a particular name in the card list is represented by a wide button. Labeled on each button are characteristics of the card, including the following:</p>
		<ul>
			<li>Name</li>
			<li>Mana cost (if any)</li>
			<li>Type, including supertype and/or subtype (if any)</li>
			<li>Rarity</li>
		</ul>
		<p>For a card that’s double-faced or split, its button displays each characteristic of both faces with a “/” (slash) inserted between the two.</p>
		<p>You can click on any card button to <a href="#m-card-image">view that card’s image</a>.</p>
		<p>The surface color of each card button represents that card’s mana colors. For example, mono-green spells have green-colored buttons. Moreover, the color of card buttons for multicolored spells is gold, for colorless spells is gray, and for lands is brown.</p>
		<p>Card lists are populated by using the app’s <a href="#m-card-adder">card adder</a> function. You can also see the card lists of pre-made decks by importing <a href="#m-deck-data-files">deck data files</a>.</p>
	</section>
</template>
