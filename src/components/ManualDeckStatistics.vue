<template>
	<section id="m-deck-statistics">
		<h4>Deck Statistics</h4>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
				src="@/img/manual-deck-statistics.jpg" width="658" height="63"
				alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
		</p>
		<p>This section displays various statistics about your currently open deck, specifically about its main <a href="#m-group-toggler">card group</a>. Whenever you modify the deck, the statistics here immediately update as needed.</p>
		<p>The parts of the deck statistics section include the following:</p>
		<ul>
			<li><strong>Using Colors</strong> – Shows the symbols of whichever of the five mana colors are required by mana costs among spells in your deck.</li>
			<li><strong>Average Mana Value</strong> – Shows a number equal to the mean of the mana value among spells in your deck. (Mana value is also known by the older term “converted mana cost.”) This calculation includes cards’ quantities and excludes land cards.</li>
			<li><strong>Last Edit</strong> – Shows the date and time of when your deck had been most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card</a>, <a href="#m-card-quantities">changing a card’s quantity</a>, and <a href="#m-deck-name">renaming the deck</a> count as modifications. (<a href="#m-card-image">Viewing another card</a>, <a href="#m-card-sorter">sorting cards</a>, and <a href="#m-group-toggler">switching card groups</a> don’t count.)</li>
			<li><strong>Card Names</strong> – Shows a number equal to the count of names of cards in your deck, ignoring duplicates of cards. (Having a plural quantity of any card doesn’t increase the deck’s count of card names.)</li>
			<li><strong>Total Cards</strong> – Shows a number equal to the total cards (including duplicates) in your deck. When the total is fewer than 60, which is the minimum limit according to <i>Magic</i>’s standard deck-building rules, a warning symbol (⚠) appears beside the number.</li>
			<li><strong>More Stats</strong> – This is a button you can click on to go to the <a href="#m-more-stats-pages">More Deck Statistics page</a>.</li>
		</ul>
		<p>All of these statistics, with the exception of Last Edit, ignore cards in your deck’s sideboard.</p>
	</section>
</template>
