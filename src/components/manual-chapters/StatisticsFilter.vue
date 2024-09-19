<template>
	<section id="m-statistics-filter">
		<h4>Statistics Filter</h4>
		<p>In the <a href="#m-deck-analyzer">Deck Analyzer</a>, you can use a statistics filter to narrow down the data shown to you based on a certain card attribute you choose. You may find filters helpful at times when you want to examine specific aspects of your deck instead of the overview of your whole deck.</p>
		<p>To turn on a filter, click the row of the <a href="#m-data-tables">table</a> regarding the card attribute that you want the statistics to focus on. The rows that can activate filters are the ones with the attributes’ names colored orange (instead of white).</p>
		<p>Whenever a filter is turned on, the following effects happen:</p>
		<ul>
			<li>Any data about your deck that doesn’t match the selected card attribute is temporarily hidden.</li>
			<li>For the table row relating to the filtered attribute, it appears highlighted blue with a dashed blue outline.</li>
			<li>At the top of the Deck Analyzer is a banner that indicates whether a filter is active, and which specific card attribute (if any) is currently filtered for.</li>
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
