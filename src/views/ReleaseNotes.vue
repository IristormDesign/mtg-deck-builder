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

			<p>MTG Deck Builder by Iristorm Design has often released updates, which make various improvements to the app’s user experience. This page logs the changes in each update, starting from the most recent release.</p>
			<p>Updates usually include minor optimizations, minor visual tweaks, or minor text edits. Because those types of changes are trivial yet frequent, they’re not declared in every release note, even when those changes are made.</p>
		</header>

		<section>
			<h3>2025</h3>

			<h4>May 22</h4>
			<h5>Major Changes</h5>
			<ul>
				<li>
					<p><strong>Multiple Browser Tabs</strong> – You can safely have this app opened in multiple tabs in your web browser at the same time. There’s no longer the risk of accidentally undoing your recent edits to your decks on other opened tabs. A technical change in the way this app manages data has resolved this problem.</p>
				</li>
				<li>
					<p><strong>Sorting Planeswalkers by P/T Sum</strong> – In the List Editor, whenever you sort by P/T sum, planeswalker cards are now treated as if they have a P/T sum equal to their loyalty number.</p>
					<p>This change won’t immediately take effect in decks that already contained planeswalkers before this app release. In that case, you’ll see a notice on the deck page informing you to update the deck’s data set. For decks that you add planeswalkers to after this app release, they won’t need a data set update.</p>
				</li>
				<li>
					<p><strong>Release Notes</strong> – The app has a new page, Release Notes. (You already know that!)</p>
				</li>
			</ul>

			<h5>Minor Changes</h5>
			<ul>
				<li>
					<p>From now on, app updates will be identified by their date of release instead of a version number.</p>
				</li>
				<li>
					<p>In the User Guide, the Card Sorter chapter is revised to explain the new sorting behavior for P/T sum with planeswalkers.</p>
				</li>
				<li>
					<p>The user interface for updating decks’ data sets is improved, and the update process is more prepared to handle failed attempts.</p>
				</li>
				<li>
					<p>Bug fix: In the List Editor, when sorting by mana color, a sorting cluster gap failed to appear in the card list under certain conditions.</p>
				</li>
				<li>
					<p>If you’re using a mouse, you can now middle-click any link to open the linked page in a new tab in your web browser. This is the standard browser behavior restored. (Formerly, middle-clicking on internal links in this app had been purposely disabled. The reason was to avoid the bug involving multiple browser tabs, but that’s fixed now.)</p>
				</li>
				<li>
					<p>In the List Editor, whenever you sort by first subtype or last subtype, list gaps are no longer inserted between every sorted cluster of subtypes. The reason for this change is that the usually large number of gaps had made the list look too cluttered. One gap is still inserted in the list between the cards with subtypes and the cards without.</p>
				</li>
			</ul>

			<h4>May 6 <span class="side-note">(logged retroactively)</span></h4>
			<ul>
				<li>The List Editor has a pop-up tip explaining the different ways you can add cards.</li>
				<li>In the Stats Analyzer, the attribute “not starred” is renamed “un-starred.”</li>
			</ul>

			<h4>May 4 <span class="side-note">(logged retroactively)</span></h4>
			<ul>
				<li>Many images throughout the app can display in a higher-resolution version.</li>
				<li>A graphical glitch in the Stats Analyzer is fixed.</li>
			</ul>
		</section>
		<section>
		<h3>Earlier Releases</h3>
			<p>MTG Deck Builder has had many other releases since its first in 2021, but release notes weren’t written before May 22, 2025.</p>
		</section>
	</article>
</template>
