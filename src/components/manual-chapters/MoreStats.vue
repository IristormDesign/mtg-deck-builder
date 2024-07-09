<template>
	<section id="m-more-stats">
		<h3>More Statistics Mode</h3>
		<p>While the <a href="#m-deck-page-header">deck page header</a> shows you a few <a href="#m-basic-statistics">basic statistics</a> about your deck, the “More Statistics” <a href="#m-deck-page-modes">deck page mode</a> shows you an even greater array of information.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of more basic statistics page" title="Screenshot" loading="lazy" />
		</p>
		<p>The page in the More Statistics mode displays many data tables for various statistical categories regarding your deck’s cards. The categories are the following:</p>
		<ul>
			<li>Colors of Spells</li>
			<li>Mana Color Symbols</li>
			<li>Mana Values of Spells (a.k.a. mana curve)</li>
			<li>Types</li>
			<li>Creature Subtypes</li>
			<li>Other Subtypes</li>
			<li>Rarities</li>
			<li>Keyword Abilities</li>
			<li>Power & Toughness</li>
			<li>Miscellaneous</li>
		</ul>
		<p>The table for almost every category has the following columns:</p>
		<ul>
			<li>The first column displays the names of certain card attributes that relate to the category.</li>
			<li>The second column (“Ct.”) displays the counts of the attributes among the cards in your deck’s main <a href="#m-card-groups">card group</a>.</li>
			<li>The third column (“Percent”) displays the percentages of the attributes. The basis of the percentages, indicated on each table’s last row, varies between categories. For the majority of them, the percentages are based on the total number of cards in your deck’s main card group.</li>
		</ul>
		<p>The exception to the aforementioned table layout is the table for the “Power & Toughness” category, which has columns for power and toughness instead of count and percentage, and also lacks the row for percentage basis.</p>
		<p>In the table for almost every category that shows card counts, rows are sorted by attributes’ counts from greatest to least. If multiple attributes have counts equal to each other, then their rows are sorted among each other alphabetically or in another predetermined order. The exception to this sorting method is the table for the “Mana Values of Spells” category, whose rows are always sorted by mana value from least to greatest.</p>
		<p>In the “Mana Color Symbols” category, generic mana symbols and any mana symbols in cards’ abilities are ignored. Hybrid mana symbols are each counted as multiple basic mana symbols.</p>
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
	</section>
</template>
