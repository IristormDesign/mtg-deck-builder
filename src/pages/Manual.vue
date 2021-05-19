<template>
	<article class="solo-message">
		<h2>User Manual</h2>
		<p>MTG Deck Builder by Iristorm Design is a web app on which you can create and manage your decks for the collectible strategy card game <a href="https://magic.wizards.com" target="_blank" rel="noopener noreferrer"><i>Magic: The Gathering</i></a>. This article explains how to use this app.</p>

		<p><em>There are no screenshots here yet, but they’ll be coming soon!</em></p>

		<h3>App Header</h3>
		<p>The app’s header (the horizontal bar at the top) appears on any page of the app. The most important buttons on there are the two orange ones:</p>
		<ul>
			<li>
				<p><strong>Create Deck</strong>: When you click this button, a prompt appears asking you to enter a name for your new deck, and then you’ll be taken to the page for that deck. If you give a name that another deck in the app already has, you’ll be asked to give a different name instead.</p>
			</li>
			<li>
				<p><strong>Open Deck</strong>: When you click this button, a menu will appear with an alphabetically ordered list of the names of your decks stored in the app that aren’t currently open. Click any deck name in the list to open that deck’s page. (If you’ve deleted all decks in the app, the Open Deck button will be temporarily disabled.)</p>
			</li>
		</ul>

		<h3>Deck Pages</h3>
		<p>Deck pages are where you view and edit the contents of your <i>Magic</i> decks, the main focus of MTG Deck Builder. Every deck you have in the app has its own deck page, which contains the following components:</p>
		<ol>
			<li>
				<h4>Deck Name</h4>
				<p>You can click this to rename the deck to something else.</p>
			</li>
			<li>
				<h4>Deck Statistics</h4>
				<p>This section displays various statistics about the deck, and they’ll update themselves whenever you modify the deck. The statistics include:</p>
				<ol>
					<li><strong>Using Colors</strong>: Indicates which of any of the five mana colors are required by casting costs in the deck. The symbols of the mana colors are represented as their initial letters instead of their usual graphical symbols—except for blue mana, which, in following <i>Magic</i> writing convention, is abbreviated as “U” rather than “B” (which is black mana’s abbreviation).</li>
					<li><strong>Average Conv. Mana Cost</strong>: Indicates the average converted mana cost among all cards that are spells (non-lands) in the deck. The calcuation does involve cards’ quantities.</li>
					<li><strong>Last Edited</strong>: Indicates the date and time when the deck was most recently modified. A modification counts as adding a new card to the deck, changing a card’s quantity, renaming the deck, and creating a deck. (Viewing another card and sorting cards don’t count as modifications.)</li>
					<li><strong>Total Cards</strong>: Indicates the deck’s total number of cards. If a deck contains fewer than 60 cards—which is the minimum limit a deck may have according to <i>Magic</i>’s standard rules—then a warning symbol appears beside the number.</li>
				</ol>
			</li>
			<li>
				<h4>Card Image</h4>
				<p>This is an image of the last selected card. You can click on the image which will take you to that card’s page on Scryfall for additional information. (<a href="https://scryfall.com" target="_blank" rel="noopener noreferrer">Scryfall</a> is an advanced database and search engine for <i>Magic</i> cards, and it provides the card images and data for MTG Deck Builder.)</p>
			</li>
			<li>
				<h4>List of Card Buttons</h4>
				<p>Each button in this list represents a card in the deck. You can click on one to have that card displayed in the card image section.</p>
				<p>Labeled on each card button are the card’s name, mana cost (if any), type (and subtype, if any), and rarity. Double-faced cards include the characteristics of both faces with a slash in between.</p>
				<p>Additionally, the surface color of each card button represents the mana colors of that card’s casting cost. (A button for a card that requires only green mana is colored green, for example.) Just like the frames depicted on <i>Magic</i> cards, the buttons for multicolored cards are golden yellow, and the buttons for colorless cards are gray.</p>
			</li>
			<li>
				<h4>Card Quantity Inputs</h4>
				<p>Adjacent to each card button in the card list is a number input box for the quantity (“Qty.”) of that card in the deck. Following <i>Magic</i>’s rules, no card may have a quantity greater than four, with the exception of cards of the “basic land” type.</p>
				<p>You can remove a card from the deck by decreasing its quantity down to zero. </p>
			</li>
			<li>
				<h4>Card Adder</h4>
				<p>This form contains a text input where you can enter a card’s name, and an “Add Card” button to insert that card into the deck. When you start typing a couple letters of a name, an auto-complete list appears with card suggestions.</p>
				<p>You can’t use the card adder form to add a card that already exists in the card list. To add duplicates of a card of a particular name, increase that card’s quantity in the card list.</p>
				<p>(Tip: You can enter the code “<code>[random]</code>” as the card name to add any randomly chosen Modern-legal card.)</p>
			</li>
			<li>
				<h4>Card Sorter</h4>
				<p>This is a selection menu with options for sorting the card list by certain card characteristics:</p>
				<ul>
					<li><strong>Name</strong>: Sorts alphabetically. Name is always the most unique characteristic to sort by because every card in the list of cards has a unique name.</li>
					<li><strong>Converted mana cost</strong>: Sorts from cheapest to most expensive.</li>
					<li><strong>Mana color</strong>: Sorts from monocolored, to multicolored, to colorless. Among the monocolored cards, this option sorts by <i>Magic</i>’s conventional order of the colors: white, blue, black, red, green.</li>
					<li><strong>Type</strong>: Sorts in this given order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</li>
					<li><strong>Subtype</strong>: Sorts alphabetically. Cards without a subtype are moved to the bottom.</li>
					<li><strong>Rarity</strong>: Sorts from highest to lowest in the level of rarity. The rarities, in ascending order, are “common” (black C symbol), “uncommon” (silver U), “rare” (golden R), “mythic rare” (orange M), and “special” (purple S).</li>
					<li><strong>Quantity</strong>: Sorts from most to fewest.</li>
				</ul>
				<p>The card list can be the result of multiple sorting options together, with the more recently selected options given higher priority. For example, let’s say you first choose to sort cards by converted mana cost, and then you choose to sort by type. In effect, the card list will be primarily sorted by type, and within each group of types (the creatures group, the sorceries group, etc.), the cards will be sorted by their converted mana cost.</p>
				<p>Sorting affects all decks you have, not only the deck you’re currently viewing.</p>
			</li>
			<li>
				<h4>Deck Actions</h4>
				<p>There are two buttons on a deck page for doing special actions:</p>
				<ul>
					<li><strong>Copy Deck</strong>: Click this button to create a new deck that has an identical list of cards as the deck you’re currently viewing. The duplicate deck’s name will automatically have the same name as the origin deck but with a unique number within parentheses appended to it (though you’re able to change the name to something else if you want).</li>
					<li><strong>Delete Deck</strong>: Click this button to erase the data of the deck you’re currently viewing. If you’d later try to access the page of a deleted deck in the app, a “Page Not Found” error page will appear instead.</li>
				</ul>
			</li>
		</ol>

		<h3>App Data Storage</h3>
		<p>The data for any of your decks in MTG Deck Builder are stored only locally in the web browser you’re using. This means you don’t need to set up a user account to use this app. It also means other users of the app can’t see your decks, or you theirs, and deck data can’t be transferred between web browsers.</p>
		<p>By default, the app comes with two pre-made decks (“Boros Equipment” and “Sultai Ultimatum”) which you may edit as you like or delete them.</p>
		<p>To delete all of your data in this app, click the “Clear Stored Data” link in the app’s footer on any page. After clearing the app data, the two default decks will be restored.</p>

		<!-- <h3>Development Info</h3> -->
		<!-- <p>To learn about the nuts and bolts of this MTG Deck Builder app, <a href="https://iristormdesign.com/portfolio/mtg-deck-builder" target="_blank" rel="noopener">read the article about it</a> at Iristorm Design.</p> -->
	</article>
</template>
