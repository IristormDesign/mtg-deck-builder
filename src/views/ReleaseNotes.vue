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
			<p>Updates usually include at least minor optimizations, minor visual tweaks, or minor text revisions. Because those types of changes are trivial and frequent, they’re not announced in every release note, even when those changes are made.</p>
		</header>

		<section>
			<h3>2025 Releases</h3>

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
					<p>An under-the-hood adjustment has boosted this app’s loading speed. However, it could cause some parts of the app to break, but only for the few people who are still using long-outdated web browsers. If you use any modern web browser, you shouldn’t notice any new problems (but <router-link to="/contact">let the developer know</router-link> if you do).</p>
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
				<li>The List Editor has a pop-up tip explaining the different ways you can add cards to your deck.</li>
				<li>In the Stats Analyzer, the attribute “not starred” is renamed “un-starred.”</li>
			</ul>

			<h4>May 4 <span class="side-note">(logged retroactively)</span></h4>
			<ul>
				<li>Many images throughout the app display in a higher resolution.</li>
				<li>A graphical glitch in the Stats Analyzer is fixed.</li>
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
