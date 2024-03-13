<template>
	<section id="m-more-stats">
		<h3>More Statistics View</h3>
		<p>While the <a href="#m-deck-pages">deck page</a>’s header shows a few <a href="#m-deck-statistics">basic statistics</a> about your deck, the “More Statistics” <a href="#m-deck-views">deck view</a> shows an even greater variety of information. To access this view, click the “More Statistics” link in the deck views menu.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of more deck statistics page" title="Screenshot" loading="lazy" />
		</p>
		<p>The More Statistics view displays many data tables, each for a certain category regarding your deck’s cards. The categories are the following:</p>
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
		<p>In the table for almost every category, each row indicates:</p>
		<ul>
			<li>The name of a certain property in the first column.</li>
			<li>The count (“CT.”) of cards of the given property in the second column.</li>
			<li>The percentage of cards of the given property from the total deck in the third column.</li>
		</ul>
		<p>The exception to having that table layout is the power/toughness category, which has columns for power and toughness instead of count and percentage.</p>
		<p>The miscellaneous category tallies up cards that have any of the following characteristics:</p>
		<ul>
			<li><strong>Basic land</strong> – Cards of both the “land” type and “basic” supertype.</li>
			<li><strong>Legendary</strong> – Cards of the “legendary” supertype.</li>
			<li><strong>Monocolored</strong> – Cards of exactly one mana color.</li>
			<li><strong>Multicolored</strong> – Cards of two or more mana colors.</li>
			<li><strong>Variable cost</strong> – Cards using the letter X in their mana costs.</li>
			<li><strong>Variable P/T</strong> – Cards using a star symbol for their power or toughness.</li>
			<li><strong>Double-faced</strong> – Double-faced cards (they have a second card frame on their back side instead of the normal <i>Magic</i> card back) <em>or</em> split cards (they have two shrunken card frames on the front side).</li>
		</ul>
		<p>Single cards can be counted multiple times for different properties within a category. For example, if a card is designated “artifact creature” in its type line, then it’s counted as both an artifact and a creature in the types category. As a result, the sum of all counts in a category could be greater than your deck’s total cards, and the sum of all percentages in a category could be greater than 100%.</p>
		<p>All statistics in the More Statistics view consider the main <a href="#m-group-switch">card group</a> only, not the sideboard.</p>
	</section>
</template>
