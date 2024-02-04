<template>
	<section id="m-card-sorter">
		<h4>Card Sorter</h4>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-sorter.jpg" width="350" height="185"
				alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
		</p>
		<p>The card sorter (the section labeled “Sort Cards by”) has a drop-down menu with options for instantly sorting all the card names in the <a href="#m-card-list">card list</a> by a particular attribute.</p>
		<p>Whenever you select an option in the card sorter, it sorts card names for only the currently <a href="#m-deck-menu">active deck</a>, in both its main and sideboard <a href="#m-group-switch">groups</a>.</p>
		<p>The options and their effects include the following:</p>
		<ul>
			<li>
				<h5>Starred</h5>
				<p>Sorts between <a href="#m-card-stars">starred</a> and non-starred. This sorting option is hidden whenever your deck has no starred card names.</p>
			</li>
			<li>
				<h5>Name</h5>
				<p>Sorts alphabetically by name.</p>
			</li>
			<li>
				<h5>Mana Color</h5>
				<p>Sorts between monocolored, multicolored, and colorless. Monocolored cards are sorted among each other in <i>Magic</i>’s conventional order of the mana colors: white, blue, black, red, green. Colorless cards are sorted among each other between spells and lands.</p>
			</li>
			<li>
				<h5>Mana Value</h5>
				<p>Sorts from least to greatest by mana value (a.k.a. converted mana cost).</p>
			</li>
			<li>
				<h5>Type</h5>
				<p>Sorts by card type in the following order: creatures, planeswalkers, battles, enchantments, artifacts, sorceries, instants, lands.</p>
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
				<p>Sorts from greatest to least by level of rarity.</p>
			</li>
			<li>
				<h5>P/T Sum</h5>
				<p>Sorts from greatest to least by “P/T sum,” which is a number equal to adding together the power and toughness (P/T) of a card. (For example, the P/T sum of a 3/2 creature is 5.) Among cards having the same P/T sums as each other, they’re sorted from greatest to least by power alone. Cards without the power and toughness characteristics are moved to the bottom.</p>
			</li>
			<li>
				<h5>Quantity</h5>
				<p>Sorts from greatest to least by quantity.</p>
			</li>
		</ul>
		<p>The effects of sorting are cumulative, with the most recently selected sorting attribute given highest priority. For example, let’s say you first sort by rarity, and then by type. In effect, the card names are sorted mainly by type, and within each sorted cluster of types (the creatures, the sorceries, etc.), the card names are sorted by rarity.</p>
		<p>For easier skimming of the card list, most sorting options insert small gaps between each sorted cluster of card names. The only sorting options that don’t insert gaps are the ones for name, mana color, and rarity.</p>
		<p>The card sorter will reset to “(None),” and any gaps between sorted clusters in the list are removed, under the following conditions:
			<ul>
				<li>Whenever you <a href="#m-card-adder">add a new card name</a> to the list</li>
				<li>Whenever you <a href="#m-card-quantities">adjust the quantity</a> of a card name while the card sorter is set to the quantity option</li>
				<li>Whenever you star a card name while the card sorter is set to the starred option</li>
			</ul>
		</p>
		<p>Name is the most distinguishable card attribute to sort by. This is because every name in the card list must be unique, which isn’t necessarily true for the other attributes.</p>
	</section>
</template>
