<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
		</header>

		<nav class="table-of-contents">
			<h3>Table of Contents</h3>
			<ol>
				<li><a href="#">Introduction</a></li>
				<li><a href="#m-app-header">App Header</a></li>
				<li>
					<a href="#m-deck-pages">Deck Pages</a>
					<ol>
						<li><a href="#m-deck-name">Deck Name</a></li>
						<li><a href="#m-deck-statistics">Deck Statistics</a></li>
						<li><a href="#m-card-image">Card Image</a></li>
						<li><a href="#m-card-list">Card List</a></li>
						<li><a href="#m-card-quantities">Card Quantities</a></li>
						<li><a href="#m-card-adder">Card Adder</a></li>
						<li><a href="#m-card-sorter">Card Sorter</a></li>
						<li><a href="#m-deck-actions">Deck Actions</a></li>
					</ol>
				</li>
				<li><a href="#m-more-statistics-pages">More Statistics Pages</a></li>
				<li><a href="#m-storage-of-app-data">Storage of App Data</a></li>
			</ol>
		</nav>

		<div class="the-manual">
			<p><strong>MTG Deck Builder by Iristorm Design</strong> is a web app where you can create and manage your custom decks for <a href="https://magic.wizards.com" target="_blank" rel="noopener noreferrer"><i>Magic: The Gathering</i></a>. This article will teach you how to use this app.</p>

			<h3 id="m-app-header">App Header</h3>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-app-header.jpg 1x, @/img/manual-app-header.jpg 2x"
					src="@/img/manual-app-header.jpg" width="658" height="23"
					alt="Snippet of app header" title="Screenshot" />
			</p>
			<p>The app’s header appears at the top of any page on MTG Deck Builder. The most important buttons on it are the two orange ones, as follows:</p>
			<ul>
				<li><strong>Create Deck</strong>—When you click this button, a prompt appears asking you to give the new deck a name, and then you’ll be taken to the deck page of that deck. If you happen to give a name that another one of your decks in the app already has, you’ll be asked to give a different name instead.</li>
				<li><strong>Open Deck</strong>—When you click this button, a menu appears with an alphabetically ordered list of the names of all your decks stored in the app that aren’t currently open. Click any deck name in the list to open that deck’s page. (If you’ve deleted all decks in the app, the Open Deck button becomes temporarily disabled.)</li>
			</ul>

			<h3 id="m-deck-pages">Deck Pages</h3>
			<p>Deck pages are where you view and edit the contents of your <i>Magic</i> decks, the main focus of MTG Deck Builder. Every deck you have in the app has its own deck page.</p>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 2x"
					src="@/img/manual-deck-page.jpg" width="658" height="471"
					alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy" />
			</p>
			<p>A deck page contains the following components, listed in the order of their position on the page from left to right, top to bottom:</p>
			<ul>
				<li><a href="#m-deck-name">Deck name</a></li>
				<li><a href="#m-deck-statistics">Deck statistics</a></li>
				<li><a href="#m-card-image">Card image</a></li>
				<li><a href="#m-card-list">Card list</a></li>
				<li><a href="#m-card-quantities">Card quantities</a></li>
				<li><a href="#m-card-adder">Card adder</a></li>
				<li><a href="#m-card-sorter">Card sorter</a></li>
				<li><a href="#m-deck-actions">Deck actions</a></li>
			</ul>
			<p>Each of those components will be explained in greater detail.</p>

			<section id="m-deck-name">
				<p>
					<img class="screenshot float-left"
						srcset="@/img/manual-deck-name.jpg 1x, @/img/manual-deck-name-2x.jpg 2x"
						src="@/img/manual-deck-name.jpg" width="265" height="113"
						alt="Snippet of deck name link" title="Screenshot" loading="lazy" />
				</p>
				<h4>Deck Name</h4>
				<p>You can click on this to rename the deck to something else.</p>
			</section>
			<section id="m-deck-statistics">
				<h4>Deck Statistics</h4>
				<p>
					<img class="screenshot"
						srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 2x"
						src="@/img/manual-deck-statistics.jpg" width="658" height="63"
						alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
				</p>
				<p>This section has various statistics about the deck, and they’ll automatically update as needed whenever you modify the deck. The parts of this section include:</p>
				<ul>
					<li><strong>Using Colors</strong>—Shows which of any of the five mana colors are required by the mana costs among spells in the deck. Instead of their usual graphics, the symbols of the mana colors are represented in this app as single letters in the <i>Magic</i> convention of writing them: “W” is white, “U” is blue, “B” is black, “R” is red, and “G” is green.</li>
					<li><strong>Average Mana Value</strong>—Shows the mean of the mana value (formerly known as “converted mana cost” before 2021) among spells in the deck. This calcuation includes cards’ quantities, and excludes lands.</li>
					<li><strong>Last Edited</strong>—Shows the date and time when the deck was most recently modified (or created, if it’s a new deck). The actions of adding a new card, increasing or decreasing a card’s quantity, and renaming the deck count as modifications. (Viewing another card and sorting the card list don’t count.)</li>
					<li><strong>Card Names</strong>—Shows the number of cards by each particular name contained in the deck.</li>
					<li><strong>Total Cards</strong>—Shows the total number of cards contained in the deck. When the total is fewer than 60, which is the minimum card limit a deck may have according to <i>Magic</i>’s standard rules, then a warning symbol appears beside the number to signal that.</li>
					<li><strong>More Statistics</strong>—Click this button to inspect even more data about the deck. For further explanation, see the “<a href="#m-more-statistics-pages">More Statistics Pages</a>” section of this manual.</li>
				</ul>
			</section>
			<section id="m-card-image">
				<p>
					<img class="screenshot float-left"
						srcset="@/img/manual-card-image.jpg 1x, @/img/manual-card-image-2x.jpg 2x"
						src="@/img/manual-card-image.jpg" width="530" height="712"
						alt="Snippet of card image" title="Screenshot" loading="lazy" />
				</p>
				<h4>Card Image</h4>
				<p>This is a scanned image of the last selected card from the deck’s card list. If you click on the image, it’ll open in a new tab that card’s page on Scryfall which gives more information about the card.</p>
				<p>(<a href="https://scryfall.com" target="_blank" rel="noopener noreferrer">Scryfall</a> is an advanced database and search engine for <i>Magic</i> cards. It provides the card images and data for MTG Deck Builder.)</p>
				<p>If you’re viewing MTG Deck Builder on a mobile device instead of a larger computer screen, you can tap on any card button in the card list to make the card image appear as a floating popup.</p>
			</section>
			<section id="m-card-list">
				<h4>Card List</h4>
				<p>
					<img class="screenshot"
						srcset="@/img/manual-card-list.jpg 1x, @/img/manual-card-list-2x.jpg 2x"
						src="@/img/manual-card-list.jpg" width="658" height="219"
						alt="Snippet of card list" title="Screenshot" loading="lazy" />
				</p>
				<p>This is the list of the cards contained in the currently open deck. Each card is represented by a wide button, which you can click on to have that represented card displayed in the card image section.</p>
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
				<p>The surface color of each card button represents the mana colors of that card’s casting cost. (For example, a button for a card that requires only green mana is colored green.) Just like the frames depicted on <i>Magic</i> cards, the buttons for multicolored cards are golden yellow, and for colorless cards are gray.</p>
			</section>
			<section id="m-card-quantities">
				<h4>Card Quantities</h4>
				<p>
					<img class="screenshot float-right"
						src="@/img/manual-card-quantities.jpg" width="88" height="238"
						alt="Snippet of card quantities" title="Screenshot" loading="lazy" />
				</p>
				<p>Adjacent to each card button in the card list is a number representing the quantity (“QTY.”) of that card in the deck.</p>
				<p>Click on a card’s quantity to make an input box appear in which you can change the number. On most web browsers, the input box also has a pair of arrow buttons that let you increase or decrease the number by one.</p>
				<p>To remove a card from the deck, lower its quantity to zero. You’ll then be prompted to confirm you want to remove that card. If not, then the quantity resets to one.</p>
				<p>In accordance to <i>Magic</i>’s rules, each card of a particular name in a deck cannot have a quantity greater than 4, except the cards of the “basic land” type which can have any quantity.</p>
			</section>
			<section id="m-card-adder">
				<h4>Card Adder</h4>
				<p>
					<img class="screenshot"
						src="@/img/manual-card-adder.jpg" width="658" height="141"
						alt="Snippet of card adder" title="Screenshot" loading="lazy" />
				</p>
				<p>This form contains a text input where you can enter a card’s name, and an “Add Card” button to insert that card into the deck. Newly added cards are always put at the bottom of the card list (but they can be rearranged by the card sorter).</p>
				<p>When you start typing a couple letters of a name, an auto-complete list appears with card suggestions based on those initial letters.</p>
				<p>(Tip: You can enter the code “<code>[random]</code>” as the card name to add any randomly chosen Modern-legal card.)</p>
				<p>The card adder won’t add a card that already exists in the deck. If you’d want to add duplicates of a card of a particular name, increase that card’s quantity in the card list.</p>
			</section>
			<section id="m-card-sorter">
				<h4>Card Sorter</h4>
				<p>
					<img class="screenshot float-right"
						src="@/img/manual-card-sorter.jpg" width="265" height="140"
						alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
				</p>
				<p>This is a selection menu with various options for sorting the card list by certain attributes of <i>Magic</i> cards, including:</p>
				<ul>
					<li><strong>Name</strong>—Sorts alphabetically.</li>
					<li><strong>Mana Color</strong>—Sorts from monocolored, to multicolored, to colorless. Among the monocolored, this sorts by <i>Magic</i>’s conventional order of the colors: white, blue, black, red, green.</li>
					<li><strong>Mana Value</strong>—Sorts from least to most. (Mana value is also known by the older term “converted mana cost.”)</li>
					<li><strong>Type</strong>—Sorts in this order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</li>
					<li><strong>Subtype</strong>—Sorts alphabetically. Cards with no subtype are moved to the bottom.</li>
					<li><strong>Rarity</strong>—Sorts from highest to lowest in level of rarity.</li>
					<li><strong>Quantity</strong>—Sorts from largest to smallest.</li>
				</ul>
				<p>The card list can be the result of multiple sorting options combined, with the more recently selected options given higher priority. For example, let’s say you first sort the card list by rarity, and then you sort by type. In effect, the card list becomes sorted primarily by type, and within each sorted group of types (the creatures group, the sorceries group, etc.), the cards are sorted by rarity.</p>
				<p>Name is the most distinguishable card attribute to sort by. This is because every card in a card list must have a unique name, which isn’t necessarily true for the other attributes.</p>
				<p>To make the card list easier to inspect at a glance, the sorting options for mana value, type, and subtype add small gaps between each sorted group of cards. A gap is also inserted before any newly added cards to the list that haven’t been sorted yet.</p>
				<p>Sorting affects all of your decks alike, not only the deck you’re currently viewing.</p>
			</section>
			<section id="m-deck-actions">
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

			<h3 id="m-more-statistics-pages">More Statistics Pages</h3>
			<p>By clicking the More Statistics button in the deck page’s header, you’ll be taken to that deck’s More Statistics page. This page shows data tables of various categories of measurement of the deck’s cards.</p>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 2x"
					src="@/img/manual-more-stats-page.jpg" width="530" height="565"
					alt="Snippet of more deck statistics page" title="Screenshot" loading="lazy" />
			</p>
			<p>The categories include:</p>
			<ul>
				<li>Colors of spells</li>
				<li>Mana value of spells (mana curve)</li>
				<li>Types</li>
				<li>Subtypes</li>
				<li>Rarities</li>
				<li>Other attributes—This miscellaneous category tallies any cards that have the “legendary” or “basic land” supertypes, or that are monocolored, multicolored, or double-faced.</li>
			</ul>
			<p>Each row of each table indicates the absolute number as well as the percentage of the cards to the related property.</p>
			<p>Cards can have multiple properties within a single category table. For example, the Types table would count a card that has the type “artifact creature” as both a creature <em>and</em> an artifact. Therefore, the combined values of a category may potentially sum up to a number greater than the total number of cards in the deck and to a percentage beyond 100%. </p>

			<h3 id="m-storage-of-app-data">Storage of App Data</h3>
			<p>The data for any of your decks in MTG Deck Builder are stored only locally in the web browser you’re using. This means you don’t have to register for a user account to use this app. It also means other users of the app on their own browsers can’t see your decks, or you theirs, and deck data can’t be transferred between browsers.</p>
			<p>By default, the app comes with two pre-made decks (“Boros Equipment” and “Sultai Ultimatum”), which you may edit as you like or delete them.</p>
			<p>To permanently delete all of your data in MTG Deck Builder, click the “Clear Stored Data” link in the app’s footer on any page. After clearing the app data, the two default decks will be restored.</p>

			<!-- <h3>Development Info</h3> -->
			<!-- <p>To learn about the nuts and bolts of this MTG Deck Builder app, <a href="https://iristormdesign.com/portfolio/mtg-deck-builder" target="_blank" rel="noopener">read the article about it</a> at Iristorm Design.</p> -->
		</div>
	</article>
</template>
