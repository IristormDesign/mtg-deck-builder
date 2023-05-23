<template>
	<article class="manual-page content-box">
		<header>
			<h2>User Manual</h2>
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
				<li><a href="#m-app-dev">App Development</a></li>
			</ol>
		</nav>

		<div class="the-manual">
			<section id="m-intro">
				<figure>
					<img class="intro-illustration" src="~@/img/urzas-tome.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
					<small>(Illustration: <i><a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank" rel="noopener noreferrer">Urza’s Tome</a></i> by Aaron Miller)</small>
				</figure>
				<p>This page explains how to use this web app, <router-link :to="{name: 'home'}">MTG Deck Builder</router-link> by <a href="https://iristormdesign.com/" target="_blank" rel="noopener">Iristorm Design</a>. In the table of contents, you can click on a link to skip directly to the respective section of the user manual.</p>
				<p>(If you need help on how to play <i>Magic: The Gathering</i> itself, refer to the game rules at the <a href="https://magic.wizards.com/en/rules" target="_blank" rel="noopener noreferrer">official <i>Magic</i> website</a> or the <a href="https://mtg.fandom.com/wiki/Portal:Rules" target="_blank" rel="noopener">Fandom MTG Wiki</a>.)</p>
				<p>Note: In this app, the symbols of colored mana are displayed as single letters instead of their standard graphical symbols. By Wizards of the Coast’s convention for representing colored mana in plain text, white is “W,” blue is “U,” black is “B,” red is “R,” and green is “G.”</p>
			</section>

			<section id="m-app-header">
				<h3>App Header</h3>
				<p>At the top of every page of MTG Deck Builder is the app header, which has the following buttons:</p>
				<ul>
					<li><strong>User Manual</strong> — Takes you to what you’re reading right now.</li>
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
				<p>Deck pages are the central focus of MTG Deck Builder: They’re where you build, analyze, and edit the contents of your <i>Magic: The Gathering</i> decks. Every deck you make in the app gets its own deck page.</p>
				<p>
					<img class="screenshot"
						srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 1.5x"
						src="@/img/manual-deck-page.jpg" width="658" height="444"
						alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy" />
				</p>
				<p>A deck page consists of several different sections. These sections include the following, listed here in the order of their position on the page from top to bottom, left to right:</p>
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
				<p>Each deck page section is going to be explained in further detail.</p>
				<section id="m-deck-name">
					<p>
						<img class="screenshot float-left"
							srcset="@/img/manual-deck-name.jpg 1x, @/img/manual-deck-name-2x.jpg 1.5x"
							src="@/img/manual-deck-name.jpg" width="266" height="117"
							alt="Snippet of deck name link" title="Screenshot" loading="lazy" />
					</p>
					<h4>Deck Name</h4>
					<p>This section says the deck’s name, which itself is a link you can click on to rename your deck to something else.</p>
				</section>
				<section id="m-deck-statistics">
					<h4>Deck Statistics</h4>
					<p>
						<img class="screenshot"
							srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
							src="@/img/manual-deck-statistics.jpg" width="658" height="63"
							alt="Snipped of deck statistics section" title="Screenshot" loading="lazy" />
					</p>
					<p>This section displays various statistics about your currently open deck. Whenever you modify the deck, the statistics immediately update as needed.</p>
					<p>The parts of the deck statistics section include the following:</p>
					<ul>
						<li><strong>Using Colors</strong> — Shows the symbols of whichever of the five mana colors are required by mana costs among spells in your deck.</li>
						<li><strong>Average Mana Value</strong> — Shows a number equal to the mean of the mana value among spells in your deck. (Mana value is also known by the older term “converted mana cost.”) This calculation includes cards’ quantities and excludes land cards.</li>
						<li><strong>Last Edit</strong> — Shows the date and time of when your deck had been most recently modified (or created, if it’s a new deck). The actions of <a href="#m-card-adder">adding a new card</a>, <a href="#m-card-quantities">adjusting a card’s quantity</a>, and <a href="#m-deck-name">renaming the deck</a> count as edits. (<a href="#m-card-image">Viewing another card</a> and <a href="#m-card-sorter">sorting the card list</a> don’t count.)</li>
						<li><strong>Card Names</strong> — Shows a number equal to the count of names of cards in your deck, ignoring duplicates of cards. (Having a plural quantity of any card doesn’t increase the deck’s count of card names.)</li>
						<li><strong>Total Cards</strong> — Shows a number equal to the total cards (including duplicates) in your deck. When the total is fewer than 60, which is the minimum limit according to <i>Magic</i>’s standard deck-building rules, a warning symbol (⚠) appears beside the number.</li>
						<li><strong>More Stats</strong> — This is a button you can click on to go to the <a href="#m-more-stats-pages">More Deck Statistics page</a>.</li>
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
					<p>This section displays a scanned image of the last selected card from the <a href="#m-card-list">card list</a> of your deck.</p>
					<p>If you’re viewing this app on a mobile device instead of a larger computer screen, you can tap on any card button in the card list to make the card image appear as a floating popup.</p>
					<p>You can click on the image to open that card’s page on <a href="https://scryfall.com/" target="_blank" rel="noopener noreferrer">Scryfall</a>, which is a website that has information on every <i>Magic</i> card (and it’s also where MTG Deck Builder gets its card data from).</p>
				</section>
				<section id="m-card-list">
					<h4>Card List</h4>
					<p>
						<img class="screenshot"
							srcset="@/img/manual-card-list.jpg 1x, @/img/manual-card-list-2x.jpg 1.5x"
							src="@/img/manual-card-list.jpg" width="658" height="339"
							alt="Snippet of card list" title="Screenshot" loading="lazy" />
					</p>
					<p>This section has the list of <i>Magic</i> cards that are part of your currently open deck. Each card of a particular name is represented by a wide button, which you can click on to have the respective card appear in the <a href="#m-card-image">card image</a> section.</p>
					<p>Labeled on each card button are the following card characteristics:</p>
					<ul>
						<li>Name</li>
						<li>Mana cost (if any)</li>
						<li>Type, including supertype and/or subtype (if any)</li>
						<li>Rarity — The name and symbol of each rarity level are the following:
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
					<p>The surface color of each card button represents the mana color of that card. (For example, the color of card buttons for mono-blue spells is blue.) Moreover, the color of card buttons for multicolored spells is gold, for colorless spells is gray, and for lands is brown.</p>
				</section>
				<section id="m-card-quantities">
					<h4>Card Quantities</h4>
					<p>
						<img class="screenshot float-right"
							src="@/img/manual-card-quantities.jpg" width="118" height="256"
							alt="Snippet of card quantities" title="Screenshot" loading="lazy" />
					</p>
					<p>Next to each card button in the <a href="#m-card-list">card list</a> is a number representing the quantity (“QTY.”) of that card in your currently viewed deck.</p>
					<p>To change a card’s quantity, do any of the following methods:</p>
					<ul>
						<li>Click on the quantity number, then use your keyboard to type in a new number.</li>
						<li>If you’re on a larger screen device, hover your mouse pointer over the quantity number to make a pair of buttons appear beside it. Of that pair of buttons, click on the “+” (plus sign) to increase the card’s quantity, or the “&minus;” (minus sign) to decrease.</li>
						<li>Click on the quantity number, then press your keyboard’s up-arrow or down-arrow keys.</li>
					</ul>
					<p>To remove a card from your deck, decrease the card’s quantity to 0 (zero) or delete the quantity number. Before the card actually gets removed, the app asks you to confirm. If you choose to cancel instead, then the card remains in the deck with its quantity reset to 1.</p>
					<p>Following the rules of <i>Magic</i>, each card of a particular name cannot have a quantity greater than 4 in a deck, except cards of the “basic land” type, which can have any quantity.</p>
				</section>
				<section id="m-card-adder">
					<h4>Card Adder</h4>
					<p>
						<img class="screenshot"
							src="@/img/manual-card-adder.jpg" width="810" height="173"
							alt="Snippet of card adder" title="Screenshot" loading="lazy" />
					</p>
					<p>This section has a simple form where you can enter a card’s name in the text box, then click on the Add Card button to make that card appear in the <a href="#m-card-list">card list</a> of your deck.</p>
					<p>Whenever you start typing letters of a card’s name into the text box, a small list of card suggestions based on those initial letters will appear. Entering names in the card adder is case insensitive. (It doesn’t matter whether letters are uppercase or lowercase.)</p>
					<p>When you submit a card name, if that card has been printed in multiple <i>Magic</i> sets, then the card from the latest released set will be retrieved. Only a valid name of a <i>Magic</i> card can add the card to your deck. If a name you submit is invalid, the app will notify you of the error.</p>
					<p>To add any <i>Magic</i> card at random (among Modern-legal cards), submit the code “<strong>#random</strong>” as the name in the card adder. Your web browser may also show this as a selectable option when the card adder’s text box has focus.</p>
					<p>The card adder won’t add a card of a certain name when it already exists in the card list. (If you want to have duplicates of a card, increase its <a href="#m-card-quantities">quantity</a> instead.)</p>
					<p>A newly added card is always put at the bottom of the card list. (You can use the <a href="#m-card-sorter">card sorter</a> afterward to rearrange the newly added cards with the rest.)</p>
				</section>
				<section id="m-card-sorter">
					<h4>Card Sorter</h4>
					<p>
						<img class="screenshot float-right"
							src="@/img/manual-card-sorter.jpg" width="350" height="185"
							alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
					</p>
					<p>This section has a drop-down menu with various options for instantly sorting all cards in the <a href="#m-card-list">card list</a> by a certain attribute. The options and their effects include the following:</p>
					<ul>
						<li><strong>Name</strong> — Sorts alphabetically by name.</li>
						<li><strong>Mana Color</strong> — Sorts between monocolored, multicolored, and colorless. Among the monocolored, this sorts by mana color in <i>Magic</i>’s conventional order of them: white, blue, black, red, green. Among the colorless, this sorts between spells and lands.</li>
						<li><strong>Mana Value</strong> — Sorts from lowest to highest by mana value (a.k.a. converted mana cost).</li>
						<li><strong>Type</strong> — Sorts by type in the following order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</li>
						<li><strong>Subtype</strong> — Sorts alphabetically by subtype, and moves cards without subtypes to the bottom.</li>
						<li><strong>Supertype</strong> — Sorts alphabetically by supertype, and moves cards without supertypes to the bottom. (Examples of supertypes are “basic” [on land cards] and “legendary.”)</li>
						<li><strong>Rarity</strong> — Sorts from highest to lowest by level of rarity.</li>
						<li><strong>P/T Sum</strong> — Sorts from greatest to least by “P/T sum,” which is a number equal to adding together the power (P) and toughness (T) of a card. (For example, the P/T sum of a 3/2 creature is 5.) Among cards having the same P/T sums as each other, they’re sorted from greatest to least by power alone. Cards without the power and toughness characteristics are moved to the bottom.</li>
						<li><strong>Quantity</strong> — Sorts from largest to smallest by quantity.</li>
					</ul>
					<p>The effects of sorting the card list are cumulative, with the most recently selected sorting option given highest priority. For example, let’s say you first sort by rarity, and then sort by type. In effect, the cards are sorted mainly by type, and within each sorted group of types (the creature group, the sorcery group, etc.), the cards are sorted by rarity.</p>
					<p>Name is the most distinguishable card attribute to sort by. This is because every card in a deck’s card list must have a unique name, which isn’t necessarily true for the other attributes.</p>
					<p>For easier skimming of the card list at a glance, the sorting options for mana value, type, subtype, supertype, and P/T sum add small gaps between each sorted group.</p>
				</section>
				<section id="m-deck-actions">
					<h4>Deck Actions</h4>
					<p>Positioned beside the card sorter section is the deck actions section. It has a drop-down menu from which you can choose to do special actions to the deck you’re currently viewing.</p>
					<p>The options for deck actions include the following:</p>
					<ul>
						<li><strong>Copy</strong> — Creates a new deck with an identical list of cards as the active deck at the time of copying. The deck copy’s name will be the same as the origin deck’s, except that a unique number within parentheses is appended to it. (You can always <a href="#m-deck-name">rename</a> the deck later.)</li>
						<li><strong>Export</strong> — Generates a <a href="#m-deck-data-files">deck data file</a> that gets saved on your computer or device to wherever your web browser puts downloads. The file is named after your deck’s name, and has “.deck” as its file extension.</li>
						<li><strong>Delete</strong> — Permanently removes your deck from the app. (If you’d later try to access the URL of a deleted deck’s page, then you’d arrive on a “Page Not Found” error page instead.)</li>
					</ul>
					<p>Whenever you select any deck action option, the app will ask you to confirm the action before proceeding, allowing you to cancel it.</p>
				</section>
			</section>

			<section id="m-more-stats-pages">
				<h3>“More Stats” Pages</h3>
				<p>Clicking on the More Stats button in the <a href="#m-deck-statistics">deck page’s header</a> will direct you to your deck’s More Deck Statistics page, where you can review additional information about the cards in your deck. This type of page displays tabular data in various categories of measurement.</p>
				<p>
					<img class="screenshot"
						srcset="@/img/manual-more-stats-page.jpg 1x, @/img/manual-more-stats-page-2x.jpg 1.5x"
						src="@/img/manual-more-stats-page.jpg" width="530" height="441"
						alt="Snippet of more deck statistics page" title="Screenshot" loading="lazy" />
				</p>
				<p>The statistics’ categories include the following:</p>
				<ul>
					<li>Colors of spells</li>
					<li>Mana values of spells (a.k.a. mana curve)</li>
					<li>Types</li>
					<li>Creature subtypes</li>
					<li>Other subtypes</li>
					<li>Rarities</li>
					<li>Keyword abilities</li>
					<li>Power/toughness</li>
					<li>Miscellaneous</li>
				</ul>
				<p>In the table for almost every category, each row indicates:</p>
				<ul>
					<li>The name of a certain property in the first column.</li>
					<li>The count (“CT.”) of cards of the given property in the second column.</li>
					<li>The percentage of cards of the given property from the total deck in the third column.</li>
				</ul>
				<p>The exception to that table layout is the one for the “power/toughness” category, which has columns for power and toughness instead of count and percentage.</p>
				<p>The “miscellaneous” category table tallies up cards in your deck that have any of the following characteristics:</p>
				<ul>
					<li><strong>Basic land</strong> — Land cards that have the “basic” supertype.</li>
					<li><strong>Legendary</strong> — Cards that have the “legendary” supertype.</li>
					<li><strong>Monocolored</strong> — Cards that are exactly one mana color.</li>
					<li><strong>Multicolored</strong> — Cards that are two or more mana colors.</li>
					<li><strong>Variable cost</strong> — Cards whose mana costs include a letter X.</li>
					<li><strong>Variable P/T</strong> — Cards whose power (P) or toughness (T) is a star symbol.</li>
					<li><strong>Double-faced</strong> — Cards that are double-faced (they have a second card frame on their back side instead of the normal card back), <em>or</em> cards that are split (they have two small card frames on the front side).</li>
				</ul>
				<p>Single cards can be counted in multiple properties within a category. For example, a card that has “Artifact Creature” in its type line is considered to be both a creature and an artifact in the Types category table. Consequently, the sum of all values of a category may equal a total count greater than your deck’s total cards and a percentage greater than 100%.</p>
			</section>

			<section id="m-storage-of-deck-data">
				<h3>Storage of Deck Data</h3>
				<p>The data for your customized decks in MTG Deck Builder are stored only locally in the web browser you’re using, not over the internet. This means there’s no need to log onto a personal account to save your decks. It also means other users of MTG Deck Builder on their own web browsers won’t be able to see your decks, or you theirs, except by sharing <a href="#m-deck-data-files">deck data files</a>.</p>
				<p>When you’ve opened the app for the first time, you’ll find it comes with two sample decks (“Boros Equipment” and “Sultai Ramp”). You may modify these decks however you like or delete them.</p>
				<p>To delete all of your data in MTG Deck Builder at once, click on the “Clear Stored Data” link that’s in the app footer on any page. Before the data gets erased, you’ll be asked to confirm that you want to go ahead with this irreversible process. After the data has been cleared, the two sample decks will be restored in their original states.</p>
				<section id="m-deck-data-files">
					<h4>Deck Data Files</h4>
					<p>MTG Deck Builder includes functions for exporting and importing deck data files, which are files that contain data for particular decks that have been made by you or other users of this app.</p>
					<p>You might want to export a deck data file for any of the following reasons:</p>
					<ul>
						<li>Show other users of MTG Deck Builder the deck you’ve made by sending them your deck’s data file.</li>
						<li>Store the file as a backup copy of your deck’s data, in case your computer/device or web browser somehow causes you to lose your main deck data in the app.</li>
						<li>Move your deck from one web browser to another (if you’re switching your preferred browser, for example).</li>
					</ul>
					<p>To produce a data file of a deck, go to the <a href="#m-deck-pages">deck’s page</a>, and then from the <a href="#m-deck-actions">deck actions</a> menu, select the “Export” option.</p>
					<p>To make a deck from exported data, go to the <a href="#m-create-deck">Create Deck page</a> and click on the button in the “Import a Deck” section. This lets you find and open a deck data file from your computer or device’s file system.</p>
				</section>
			</section>

			<section id="m-app-dev">
				<h3>App Development</h3>
				<p>MTG Deck Builder has been designed and developed by Damian Schmidt of <a href="https://iristormdesign.com/" target="_blank" rel="noopener">Iristorm Design</a>. If you’re interested, you can read about <a href="https://iristormdesign.com/portfolio/mtg-deck-builder/" target="_blank" rel="noopener">how this app was made</a>.</p>
				<p>Do you still have questions about MTG Deck Builder, or have any comments (whether good or bad) for the app developer? If so, email Damian Schmidt at <a href="mailto:damian@iristormdesign.com">damian@iristormdesign.com</a>.</p>
			</section>
		</div>
	</article>
</template>

<script>
export default {
	mounted () {
		const manualLinks = document.querySelectorAll('.manual-page a')

		manualLinks.forEach(link => {
			link.addEventListener('click', (event) => {
				const regexManualSectionLink = /^#.*/ // A string beginning with `#`.

				if (regexManualSectionLink.test(event.target.hash)) {
					const targetedSection = document.querySelector(event.target.hash)

					event.preventDefault()
					targetedSection.scrollIntoView({ behavior: 'smooth' })
				}
			})
		})
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-manual.scss';
</style>
