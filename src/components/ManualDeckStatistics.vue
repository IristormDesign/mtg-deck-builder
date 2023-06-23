<template>
	<section id="m-deck-statistics">
		<h4>Deck Statistics</h4>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
				src="@/img/manual-deck-statistics.jpg" width="658" height="63"
				alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
		</p>
		<p>This section shows various information about your currently open deck, specifically about its main <a href="#m-group-toggler">card group</a>. Whenever you modify your deck, the statistics here immediately update as needed.</p>
		<p>The parts of the deck statistics section include the following:</p>
		<ul>
			<li>
				<h5>Using Colors</h5>
				<p>Shows the <a href="#m-symbols">symbols</a> of whichever of the five mana colors are required by mana costs among spells in your deck.</p>
			</li>
			<li>
				<h5>Average Mana Value</h5>
				<p>Shows a number equal to the mean of the mana value among spells in your deck. This calculation includes cards’ quantities and excludes land cards. (Mana value is also known by the older term “converted mana cost.”)</p>
			</li>
			<li>
				<h5>Last Edit</h5>
				<p>Shows the date and time of when your deck had been most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card</a>, <a href="#m-card-quantities">changing a card’s quantity</a>, and <a href="#m-deck-name">renaming the deck</a> count as edits.</p>
			</li>
			<li>
				<h5>Card Names</h5>
				<p>Shows a number equal to the count of names of cards in your deck, ignoring duplicates of cards. (Having a plural quantity of any card doesn’t increase the deck’s count of card names.)</p>
			</li>
			<li>
				<h5>Total Cards</h5>
				<p>Shows a number equal to the total cards (including duplicates) in your deck. When the total is fewer than 60, which is the minimum limit according to <i>Magic</i>’s standard deck-building rules, a warning symbol (⚠) appears beside the number.</p>
			</li>
			<li>
				<h5>More Stats</h5>
				<p>This is a button that you can click on to go to the <a href="#m-more-stats-pages">More Deck Statistics page</a>.</p>
			</li>
		</ul>
		<p>All of these statistics, except Last Edit, ignore cards in your deck’s sideboard.</p>
	</section>
</template>
