<template>
	<section id="m-statistics-filter">
		<h4>Statistics Filter</h4>
		<p>There may be times in the <a href="#m-deck-analyzer">Deck Analyzer</a> when you want to examine a specific aspect of your deck instead seeing the overview of your whole deck. For those times, you can use a statistics filter, which narrows down the information shown to you based on any card attribute you choose.</p>
		<p>To turn on a filter in the Deck Analyzer, click the row of the <a href="#m-data-tables">data table</a> regarding the card attribute that you want the statistics to focus on. The rows that can activate filters are the ones with the attributes’ names colored orange instead of white.</p>
		<p>The exception to the way to turn on filters is in the “Power & Toughness” category’s greatest/median/least subsection, where you click a particular table cell instead of anywhere on a row.</p>
		<p>Whenever a filter is turned on, the following effects happen:</p>
		<ul>
			<li>Any data about your deck’s cards that doesn’t match the selected card attribute is temporarily hidden.</li>
			<li>For the table row relating to the filtered attribute, it appears highlighted blue with a dashed blue outline.</li>
			<li>At the top of the Deck Analyzer is a banner indicating whether a filter is active, and what certain card attribute (if any) is currently being filtered for.</li>
			<li>In each category, the numbers for the total counts and percentages update to count only the currently filtered card data.</li>
		</ul>
		<p>Only up to one filter can be active at a time. If you select a new filter when another filter has been active, then the current filter replaces (rather than adds upon) the previous filter.</p>
		<p>To turn off a filter, you can do any of the following actions:</p>
		<ul>
			<li>Click the table row of the currently filtered card attribute. (That row appears highlighted in blue.)</li>
			<li>From the filter banner, click the “Stop Filtering” button.</li>
			<li><a href="#m-keyboard-shortcuts">Press the <kbd>Esc</kbd> key</a>.</li>
		</ul>
	</section>
</template>
