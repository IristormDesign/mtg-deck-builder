<template functional>
	<section id="statistics-filter" key="statistics-filter">
		<h4>Statistics Filter</h4>
		<p>At times when you’re in the <a href="#deck-analyzer">Deck Analyzer</a>, you may want to examine statistics about a specific aspect of your deck rather than about your whole deck in general. For those times, you can use a statistics filter, which narrows down the data presented to you based on any card attribute you choose.</p>
		<p>To turn on a filter in the Deck Analyzer, click the row of the <a href="#data-tables">data table</a> regarding the card attribute that you want the statistics to focus on. The rows that can activate filters are the ones with the attributes’ names colored orange instead of white.</p>
		<p>The exception to toggling filters is the table for the “Power & Toughness” category’s greatest/median/least subsection, where you must click a particular cell on a row instead of just any cell on a row.</p>
		<p>When a filter is on, the following effects happen:</p>
		<ul>
			<li>Any data about your deck that doesn’t match the selected card attribute is temporarily hidden. All data will return once the filter is turned off.</li>
			<li>For the table row relating to the filtered attribute, it distinctly appears highlighted blue with a bright blue dashed outline.</li>
			<li>The filter notification banner, which is at the top of the Deck Analyzer, indicates the specific attribute that’s currently being filtered for, if any.</li>
			<li>In each statistic category, the numbers for the total counts and percentages update to count only your deck’s remaining cards after filtering.</li>
		</ul>
		<p>No more than one filter can be active at a time. If you turn on a filter while another filter is already on, then the new filter replaces (rather than adds upon) the prior one.</p>
		<p>To turn <em>off</em> a filter, thus restoring the complete statistics about your deck, do any one of the following actions:</p>
		<ul>
			<li>On the filter notification banner, click the “Stop Filtering” button.</li>
			<li>Click the currently filtered card attribute’s table row (highlighted blue).</li>
			<li><a href="#keyboard-shortcuts">Press the <kbd>Esc</kbd> key</a>.</li>
		</ul>
	</section>
</template>
