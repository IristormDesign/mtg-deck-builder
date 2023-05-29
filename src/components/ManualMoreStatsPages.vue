<template>
	<section id="m-more-stats-pages">
		<h3>“More Stats” Pages</h3>
		<p>Clicking on the More Stats button in the <a href="#m-deck-statistics">deck page’s header</a> will direct you to your deck’s More Deck Statistics page, where you can review additional information about the cards in your deck. This type of page displays tabular data in various categories of measurement.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of more deck statistics page" title="Screenshot" loading="lazy" />
		</p>
		<p>The statistics’ categories include the following:</p>
		<ul>
			<li>Colors of spells</li>
			<li>Mana values of spells (a.k.a. mana curve)</li>
			<li>Types</li>
			<li>Creature subtypes</li>
			<li>Other subtypes</li>
			<li>Rarities</li>
			<li>Keyword abilities</li>
			<li>Power/toughness</li>
			<li>Miscellaneous</li>
		</ul>
		<p>In the data table for almost every category, each row indicates:</p>
		<ul>
			<li>The name of a certain property in the first column.</li>
			<li>The count (“CT.”) of cards of the given property in the second column.</li>
			<li>The percentage of cards of the given property from the total deck in the third column.</li>
		</ul>
		<p>The exception to having that table layout is the Power/Toughness category, which has columns for power and toughness instead of count and percentage.</p>
		<p>The Miscellaneous category tallies up cards that have any of the following characteristics:</p>
		<ul>
			<li><strong>Basic land</strong> – Land cards that have the “basic” supertype.</li>
			<li><strong>Legendary</strong> – Cards that have the “legendary” supertype.</li>
			<li><strong>Monocolored</strong> – Cards that are exactly one mana color.</li>
			<li><strong>Multicolored</strong> – Cards that are two or more mana colors.</li>
			<li><strong>Variable cost</strong> – Cards whose mana costs include a letter X.</li>
			<li><strong>Variable P/T</strong> – Cards whose power or toughness (P/T) is a star symbol.</li>
			<li><strong>Double-faced</strong> – Cards that are double-faced (they have a second card frame on their back side instead of the normal <i>Magic</i> card back), <em>or</em> cards that are split (they have two shrunken card frames on one side).</li>
		</ul>
		<p>Single cards can be counted for multiple properties within a category. For example, a card designated “artifact creature” in its type line is considered to be both a creature and an artifact in the Types category table. As a result, the sum of all values of a category can equal a total count greater than your deck’s total cards and a combined percentage greater than 100%.</p>
	</section>
</template>
