<template>
	<article class="solo-message">
		<h2>User Manual</h2>
		<p>MTG Deck Builder by Iristorm Design is a web app on which you can create and manage your decks for <a href="https://magic.wizards.com" target="_blank" rel="noopener noreferrer"><i>Magic: The Gathering</i></a>. This article will teach you how to use the app.</p>

		<h3>App Header</h3>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-app-header.jpg 1x, @/img/manual-app-header.jpg 2x"
				src="@/img/manual-app-header.jpg" width="658" height="23"
				alt="Snippet of app header" title="Screenshot" />
		</p>
		<p>The app’s header appears at the top of any page on MTG Deck Builder. The most important buttons on it are the two orange ones, as follows:</p>
		<ul>
			<li><strong>Create Deck</strong>—When you click this button, a prompt appears asking you to give the new deck a name, and then you’ll be taken to the deck page of that deck. If you happen to give a name that another one of your decks in the app already has, you’ll be asked to give a different name instead.</li>
			<li><strong>Open Deck</strong>—When you click this button, a menu appears with an alphabetically ordered list of the names of all your decks stored in the app that aren’t currently open. Click any deck name in the list to open that deck’s page. (If you’ve deleted all decks in the app, the Open Deck button will be temporarily disabled.)</li>
		</ul>

		<h3>Deck Pages</h3>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 2x"
				src="@/img/manual-deck-page.jpg" width="658" height="467"
				alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy" />
		</p>
		<p>Deck pages are where you view and edit the contents of your <i>Magic</i> decks, the main focus of MTG Deck Builder. Every deck you have in the app has its own deck page.</p>
		<p>A deck page contains the following components, listed in the order of their position on the page from left to right, top to bottom:</p>

		<section>
			<p>
				<img class="screenshot float-left"
					srcset="@/img/manual-deck-name.jpg 1x, @/img/manual-deck-name-2x.jpg 2x"
					src="@/img/manual-deck-name.jpg" width="265" height="113"
					alt="Snippet of deck name link" title="Screenshot" loading="lazy" />
			</p>
			<h4>Deck Name</h4>
			<p>You can click on this to rename the deck to something else.</p>
		</section>
		<section>
			<h4>Deck Statistics</h4>
			<p>
				<img class="screenshot"
					src="@/img/manual-deck-statistics.jpg" width="658" height="81"
					alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
			</p>
			<p>This section has various statistics about the deck, and they’ll automatically update as needed whenever you modify the deck. These statistics include:</p>
			<ul>
				<li><strong>Using Colors</strong>—Shows which of any of the five mana colors are required by the mana costs among spells in the deck. Instead of their usual graphics, the symbols of the mana colors are represented in this app as single letters in the <i>Magic</i> convention of writing the symbols: W is white, U is blue, B is black, R is red, and G is green.</li>
				<li><strong>Average Mana Value</strong>—Shows the mean of the mana value (also known as the older term “converted mana cost”) among all spells in the deck. This calcuation includes cards’ quantities, and excludes lands.</li>
				<li><strong>Last Edited</strong>—Shows the date and time when the deck was most recently modified. A modification counts as adding a new card to the deck, changing a card’s quantity, renaming the deck, and creating a deck. (Viewing another card and sorting cards don’t count as modifications.)</li>
				<li><strong>Total Cards</strong>—Shows the deck’s total number of cards. If a deck contains fewer than 60 cards, which is the minimum card limit a deck may have according to <i>Magic</i>’s standard rules, then a warning symbol appears beside the number to signal this.</li>
			</ul>
		</section>
		<section>
			<p>
				<img class="screenshot float-left"
					srcset="@/img/manual-card-image.jpg 1x, @/img/manual-card-image-2x.jpg 2x"
					src="@/img/manual-card-image.jpg" width="530" height="712"
					alt="Snippet of card image" title="Screenshot" loading="lazy" />
			</p>
			<h4>Card Image</h4>
			<p>This is a scanned image of the last selected card from the deck’s card list. If you click on the image, it’ll open in a new tab that card’s page on Scryfall which gives more information about the card.</p>
			<p>(<a href="https://scryfall.com" target="_blank" rel="noopener noreferrer">Scryfall</a> is an advanced database and search engine for <i>Magic</i> cards, and it provides the card images and data for MTG Deck Builder.)</p>
		</section>
		<section>
			<h4>Card List</h4>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-card-buttons.jpg 1x, @/img/manual-card-buttons-2x.jpg 2x"
					src="@/img/manual-card-buttons.jpg" width="658" height="271"
					alt="Snippet of card list" title="Screenshot" loading="lazy" />
			</p>
			<p>This is the list of the cards in the deck. Each card is represented by a wide button, which you can click on to have that represented card displayed in the card image section.</p>
			<p>Labeled on each of the card buttons are the following card characteristics:</p>
			<ul>
				<li>Name</li>
				<li>Mana cost (if any)</li>
				<li>Type (including subtype, if any)</li>
				<li>Rarity—The name and symbol of each rarity level are:
					<ol>
						<li>Common—black C</li>
						<li>Uncommon—silver U</li>
						<li>Rare—golden R</li>
						<li>Mythic rare—orange M</li>
						<li>Special—purple S</li>
					</ol>
				</li>
			</ul>
			<p>Double-faced cards include the characteristics of both faces with a slash in between.</p>
			<p>The surface color of each card button represents the mana colors of that card’s casting cost. (For example, a button for a card that requires only green mana is colored green.) Just like the frames depicted on <i>Magic</i> cards, the buttons for multicolored cards are golden yellow, and the buttons for colorless cards are gray.</p>
		</section>
		<section>
			<h4>Card Quantities</h4>
			<p>
				<img class="screenshot float-right"
					src="@/img/manual-card-quantities.jpg" width="96" height="275"
					alt="Snippet of card quantities" title="Screenshot" loading="lazy" />
			</p>
			<p>Adjacent to each card button in the card list is a number representing the quantity (“Qty.”) of that card in the deck.</p>
			<p>Click on a card’s quantity to make an input box appear in which you can change the number. On most web browsers, the input box also has a pair of arrow buttons that let you increase or decrease the number by one.</p>
			<p>To remove a card from the deck, lower its quantity to zero. You’ll then be prompted to confirm you want to remove that card. If not, then the quantity resets to one.</p>
			<p>In accordance to <i>Magic</i>’s rules, a deck may not have a quantity of a card of a particular name greater than four, with the exception of the cards of the “basic land” type which are unlimited.</p>
		</section>
		<section>
			<h4>Card Adder</h4>
			<p>
				<img class="screenshot"
					src="@/img/manual-card-adder.jpg" width="658" height="141"
					alt="Snippet of card adder" title="Screenshot" loading="lazy" />
			</p>
			<p>This form contains a text input where you can enter a card’s name, and an “Add Card” button to insert that card into the deck. Newly added cards are always put at the bottom of the card list (but they can be rearranged by the card sorter).</p>
			<p>When you start typing a couple letters of a name, an auto-complete list appears with card suggestions.</p>
			<p>The card adder won’t add a card that already exists in the deck. If you’d want to add duplicates of a card of a particular name, increase that card’s quantity in the card list.</p>
			<p>(Tip: You can enter the code “<code>[random]</code>” as the card name to add any randomly chosen Modern-legal card.)</p>
		</section>
		<section>
			<h4>Card Sorter</h4>
			<p>
				<img class="screenshot float-right"
					src="@/img/manual-card-sorter.jpg" width="265" height="140"
					alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
			</p>
			<p>This is a selection menu with options for sorting the card list by various attributes of <i>Magic</i> cards, including:</p>
			<ul>
				<li><strong>Name</strong>—Sorts alphabetically.</li>
				<li><strong>Mana Value</strong>—Sorts from least to most.</li>
				<li><strong>Mana Color</strong>—Sorts from monocolored, to multicolored, to colorless. Among the monocolored cards, sorts by <i>Magic</i>’s conventional order of the colors: white, blue, black, red, green.</li>
				<li><strong>Type</strong>—Sorts in this order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</li>
				<li><strong>Subtype</strong>—Sorts alphabetically. Cards with no subtype are moved to the bottom.</li>
				<li><strong>Rarity</strong>—Sorts from highest to lowest in level of rarity.</li>
				<li><strong>Quantity</strong>—Sorts from most to fewest.</li>
			</ul>
			<p>The card list can be the result of multiple sorting options combined, with the more recently selected options given higher priority. For example, let’s say you first sort the card list by rarity, and then you sort by type. In effect, the card list becomes sorted primarily by type, and within each sorted group of types (the creatures group, the sorceries group, etc.), the cards are sorted by rarity.</p>
			<p>Name is the most distinguishable card attribute to sort by. This is because every card in a card list must have a unique name, which isn’t necessarily true for the other attributes.</p>
			<p>Sorting affects all of your decks alike, not only the deck you’re currently viewing.</p>
		</section>
		<section>
			<h4>Deck Actions</h4>
			<p>
				<img class="screenshot float-right"
					src="@/img/manual-deck-actions.jpg" width="206" height="176"
					alt="Snippet of deck action buttons" title="Screenshot" loading="lazy" />
			</p>
			<p>There are two buttons on a deck page for doing special actions:</p>
			<ul>
				<li><strong>Copy Deck</strong>—Click this button to create a new deck that has an identical list of cards as the deck you’re currently viewing. The duplicate deck’s name will automatically have the same name as the origin deck but with a unique number within parentheses appended to it (though you can rename it afterward if you want).</li>
				<li><strong>Delete Deck</strong>—Click this button to erase the data of the deck you’re currently viewing. If you’d later try to access the page of a deleted deck in the app, you’d arrive on a “Page Not Found” error page instead.</li>
			</ul>
			<p>Both the Copy Deck and Delete Deck buttons ask you to confirm the action before committing to it, giving you the choice to cancel.</p>
		</section>

		<h3>App Data Storage</h3>
		<p>The data for any of your decks in MTG Deck Builder are stored only locally in the web browser you’re using. This means you don’t have to register for a user account to use this app. It also means other users of the app can’t see your decks, or you theirs, and deck data can’t be transferred between web browsers.</p>
		<p>By default, the app comes with two pre-made decks (“Boros Equipment” and “Sultai Ultimatum”) which you may edit as you like or delete them.</p>
		<p>To delete all of your data in this app, click the “Clear Stored Data” link in the app’s footer on any page. After clearing the app data, the two default decks will be restored.</p>

		<!-- <h3>Development Info</h3> -->
		<!-- <p>To learn about the nuts and bolts of this MTG Deck Builder app, <a href="https://iristormdesign.com/portfolio/mtg-deck-builder" target="_blank" rel="noopener">read the article about it</a> at Iristorm Design.</p> -->
	</article>
</template>
