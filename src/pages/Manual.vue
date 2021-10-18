<template>
	<article class="manual-page content-box">
		<header id="m-intro">
			<h2>User Manual</h2>
		</header>

		<nav class="table-of-contents">
			<h3>Table of Contents</h3>
			<ol>
				<li><button @click="scrollToSection('m-intro')">Introduction</button></li>
				<li><button @click="scrollToSection('m-app-header')">App Header</button></li>
				<li>
					<button @click="scrollToSection('m-deck-pages')">Deck Pages</button>
					<ol>
						<li><button @click="scrollToSection('m-deck-name')">Deck Name</button></li>
						<li><button @click="scrollToSection('m-deck-statistics')">Deck Statistics</button></li>
						<li><button @click="scrollToSection('m-card-image')">Card Image</button></li>
						<li><button @click="scrollToSection('m-card-list')">Card List</button></li>
						<li><button @click="scrollToSection('m-card-quantities')">Card Quantities</button></li>
						<li><button @click="scrollToSection('m-card-adder')">Card Adder</button></li>
						<li><button @click="scrollToSection('m-card-sorter')">Card Sorter</button></li>
						<li><button @click="scrollToSection('m-deck-actions')">Deck Actions</button></li>
					</ol>
				</li>
				<li><button @click="scrollToSection('m-more-statistics-pages')">More Statistics Pages</button></li>
				<li><button @click="scrollToSection('m-storage-of-app-data')">Storage of App Data</button></li>
				<li><button @click="scrollToSection('m-app-dev-info')">App Development Info</button></li>
			</ol>
		</nav>

		<div class="the-manual">
			<p>MTG Deck Builder by Iristorm Design is a web app where you can create and manage your custom decks for <a href="https://magic.wizards.com" target="_blank" rel="noopener noreferrer"><i>Magic: The Gathering</i></a>. This document explains how to use this app.</p>

			<h3 id="m-app-header">App Header</h3>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-app-header.jpg 1x, @/img/manual-app-header-2x.jpg 2x"
					src="@/img/manual-app-header.jpg" width="658" height="23"
					alt="Snippet of app header" title="Screenshot" />
			</p>
			<p>The app’s header appears at the top of any page on MTG Deck Builder. The most important buttons on it are the two orange ones, as follows:</p>
			<ul>
				<li><strong>Create Deck</strong>—When you click this button, a prompt appears asking you to give the new deck a name, and then you’ll be taken to the <button class="inline" @click="scrollToSection('m-deck-pages')">deck page</button> of that deck. If you happen to give a name that another one of your decks in the app already has, you’ll be asked to give a different name instead.</li>
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
			<p>A deck page contains the following components, listed here in the order of their position on the page from left to right, top to bottom:</p>
			<ol class="deck-page-components-links">
				<li><button @click="scrollToSection('m-deck-name')">Deck Name</button></li>
				<li><button @click="scrollToSection('m-deck-statistics')">Deck Statistics</button></li>
				<li><button @click="scrollToSection('m-card-image')">Card Image</button></li>
				<li><button @click="scrollToSection('m-card-list')">Card List</button></li>
				<li><button @click="scrollToSection('m-card-quantities')">Card Quantities</button></li>
				<li><button @click="scrollToSection('m-card-adder')">Card Adder</button></li>
				<li><button @click="scrollToSection('m-card-sorter')">Card Sorter</button></li>
				<li><button @click="scrollToSection('m-deck-actions')">Deck Actions</button></li>
			</ol>
			<p>Each of those components is going be explained in greater detail.</p>

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
					<li><strong>Using Colors</strong>—Shows whichever of the five mana colors that are required by the mana costs among spells in the deck. Instead of their usual graphics, the symbols of the mana colors are represented in this app as single letters in the <i>Magic</i> convention of writing them: “W” is white, “U” is blue, “B” is black, “R” is red, and “G” is green.</li>
					<li><strong>Average Mana Value</strong>—Shows the mean of the mana value (formerly known as “converted mana cost” before 2021) among spells in the deck. This calculation includes cards’ quantities, and excludes lands.</li>
					<li><strong>Last Edited</strong>—Shows the date and time when the deck was most recently modified (or created, if it’s a new deck). The actions of adding a new card, increasing or decreasing a card’s quantity, and renaming the deck count as modifications. (Viewing another card and sorting the card list don’t count.)</li>
					<li><strong>Card Names</strong>—Shows the number of cards by each particular name contained in the deck.</li>
					<li><strong>Total Cards</strong>—Shows the total number of cards contained in the deck. When the total is fewer than 60 (which is the minimum limit according to <i>Magic</i>’s standard rules), a warning symbol (⚠) appears beside the number to signal this.</li>
					<li><strong>More Statistics Button</strong>—Click this to inspect even more data about the deck. For further explanation, see the “<button class="inline" @click="scrollToSection('m-more-statistics-pages')">More Statistics Pages</button>” section of this manual.</li>
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
				<p>This is a scanned image of the last selected card from the deck’s <button class="inline" @click="scrollToSection('m-card-list')">card list</button>. If you click on the image, it’ll open that card’s page on <a href="https://scryfall.com" target="_blank" rel="noopener noreferrer">Scryfall</a>, which provides more information about <i>Magic</i> cards.</p>
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
				<p>This is the list of the cards contained in the currently open deck, where each card is represented by a wide button. You can click on any of these card buttons to have that card displayed in the <button class="inline" @click="scrollToSection('m-card-image')">card image</button> section.</p>
				<p>Labeled on each of the card buttons are the following card characteristics:</p>
				<ul>
					<li>Name</li>
					<li>Mana cost (if any)</li>
					<li>Type (including subtype, if any)</li>
					<li>Rarity—The name and symbol of each rarity level are:
						<ul>
							<li>Common—black C</li>
							<li>Uncommon—silver U</li>
							<li>Rare—golden R</li>
							<li>Mythic rare—orange M</li>
							<li>Special—purple S</li>
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
				<p>Adjacent to each card button in the <button class="inline" @click="scrollToSection('m-card-list')">card list</button> is a number representing the quantity (“QTY.”) of that card in the deck.</p>
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
					<li>The card adder won’t add a card that already exists by that name in the deck. If you’d want to add duplicates of a card of a particular name, instead increase that card’s <button class="inline" @click="scrollToSection('m-card-quantities')">quantity</button>.</li>
					<li>When submitting a card name in the card adder, if that card has been printed in multiple <i>Magic</i> sets, the newest print will always be the one taken.</li>
					<li>Newly added cards are put at the bottom of the card list, though they can be rearranged later with the <button class="inline" @click="scrollToSection('m-card-sorter')">card sorter</button>.</li>
					<li>To add any randomly chosen Modern-legal card, enter the code <code>[random]</code> as the card name. (Depending on the web browser you’re using, “[random]” may also appear as an option when the card adder input has focus.)</li>
				</ul>
			</section>
			<section id="m-card-sorter">
				<h4>Card Sorter</h4>
				<p>
					<img class="screenshot float-right"
						src="@/img/manual-card-sorter.jpg" width="265" height="140"
						alt="Snippet of card sorter" title="Screenshot" loading="lazy" />
				</p>
				<p>This is a selection menu with various options for sorting the <button class="inline" @click="scrollToSection('m-card-list')">card list</button> by certain attributes of <i>Magic</i> cards, including:</p>
				<ul>
					<li><strong>Name</strong>—Sorts alphabetically.</li>
					<li><strong>Mana Color</strong>—Sorts from monocolored, to multicolored, to colorless. Among the monocolored, this sorts by <i>Magic</i>’s conventional order of the colors: white, blue, black, red, green.</li>
					<li><strong>Mana Value</strong>—Sorts from least to most. (Mana value is also known by the older term “converted mana cost.”)</li>
					<li><strong>Type</strong>—Sorts in this order: creatures, planeswalkers, enchantments, artifacts, sorceries, instants, lands.</li>
					<li><strong>Subtype</strong>—Sorts alphabetically. Cards with no subtype are moved to the bottom.</li>
					<li><strong>Rarity</strong>—Sorts from highest to lowest in level of rarity.</li>
					<li><strong>Quantity</strong>—Sorts from most to fewest.</li>
				</ul>
				<p>The card list can be the result of multiple sorting options combined, with the more recently selected options given higher priority. For example, let’s say you first sort the card list by rarity, and then you sort by type. In effect, the card list becomes sorted primarily by type, and within each sorted group of types (the creature group, the sorcery group, etc.), the cards are sorted by rarity.</p>
				<p>Name is the most distinguishable card attribute to sort by. This is because every card in a deck’s card list must have a unique name, which isn’t necessarily true for the other card attributes.</p>
				<p>To make the card list easier to inspect at a glance, the sorting options for mana value, type, and subtype add small gaps between each sorted group of cards. A gap is also inserted before any <button class="inline" @click="scrollToSection('m-card-adder')">newly added cards</button> to the list that haven’t been sorted yet.</p>
				<p>Applying any sorting option affects all of your decks alike, not only the deck you’re currently viewing.</p>
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
					<li><strong>Copy Deck</strong>—Click this button to create a new deck that has an identical list of cards as the deck you’re currently viewing. The duplicate deck’s name will automatically have the same name as the origin deck but with a unique number within parentheses appended to it (though you can <button class="inline" @click="scrollToSection('m-deck-name')">rename</button> it afterward if you want).</li>
					<li><strong>Delete Deck</strong>—Click this button to erase the data of the deck you’re currently viewing. If you’d later try to access the page of a deleted deck in the app, you’d arrive on a “Page Not Found” error page instead.</li>
				</ul>
				<p>Both the Copy Deck and Delete Deck buttons ask you to confirm the action before committing to it, giving you the choice to cancel.</p>
			</section>

			<h3 id="m-more-statistics-pages">More Statistics Pages</h3>
			<p>By clicking the More Statistics button in the <button class="inline" @click="scrollToSection('m-deck-statistics')">deck page’s header</button>, you’ll be taken to that deck’s More Statistics page. This page shows data tables about various categories of measurement of the deck’s cards.</p>
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
			<p>Cards can have multiple properties within a single category table. For example, a card that has the type line “artifact creature” would be counted in the Types table as both a creature <em>and</em> an artifact. Thus, the combined values of a category may potentially sum up to a number greater than the total number of cards in the deck and to a percentage beyond 100%. </p>

			<h3 id="m-storage-of-app-data">Storage of App Data</h3>
			<p>The data for any of your decks in MTG Deck Builder are stored only locally in the web browser you’re using. This means you don’t have to register for a user account to use this app. It also means other users of the app on their own browsers can’t see your decks, or you theirs, and deck data can’t be transferred between browsers.</p>
			<p>By default, the app comes with two pre-made decks (“Boros Equipment” and “Sultai Ultimatum”), which you may edit as you like or delete them.</p>
			<p>To permanently delete all of your data in MTG Deck Builder, click the “Clear Stored Data” link in the app’s footer on any page. After clearing the app data, the two default decks will be restored.</p>

			<h3 id="m-app-dev-info">App Development Info</h3>
			<p>If you’re interested, you can <a href="https://iristormdesign.com/portfolio/mtg-deck-builder" target="_blank" rel="noopener">learn about the design and development</a> behind MTG Deck Builder.</p>
		</div>
	</article>
</template>

<script>
export default {
	methods: {
		scrollToSection (id) {
			const section = document.getElementById(id)

			section.scrollIntoView(true)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-manual.scss';
</style>
