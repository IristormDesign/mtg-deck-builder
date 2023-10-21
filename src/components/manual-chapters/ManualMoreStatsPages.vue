<template>
	<section id="m-more-stats-pages">
		<h3>“More Stats” Pages</h3>
		<p>When you click on the More Stats button in the <a href="#m-deck-statistics">deck statistics</a> section, you’re directed to your deck’s More Deck Statistics page, where you can review additional information about how your deck is composed.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of more deck statistics page" title="Screenshot" loading="lazy" />
		</p>
		<p>The More Deck Statistics page displays many data tables, each for a certain category of measurement. These categories are the following:</p>
		<ul>
			<li>Colors of Spells</li>
			<li>Mana Values of Spells (a.k.a. mana curve)</li>
			<li>Types</li>
			<li>Creature Subtypes</li>
			<li>Other Subtypes</li>
			<li>Rarities</li>
			<li>Keyword Abilities</li>
			<li>Power/Toughness</li>
			<li>Miscellaneous</li>
		</ul>
		<p>In the table for almost every category, each row indicates:</p>
		<ul>
			<li>The name of a certain property in the first column.</li>
			<li>The count (“CT.”) of cards of the given property in the second column.</li>
			<li>The percentage of cards of the given property from the total deck in the third column.</li>
		</ul>
		<p>The exception to having that table layout is the Power/Toughness category, which has columns for power and toughness instead of count and percentage.</p>
		<p>The Miscellaneous category tallies up cards that have any of the following characteristics:</p>
		<ul>
			<li><strong>Basic land</strong> – Cards of both the “land” type and “basic” supertype.</li>
			<li><strong>Legendary</strong> – Cards of the “legendary” supertype.</li>
			<li><strong>Monocolored</strong> – Cards of exactly one mana color.</li>
			<li><strong>Multicolored</strong> – Cards of two or more mana colors.</li>
			<li><strong>Variable cost</strong> – Cards using the letter X in their mana costs.</li>
			<li><strong>Variable P/T</strong> – Cards using a star symbol for their power or toughness.</li>
			<li><strong>Double-faced</strong> – Double-faced cards (they have a second card frame on their back side instead of the normal <i>Magic</i> card back) <em>or</em> split cards (they have two shrunken card frames on the front side).</li>
		</ul>
		<p>Single cards can be counted for multiple properties within a category. For example, a card that’s designated “artifact creature” in its type line is considered to be both a creature and an artifact to the Types category. As a result, the sum of all counts within a category could be greater than your deck’s total cards, and the sum of all percentages within a category could be greater than 100%.</p>
	</section>
</template>
