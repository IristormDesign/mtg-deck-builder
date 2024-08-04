<template>
	<section id="m-more-stats">
		<h3>More Statistics</h3>
		<p>While the <a href="#m-deck-page-header">deck page header</a> shows you a few <a href="#m-basic-statistics">basic statistics</a> about your deck, the “More Statistics” <a href="#m-deck-page-modes">deck page mode</a> shows you an even greater array of information.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of more basic statistics page" title="Screenshot" loading="lazy" />
		</p>
		<p>In the More Statistics mode, the page displays many data tables for various statistical categories about the cards in your deck’s main <a href="#m-card-groups">card group</a>. The categories are the following:</p>
		<ul>
			<li>Colors of Spells</li>
			<li>Mana Color Symbols</li>
			<li>Mana Values of Spells (a.k.a. mana curve)</li>
			<li>Supertypes</li>
			<li>Types</li>
			<li>Creature Subtypes</li>
			<li>Other Subtypes</li>
			<li>Rarities</li>
			<li>Keyword Abilities</li>
			<li>Power & Toughness</li>
			<li>Layouts</li>
		</ul>
		<p>For almost every category, their tables have the following columns:</p>
		<ul>
			<li>The first column displays the names of card attributes relevant to the category. Only the attributes that exist among cards in your deck are shown.</li>
			<li>The second column (“Ct.”) displays the counts of the attributes.</li>
			<li>The third column (“Percent”) displays the percentages of the attributes. The basis of the percentages, indicated on each table’s last row, varies among categories. In the majority of the categories, percentages are based on the total number of cards in your deck.</li>
		</ul>
		<p>The exception to the aforementioned table layout is the one for the “Power & Toughness” category, which has a table subsection with columns for power and toughness instead of count and percentage, and also lacks the row for percentage basis.</p>
		<p>In the table for most categories that shows card counts, rows are sorted by attributes’ counts from most to fewest. If multiple attributes have counts equal to each other, then their rows are sorted among each other alphabetically or in another fixed order. The exceptions are the tables for the “Mana Values of Spells” and “Rarities” categories, whose rows are always sorted in a fixed order regardless of their card counts.</p>
		<p>In the “Mana Color Symbols” category, generic mana symbols and mana symbols in cards’ abilities are ignored. Hybrid mana symbols are each counted as multiple basic mana symbols. All Phyrexian mana symbols are counted as hybrid mana.</p>
	</section>
</template>
