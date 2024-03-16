<template>
	<section id="m-deck-statistics">
		<h5>Deck Statistics</h5>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
				src="@/img/manual-deck-statistics.jpg" width="658" height="63"
				alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
		</p>
		<p>The deck statistics section shows information about how your currently <a href="#m-deck-menu">open deck</a> is composed.</p>
		<p>All but one of these statistics are about the deck’s main <a href="#m-card-groups">card group</a> alone (not also the sideboard). Whenever you modify your deck, the statistics here immediately update as needed.</p>
		<p>The deck statistics section has the following subsections:</p>
		<ul>
			<li>
				<p><strong>Mana Colors</strong> – This shows the <a href="#m-symbols">symbols</a> of whichever of the five mana colors are required for mana costs among spells in your deck’s main card group. The colors are ordered from most to least frequent. If a color is equal in number to another, then they’re ordered by <i>Magic</i>’s conventional order: white, blue, black, red, green.</p>
			</li>
			<li>
				<p><strong>Average Mana Value</strong> – This shows a number equal to the mean of the mana value among spells in your deck’s main card group. This calculation includes card names’ quantities and excludes land cards. (Mana value is also known by the older term “converted mana cost.”)</p>
			</li>
			<li>
				<p><strong>Last Edit</strong> – This shows the date and time of when your deck had been most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card name</a>, <a href="#m-card-quantities">changing a card name’s quantity</a>, <a href="#m-card-stars">starring a card name</a>, and <a href="#m-deck-name">renaming the deck</a> count as edits in both the main and the sideboard groups of your deck.</p>
			</li>
			<li>
				<p><strong>Card Names</strong> – This shows a number equal to the count of card names in your deck’s main card group. (Having a plural quantity of any card name doesn’t increase the name count.)</p>
			</li>
			<li>
				<p><strong>Total Cards</strong> – This shows a number equal to the total cards in your deck’s main card group. A “⚠” (warning symbol) appears beside the number when the total is fewer than 60, which is the minimum limit by <i>Magic</i>’s standard <a href="#m-game-rules">game rules</a>; and when the total is close to but not exactly 100, which is the requirement by the Commander variant rules.</p>
			</li>
		</ul>
		<p>Note that these statistics in the <a href="#m-deck-pages">deck page</a> header are only a small portion of all the statistics provided by MTG Deck Builder. For further data analysis of your deck, check out the “<a href="#m-more-stats">More Statistics</a>” <a href="#m-deck-views">deck view</a>.</p>
	</section>
</template>
