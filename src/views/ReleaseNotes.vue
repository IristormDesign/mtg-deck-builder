<template>
	<article class="release-notes content-box">
		<header>
			<h2>Release Notes</h2>

			<figure class="card-illustration">
				<img
					src="@/img/sylvan-messenger.jpg"
					srcset="@/img/sylvan-messenger.jpg 1x, @/img/sylvan-messenger@2x.jpg 2x"
					width="469" height="342"
					alt="An illustration of an elf blowing a horn"
				/>
				<figcaption>Illustration from <a href="https://scryfall.com/card/ori/199/sylvan-messenger" target="_blank">Sylvan Messenger<svg><use href="#open-in-new-icon" /></svg></a> by Anthony Palumbo</figcaption>
			</figure>

			<p>MTG Deck Builder by Iristorm Design gets updates for improving the app’s user experience. This page logs the changes in each updated version, starting from the most recent release.</p>
			<p>Updates usually include at least minor optimizations, minor visual tweaks, or minor text edits. Because those types of changes are trivial and frequent, they’re not announced in every release note, even when those changes are made.</p>
		</header>

		<section>
			<h3>2025 Releases</h3>

			<h4>May 23</h4>
			<h5>Major Changes</h5>
			<ul>
				<li>
					<p>✨ <strong>Multiple Browser Tabs</strong> ✨ – You can safely have this app opened in multiple tabs in your web browser at the same time. There’s no longer the risk of accidentally undoing your recent edits to your decks on other opened tabs. A technical change to the way this app manages data has resolved that problem.</p>
				</li>
				<li>
					<p>✨ <strong>P/T Sum Sorts Planeswalkers</strong> ✨ – In the List Editor, when you sort cards by P/T sum, each planeswalker card is treated as if it has a P/T sum, where its power is 0 and its toughness is equal to its loyalty number.</p>
					<p>This change might not take effect immediately for you. If you have a deck that already contained a planeswalker before this app release, then you’ll see a notice on the deck page informing you to update the deck’s data set. For decks to which you add planeswalkers <em>after</em> this app release, they won’t need a data set update.</p>
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
				<li>The List Editor has a pop-up tip explaining the different ways you can add cards.</li>
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
			<p>MTG Deck Builder has had many other versions since its original in 2021, but release notes hadn’t been written before what’s published on this page.</p>
		</section>
	</article>
</template>
