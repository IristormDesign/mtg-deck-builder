<template functional>
	<section id="m-statistics-filter" key="statistics-filter">
		<h4>Statistics Filter</h4>
		<p>When you’re in the <a href="#m-deck-analyzer">Deck Analyzer</a>, there may be times when you want to examine data about a specific aspect of your deck rather than data about your whole deck in general. For those times, you can use a statistics filter, which narrows down the information revealed to you based on any card attribute you choose.</p>
		<p>To turn on a filter in the Deck Analyzer, click the row of the <a href="#m-data-tables">data table</a> regarding the card attribute that you want the statistics to focus on. The rows that can activate filters are the ones with the attributes’ names colored orange instead of white.</p>
		<p>The exception to turning on and off filters is in the “Power & Toughness” category’s greatest/median/least subsection, where you click a particular cell of a row instead of any cell within a row.</p>
		<p>Whenever a filter is turned on, the following effects happen:</p>
		<ul>
			<li>Any data about your deck’s cards that doesn’t match the selected card attribute is temporarily hidden. All data will return when the filter is turned off.</li>
			<li>For the table row relating to the filtered attribute, it distinctly appears highlighted blue with a dashed blue outline.</li>
			<li>At the top of the Deck Analyzer is the filter notification banner, which indicates the certain card attribute, if any, that’s currently being filtered for.</li>
			<li>In each category, the numbers for the total counts and percentages update to count only your deck’s remaining cards after filtering.</li>
		</ul>
		<p>No more than one filter can be active at a time. If you turn on a filter while another filter is already on, then the new filter replaces (rather than adds upon) the previous filter.</p>
		<p>To turn <em>off</em> a filter, and thus restore all card data about your deck, you can do any of the following actions:</p>
		<ul>
			<li>From the filter notification banner, click the “Stop Filtering” button.</li>
			<li>Click the table row of the currently filtered card attribute (highlighted blue).</li>
			<li><a href="#m-keyboard-shortcuts">Press the <kbd>Esc</kbd> key</a>.</li>
		</ul>
	</section>
</template>
