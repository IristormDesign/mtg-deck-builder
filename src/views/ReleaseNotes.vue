<template>
	<article class="release-notes content-box">
		<header>
			<h2>Release Notes</h2>

			<figure class="card-illustration">
				<img
					src="@/img/take-flight.jpg"
					srcset="@/img/take-flight.jpg 1x, @/img/take-flight@2x.jpg 2x"
					width="469" height="344"
					alt="An illustration of a crowd of amazed people running alongside a flying dragon-like fantasy vehicle"
				/>
				<figcaption>Illustration from <a href="https://scryfall.com/card/bro/65/take-flight" target="_blank">Take Flight<svg><use href="#open-in-new-icon" /></svg></a> by Joshua Cairos</figcaption>
			</figure>
			<p>MTG Deck Builder by Iristorm Design is a work-in-progress, and so it’s been updated often. This page logs the changes made in each update, starting from the latest release.</p>
			<p>Updates usually include at least minor optimizations, minor visual tweaks, or minor text revisions. Because those types of changes are trivial and frequent, they’re not announced in each release note, even when those changes are made.</p>
			<p>If you’ve discovered that a recent update in MTG Deck Builder has caused a bug, please <router-link to="/contact">report it to the app developer</router-link> so that it can be fixed!</p>
		</header>

		<section>
			<h3>2025 Releases</h3>

			<h4>July 4</h4>
			<ul>
				<li>
					<p>✨ <strong>Sort by Mana Sources</strong> ✨ – In the List Editor, the card sorter has gained a new sorting option: mana sources! This method rearranges your deck’s cards by their number of producible mana colors and by their particular combination of producible mana colors. This may be especially helpful in decks that have a large variety of lands and other mana sources so that you can more readily distinguish between them.</p>
				</li>
			</ul>

			<h4>July 2</h4>
			<ul>
				<li>
					<p>In the Stats Analyzer, when using a data filter, most statistics categories’ tables automatically get their rows re-sorted by quantity from most to least.</p>
				</li>
				<li>
					<p>Bug fix: In the Stats Analyzer’s Layout category, selecting the “Normal” layout hadn’t filtered card data correctly.</p>
				</li>
				<li>
					<p>Many code optimizations and some visual adjustments are made to the Stats Analyzer.</p>
				</li>
			</ul>

			<h4>July 1</h4>
			<ul>
				<li>
					<p>✨ <strong>Name Statistics</strong> ✨ – The Stats Analyzer includes two whole new statistics categories. One is the “Name” category, which displays the numbers of each card name in your deck.</p>
					<p>Though the Name category by itself isn’t very useful, you could refer to it in conjunction with data filters by other statistics categories to understand which specific cards are being currently filtered.</p>
				</li>
				<li>
					<p>✨ <strong>Producible Mana Colors Statistics</strong> ✨ – The other new statistics category in the Stats Analyzer is “Producible Mana Colors.” This displays the numbers of each mana color that can be generated among your deck’s cards.</p>
					<p>If you have decks in this app that had been created before this version release, then the Stats Analyzer won’t display the Producible Mana Colors category until your deck’s card data set has been updated. If a deck’s data set is outdated, a message will appear on the deck page saying so, and will give you the option to make it update. Newly created decks and cards that you add to any decks after this release will <em>not</em> need to be updated, however.</p>
				</li>
			</ul>

			<h4>June 30</h4>
			<ul>
				<li>
					<p>In the List Editor and Draw Simulator, when hovering your mouse pointer over the card image, the image now rises to a slightly upward position while the page is at a high enough scroll position.</p>
				</li>
				<li>
					<p>Various optimizations and bug fixes are made.</p>
				</li>
			</ul>

			<h4>June 28</h4>
			<ul>
				<li>
					<p>In the List Editor, a bug involving the “move to other card group” button is fixed.</p>
				</li>
				<li>
					<p>Various optimizations and minor visual tweaks are made.</p>
				</li>
			</ul>

			<h4>June 26</h4>
			<ul>
				<li>
					<p>In the deck page header’s Mana Colors statistic, the order of mana color symbols is now slightly different: It’s still ordered from most to least frequent, but now it’s by the combined number of the total of number of cards per mana color plus the deck’s total number of each color symbol in mana costs. (Previously, it had been the former factor alone.)</p>
					<p>This reordering of mana color symbols is also reflected in decks in the app header’s “Open Deck” menu and the app footer’s “Recently Opened” menu.</p>
				</li>
				<li>
					<p>Decks containing no cards of any colored mana are now marked with the colorless mana symbol.</p>
				</li>
			</ul>

			<h4>June 21</h4>
			<ul>
				<li>
					<p>In the List Editor, the card sorter has a pop-up tip explaining each card-sorting option.</p>
				</li>
				<li>
					<p>In the Stats Analyzer, Phyrexian mana symbols are now counted distinctively from hybrid mana symbols.</p>
				</li>
				<li>
					<p>Significant optimizations are made to the app’s code, improving performance.</p>
				</li>
			</ul>

			<h4>June 17</h4>
			<ul>
				<li>
					<p>In the List Editor, when you click the quantity text field for any card, the quantity number becomes automatically highlighted so that you can replace that number with a new one right away. (This effect doesn’t work if you’re using the Safari web browser, but you can double-click on the quantity text field instead.)</p>
				</li>
				<li>
					<p>In the List Editor, the card sorter option “P/T sum” is renamed to just “P/T.”</p>
				</li>
			</ul>

			<h4>June 14</h4>
			<ul>
				<li>
					<p>The Donation Request page has an option to donate through Stripe (in addition to the PayPal option).</p>
				</li>
				<li>
					<p>Various minor improvements to the user interface and optimizations are made.</p>
				</li>
			</ul>

			<h4>June 10</h4>
			<ul>
				<li>
					<p>Parts of the app’s code have been significantly optimized, which should improve loading speed.</p>
				</li>
				<li>
					<p>Various minor visual enhancements and bug fixes are made.</p>
				</li>
			</ul>

			<h4>June 4</h4>
			<ul>
				<li>
					<p>Major bug fix: A mistake in the previous update had caused <em>all</em> card requests to show an error message, even when the card had been successfully added anyway.</p>
				</li>
				<li>
					<p>The colors of mana symbols are adjusted to be slightly more vibrant, and the colors of card bar surfaces are adjusted to be slightly less vibrant.</p>
				</li>
			</ul>

			<h4>June 3</h4>
			<ul>
				<li>
					<p>The colored mana symbols are now shown as their graphical symbols as seen on <i>Magic</i> cards (instead of being represented by an English letter).</p>
				</li>
				<li>
					<p>Major bug fix: In the List Editor’s card adder, if you had tried to submit a card name that isn’t valid, then the card adder would appear to load forever instead of displaying an error notice.</p>
				</li>
			</ul>

			<h4>June 1</h4>
			<ul>
				<li>
					<p>✨ In the app’s page footer, there’s a new section where you can see and open your recently opened decks.</p>
				</li>
				<li>
					<p>On a deck page, the ability to rename the deck has been moved from the deck’s name as a link to a new action button in the Deck Actions menu.</p>
				</li>
				<li>
					<p>The link to the Release Notes page has been removed from the app’s page footer and put onto the home page instead.</p>
				</li>
				<li>
					<p>Minor bug fixes.</p>
				</li>
			</ul>

			<h4>May 28</h4>
			<ul>
				<li>
					<p>An under-the-hood adjustment has boosted this app’s loading speed. However, it could cause some parts of the app to break, but only for the few people who are still using long-outdated web browsers. If you use any modern web browser, you shouldn’t notice any new problems.</p>
				</li>
				<li>
					<p>Bug fix: If you used this app in the Safari web browser, and if you printed a deck’s lists from List Takeout, then Safari had caused an extra, blank page to be printed if you had enabled the print setting for page headers and footers.</p>
				</li>
				<li>
					<p>Various minor bugs are fixed, and various minor tweaks to the user interface are made.</p>
				</li>
			</ul>

			<h4>May 25</h4>
			<ul>
				<li>
					<p>The deck page mode formerly known as Text Renderer is renamed List Takeout. This mode’s icon in the mode menu is replaced, too.</p>
				</li>
				<li>
					<p>Various elements, especially headings and the tabs of the deck page mode menu, have slight visual enhancements.</p>
				</li>
				<li>
					<p>Bug fix: For users of Apple’s Safari web browser, if you had tried to print out a large card list in List Takeout (previously Text Renderer), it couldn’t lay out the list across three columns as it’s supposed to. (This bug had never happened in other modern browsers, only Safari.)</p>
				</li>
			</ul>

			<h4>May 23</h4>
			<p>This release is extra big, with multiple major changes as well as minor ones, as follows:</p>
			<h5>Major Changes</h5>
			<ul>
				<li>
					<p>✨ <strong>Multiple Browser Tabs</strong> ✨ – You can safely have this app opened in more than one tab in your web browser at the same time. There’s no longer the risk of accidentally undoing your recent edits to your decks on other opened tabs. A technical change to the way this app manages data has resolved that problem.</p>
				</li>
				<li>
					<p>✨ <strong>P/T Sum Sorts Planeswalkers</strong> ✨ – In the List Editor, when you sort cards by P/T sum, each planeswalker card is treated as if it has a P/T sum, where its power is 0 and its toughness is equal to its loyalty number.</p>
					<p>This change might not take effect immediately for you. If you have a deck that already contained a planeswalker before this app release, then you’ll see a notice on the deck page informing you to update the deck’s data set. For decks to which you add planeswalkers <em>after</em> this app release, or for decks that have no planeswalkers, they won’t need a data set update.</p>
				</li>
				<li>
					<p>✨ <strong>Release Notes</strong> ✨ – The app has a new page, Release Notes. (But you already know that!) Additionally, the app’s footer and the app update notification banner each provide a link to this page.</p>
				</li>
			</ul>

			<h5>Minor Changes</h5>
			<ul>
				<li>
					<p>From now on, app updates are identified by their date of release instead of a version number.</p>
				</li>
				<li>
					<p>The user interface for updating decks’ data sets is improved, and the update process is better prepared to handle failed attempts.</p>
				</li>
				<li>
					<p>Bug fix: When you sort cards by mana color, a sorting cluster gap failed to appear in the card list under a certain condition.</p>
				</li>
				<li>
					<p>When you sort cards by first subtype or last subtype, list gaps are no longer inserted between every sorted cluster of subtypes. The reason for this change is that the usually large number of gaps had made the list look too cluttered. One gap is still inserted in the list between the cards with subtypes and the cards without.</p>
				</li>
				<li>
					<p>If you use a mouse, the standard web browser behavior of middle-clicking links is restored. That is, you can middle-click any link to open the linked page in a new browser tab. (Formerly, middle-clicking on internal links in this app had been purposely disabled. The reason was to avoid the bug about opening multiple tabs, but that’s fixed now, as explained in a note above.)</p>
				</li>
			</ul>

			<h4>May 6 <span class="side-note">(logged retroactively)</span></h4>
			<ul>
				<li>
					<p>The List Editor has a pop-up tip explaining the different ways you can add cards to your deck.</p>
				</li>
				<li>
					<p>In the Stats Analyzer, the attribute “not starred” is renamed “un-starred.”
					</p>
				</li>
			</ul>

			<h4>May 4 <span class="side-note">(logged retroactively)</span></h4>
			<ul>
				<li>
					<p>Many images throughout the app display in a higher resolution.
					</p>
				</li>
				<li>
					<p>A graphical glitch in the Stats Analyzer is fixed.
					</p>
				</li>
			</ul>
		</section>

		<section>
			<h3>Earlier Releases</h3>
			<p>MTG Deck Builder has been through many other versions since its original in 2021, but release notes hadn’t been written before what’s published on this page.</p>
		</section>
	</article>
</template>

<script>
export default {
	metaInfo: {
		title: 'Release Notes'
	}
}
</script>
