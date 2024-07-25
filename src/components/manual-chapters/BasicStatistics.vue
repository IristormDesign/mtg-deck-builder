<template>
	<section id="m-basic-statistics">
		<h5>Basic Statistics</h5>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
				src="@/img/manual-deck-statistics.jpg" width="658" height="63"
				alt="Screenshot of basic statistics section" title="Screenshot" loading="lazy" />
		</p>
		<p>In the <a href="#m-deck-page-header">deck page header</a>, the basic statistics section shows some data about how your currently <a href="#m-deck-menu">open deck</a> is composed.</p>
		<p>All but one of these statistics regard your deck’s main <a href="#m-card-groups">card group</a> alone (not also its sideboard). Whenever you modify your deck, the statistics immediately update as needed.</p>
		<p>The basic statistics section displays the following deck information:</p>
		<ul>
			<li>
				<p><strong>Mana Colors</strong> – This shows the <a href="#m-symbols">symbols</a> of whichever of the five mana colors are required for mana costs among spells in the main card group. The colors are ordered from most to least frequent. If a color is equal in number to another, then they’re ordered by <i>Magic</i>’s conventional order: white, blue, black, red, green.</p>
			</li>
			<li>
				<p><strong>Average Mana Value</strong> – This shows a number equal to the mean of the mana value among spells in the main card group. This calculation includes card names’ quantities and excludes land cards. (Mana value is also known by the older term “converted mana cost.”)</p>
			</li>
			<li>
				<p><strong>Last Edit</strong> – This shows the date and time of when your deck had been most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card name</a>, <a href="#m-card-quantities">changing a card name’s quantity</a>, <a href="#m-card-stars">starring a card name</a>, and <a href="#m-deck-name">renaming the deck</a> count as edits. Last Edit involves both the main and sideboard card groups.</p>
			</li>
			<li>
				<p><strong>Card Names</strong> – This shows a number equal to the count of distinct card names in the main card group. (Having a plural quantity of cards of a certain name doesn’t increase the count of names.)</p>
			</li>
			<li>
				<p><strong>Total Cards</strong> – This shows a number equal to the total cards in the main card group. A “⚠” (warning symbol) appears beside the number when the total is fewer than 60, which is the minimum limit by <i>Magic</i>’s standard <a href="#m-game-rules">game rules</a>; or when the total is close to but not exactly 100, which is the requirement by the Commander format rules.</p>
			</li>
		</ul>
		<p>Note that these basic statistics are only a small portion of all the statistics provided by MTG Deck Builder. For further data analysis of your deck, see the <a href="#m-more-stats">“More Statistics” mode</a>.</p>
	</section>
</template>
