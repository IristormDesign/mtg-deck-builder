<template>
	<section id="m-deck-statistics">
		<h4>Deck Statistics</h4>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
				src="@/img/manual-deck-statistics.jpg" width="658" height="63"
				alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
		</p>
		<p>The deck statistics section shows various information about your currently <a href="#m-deck-menu">open deck</a>. Most of these statistics are about the deck’s main <a href="#m-group-switch">card group</a> alone (not also the sideboard). Whenever you modify your deck, the statistics here immediately update as needed.</p>
		<p>The deck statistics section has the following subsections:</p>
		<ul>
			<li>
				<h5>Mana Colors</h5>
				<p>This shows <a href="#m-symbols">symbols</a> of whichever of the five mana colors are required for mana costs among spells in your deck’s main group.</p>
			</li>
			<li>
				<h5>Average Mana Value</h5>
				<p>This shows a number equal to the mean of the mana value among spells in your deck’s main group. This calculation includes cards’ quantities and excludes land cards. (Mana value is also known by the older term “converted mana cost.”)</p>
			</li>
			<li>
				<h5>Last Edit</h5>
				<p>This shows the date and time of when your deck had been most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card</a>, <a href="#m-card-quantities">changing a card’s quantity</a>, and <a href="#m-deck-name">renaming the deck</a> count as edits in both the main and the sideboard groups of your deck.</p>
			</li>
			<li>
				<h5>Card Names</h5>
				<p>This shows a number equal to the count of names of cards in your deck’s main group, ignoring duplicates of cards. (Having a plural quantity of any card doesn’t increase the deck’s count of card names.)</p>
			</li>
			<li>
				<h5>Total Cards</h5>
				<p>This shows a number equal to the total cards (including duplicates) in your deck’s main group. When the total is fewer than 60, which is the minimum limit according to <i>Magic</i>’s standard deck-building <a href="#m-game-rules">rules</a>, a warning symbol (⚠) appears beside the number.</p>
			</li>
			<li>
				<h5>More Stats</h5>
				<p>This has a button that you can click on to go to the <a href="#m-more-stats-pages">More Deck Statistics page</a> for your deck.</p>
			</li>
		</ul>
	</section>
</template>
