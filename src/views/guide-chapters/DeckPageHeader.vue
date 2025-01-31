<template functional>
	<section id="deck-page-header" key="deck-page-header">
		<h3>Deck Page Header</h3>
		<p>By the top of a <a href="#deck-pages">deck page</a> is the deck page header, which comprises the following sections:</p>
		<ul>
			<li><a href="#deck-name">Deck name</a></li>
			<li><a href="#basic-statistics">Basic statistics</a></li>
			<li><a href="#mode-menu">Mode menu</a></li>
			<li><a href="#deck-actions">Deck actions</a></li>
		</ul>
		<p>Each of these sections is going to be explained in more detail.</p>
		<p>The deck page header always exists on a deck page, regardless of whichever <a href="#deck-page-modes">deck page mode</a> is active.</p>

		<section id="deck-name">
			<h4>Deck Name</h4>
			<p>
				<img class="screenshot float-left"
					srcset="@/img/manual-deck-name.jpg 1x, @/img/manual-deck-name-2x.jpg 1.5x"
					src="@/img/manual-deck-name.jpg" width="266" height="117"
					alt="Snippet of deck name link" title="Screenshot" loading="lazy"
				/>
			</p>
			<p>In the <a href="#deck-page-header">deck page header</a>, the deck name section displays the name of your currently <a href="#deck-menu">open deck</a>. The name itself is a link that you can click to rename the deck.</p>
		</section>

		<section id="basic-statistics">
			<h4>Basic Statistics</h4>
			<p>
				<img class="screenshot"
					srcset="@/img/manual-deck-statistics.jpg 1x, @/img/manual-deck-statistics-2x.jpg 1.5x"
					src="@/img/manual-deck-statistics.jpg" width="658" height="63"
					alt="Screenshot of basic statistics section" title="Screenshot" loading="lazy"
				/>
			</p>
			<p>The <a href="#deck-page-header">deck page header</a>’s basic statistics section shows some data about how your currently <a href="#deck-menu">open deck</a> is composed.</p>
			<p>All but one of these statistics regard your deck’s main <a href="#card-groups">card group</a> alone (not also the sideboard). Also all but one of these statistics account for card names’s quantities. Whenever you modify your deck, the statistics immediately update as needed.</p>
			<p>The basic statistics section displays the following deck information:</p>
			<ul>
				<li>
					<p><strong>Mana Colors</strong> – This shows the symbols of whichever of the five mana colors are required for mana costs among spells in the main card group. The colors are ordered from most to least frequent in your deck. If a color is equally frequent to another, then they’re ordered by Wizards of the Coast’s conventional order of them: white, blue, black, red, green.</p>
				</li>
				<li>
					<p><strong>Average Mana Value</strong> – This shows the arithmetic mean of mana values among spells in the main card group. (Mana value is also known by the older term “converted mana cost.”)</p>
				</li>
				<li>
					<p><strong>Last Edit</strong> – This shows the date and time of when your deck was most recently modified (or <a href="#create-deck">created</a>, if it’s a new deck). The actions of <a href="#card-adder">adding a new card name</a>, <a href="#card-quantities">changing a card name’s quantity</a>, <a href="#card-stars">starring a card name</a>, and <a href="#deck-name">renaming the deck</a> count as edits. Last Edit involves both card groups (main and sideboard).</p>
				</li>
				<li>
					<p><strong>Card Names</strong> – This shows the sum of distinct card names in the main card group. The sum doesn’t account for any plural quantities of card names.</p>
				</li>
				<li>
					<p><strong>Total Cards</strong> – This shows the sum of every card (including any repeated card names) in the main card group. A “⚠” (warning symbol) appears beside the number when the total is fewer than 60, which is the minimum limit for decks by <i>Magic</i>’s standard <a href="#game-rules">game rules</a>; or when the total is close to but not exactly 100, which is the requirement for decks in the Commander format.</p>
				</li>
			</ul>
			<p>Note that these basic statistics displayed in the deck page header are only a small portion of all the statistics available to you in MTG Deck Builder. You can view even more deck data in the <a href="#stats-analyzer">Stats Analyzer mode</a>.</p>
		</section>

		<section id="mode-menu">
			<h4>Mode Menu</h4>
			<p>The mode menu is a section of the <a href="#deck-page-header">deck page header</a> that features a tab for each <a href="#deck-page-modes">deck page mode</a>. (The modes are the <a href="#list-editor">List Editor</a>, <a href="#stats-analyzer">Stats Analyzer</a>, <a href="#draw-sim">Draw Simulator</a>, and <a href="#text-renderer">Text Renderer</a>.)</p>
			<p>Click a tab in the mode menu, or use a <a href="#kbsc-deck-page-modes">keyboard shortcut</a>, to set the <a href="#deck-pages">deck page</a> to your chosen mode. The active mode’s tab is highlighted with a gray background.</p>
		</section>

		<section id="deck-actions">
			<h4>Deck Actions</h4>
			<p>In the <a href="#deck-page-header">deck page header</a>, click the “Deck Actions” button to display a dropdown menu with options that let you do special actions to your decks. These options are “<a href="#duplicate-action">duplicate</a>,” “<a href="#archive-action">archive</a>,” and “<a href="#delete-action">delete</a>,” and their effects are explained in the next subchapters.</p>

			<section id="duplicate-action">
				<h5>Duplicate</h5>
				<p>In the <a href="#deck-actions">Deck Actions</a> menu, select the “Duplicate” option to instantly create another deck that’s an identical copy of the <a href="#deck-menu">deck you’re currently viewing</a> at the time of duplication.</p>
				<p>The app prompts you to give the duplicate deck a <a href="#deck-name">unique name</a>.
				Immediately after duplicating, you’re directed to the <a href="#deck-pages">deck page</a> of the duplicate.</p>
			</section>

			<section id="archive-action">
				<h5>Archive</h5>
				<p>In MTG Deck Builder, to “archive” a deck means to have the app make for you a <a href="#deck-archive-files">deck archive file</a> from any decks whose data is <a href="#storage-of-deck-data">stored in this app</a>.</p>
				<p>A deck archive file has the complete copied data of chosen decks. Anyone who has a deck archive file—whether yourself or someone whom you’ve sent the file to—can <a href="#create-deck">replicate the decks</a> from its data.</p>
				<p>In the <a href="#deck-actions">Deck Actions</a> menu, select the “Archive&hellip;” option to go to the “Archive Decks” page. From there, select at least one deck to archive. The archive file is saved on your computer or phone to wherever your web browser puts downloads.</p>
				<p>If you archive one deck alone, then the archive file is automatically named after that deck’s name. If you archive multiple decks together, then the file is automatically named “My Decks.” In either case, “.deck” is its file extension.</p>
			</section>

			<section id="delete-action">
				<h5>Delete</h5>
				<p>In the <a href="#deck-actions">Deck Actions</a> menu, select the “Delete” option to go to the “Delete Decks” page. From there, you can select any of your decks to permanently remove from your web browser’s <a href="#storage-of-deck-data">data storage</a> for MTG Deck Builder.</p>
				<p>After a deck is deleted, if you’d try to go back to the URL that had belonged to that <a href="#deck-pages">deck’s page</a>, then you’d be redirected to a “Page Not Found” error page instead.</p>
			</section>
		</section>
	</section>
</template>
