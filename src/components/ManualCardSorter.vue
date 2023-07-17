<template>
	<section id="m-card-sorter">
		<h4>Card Sorter</h4>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-sorter.jpg" width="350" height="185"
				alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
		</p>
		<p>This section has a drop-down menu with options for instantly sorting all the cards in the <a href="#m-card-list">card list</a> by a certain attribute. The options and their effects include the following:</p>
		<ul>
			<li>
				<h5>Name</h5>
				<p>Sorts alphabetically by name.</p>
			</li>
			<li>
				<h5>Mana Color</h5>
				<p>Sorts between monocolored, multicolored, and colorless. Among the monocolored, this sorts by mana color in <i>Magic</i>’s conventional order of them: white, blue, black, red, green. Among the colorless, this sorts between spells and lands.</p>
			</li>
			<li>
				<h5>Mana Value</h5>
				<p>Sorts from lowest to highest by mana value (a.k.a. converted mana cost).</p>
			</li>
			<li>
				<h5>Type</h5>
				<p>Sorts by type in the following order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</p>
			</li>
			<li>
				<h5>Subtype</h5>
				<p>Sorts alphabetically by subtype, and moves cards without subtypes to the bottom.</p>
			</li>
			<li>
				<h5>Supertype</h5>
				<p>Sorts alphabetically by supertype, and moves cards without supertypes to the bottom. (Examples of supertypes are “basic” [on land cards] and “legendary.”)</p>
			</li>
			<li>
				<h5>Rarity</h5>
				<p>Sorts from highest to lowest by level of rarity.</p>
			</li>
			<li>
				<h5>P/T Sum</h5>
				<p>Sorts from greatest to least by “P/T sum,” which is a number equal to adding the power and toughness (P/T) of a card together. (For example, the P/T sum of a 3/2 creature is 5.) Among cards having the same P/T sums as each other, they’re sorted from greatest to least by power alone. Cards without the power and toughness characteristics are moved to the bottom.</p>
			</li>
			<li>
				<h5>Quantity</h5>
				<p>Sorts from largest to smallest by quantity.</p>
			</li>
		</ul>
		<p>The effects of sorting cards are cumulative, with the most recently selected sorting attribute given highest priority. For example, let’s say you first sort by rarity, and then by type. In effect, the cards are sorted mainly by type, and within each sorted cluster of types (the creatures, the sorceries, etc.), the cards are sorted by rarity.</p>
		<p>For easier skimming of the card list, certain sorting options put small gaps between each sorted cluster of cards. These options are mana value, type, subtype, supertype, and P/T sum.</p>
		<p>Whenever you select an option in the card sorter, it sorts cards for only the currently <a href="#m-decks-menu">active deck</a>, in both its main and sideboard <a href="#m-group-toggler">card groups</a>.</p>
		<p>Whenever you <a href="#m-card-adder">add a new card</a>, or whenever you <a href="#m-card-quantities">adjust a card’s quantity</a> while the card sorter is set to the quantity option, the card sorter automatically resets to “(Unsorted),” and any gaps between sorted clusters in the card list are removed.</p>
		<p>Name is the most distinguishable card attribute to sort by. This is because every card in a card list must have a unique name, which isn’t necessarily true for the other attributes.</p>
	</section>
</template>
