<template>
	<section id="m-card-list">
		<h4>Card List</h4>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-card-list.jpg 1x, @/img/manual-card-list-2x.jpg 1.5x"
				src="@/img/manual-card-list.jpg" width="658" height="339"
				alt="Snippet of card list" title="Screenshot" loading="lazy" />
		</p>
		<p>The card list section shows a list of the <i>Magic</i> cards belonging to the currently <a href="#m-group-switch">selected card group</a> of your currently <a href="#m-decks-menu">open deck</a>.</p>
		<p>In the list, each card of a particular name is represented by a wide button, and each button is labeled with the following characteristics of the card:</p>
		<ul>
			<li>Name</li>
			<li>Mana cost (if any)</li>
			<li>Type, including supertype and/or subtype (if any)</li>
			<li>Rarity</li>
		</ul>
		<p>For a card that’s double-faced or split, its button displays the characteristics of both faces with a “/” (slash) inserted in between.</p>
		<p>You can click on any card button to <a href="#m-card-image">view that card’s image</a>.</p>
		<p>The color of each card button’s surface represents that card’s mana colors. For example, the button color for mono-green spells is green. Moreover, the button color for multicolored spells is gold, for colorless spells is gray, and for lands is brown.</p>
		<p>Card lists are populated by the <a href="#m-card-adder">card adder</a>.</p>
	</section>
</template>
