<template functional>
	<section id="stats-analyzer" key="stats-analyzer">
		<h3>Stats Analyzer</h3>
		<p>The Stats Analyzer is a <router-link to="deck-pages#deck-page-modes">deck page mode</router-link> where you can inspect lots of data about your deck’s composition. If you’re curious about how many cards your deck has by a certain attribute, the Stats Analyzer is the mode to see.</p>
		<p>While the <router-link to="deck-page-header">deck page header</router-link> shows a few <router-link to="deck-page-header#basic-statistics">basic statistics</router-link> about your deck, the Stats Analyzer mode shows additional statistics that go much further in depth.</p>
		<p>To set the <router-link to="deck-pages">deck page</router-link> to this mode, click the “Stats Analyzer” tab in the <router-link to="deck-page-header#mode-menu">mode menu</router-link>, or <router-link to="keyboard-shortcuts">press the <kbd>2</kbd> key</router-link> (while on the deck page).</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
				src="@/img/manual-more-stats-page.jpg" width="530" height="441"
				alt="Snippet of the Stats Analyzer mode" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>The Stats Analyzer contains two major parts: the array of <a href="#data-tables">data tables</a> and the <a href="#data-filter">data filter</a>.</p>

		<section id="data-tables">
			<h4>Data Tables</h4>
			<p>The page for the <a href="#stats-analyzer">Stats Analyzer</a> displays many data tables. Each table is for a different statistical category about the cards in your deck’s main card group. Some categories can have subcategories, with their tables having a thick border line separating each subcategory.</p>
			<p>The following are the categories, with any subcategories in parentheses:</p>
			<ul>
				<li>Names</li>
				<li>Colors of Spells (mana colors, mana color amounts per spell)</li>
				<li>Mana Color Symbols in Costs of Spells (basic color symbols, hybrid symbol)</li>
				<li>Mana Values of Spells (defined values, variable value)</li>
				<li>Supertypes</li>
				<li>Types</li>
				<li>Creature Subtypes</li>
				<li>Other Subtypes</li>
				<li>Rarities</li>
				<li>Producible Mana Colors</li>
				<li>Keyword Abilities</li>
				<li>Power & Toughness (greatest/median/least, variable)</li>
				<li>Layouts</li>
				<li>Starred</li>
			</ul>
			<p>For almost every category, their tables have the following columns:</p>
			<ul>
				<li>
					<p>The first column displays the names of card attributes relevant to the category. Only the attributes that exist among cards in your deck are shown.</p>
				</li>
				<li>
					<p>The second column (“Ct.”) displays the counts of the attributes.</p>
				</li>
				<li>
					<p>The third column (“Percent”) displays the percentages of the attributes. The basis of a table’s percentages, indicated on each table’s last row, varies between categories. The majority of the categories’ percentages are based on the total number of cards in your deck.</p>
				</li>
			</ul>
			<p>The exception to the aforementioned table layout is the one for the Power & Toughness category, which has a table subsection with columns for power and toughness instead of for count and percentage.</p>
			<p>In the table for most categories that shows card counts, rows are sorted by attributes’ counts from most to fewest. If multiple attributes have counts equal to each other, then their rows are sorted among each other alphabetically or in another fixed order. The exceptions are the tables for the “Mana Values of Spells” and “Rarities” categories, whose rows are always sorted in a fixed order regardless of their card counts.</p>
			<p>Be aware that the Stats Analyzer’s tables are limited to a certain maximum height. This means it’s possible for a table to have so many rows that it can’t show all of them at once. In such a case, a scrollbar will appear beside the table, letting you scroll hidden rows into the table’s visible area.</p>
		</section>

		<section id="data-filter">
			<h4>Data Filter</h4>
			<p>When you’re in the <a href="#stats-analyzer">Stats Analyzer</a>, you may sometimes want to examine statistics about a specific aspect of your deck rather than about your deck as a whole. For those times, you can use a data filter, which narrows down the statistics presented to you based on any card attribute you choose.</p>
			<p>To turn on a data filter in the Stats Analyzer, click the row of the <a href="#data-tables">table</a> regarding the card attribute that you want the statistics to focus on. The rows that can activate filters are the ones with the attributes’ names colored orange instead of white.</p>
			<p>The exception to toggling filters is the table for the Power & Toughness category’s greatest/median/least subsection, where you must click a particular cell on a row instead of just any cell on a row.</p>
			<p>When a filter is on, the following effects happen:</p>
			<ul>
				<li><p>Any data about your deck that doesn’t match the selected card attribute is temporarily hidden. All data will return once the filter is turned off.</p></li>
				<li><p>For the table row relating to the filtered attribute, it distinctly appears highlighted yellow with a bright orange dashed outline.</p></li>
				<li><p>At the top of the Stats Analyzer is the filter notification banner. It indicates the specific attribute that’s currently being filtered for, if any.</p></li>
				<li><p>In each statistical category, the numbers for the total counts and percentages update to count only your deck’s remaining cards after filtering.</p></li>
				<li><p>No more than one filter can be active at a time. If you turn on a filter while another is already on, then the new filter replaces (rather than adds upon) the prior one.</p></li>
			</ul>
			<p>To turn <em>off</em> a filter, thus restoring the complete statistics about your deck, do any one of the following actions:</p>
			<ul>
				<li>On the filter notification banner, click the Stop Filtering button.</li>
				<li>Click the table row of the currently filtered card attribute, which is highlighted yellow.</li>
				<li><router-link to="keyboard-shortcuts">Press the <kbd>Esc</kbd> key</router-link>.</li>
			</ul>
		</section>
	</section>
</template>
