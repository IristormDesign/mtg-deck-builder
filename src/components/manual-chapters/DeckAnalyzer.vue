<template>
	<section id="m-deck-analyzer">
		<h3>Deck Analyzer</h3>
		<p>The Deck Analyzer is a <a href="#m-deck-page-modes">deck page mode</a> where you can inspect lots of data about how your deck is composed. While the <a href="#m-deck-page-header">deck page header</a> shows a few <a href="#m-basic-statistics">basic statistics</a>, the Deck Analyzer shows additional statistics that go further in depth.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of the Deck Analyzer mode" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>The page for the Deck Analyzer displays many data tables, each for a different statistical category regarding the cards in your deck’s main <a href="#m-card-groups">card group</a>. Some categories can comprise multiple subcategories, with their tables having a thick border line separating each subcategory.</p>
		<p>The following are the categories, along with any subcategories in parentheses:</p>
		<ul>
			<li>Colors of Spells (mono mana colors, mana color amounts per spell)</li>
			<li>Mana Color Symbols in Costs of Spells (basic color symbols, hybrid symbol)</li>
			<li>Mana Values of Spells (definite values, variable value)</li>
			<li>Supertypes</li>
			<li>Types</li>
			<li>Creature Subtypes</li>
			<li>Other Subtypes</li>
			<li>Rarities</li>
			<li>Keyword Abilities</li>
			<li>Power & Toughness (greatest/average/least P/T, variable P/T)</li>
			<li>Layouts</li>
		</ul>
		<p>For almost every category, their tables have the following columns:</p>
		<ul>
			<li>The first column displays the names of card attributes relevant to the category. Only the attributes that exist among cards in your deck are shown.</li>
			<li>The second column (“Ct.”) displays the counts of the attributes.</li>
			<li>The third column (“Percent”) displays the percentages of the attributes. The basis of the percentages, indicated on each table’s last row, varies among categories. In the majority of the categories, percentages are based on the total number of cards in your deck.</li>
		</ul>
		<p>The exception to the aforementioned table layout is the one for the “Power & Toughness” category, which has a table subsection with columns for power and toughness instead of count and percentage.</p>
		<p>In the table for most categories that shows card counts, rows are sorted by attributes’ counts from most to fewest. If multiple attributes have counts equal to each other, then their rows are sorted among each other alphabetically or in another fixed order. The exceptions are the tables for the “Mana Values of Spells” and “Rarities” categories, whose rows are always sorted in a fixed order regardless of their card counts, and all tables whenever a <a href="#m-statistics-filter">statistics filter</a> is on.</p>
		<p>In the “Color Symbols in Mana Costs of Spells” category, hybrid mana symbols are each counted as multiple basic mana symbols, and all Phyrexian mana symbols are counted as hybrid mana.</p>

		<statistics-filter />
	</section>
</template>

<script>
import StatisticsFilter from './StatisticsFilter.vue'

export default {
	components: { StatisticsFilter }
}
</script>
