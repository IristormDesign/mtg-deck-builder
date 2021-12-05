<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
			<img class="intro-illustration" src="~@/img/urzas-tome.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
			<small>(Illustration: <i><a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank" rel="noopener noreferrer">Urza’s Tome</a></i> by Aaron Miller)</small>
		</header>

		<nav class="table-of-contents">
			<h3>Table of Contents</h3>
			<ol>
				<li><a href="#m-intro">Introduction</a></li>
				<li><a href="#m-app-header">App Header</a></li>
				<li><a href="#m-create-deck">Create Deck Page</a></li>
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
				<li><a href="#m-storage-of-deck-data">Storage of Deck Data</a></li>
					<ol>
						<li><a href="#m-deck-data-files">Deck Data Files</a></li>
					</ol>
				<li><a href="#m-app-dev-info">App Development Info</a></li>
			</ol>
		</nav>

		<div id="m-intro" class="the-manual">
			<p>This page explains how to use this app, <router-link :to="{name: 'home'}">MTG Deck Builder</router-link> by Iristorm Design.</p>
			<p>(If you need help on how to play <i>Magic</i> itself, refer to the game rules at the <a href="https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/rules" target="_blank" rel="noopener noreferrer">official <i>Magic</i> website</a> or <a href="https://mtg.fandom.com/wiki/Portal:Rules" target="_blank" rel="noopener">MTG Wiki</a>.)</p>

			<h3 id="m-app-header">App Header</h3>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-app-header.jpg 1x, @/img/manual-app-header-2x.jpg 2x"
					src="@/img/manual-app-header.jpg" width="658" height="23"
					alt="Snippet of app header" title="Screenshot" loading="lazy" />
			</p>
			<p>At the top of any page on MTG Deck Builder is the app header, which includes the following buttons:</p>
			<ul>
				<li><strong>User Manual</strong> — Takes you to this page you’re reading right now.</li>
				<li><strong>Create Deck</strong> — Takes you to the <a href="#m-create-deck">Create Deck</a> page.</li>
				<li><strong>Open Deck</strong> — Makes a menu appear with an alphabetically ordered list of the names of all your unopened decks stored in the app. Click any deck name in the list to open that <a href="#m-deck-pages">deck’s page</a>. (If you’ve deleted all decks in the app, the Open Deck button becomes temporarily disabled.)</li>
				<li><strong>Contact</strong> — Takes you to the Contact page.</li>
			</ul>

			<h3 id="m-create-deck">Create Deck Page</h3>
			<p>The Create Deck page is where you can start on a new deck or import a deck data file. Either of these methods will add the deck to the menu that lists all of your decks stored in the app, accessible from the Open Deck button in the <a href="#m-app-header">app header</a>.</p>
			<p>If you choose to start a new deck, you first have to enter a name for it, and then you’ll be taken to an empty <a href="#m-deck-pages">deck page</a> for it. If you happen to submit a deck name that another one of your decks in the app already has, you’ll be asked to enter a different name instead.</p>
			<p>Alternatively, if you have a <a href="#m-deck-data-files">deck data file</a> for MTG Deck Builder, you can open it through the app to import its deck data, and then a deck page will be instantly produced from it.</p>

			<h3 id="m-deck-pages">Deck Pages</h3>
			<p>Deck pages are where you view and edit the contents of your <i>Magic</i> decks, the main focus of MTG Deck Builder. Every deck you have in the app has its own deck page.</p>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 2x"
					src="@/img/manual-deck-page.jpg" width="658" height="471"
					alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy" />
			</p>
			<p>A deck page contains the following sections, listed in the order of their position on the page (as displayed on large computer screens) from top to bottom, left to right: <a href="#m-deck-name">deck name</a>, <a href="#m-deck-statistics">deck statistics</a>, <a href="#m-card-image">card image</a>, <a href="#m-card-list">card list</a>, <a href="#m-card-quantities">card quantities</a>, <a href="#m-card-adder">card adder</a>, <a href="#m-card-sorter">card sorter</a>, and <a href="#m-deck-actions">deck actions</a>. Each of these sections is going to be explained in greater detail.</p>

			<section id="m-deck-name">
				<p>
					<img class="screenshot float-left"
						srcset="@/img/manual-deck-name.jpg 1x, @/img/manual-deck-name-2x.jpg 2x"
						src="@/img/manual-deck-name.jpg" width="265" height="113"
						alt="Snippet of deck name link" title="Screenshot" loading="lazy" />
				</p>
				<h4>Deck Name</h4>
				<p>In this section, the deck’s name itself is a link that you can click on to rename the deck to something else.</p>
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
					<li><strong>Using Colors</strong> — Shows whichever of the five mana colors that are required by the mana costs among spells in the deck. Instead of their usual graphics, the symbols of the mana colors are represented in this app as single letters in the <i>Magic</i> convention of writing them: “W” is white, “U” is blue, “B” is black, “R” is red, and “G” is green.</li>
					<li><strong>Average Mana Value</strong> — Shows the mean of the mana value (formerly known as “converted mana cost” before 2021) among spells in the deck. This calculation includes cards’ quantities, and excludes lands.</li>
					<li><strong>Last Edited</strong> — Shows the date and time when the deck was most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card</a>, <a href="#m-card-quantities">adjusting a card’s quantity</a>, and <a href="#m-deck-name">renaming the deck</a> count as modifications. (<a href="#m-card-image">Viewing another card</a> and <a href="#m-card-sorter">sorting the card list</a> don’t count.)</li>
					<li><strong>Card Names</strong> — Shows the number of cards by each particular name contained in the deck.</li>
					<li><strong>Total Cards</strong> — Shows the total number of cards contained in the deck. When the total is fewer than 60 (which is the minimum limit according to <i>Magic</i>’s standard rules), a warning symbol (⚠) appears beside the number to signal this.</li>
					<li><strong>More Statistics Button</strong> — Click this to inspect even more data about the deck. For further explanation, see the “<a href="#m-more-statistics-pages">More Statistics Pages</a>” section of this manual.</li>
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
				<p>This is a scanned image of the last selected card from the deck’s <a href="#m-card-list">card list</a>. If you click on the image, it’ll open that card’s page on <a href="https://scryfall.com" target="_blank" rel="noopener noreferrer">Scryfall</a>, which provides more information about <i>Magic</i> cards.</p>
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
				<p>This is the list of the cards contained in the currently open deck, where each card is represented by a wide button. You can click on any of these card buttons to have that card displayed in the <a href="#m-card-image">card image</a> section.</p>
				<p>Labeled on each of the card buttons are the following card characteristics:</p>
				<ul>
					<li>Name</li>
					<li>Mana cost (if any)</li>
					<li>Type (including subtype, if any)</li>
					<li>Rarity — The name and symbol of each rarity level are:
						<ul>
							<li>Common — black C</li>
							<li>Uncommon — silver U</li>
							<li>Rare — golden R</li>
							<li>Mythic rare — orange M</li>
							<li>Special — purple S</li>
						</ul>
					</li>
				</ul>
				<p>Double-faced cards include the characteristics of both faces with a slash in between.</p>
				<p>The surface color of each card button represents the mana colors of that card’s casting cost. (For example, a button for a card that requires only green mana is colored green.) Buttons for multicolored cards are yellow and for colorless cards are gray.</p>
			</section>
			<section id="m-card-quantities">
				<h4>Card Quantities</h4>
				<p>
					<img class="screenshot float-right"
						src="@/img/manual-card-quantities.jpg" width="88" height="238"
						alt="Snippet of card quantities" title="Screenshot" loading="lazy" />
				</p>
				<p>Adjacent to each card button in the <a href="#m-card-list">card list</a> is a number representing the quantity (“QTY.”) of that card in the deck.</p>
				<p>Click on a card’s quantity to make an input box appear in which you can change the number. On most web browsers, the input box also has a pair of arrow buttons that let you increase or decrease the number by one.</p>
				<p>To remove a card from the deck, lower its quantity to zero. You’ll then be prompted to confirm you want to remove that card. If not, then the quantity resets to one.</p>
				<p>In accordance to <i>Magic</i>’s rules, each card of a particular name in a deck cannot have a quantity greater than 4, except cards of the “basic land” type which may have any quantity.</p>
			</section>
			<section id="m-card-adder">
				<h4>Card Adder</h4>
				<p>
					<img class="screenshot"
						src="@/img/manual-card-adder.jpg" width="658" height="141"
						alt="Snippet of card adder" title="Screenshot" loading="lazy" />
				</p>
				<p>This is a simple form that contains a text input where you can enter a card’s name, and then you click the “Add Card” button to insert that card into the deck.</p>
				<ul>
					<li>When you start typing a couple of letters of a name in the card adder, an auto-complete list appears with card suggestions based on those initial letters.</li>
					<li>If the card name you entered is invalid, you’ll be notified.</li>
					<li>The card adder won’t add a card that already exists by that name in the deck. If you’d want to add duplicates of a card of a particular name, instead increase that card’s <a href="#m-card-quantities">quantity</a>.</li>
					<li>When submitting a card name in the card adder, if that card has been printed in multiple <i>Magic</i> sets, the newest print will always be the one taken.</li>
					<li>Newly added cards are put at the bottom of the card list, though they can be rearranged later with the <a href="#m-card-sorter">card sorter</a>.</li>
					<li>If you want to add a randomly chosen card to your deck, enter the code <code>[random]</code> (including the square brackets) as the card name. Depending on the web browser you’re using, “[random]” may also appear as a selectable option when the card adder input has focus.</li>
				</ul>
			</section>
			<section id="m-card-sorter">
				<h4>Card Sorter</h4>
				<p>
					<img class="screenshot float-right"
						src="@/img/manual-card-sorter.jpg" width="265" height="140"
						alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
				</p>
				<p>This is a selection menu with various options for sorting the <a href="#m-card-list">card list</a> by certain attributes of <i>Magic</i> cards, including:</p>
				<ul>
					<li><strong>Name</strong> — Sorts alphabetically.</li>
					<li><strong>Mana Color</strong> — Sorts from monocolored, to multicolored, to colorless. Among the monocolored, this sorts by <i>Magic</i>’s conventional order of the colors: white, blue, black, red, green.</li>
					<li><strong>Mana Value</strong> — Sorts from least to most. (Mana value is also known by the older term “converted mana cost.”)</li>
					<li><strong>Type</strong> — Sorts in this order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</li>
					<li><strong>Subtype</strong> — Sorts alphabetically. Cards with no subtype are moved to the bottom.</li>
					<li><strong>Rarity</strong> — Sorts from highest to lowest in level of rarity.</li>
					<li><strong>Quantity</strong> — Sorts from most to fewest.</li>
				</ul>
				<p>The card list can become the result of multiple sorting options combined, with the more recently selected options given higher priority. For example, let’s say you first sort the cards by rarity, and then you sort by type. In effect, the cards are sorted primarily by type, and within each sorted group of types (the creature group, the land group, etc.), the cards are sorted by rarity.</p>
				<p>Name is the most distinguishable card attribute to sort by. This is because every card in a deck’s card list must have a unique name, which isn’t necessarily true for the other card attributes.</p>
				<p>To make the card list easier to inspect at a glance, the sorting options for mana value, type, and subtype add small gaps between each sorted group of cards. A gap is also inserted before any <a href="#m-card-adder">newly added cards</a> to the list that haven’t been sorted yet.</p>
				<p>Applying any sorting option affects all of your decks alike, not only the deck you’re currently viewing.</p>
			</section>
			<section id="m-deck-actions">
				<h4>Deck Actions</h4>
				<p>Beside the card sorter section on a deck page is the deck actions section. It has a selection menu from which you can choose to perform special actions to the deck you’re currently viewing. These deck actions include the following:</p>
				<ul>
					<li><strong>Copy</strong> — Creates a new deck that has an identical list of cards. The name of the copied deck will automatically have the same name as the origin deck but with a unique number within parentheses appended to it (though you can <a href="#m-deck-name">rename</a> it later if you want).</li>
					<li><strong>Export</strong> — Generates a <a href="#m-deck-data-files">deck data file</a> which gets saved on your computer or device to wherever your web browser puts downloads. The data file is named after the deck’s name and has “.deck” as its file extension.</li>
					<li><strong>Delete</strong> — Fully removes the deck from the app. (If you’d later try to access the page URL of a deleted deck in the app, you’d arrive on a “Page Not Found” error page instead.)</li>
				</ul>
				<p>Each of these options asks you to confirm the action before doing it, giving you the chance to cancel.</p>
			</section>

			<h3 id="m-more-statistics-pages">More Statistics Pages</h3>
			<p>By clicking the More Statistics button in the <a href="#m-deck-statistics">deck page’s header</a>, you’ll be taken to that deck’s More Statistics page. This type of page shows data tables about various categories of measurement of the deck’s cards.</p>
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
				<li>Other attributes — This miscellaneous category tallies any cards that have the “legendary” or “basic land” supertypes, or that are monocolored, multicolored, or double-faced.</li>
			</ul>
			<p>Each row of each table indicates the absolute number as well as the percentage of the cards to the related property.</p>
			<p>Cards can have multiple properties within a single category table. For example, a card that has “Artifact Creature” printed as its type would be counted in the Types table as both a creature <em>and</em> an artifact. Thus, the combined values of a category may potentially sum up to a number greater than the total number of cards in the deck and to a percentage beyond 100%. </p>

			<h3 id="m-storage-of-deck-data">Storage of Deck Data</h3>
			<p>The data for your customized decks in MTG Deck Builder are stored only locally in the web browser you’re using, not over the internet. This means there’s no need to log onto a personal account to save your decks. It also means other users of MTG Deck Builder on their own web browsers won’t be able to see your decks, or you theirs—except by sharing <a href="#m-deck-data-files">deck data files</a>.</p>
			<p>By default, the app comes with two pre-made decks (“Boros Equipment” and “Sultai Ultimatum”), which you may edit however you like or delete.</p>
			<p>To delete all your data in MTG Deck Builder at once, click the “Clear Stored Data” link that’s in the app footer on any page. Before the data gets erased, you’ll be asked to confirm that you want to go ahead with this irreversible process. After the app’s data has been cleared, the two default decks will be restored in their original states.</p>

			<h4 id="m-deck-data-files">Deck Data Files</h4>
			<p>You can export and import deck data files, which are files that contain app data for particular decks. You might want to export a deck data file for one of these reasons:</p>
			<ul>
				<li>Send the file to other users of MTG Deck Builder to show them the deck you’ve made.</li>
				<li>Move your deck from one web browser to another (if you’re switching your preferred browser, for example).</li>
				<li>Store the file as a backup copy of your deck in case of an event that your computer/device or browser somehow causes you to lose access to your main deck data in the app.</li>

			</ul>
			<p>To produce a data file of a deck, go to the <a href="#m-deck-pages">deck’s page</a>, and then from the <a href="#m-deck-actions">deck actions</a> menu, select the “Export” option.</p>
			<p>To make a deck from exported data, go to the <a href="#m-create-deck">Create Deck page</a> and click the button in the “Import a Deck” section. This lets you find and open a deck data file from your computer or device’s file system.</p>

			<h3 id="m-app-dev-info">App Development Info</h3>
			<p>MTG Deck Builder was designed and developed by Damian Schmidt of <a href="https://iristormdesign.com" target="_blank" rel="noopener">Iristorm Design</a>. If you’re interested, <a href="https://iristormdesign.com/portfolio/mtg-deck-builder" target="_blank" rel="noopener">learn about the nuts and bolts</a> of the app.</p>
		</div>
	</article>
</template>

<style lang="scss">
	@import '@/sass/page-manual.scss';
</style>
