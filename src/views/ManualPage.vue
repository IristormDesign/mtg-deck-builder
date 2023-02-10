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
				<li><a href="#m-create-deck">“Create Deck” Page</a></li>
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
				<li><a href="#m-more-stats-pages">“More Stats” Pages</a></li>
				<li><a href="#m-storage-of-deck-data">Storage of Deck Data</a></li>
					<ol>
						<li><a href="#m-deck-data-files">Deck Data Files</a></li>
					</ol>
				<li><a href="#m-app-dev-info">App Development Info</a></li>
			</ol>
		</nav>

		<div class="the-manual">
			<section id="m-intro">
				<p>This page explains how to use this web app, <router-link :to="{name: 'home'}">MTG Deck Builder</router-link> by Iristorm Design.</p>
				<p>(If you need help on how to play <i>Magic: The Gathering</i> itself, refer to the game rules at the <a href="https://magic.wizards.com/en/rules" target="_blank" rel="noopener noreferrer">official <i>Magic</i> website</a> or the <a href="https://mtg.fandom.com/wiki/Portal:Rules" target="_blank" rel="noopener">Fandom MTG Wiki</a>.)</p>
			</section>

			<section id="m-app-header">
				<h3>App Header</h3>
				<p>At the top of every page of MTG Deck Builder is the app header, which has the following buttons:</p>
				<ul>
					<li><strong>User Manual</strong> — Takes you to this page you’re reading right now.</li>
					<li><strong>Create Deck</strong> — Takes you to the <a href="#m-create-deck">Create Deck</a> page.</li>
					<li><strong>Open Deck</strong> — Makes a menu appear with an alphabetically ordered list of the names of all your unopened decks stored in the app. Beside each deck name are that deck’s mana colors. Click on any deck name in the list to open that <a href="#m-deck-pages">deck’s page</a>. (If all decks in the app have been deleted, the Open Deck button becomes temporarily disabled.)</li>
					<li><strong>Contact</strong> — Takes you to the Contact page.</li>
				</ul>
			</section>

			<section id="m-create-deck">
				<h3>“Create Deck” Page</h3>
				<p>The Create Deck page is where you can start on a new deck or import a deck data file. Either method will add the deck to the menu that lists all your decks stored in MTG Deck Builder, accessible from the Open Deck button in the <a href="#m-app-header">app header</a>.</p>
				<p>If you choose to start a new deck, you first give it a name, and then the app will take you to an empty <a href="#m-deck-pages">deck page</a> for that deck. (If you happen to submit a name that another one of your decks in the app already has, you’ll be asked to give a different name instead.)</p>
				<p>Alternatively, if you have a <a href="#m-deck-data-files">deck data file</a> for MTG Deck Builder, you can open it on the Create Deck page to import its data, and the app will instantly produce a deck page from it.</p>
			</section>

			<section id="m-deck-pages">
				<h3>Deck Pages</h3>
				<p>Deck pages are the central focus of MTG Deck Builder: They’re where you inspect and modify the contents of your <i>Magic</i> decks. Each deck you create in the app has its own deck page.</p>
				<p>
					<img class="screenshot"
						srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 1.5x"
						src="@/img/manual-deck-page.jpg" width="658" height="444"
						alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy" />
				</p>
				<p>A deck page contains the following sections, listed in the order of their position on the page from top to bottom, left to right: <a href="#m-deck-name">deck name</a>, <a href="#m-deck-statistics">deck statistics</a>, <a href="#m-card-image">card image</a>, <a href="#m-card-list">card list</a>, <a href="#m-card-quantities">card quantities</a>, <a href="#m-card-adder">card adder</a>, <a href="#m-card-sorter">card sorter</a>, and <a href="#m-deck-actions">deck actions</a>. Each of these is going to be explained in greater detail.</p>
				<section id="m-deck-name">
					<p>
						<img class="screenshot float-left"
							srcset="@/img/manual-deck-name.jpg 1x, @/img/manual-deck-name-2x.jpg 1.5x"
							src="@/img/manual-deck-name.jpg" width="266" height="117"
							alt="Snippet of deck name link" title="Screenshot" loading="lazy" />
					</p>
					<h4>Deck Name</h4>
					<p>In this section, the deck’s name itself is a link that you can click on to rename the deck to something else.</p>
				</section>
				<section id="m-deck-statistics">
					<h4>Deck Statistics</h4>
					<p>
						<img class="screenshot"
							srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
							src="@/img/manual-deck-statistics.jpg" width="658" height="63"
							alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
					</p>
					<p>This section displays various statistics about your currently open deck. The statistics automatically update whenever you’ve modified the deck. The parts of this section include:</p>
					<ul>
						<li><strong>Using Colors</strong> — Shows whichever of the five mana colors are required by mana costs among all spells in the deck. Instead of their usual graphics, the symbols of the mana colors are represented in this app as single letters in the <i>Magic</i> convention of writing them: “W” for white, “U” for blue, “B” for black, “R” for red, and “G” for green.</li>
						<li><strong>Average Mana Value</strong> — Shows the mean of the mana value among all spells in the deck. (Mana value is also known by the older term “converted mana cost.”) This calculation includes cards’ quantities and excludes land cards.</li>
						<li><strong>Last Edited</strong> — Shows the date and time when the deck was most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card</a>, <a href="#m-card-quantities">adjusting a card’s quantity</a>, and <a href="#m-deck-name">renaming the deck</a> count as modifying. (<a href="#m-card-image">Viewing another card</a> and <a href="#m-card-sorter">sorting the card list</a> don’t count.)</li>
						<li><strong>Card Names</strong> — Shows the total number of card names among all cards in the deck.</li>
						<li><strong>Total Cards</strong> — Shows the total number of cards in the deck. When the total is fewer than 60 (which is the minimum limit according to <i>Magic</i>’s standard deck-building rules), a warning symbol (⚠) appears beside the number.</li>
						<li><strong>More Stats</strong> — Clicking this button takes you to the <a href="#m-more-stats-pages">More Deck Statistics page</a>, where you can inspect even more information about your deck.</li>
					</ul>
				</section>
				<section id="m-card-image">
					<p>
						<img class="screenshot float-left"
							srcset="@/img/manual-card-image.jpg 1x, @/img/manual-card-image-2x.jpg 1.5x"
							src="@/img/manual-card-image.jpg" width="265" height="356"
							alt="Snippet of card image" title="Screenshot" loading="lazy" />
					</p>
					<h4>Card Image</h4>
					<p>This is a scanned image of the last selected card from your deck’s <a href="#m-card-list">card list</a>.</p>
					<p>You can click on the image to open that card’s page on <a href="https://scryfall.com" target="_blank" rel="noopener noreferrer">Scryfall</a>, a website that provides more information about <i>Magic</i> cards.</p>
					<p>If you’re viewing MTG Deck Builder on a mobile device instead of a larger computer screen, you can tap on any card button in the card list to make the card image appear as a floating popup.</p>
				</section>
				<section id="m-card-list">
					<h4>Card List</h4>
					<p>
						<img class="screenshot"
							srcset="@/img/manual-card-list.jpg 1x, @/img/manual-card-list-2x.jpg 1.5x"
							src="@/img/manual-card-list.jpg" width="658" height="339"
							alt="Snippet of card list" title="Screenshot" loading="lazy" />
					</p>
					<p>This is the list of cards contained in your currently open deck, where each card is represented by a wide button. You can click on any of these card buttons to have that card displayed in the <a href="#m-card-image">card image</a> section.</p>
					<p>Labeled on each of the card buttons are the following card characteristics:</p>
					<ul>
						<li>Name</li>
						<li>Mana cost (if any)</li>
						<li>Type (including subtype, if any)</li>
						<li>Rarity — The name and symbol of each rarity level are:
							<ul>
								<li>Common — black “C”</li>
								<li>Uncommon — silver “U”</li>
								<li>Rare — golden “R”</li>
								<li>Mythic rare — orange “M”</li>
								<li>Special — purple “S”</li>
							</ul>
						</li>
					</ul>
					<p>Double-faced cards include the characteristics of both faces with a slash in between.</p>
					<p>The surface color of each card button represents the mana color of that card. For example, the card button color for mono-blue spells is blue. Additionally, the card button color for multicolored spells is gold, for colorless spells is gray, and for lands is brown.</p>
				</section>
				<section id="m-card-quantities">
					<h4>Card Quantities</h4>
					<p>
						<img class="screenshot float-right"
							src="@/img/manual-card-quantities.jpg" width="118" height="256"
							alt="Snippet of card quantities" title="Screenshot" loading="lazy" />
					</p>
					<p>Next to each card button in the <a href="#m-card-list">card list</a> is a number representing the quantity (“QTY.”) of that card in your currently viewed deck.</p>
					<p>To change a card’s quantity, you can do any of the following:</p>
					<ul>
						<li>Click on the quantity number, then use your keyboard to type in a new number.</li>
						<li>If you’re on a larger screen device, hover your mouse pointer over the quantity number to make a pair of buttons appear beside it. Of that pair of buttons, click on “▲” (up arrow) to increase the card’s quantity, or “▼” (down arrow) to decrease.</li>
						<li>Click on the quantity number, then press your keyboard’s up-arrow or down-arrow keys.</li>
					</ul>
					<p>To remove a card from your deck, decrease the card’s quantity to 0 (zero). Before the card gets actually removed, you’ll be asked to confirm. If you cancel instead, then the card will remain in the deck with its quantity reset to 1.</p>
					<p>In accordance to the rules of <i>Magic</i>, each card of a particular name in a deck cannot have a quantity greater than 4, except the “basic land” type of cards, which can have any quantity.</p>
				</section>
				<section id="m-card-adder">
					<h4>Card Adder</h4>
					<p>
						<img class="screenshot"
							src="@/img/manual-card-adder.jpg" width="810" height="173"
							alt="Snippet of card adder" title="Screenshot" loading="lazy" />
					</p>
					<p>This is a basic form where you can enter a card’s name in the text box, then click on the Add Card button to insert that card into your deck. Things of note about the card adder:</p>
					<ul>
						<li>Whenever you start typing letters of a card’s name into the text box, a small list of card suggestions based on those initial letters will appear.</li>
						<li>Newly added cards will be put at the bottom of the <a href="#m-card-list">card list</a>. (You can use the <a href="#m-card-sorter">card sorter</a> afterward to rearrange them.)</li>
						<li>When you submit a card name, if that card has been printed in multiple <i>Magic</i> sets, then the card from the latest released set will be retrieved.</li>
						<li>When you submit a card name, only a valid name of a <i>Magic</i> card will add that card to your deck. If a name you submit is invalid, the app will notify you of the error.</li>
						<li>To add any <i>Magic</i> card at random (among Modern-legal cards), submit the code “<strong>#random</strong>” as the name in the card adder. Your web browser may also show this as a selectable option when the card adder’s text box has focus.</li>
						<li>The card adder won’t add a card of a certain name when that card name already exists in your deck. (If you want to add duplicates of a card, increase its <a href="#m-card-quantities">quantity</a> instead.)</li>
						<li>Entering names in the card adder is case insensitive. (It doesn’t matter whether letters are uppercase or lowercase.)</li>
					</ul>
				</section>
				<section id="m-card-sorter">
					<h4>Card Sorter</h4>
					<p>
						<img class="screenshot float-right"
							src="@/img/manual-card-sorter.jpg" width="350" height="185"
							alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
					</p>
					<p>This is a selection menu with various options for sorting the cards in the <a href="#m-card-list">card list</a> by certain attributes of <i>Magic</i> cards, including:</p>
					<ul>
						<li><strong>Name</strong> — Sorts alphabetically.</li>
						<li><strong>Mana Color</strong> — Sorts from monocolored, to multicolored, to colorless. Among the monocolored, this sorts by <i>Magic</i>’s conventional order of the colors: white, blue, black, red, green. Among the colorless, this sorts between spells and lands.</li>
						<li><strong>Mana Value</strong> — Sorts from least to most.</li>
						<li><strong>Type</strong> — Sorts in this order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</li>
						<li><strong>Subtype</strong> — Sorts alphabetically. Cards with no subtype are moved to the bottom.</li>
						<li><strong>Rarity</strong> — Sorts from highest to lowest in level of rarity.</li>
						<li><strong>Quantity</strong> — Sorts from most to fewest.</li>
					</ul>
					<p>The card list can become the result of multiple sorting options combined, with the more recently selected options given higher priority. For example, let’s say you first sort the cards by rarity, and then you sort by type. In effect, the cards are sorted primarily by type, and within each sorted group of types (the creature group, the land group, etc.), the cards are sorted by rarity.</p>
					<p>Name is the most distinguishable card attribute to sort by. This is because every card in a deck’s card list must have a unique name, which isn’t necessarily true for the other card attributes.</p>
					<p>To make the card list easier to skim at a glance, the sorting options for mana value, type, and subtype add small gaps between each sorted group of cards. A gap is also inserted before any <a href="#m-card-adder">newly added cards</a> to the list that haven’t been sorted yet.</p>
					<p>Applying a sorting option affects all of your decks alike, not only the deck you’re currently viewing.</p>
				</section>
				<section id="m-deck-actions">
					<h4>Deck Actions</h4>
					<p>Beside the card sorter section on a deck page is the deck actions section. It has a selection menu from which you can choose to perform special actions to the deck you’re currently viewing. These deck actions include the following:</p>
					<ul>
						<li><strong>Copy</strong> — Creates a new deck that has an identical list of cards. The name of the copied deck will have the same name as the origin deck, except that a unique number within parentheses is appended to it. (You could <a href="#m-deck-name">change the name</a> afterward.)</li>
						<li><strong>Export</strong> — Generates a <a href="#m-deck-data-files">deck data file</a> that gets saved on your computer or device to wherever your web browser puts downloads. The data file is named after your deck’s name and has “.deck” as its file extension.</li>
						<li><strong>Delete</strong> — Fully removes your deck from the app. (If you’d later try to access the page URL of a deleted deck in the app, you’d arrive on a “Page Not Found” error page instead.)</li>
					</ul>
					<p>Whenever you select any of the deck action options, the app will ask you to confirm the action before proceeding, giving you the chance to cancel.</p>
				</section>
			</section>

			<section id="m-more-stats-pages">
				<h3>“More Stats” Pages</h3>
				<p>Clicking the More Stats button in the <a href="#m-deck-statistics">deck page’s header</a> will direct you to that deck’s More Deck Statistics page. This type of page displays tabular data in various categories of measurement about the cards in the deck.</p>
				<p>
					<img class="screenshot"
						srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
						src="@/img/manual-more-stats-page.jpg" width="530" height="441"
						alt="Snippet of more deck statistics page" title="Screenshot" loading="lazy" />
				</p>
				<p>The data categories include: Colors of Spells, Mana Values of Spells (a.k.a. mana curve), Types, Creature Subtypes, Other Subtypes, Rarities, Keyword Abilities, Power/Toughness, and Miscellaneous.</p>
				<p>In almost every category’s table, each row indicates the following:</p>
				<ul>
					<li>The name of a certain property in the first column.</li>
					<li>The count (“CT.”) of cards of the given property in the second column.</li>
					<li>The percentage of cards of the given property from the total deck in the third column.</li>
				</ul>
				<p>The exception to this table layout is the Power/Toughness category, which has columns for power and toughness instead of count and percentage.</p>
				<p>The Miscellaneous category table tallies up cards that have any of the following characteristics:
					<ul>
						<li><strong>Basic land</strong> — Land cards that have the “basic” supertype.</li>
						<li><strong>Legendary</strong> — Cards that have the “legendary” supertype.</li>
						<li><strong>Monocolored</strong> — Cards that are exactly one mana color.</li>
						<li><strong>Multicolored</strong> — Cards that are two or more mana colors.</li>
						<li><strong>Variable cost</strong> — Cards whose mana costs include a letter X.</li>
						<li><strong>Variable P/T</strong> — Cards whose power (P) or toughness (T) is a star symbol.</li>
						<li><strong>Double-faced</strong> — Cards that are double-faced (have a second card frame on their back side instead of the usual card back), <em>or</em> cards that are split (have two small card frames on the front side).</li>
					</ul>
				</p>
				<p>Single cards can be counted in multiple properties within a category. For example, a card that has “Artifact Creature” in its type line is considered to be both a creature and an artifact in the Types category table. Consequently, the sum of all values of a category may equal a total count greater than your deck’s total cards and a percentage greater than 100%.</p>
			</section>

			<section id="m-storage-of-deck-data">
				<h3>Storage of Deck Data</h3>
				<p>The data for your customized decks in MTG Deck Builder are stored only locally in the web browser you’re using, not over the internet. This means there’s no need to log onto a personal account to save your decks. It also means other users of MTG Deck Builder on their own web browsers won’t be able to see your decks, or you theirs—except by sharing <a href="#m-deck-data-files">deck data files</a>.</p>
				<p>When you’ve opened the app for the first time, you’ll find it comes with two sample decks (“Boros Equipment” and “Sultai Ramp”). You may modify these decks as you like or delete them.</p>
				<p>To delete all your data in MTG Deck Builder at once, click the “Clear Stored Data” link that’s in the app footer on any page. Before the data gets erased, you’ll be asked to confirm that you want to go ahead with this irreversible process. After the data has been cleared, the two sample decks will be restored in their original states.</p>
				<section id="m-deck-data-files">
					<h4>Deck Data Files</h4>
					<p>MTG Deck Builder has functions for exporting and importing deck data files, which are files that contain app data for particular decks. You might want to export a deck data file for one of these reasons:</p>
					<ul>
						<li>Send the data file to other users of MTG Deck Builder to show them the deck you’ve made.</li>
						<li>Move your deck from one web browser to another (if you’re switching your preferred browser, for example).</li>
						<li>Store the data file as a backup copy of your deck in case your computer/device or browser somehow causes you to lose your main deck data in the app.</li>
					</ul>
					<p>To produce a data file of a deck, go to the <a href="#m-deck-pages">deck’s page</a>, and then from the <a href="#m-deck-actions">deck actions</a> menu, select the “Export” option.</p>
					<p>To make a deck from exported data, go to the <a href="#m-create-deck">Create Deck page</a> and click the button in the “Import a Deck” section. This lets you find and open a deck data file from your computer or device’s file system.</p>
				</section>
			</section>

			<section id="m-app-dev-info">
				<h3>App Development Info</h3>
				<p>MTG Deck Builder was designed and developed by Damian Schmidt of <a href="https://iristormdesign.com" target="_blank" rel="noopener">Iristorm Design</a>. If you’re interested, you can <a href="https://iristormdesign.com/portfolio/mtg-deck-builder" target="_blank" rel="noopener">learn about the nuts and bolts</a> of the app.</p>
			</section>
		</div>
	</article>
</template>

<style lang="scss">
	@import '@/sass/page-manual.scss';
</style>
