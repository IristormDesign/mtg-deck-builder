<template functional>
	<section id="card-sorter" key="card-sorter">
		<h4>Card Sorter</h4>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-sorter.jpg" width="350" height="185"
				alt="Snippet of card sorter" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>The card sorter is a tool that lets you instantly rearrange the order of all card names in the <a href="#card-list">card list</a> in various ways you can choose. It appears in the <a href="#list-editor">List Editor</a> in the section labeled “Sort cards by.”</p>
		<p>The card sorter has a dropdown menu providing you several kinds of card attributes as options. Select an attribute to have your deck’s card names sorted according to that attribute. Sorting affects both the main and sideboard <a href="#card-groups">groups</a> of your currently <a href="#deck-menu">open deck</a> (but not other decks you may have).</p>
		<p>The card sorter’s options and their effects are the following:</p>
		<ul>
			<li>
				<p><strong>Starred</strong> – Sorts between <a href="#card-stars">starred</a> and non-starred. If your deck has no card names with a star, then this sorting option is hidden.</p>
			</li>
			<li>
				<p><strong>Name</strong> – Sorts alphabetically by card name.</p>
			</li>
			<li>
				<p><strong>Mana color</strong> – Sorts between monocolored, multicolored, and colorless. Monocolored cards are sorted by Wizards of the Coast’s conventional order of the mana colors: white, blue, black, red, green. Colorless cards are sorted between spells and lands.</p>
			</li>
			<li>
				<p><strong>Mana value</strong> – Sorts from least to greatest by mana value (a.k.a. converted mana cost). Cards of mana value 0 are sorted between lands and spells.</p>
			</li>
			<li>
				<p><strong>Supertype</strong> – Sorts alphabetically by first-indicated supertype, and moves cards without supertypes to the bottom. (Common supertypes are “basic” [on land cards] and “legendary.”)</p>
			</li>
			<li>
				<p><strong>Type</strong> – Sorts by card type in this order: creatures, planeswalkers, battles, enchantments, artifacts, sorceries, instants, lands.</p>
			</li>
			<li>
				<p><strong>First subtype</strong> – Sorts alphabetically by first-indicated subtype, and moves cards without subtypes to the bottom.</p>
			</li>
			<li>
				<p><strong>Last subtype</strong> – Sorts alphabetically by last-indicated subtype, and moves cards without subtypes to the bottom.</p>
			</li>
			<li>
				<p><strong>Rarity</strong> – Sorts from highest to lowest by level of rarity.</p>
			</li>
			<li>
				<p><strong>P/T sum</strong> – Sorts from greatest to least by “P/T sum,” which is a number equal to combining the power and toughness (P/T) numbers of a card. (For example, the P/T sum of a 3/2 creature is 5.) Among cards having the same P/T sums as each other, they’re sorted by power alone from greatest to least. Cards without the power and toughness attribute are moved to the bottom.</p>
			</li>
			<li>
				<p><strong>Quantity</strong> – Sorts from greatest to least by card name <a href="#card-quantities">quantity</a>.</p>
			</li>
		</ul>
		<p>The results of sorting are cumulative, with the most recently selected sorting attribute given highest priority. For example: Let’s say you first sort by rarity, and next sort by type. As the result, the card names are sorted primarily by type, and within each sorted cluster of types (the creatures, the sorceries, etc.), the card names are sorted by rarity.</p>
		<p>For easier skimming of the card list, every sorting option, except for name, inserts small gaps between each sorted cluster of card names.</p>
		<p>Under certain conditions, the card sorter’s sorting option resets to “(Unsorted),” and any gaps in the card list between sorted clusters disappear. Those conditions happen whenever you do any of the following actions:
			<ul>
				<li><a href="#card-adder">Add a card name</a> to the list</li>
				<li>Change the quantity of a card name while the sorter is set to “Quantity”</li>
				<li>Star a card name while the sorter is set to “Starred”</li>
			</ul>
		</p>
		<p>Name is the most distinguishable card attribute to sort by. This is because every name in the List Editor’s card list must be unique, which isn’t necessarily true for the other attributes.</p>
		<p>To show or hide the card sorter’s menu via a <a href="#keyboard-shortcuts">keyboard shortcut</a>, press <kbd>Q</kbd>. When you use this shortcut to show the menu, if the card sorter isn’t currently visible within your web browser’s window, then the page automatically scrolls it into view.</p>
	</section>
</template>
