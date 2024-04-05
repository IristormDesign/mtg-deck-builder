<template>
	<section id="m-card-sorter">
		<h4>Card Sorter</h4>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-sorter.jpg" width="350" height="185"
				alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
		</p>
		<p>The card sorter (the section labeled “Sort cards by” in the <a href="#m-deck-editor">Deck Editor</a>) lets you instantly rearrange the order of all names in the <a href="#m-card-list">card list</a> in various ways.</p>
		<p>The card sorter has a drop-down menu providing several card attributes as options. The card names listed in both the main and sideboard <a href="#m-card-groups">groups</a> of your currently <a href="#m-deck-menu">open deck</a> are sorted according to the attribute you select.</p>
		<p>The sorting options and their effects include the following:</p>
		<ul>
			<li>
				<p><strong>Starred</strong> – Sorts between <a href="#m-card-stars">starred</a> and non-starred. This sorting option is hidden when no cards in your deck have a star.</p>
			</li>
			<li>
				<p><strong>Name</strong> – Sorts alphabetically by card name.</p>
			</li>
			<li>
				<p><strong>Mana Color</strong> – Sorts between monocolored, multicolored, and colorless. Monocolored cards are sorted by <i>Magic</i>’s conventional order of the mana colors: white, blue, black, red, green. Colorless cards are sorted between spells and lands.</p>
			</li>
			<li>
				<p><strong>Mana Value</strong> – Sorts from least to greatest by mana value (a.k.a. converted mana cost).</p>
			</li>
			<li>
				<p><strong>Supertype</strong> – Sorts alphabetically by supertype, and moves cards without supertypes to the bottom. (Examples of supertypes are “basic” [on land cards] and “legendary.”)</p>
			</li>
			<li>
				<p><strong>Type</strong> – Sorts by card type in this order: creatures, planeswalkers, battles, enchantments, artifacts, sorceries, instants, lands.</p>
			</li>
			<li>
				<p><strong>Subtype</strong> – Sorts alphabetically by subtype, and moves cards without subtypes to the bottom.</p>
			</li>
			<li>
				<p><strong>Rarity</strong> – Sorts from highest to lowest by level of rarity.</p>
			</li>
			<li>
				<p><strong>P/T Sum</strong> – Sorts from greatest to least by “P/T sum,” which is a number equal to adding together the power and toughness (P/T) of a card. (For example, the P/T sum of a 3/2 creature is 5.)</p>
				<p>Among cards having the same P/T sums as each other, they’re sorted from greatest to least by power alone. Cards without the power and toughness characteristics are moved to the bottom.</p>
			</li>
			<li>
				<p><strong>Quantity</strong> – Sorts from greatest to least by <a href="#m-card-quantities">quantity</a>.</p>
			</li>
		</ul>
		<p>The results of sorting are cumulative, with the most recently selected sorting attribute given highest priority. For example, let’s say you first sort by rarity, and then by type. In effect, the card names are sorted primarily by type, and within each sorted cluster of types (the creatures, the sorceries, etc.), the card names are sorted by rarity.</p>
		<p>For easier skimming of the card list, most sorting options insert small gaps between each sorted cluster of card names. The only sorting options that don’t insert gaps are for name, mana color, and rarity.</p>
		<p>The card sorter will reset its sorting option to “(None),” and any gaps between sorted clusters in the card list will be removed, under any of the following conditions:
			<ul>
				<li>Whenever you <a href="#m-card-adder">add a card name</a> to the list</li>
				<li>Whenever you adjust the quantity of a card name while the sorter is set to “Quantity”</li>
				<li>Whenever you star a card name while the sorter is set to “Starred”</li>
			</ul>
		</p>
		<p>Name is the most distinguishable card attribute to sort by. This is because every name in the card list on the Deck Editor must be unique, which isn’t necessarily true for the other attributes.</p>
	</section>
</template>
