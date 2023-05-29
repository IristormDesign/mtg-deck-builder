<template>
	<section id="m-card-list">
		<h4>Card List</h4>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-card-list.jpg 1x, @/img/manual-card-list-2x.jpg 1.5x"
				src="@/img/manual-card-list.jpg" width="658" height="339"
				alt="Snippet of card list" title="Screenshot" loading="lazy" />
		</p>
		<p>This section shows the list of <i>Magic</i> cards belonging to your currently open deck and to the currently <a href="#m-group-toggler">selected card group</a> of the deck.</p>
		<p>Each card of a particular name in the list is represented by a wide button, which you can click on to <a href="#m-card-image">view the card’s image</a>.</p>
		<p>Labeled on each card button are the following card characteristics:</p>
		<ul>
			<li>Name</li>
			<li>Mana cost (if any)</li>
			<li>Type, including supertype and/or subtype (if any)</li>
			<li>Rarity – The name and symbol of each rarity level are the following:
				<ul>
					<li>Common – black “C”</li>
					<li>Uncommon – silver “U”</li>
					<li>Rare – golden “R”</li>
					<li>Mythic rare – orange “M”</li>
					<li>Special – purple “S”</li>
				</ul>
			</li>
		</ul>
		<p>Double-faced cards include the characteristics of both faces with a slash in between.</p>
		<p>The surface color of each card button represents that card’s mana colors. (For example, mono-green spells have green card buttons.) Moreover, the color of card buttons for multicolored spells is gold, for colorless spells is gray, and for lands is brown.</p>
	</section>
</template>
