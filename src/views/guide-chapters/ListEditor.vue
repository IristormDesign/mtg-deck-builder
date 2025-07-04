<template>
	<section id="list-editor" key="list-editor">
		<h3>List Editor</h3>
		<p>The List Editor is a <router-link to="deck-pages#deck-page-modes">deck page mode</router-link> where you can view, add, remove, and organize every card in your deck. You’ll probably spend more time in the List Editor than in the other modes.</p>
		<p>Whenever you open a deck from the <router-link to="app-header#deck-menu">deck menu</router-link>, the List Editor is the deck page mode that you’re shown by default. If you’ve set the <router-link to="deck-pages">deck page</router-link> to another mode, you can return to the List Editor by clicking its tab in the <router-link to="deck-page-header#mode-menu">mode menu</router-link> or by <router-link to="keyboard-shortcuts">pressing the <kbd>1</kbd> key</router-link>.</p>
		<p>The List Editor contains several different sections. These sections are the following, listed by the order of their positions on the page (as they appear on a wide computer screen) from top to bottom, left to right:</p>
		<ol>
			<li><a href="#card-image">Card image</a></li>
			<li><a href="#card-sorter">Card sorter</a></li>
			<li><a href="#card-groups">Card group switch</a></li>
			<li><a href="#sideboard-header">Sideboard header</a></li>
			<li>
				<a href="#card-list">Card list</a>
				<ol>
					<li><a href="#card-stars">Card stars</a></li>
					<li><a href="#card-bars">Card bars</a></li>
					<li><a href="#card-quantities">Card quantities</a></li>
				</ol>
			</li>
			<li><a href="#scryfall-button">Scryfall advanced search button</a></li>
			<li><a href="#card-adder">Card adder</a></li>
			<li><a href="#add-multiple">Add Multiple button</a></li>
		</ol>
		<p>Each of the List Editor’s sections is going to be explained in further detail.</p>

		<section id="card-image">
			<h4>Card Image</h4>
			<p>
				<img class="screenshot float-left"
					srcset="@/img/manual-card-image.jpg 1x, @/img/manual-card-image-2x.jpg 1.5x"
					src="@/img/manual-card-image.jpg" width="265" height="356"
					alt="Snippet of card image" title="Screenshot" loading="lazy"
				/>
			</p>
			<p>The card image section of the <a href="#list-editor">List Editor</a> displays a scanned full-border picture of a <i>Magic: The Gathering</i> card.</p>
			<p>The image shown is usually of the card that relates to the <a href="#card-list">card list</a> element that you’ve most recently interacted with. (The card list elements are <a href="#card-bars">bars</a>, <a href="#card-quantities">quantities</a>, and <a href="#card-stars">stars</a>.)</p>
			<p>Whenever you <a href="#card-adder">add a card name</a> to the card list, or whenever you navigate up or down the list’s rows by <router-link to="keyboard-shortcuts">pressing the <kbd>W</kbd> or <kbd>S</kbd> keys</router-link>, the relevant image is automatically shown.</p>
			<p>To look at the card image up closer, hover your mouse pointer over it, or press <kbd>C</kbd>.</p>
			<p>If you’re using MTG Deck Builder on a phone instead of a computer with a larger screen, then the card image is normally invisible. You can still look at any card’s image by tapping the card’s bar in the card list, which makes the image appear hovering over the page. Then, to hide the image, tap the “X” button by the page’s top-right corner.</p>
			<p>Click/tap the image, or press <span class="no-text-break"><kbd class="shift-key">Shift</kbd>+<kbd>C</kbd></span>, to see that card’s page on <a href="https://scryfall.com/" target="_blank">Scryfall<svg><use href="#open-in-new-icon" /></svg></a>, which opens in a new browser tab. Scryfall is a search engine and database for <i>Magic</i> cards.</p>
			<p>Whenever the displayed image is of a double-faced card, a button labeled “Turn Over” appears below the image. Click that button, or press <kbd>Z</kbd>, to see the card’s back face.</p>
		</section>

		<section id="card-sorter">
			<h4>Card Sorter</h4>
			<p>
				<img class="screenshot float-right"
					src="@/img/manual-card-sorter.jpg" width="350" height="185"
					alt="Snippet of card sorter" title="Screenshot" loading="lazy"
				/>
			</p>
			<p>The card sorter is a tool that lets you instantly rearrange the order of all card names in the <a href="#card-list">card list</a> in various ways you can choose. It appears in the <a href="#list-editor">List Editor</a> in the section labeled “Sort Cards by.”</p>
			<p>The card sorter has a dropdown menu providing you several kinds of card attributes as options. Select an attribute to have your deck’s card names sorted according to that attribute. Sorting affects both the main and sideboard <a href="#card-groups">groups</a> of your currently <router-link to="app-header#deck-menu">open deck</router-link> (but not other decks you may have).</p>
			<p>The card sorter’s options and their effects are the following:</p>

			<guide-card-sorter-options :displayAsDialog="false" />

			<p>The results of sorting are cumulative, with the most recently selected sorting attribute given highest priority. For example: Let’s say you first sort by rarity, and next sort by type. As the result, the card names are sorted primarily by type, and within each sorted cluster of types (the creatures, the sorceries, etc.), the card names are sorted by rarity.</p>
			<p>For easier skimming of the card list, every sorting option, except for name, inserts small gaps between each sorted cluster of card names.</p>
			<p>Under certain conditions, the card sorter’s sorting option resets to “(Unsorted),” and any gaps in the card list between sorted clusters disappear. Those conditions happen whenever you do any of the following actions:
				<ul>
					<li><a href="#card-adder">Add a card name</a> to the list</li>
					<li>Change the quantity of a card name while the sorter is set to Quantity</li>
					<li>Star a card name while the sorter is set to Starred</li>
				</ul>
			</p>
			<p>Name is the most distinguishable card attribute to sort by. This is because every name in the List Editor’s card list must be unique, which isn’t necessarily true for the other attributes.</p>
			<p>To show or hide the card sorter’s menu via a <router-link to="keyboard-shortcuts">keyboard shortcut</router-link>, press <kbd>Q</kbd>. When you use this shortcut to show the menu, if the card sorter isn’t currently visible within your web browser’s window, then the page automatically scrolls it into view.</p>
		</section>

		<section id="card-groups">
			<h4>Card Group Switch</h4>
			<p>Each deck has two independent groups of cards called “main” and “<a href="#sideboard-uses">sideboard</a>.” The <a href="#list-editor">List Editor</a> displays only one card group at a time.</p>
			<p>The card group switch is a pair of buttons that appears in the section of the List Editor labeled “View Card Group.” The switch lets you toggle between your deck’s main and sideboard groups for viewing in the List Editor. The <a href="#card-list">card list</a> and <a href="#card-adder">card adder</a> interact with whichever group is currently visible.</p>
			<p>Alternatively, press the <kbd>R</kbd> key to switch card groups via <router-link to="keyboard-shortcuts">keyboard shortcut</router-link>.</p>
			<p>Whenever you arrive on any deck page, the card group is automatically set to main at first. Whenever you switch to the sideboard, the <a href="#sideboard-header">sideboard header</a> appears.</p>

			<section id="sideboard-uses">
				<h5>Sideboard Uses</h5>
				<p>The sideboard is a <a href="#card-groups">card group</a> containing cards that are related to your <i>Magic</i> deck, but that aren’t in your deck’s main card group. In MTG Deck Builder, you could use the sideboard for any of these purposes:</p>
				<ul>
					<li>
						<p>When you’re in the process of constructing a <router-link to="create-deck#start-new-deck">new deck</router-link>, the sideboard group can temporarily hold cards you’re considering to include in the main group, but you haven’t firmly decided on yet. You might like the sideboard for this purpose because the cards it contains don’t meddle with the data in the  <router-link to="deck-page-header#basic-statistics">basic statistics</router-link> or <router-link to="stats-analyzer">Stats Analyzer</router-link>, with the special exception of the “Last Edit” statistic.</p>
					</li>
					<li>
						<p>When you’ve finished making your deck, the sideboard group can keep extra cards as potential substitutes for cards in the main group. You can temporarily swap in cards from the sideboard to adapt your deck for a rematch versus an opponent whose deck you’ve realized has certain strengths and weaknesses against yours.</p>
					</li>
					<li>
						<p>Some cards have abilities that specially let you get cards from “outside the game.” The sideboard can contain the outside cards that you intend to play with your deck.</p>
					</li>
				</ul>
				<p>Of the four <router-link to="deck-pages#deck-page-modes">deck page modes</router-link>, only the <a href="#list-editor">List Editor</a> and <router-link to="list-takeout">List Takeout</router-link> use the sideboard.</p>
			</section>
		</section>

		<section id="sideboard-header">
			<h4>Sideboard Header</h4>
			<p>In the <a href="#list-editor">List Editor</a>, the sideboard header is a brown banner with the word “Sideboard” on it. Though it’s normally hidden, it becomes visible above the <a href="#card-list">card list</a> whenever you set the <a href="#card-groups">card group switch</a> to the sideboard option.</p>
			<p>The sideboard header also shows the total number of cards contained within your <a href="#sideboard-uses">deck’s sideboard</a>. If there are more than 15 cards, which is the maximum limit for sideboards according to <router-link to="intro#game-rules"><i>Magic</i>’s rules</router-link>, then a “⚠” (warning symbol) appears beside the total.</p>
		</section>

		<section id="card-list">
			<h4>Card List</h4>
			<p>The card list is a major section of the <a href="#list-editor">List Editor</a>. It displays the names and some attributes of every <i>Magic</i> card belonging to the currently viewed card group (either main or sideboard) of your currently <router-link to="app-header#deck-menu">open deck</router-link>.</p>
			<p>Each distinct card name among your deck’s cards has a row in the list, and each row has three interactive elements: a <a href="#card-bars">card bar</a>, a <a href="#card-quantities">card quantity</a>, and a <a href="#card-stars">card star</a>. These elements are going to be explained in more detail in the next subchapters.</p>
			<p>You can also manipulate the card list in ways with the <a href="#card-sorter">card sorter</a>, the <a href="#card-groups">card group switch</a>, and the <a href="#card-adder">card adder</a>.</p>
			<p>Many <router-link to="keyboard-shortcuts">keyboard shortcuts</router-link> are available for doing actions involving the currently highlighted row of the card list in the List Editor. A row is highlighted when the card bar in that row has its colored outline appear, and the adjacent card quantity and star elements have an orange outline appear. You can change which row is highlighted by pressing the <kbd>S</kbd> key to move the highlight down the list by one row, or <kbd>W</kbd> to move it up. Hold <kbd class="shift-key">Shift</kbd> while pressing <kbd>S</kbd> or <kbd>W</kbd> to multiply the highlight’s movement rate. Press <kbd>Esc</kbd> to stop highlighting.</p>

			<section id="card-stars">
				<h5>Card Stars</h5>
				<p>MTG Deck Builder provides you the option to “star” card names—that is, you can attach a label of a “★” (star symbol) to any names you choose in the <a href="#card-list">card list</a>. The star label for a card name appears directly to the left of the <a href="#card-bars">card bar</a>.</p>
				<p>You might want to star certain card names that you think should have special attention over the other names in the list. For examples:</p>
				<ul>
					<li>
						<p>You could star the card names that are the most central to your deck’s strategy.</p>
					</li>
					<li>
						<p>In a deck for the Commander (or EDH) format, you could star the name of the designated commander card.</p>
					</li>
					<li>
						<p>When you’re in the process of constructing a <router-link to="create-deck#start-new-deck">new deck</router-link>, you could star a certain combination of some card names. Then, go to the <router-link to="stats-analyzer">Stats Analyzer</router-link> and <router-link to="stats-analyzer#data-filter">filter the data</router-link> by the “starred” attribute (or the “un-starred” one). This lets you compare the statistics between your deck’s starred and un-starred cards, thus possibly helping you decide on which ones to keep or remove.</p>
					</li>
				</ul>
				<p>To star a card name, click the blank space just to the left side of the card bar. To un-star a name, click the star label. Alternatively, press the <kbd>A</kbd> key to star and un-star the name in the card list row that’s highlighted via <router-link to="keyboard-shortcuts">keyboard shortcuts</router-link>.</p>
				<p>If your deck has at least one card name that’s starred, then the next time you open the deck, the last starred card you had viewed will have its <a href="#card-image">card image</a> shown.</p>
			</section>

			<section id="card-bars">
				<h5>Card Bars</h5>
				<p>Card bars resemble the bar-shaped graphic elements depicted on modern <i>Magic</i> cards where the cards’ names and mana costs are printed on.</p>
				<p>
					<img class="screenshot"
						srcset="@/img/manual-card-list.jpg 1x, @/img/manual-card-list-2x.jpg 1.5x"
						src="@/img/manual-card-list.jpg" width="658" height="339"
						alt="Snippet of card list" title="Screenshot" loading="lazy"
					/>
				</p>
				<p>In the <a href="#list-editor">List Editor</a>’s <a href="#card-list">card list</a>, card bars represent the certain names of <i>Magic</i> cards in your deck’s active <a href="#card-groups">card group</a>. Each bar is labeled with the following characteristics of the card it represents:</p>
				<ul>
					<li>Name</li>
					<li>Mana cost (if any)</li>
					<li>Type, including supertype and/or subtype (if any)</li>
					<li>Rarity</li>
				</ul>
				<p>For a card that’s double-faced or split, its bar displays the characteristics of both faces with “&nbsp;//&nbsp;” (two slashes) inserted in between.</p>
				<p>Click any card bar to <a href="#card-image">view that card’s image</a>.</p>
				<p>The color of each card bar’s surface represents the mana color of that card. For example, the bar color for mono-green spells is green. Moreover, the bar color for multicolored spells is gold, for colorless spells is gray, and for lands is brown.</p>
			</section>

			<section id="card-quantities">
				<h5>Card Quantities</h5>
				<p>
					<img class="screenshot float-right"
						src="@/img/manual-card-quantities.jpg" width="118" height="256"
						alt="Snippet of card quantities" title="Screenshot" loading="lazy"
					/>
				</p>
				<p>Each card name in the <a href="#list-editor">List Editor</a>’s <a href="#card-list">card list</a> has a quantity section, located to the right of the name’s <a href="#card-bars">card bar</a>. This section shows the name’s quantity as it is within the <a href="#card-groups">card group</a> you’re currently viewing, and provides you controls to change the quantity.</p>
				<p>One way to edit a card name’s quantity is to click directly on the quantity number, which makes your web browser focus on the quantity input field. While the field has focus, you can use your keyboard to type in a new number.</p>
				<p>Other ways to change a card name’s quantity are to click any of the buttons among the card name’s cluster of quantity-adjustment buttons. This button cluster is normally invisible, but it appears to the right of the quantity input field whenever that field has browser focus, or whenever you hover your mouse pointer over the field.</p>
				<p>The cluster of quantity-adjustment buttons are the following:</p>
				<ul>
					<li>
						<p><strong>Increase quantity</strong> – Click the button labeled with the “+” (plus sign) to raise the card name’s quantity in the current card group by 1.</p>
					</li>
					<li>
						<p><strong>Decrease quantity</strong> – Click the button labeled with the “−” (minus sign) to lower the card name’s quantity in the current card group by 1.</p>
					</li>
					<li>
						<p><strong>Move to other group</strong> – There’s a third type of quantity button whose label varies depending on which of the two card groups you’re currently viewing. This button’s label displays either a right-pointing triangle and the letters “SB” (short for “sideboard”), or a left-pointing triangle and the letter “M” (“main”). Click this button to take 1 of the card name out of the active card group, and put that name into the inactive one—i.e., move the card from main <a href="#sideboard-uses">to sideboard</a>, or vice versa.</p>
					</li>
				</ul>
				<p>To completely remove a card name from a card list, decrease its quantity down to 0, or delete the quantity number. Before the name actually gets removed, the app asks you to confirm the removal. If you choose to cancel instead, then the name stays in your deck with its quantity reset to 1.</p>
				<p>You can adjust card names’ quantities using <router-link to="keyboard-shortcuts">keyboard shortcuts</router-link> on the currently highlighted row of the card list:</p>
				<ul>
					<li>Press <kbd>E</kbd> to increase the quantity by 1, or <kbd>D</kbd> to decrease it by 1. </li>
					<li>Press <kbd>F</kbd> to move 1 card into the inactive card group.</li>
					<li>Hold down <kbd class="shift-key">Shift</kbd> while pressing one of the aforementioned keys to adjust the quantity by 2 instead of 1.</li>
				</ul>
				<p>Conforming to the standard gameplay <router-link to="intro#game-rules">rules of <i>Magic</i></router-link>, MTG Deck Builder prevents you from setting almost any card name to a quantity greater than 4. Exceptions are the basic lands, and a few certain cards with abilities that specially raise their quantity limits.</p>
			</section>
		</section>

		<section id="scryfall-button">
			<h4>Scryfall Advanced Search Button</h4>
			<p>The number of unique cards that exist in all of <i>Magic: The Gathering</i> is overwhelmingly massive. So, how can you figure out in reasonable time which of the cards to consider for your deck? An easy solution is <a href="https://scryfall.com/advanced" target="_blank">Scryfall’s advanced search<svg><use href="#open-in-new-icon" /></svg></a>: It lets you browse through a catalog of <i>Magic</i> cards, but only the ones that fit a certain criteria you’ve specified.</p>
			<p>In the <a href="#list-editor">List Editor</a> of MTG Deck Builder, there’s a button labeled with the Scryfall logo and the words “Card Search.” Click that button to be taken directly to the page for Scryfall’s advanced search, which opens in a new browser tab. You can also <router-link to="keyboard-shortcuts">press the <span class="no-text-break"><kbd class="shift-key">Shift</kbd>+<kbd>X</kbd></span> keys</router-link> instead to do this same action.</p>
			<p>(Note that Scryfall is a separate website from MTG Deck Builder, and it has no affiliation with Iristorm Design.)</p>
			<p>The Scryfall card search button in MTG Deck Builder is only a shortcut to there for your convenience. Though this app has been designed to be used alongside searches on Scryfall, it’s not required. Other search engines for <i>Magic</i> cards exist too—such as <a href="https://gatherer.wizards.com/" target="_blank">Gatherer<svg><use href="#open-in-new-icon" /></svg></a>, and several online stores that sell <i>Magic</i> card singles.</p>
			<p>Whenever you find a good card for your deck from your search, you can then return to MTG Deck Builder and enter that card’s name (or its Scryfall page URL) in the <a href="#card-adder">card adder</a>.</p>
		</section>

		<section id="card-adder">
			<h4>Card Adder</h4>
			<p>
				<img class="screenshot"
					src="@/img/manual-card-adder.jpg" width="810" height="173"
					alt="Snippet of card adder" title="Screenshot" loading="lazy"
				/>
			</p>
			<p>The card adder is a tool that lets you indicate a new name of a <i>Magic: The Gathering</i> card to put into your deck. The card adder appears in the section labeled “Add a New Card Name” in the <a href="#list-editor">List Editor</a>.</p>
			<p>The card adder will insert the new name into the <a href="#card-list">card list</a> for either the main or the sideboard card group, whichever one that the <a href="#card-groups">card group switch</a> is currently set to. The background color of the card adder section changes as the group does: It appears dark gray when on main, and brown when on sideboard.</p>
			<p>The card adder has a simple submission form that has a text field where you can enter a query for a card. There are three kinds of queries: <a href="#card-name-query">card names</a>, <a href="#scryfall-url-query">Scryfall card page URLs</a>, and the <a href="#random-card-query">“#random” code</a>.</p>
			<p>To submit your query in the card adder, click the “+” (plus sign) button (located to the right of the text field), or by pressing the Enter/Return key on your keyboard.</p>
			<p>The card adder works with only one card name at a time. To add <em>multiple</em> names at a time, go to the <router-link to="card-list-entry">Card List Entry</router-link> page instead.</p>

			<section id="card-name-query">
				<h5>Card Name Query</h5>
				<p>In the <a href="#card-adder">card adder</a>, simply enter the certain name of a <i>Magic</i> card, and that name will be included in the <a href="#card-list">card list</a>. While you start typing letters into the card adder’s text field, a small list of selectable suggestions for card names will appear by it.</p>
				<p>When you submit a card name query, if it turns out to be an invalid name, the app will notify you of the mistake. If a card name has been printed in multiple <i>Magic</i> sets, then usually the one from the last released set is retrieved.</p>
			</section>
			<section id="scryfall-url-query">
				<h5 >Scryfall Card Page URL Query</h5>
				<p>The website <a href="https://scryfall.com" target="_blank">Scryfall<svg><use href="#open-in-new-icon" /></svg></a> has individual pages for every print of every card in <i>Magic</i>. For any card’s page on Scryfall, you can copy that page’s URL from your web browser’s web address bar, then paste that URL into the <a href="#card-adder">card adder</a> on MTG Deck Builder. The respective card name will be automatically added to your deck.</p>
				<p>The query for a Scryfall card page URL is useful for adding a card of a certain name that has been printed in multiple <i>Magic</i> sets, but the print you get by default through the <a href="#card-name-query">card name query</a> isn’t the one you prefer. You may want a specific alternative print of card because that print’s <a href="#card-image">image</a> depicts a different illustration or card set symbol from the other prints’ images.</p>
				<p>For example, if you submit the URL<br>
				<code class="long-url">https://scryfall.com/card/wc97/sg299/giant-growth</code><br>
				in the card adder, then you’d get the card Giant Growth in a particular special-edition print that had been released in 1997. That Giant Growth print is different from the one you’d get if you submit just the name “Giant Growth” instead in the card adder.</p>
				<p>You can submit a Scryfall URL for a card name that already exists in your deck’s active <a href="#card-list">card list</a>, but is in a different print. In this case, the app will ask you to confirm whether you want the queried print to replace the existing one.</p>
				<p>Note that URL queries in the card adder only work when they direct to card pages on Scryfall. They won’t work with other websites.</p>
			</section>
			<section id="random-card-query">
				<h5>Random Card Query</h5>
				<p>To add the name of a random <i>Magic</i> card to your deck, submit the special code <strong><code>#random</code></strong> in the <a href="#card-adder">card adder</a>. Your web browser may also show “#random” as a selectable option when the card adder’s text field gains browser focus.</p>
				<p>The cards that can be added through this random query are ones with the following criteria: They’re legal to play in the Commander format (which includes the vast majority of <i>Magic</i> cards), are available as physical cards (rather than digital versions), are <em>not</em> from a <i>Universes Beyond</i> edition, and are in English.</p>
			</section>
			<section id="card-adder-other-info">
				<h5>Other Information About the Card Adder</h5>
				<ul>
					<li>
						<p>You can press the <kbd>X</kbd> key to have your web browser focus onto the <a href="#card-adder">card adder</a>’s text field. Then, if you change your mind, press <kbd class="">Esc</kbd> to cancel your browser’s focus on the text field, letting you use other <router-link to="keyboard-shortcuts">keyboard shortcuts</router-link>.</p>
					</li>
					<li>
						<p>Card queries are case insensitive (meaning it doesn’t matter whether you type any letters as uppercase or lowercase).</p>
					</li>
					<li>
						<p>The card adder won’t add a name that already exists in the present <a href="#card-list">card list</a>. (If you intend to add duplicates of an existing name, <a href="#card-quantities">increase its quantity</a> from the list instead.)</p>
					</li>
					<li>
						<p>When submitting a query, MTG Deck Builder sends an external data request to the Scryfall web servers, and so retrieving your card’s data may take a second or two to complete.</p>
					</li>
					<li>
						<p>Every newly added card name is put at the bottom of the card list. You can use the <a href="#card-sorter">card sorter</a> afterward to rearrange the newly added names among the rest of the list.</p>
					</li>
				</ul>
			</section>
		</section>

		<section id="add-multiple">
			<h4>“Add Multiple” Button</h4>
			<p>Located next to the <a href="#card-adder">card adder</a> in the <a href="#list-editor">List Editor</a> is the Add Multiple button. Click it if you want to go to the <router-link to="card-list-entry">Card List Entry page</router-link>.</p>
		</section>
	</section>
</template>

<script>
import GuideCardSorterOptions from '@/views/guide-chapters/CardSorterOptions.vue'

export default {
	components: { GuideCardSorterOptions }
}
</script>
