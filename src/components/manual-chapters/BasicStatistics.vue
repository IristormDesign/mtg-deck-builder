<template functional>
	<section id="basic-statistics" key="basic-statistics">
		<h4>Basic Statistics</h4>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
				src="@/img/manual-deck-statistics.jpg" width="658" height="63"
				alt="Screenshot of basic statistics section" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>The <a href="#deck-page-header">deck page header</a>’s basic statistics section shows some data about how your currently <a href="#deck-menu">open deck</a> is composed.</p>
		<p>All but one of these statistics regard your deck’s main <a href="#card-groups">card group</a> alone (not also the sideboard). Also all but one of these statistics account for card names’s quantities. Whenever you modify your deck, the statistics immediately update as needed.</p>
		<p>The basic statistics section displays the following deck information:</p>
		<ul>
			<li>
				<p><strong>Mana Colors</strong> – This shows the symbols of whichever of the five mana colors are required for mana costs among spells in the main card group. The colors are ordered from most to least frequent in your deck. If a color is equally frequent to another, then they’re ordered by Wizards of the Coast’s conventional order of them: white, blue, black, red, green.</p>
			</li>
			<li>
				<p><strong>Average Mana Value</strong> – This shows the arithmetic mean of mana values among spells in the main card group. (Mana value is also known by the older term “converted mana cost.”)</p>
			</li>
			<li>
				<p><strong>Last Edit</strong> – This shows the date and time of when your deck was most recently modified (or created, if it’s a new deck). The actions of <a href="#card-adder">adding a new card name</a>, <a href="#card-quantities">changing a card name’s quantity</a>, <a href="#card-stars">starring a card name</a>, and <a href="#deck-name">renaming the deck</a> count as edits. Last Edit involves both card groups (main and sideboard).</p>
			</li>
			<li>
				<p><strong>Card Names</strong> – This shows the sum of distinct card names in the main card group. The sum doesn’t account for any plural quantities of card names.</p>
			</li>
			<li>
				<p><strong>Total Cards</strong> – This shows the sum of every card (including any repeated card names) in the main card group. A “⚠” (warning symbol) appears beside the number when the total is fewer than 60, which is the minimum limit for decks by <i>Magic</i>’s standard <a href="#game-rules">game rules</a>; or when the total is close to but not exactly 100, which is the requirement for decks in the Commander format.</p>
			</li>
		</ul>
		<p>Note that these basic statistics in the deck page header are only a small portion of all the statistics available to you in MTG Deck Builder. There are even more you can view in the <a href="#stats-analyzer">Stats Analyzer</a>.</p>
	</section>
</template>
