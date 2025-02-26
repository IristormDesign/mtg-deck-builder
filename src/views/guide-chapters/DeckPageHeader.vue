<template functional>
	<section id="deck-page-header" key="deck-page-header">
		<h3>Deck Page Header</h3>
		<p>By the top of a <router-link to="deck-pages">deck page</router-link> is the deck page header, which is always present across every <router-link to="deck-pages#deck-page-modes">deck page mode</router-link>. The deck page header consists of the following sections:</p>
		<ul>
			<li><a href="#deck-name">Deck name</a></li>
			<li><a href="#basic-statistics">Basic statistics</a></li>
			<li><a href="#mode-menu">Mode menu</a></li>
			<li><a href="#deck-actions">Deck actions</a></li>
		</ul>
		<p>The next subchapters explain each of those sections in more detail.</p>

		<section id="deck-name">
			<h4>Deck Name</h4>
			<p>
				<img class="screenshot float-left"
					srcset="@/img/manual-deck-name.jpg 1x, @/img/manual-deck-name-2x.jpg 1.5x"
					src="@/img/manual-deck-name.jpg" width="266" height="117"
					alt="Snippet of deck name link" title="Screenshot" loading="lazy"
				/>
			</p>
			<p>In the <a href="#deck-page-header">deck page header</a>, the deck name section displays the name of your currently <router-link to="app-header#deck-menu">open deck</router-link>. The name itself is a link that you can click to rename the deck.</p>
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
			<p>The <a href="#deck-page-header">deck page header</a>’s basic statistics section shows some data about how your currently <router-link to="app-header#deck-menu">open deck</router-link> is composed.</p>
			<p>All but one of these statistics regard your deck’s main card group alone (<em>not</em> also the <router-link to="list-editor#sideboard-uses">sideboard group</router-link>). Also all but one of these statistics account for the <router-link to="list-editor#card-quantities">quantities</router-link> of each card name. Whenever you modify your deck, these statistics immediately update as needed.</p>
			<p>The basic statistics section displays the following deck information:</p>
			<ul>
				<li>
					<p><strong>Mana Colors</strong> – This shows the symbols of whichever of the five mana colors are required for mana costs among spells in the main card group. The colors are ordered from most to least frequent in your deck. If a color is equally frequent to another, then they’re ordered by Wizards of the Coast’s conventional order of them: white, blue, black, red, green.</p>
				</li>
				<li>
					<p><strong>Average Mana Value</strong> – This shows the arithmetic mean of mana values among spells in the main card group. (Mana value is also known by the older term “converted mana cost.”)</p>
				</li>
				<li>
					<p><strong>Last Edit</strong> – This shows the date and time of when your deck was most recently modified (or <router-link to="create-deck">created</router-link>, if it’s a new deck). The actions of <router-link to="list-editor#card-adder">adding a new card name</router-link>, <router-link to="list-editor#card-quantities">changing a card name’s quantity</router-link>, <router-link to="list-editor#card-stars">starring a card name</router-link>, and <a href="#deck-name">renaming the deck</a> count as edits. Last Edit involves both card groups (main and sideboard).</p>
				</li>
				<li>
					<p><strong>Card Names</strong> – This shows the sum of distinct card names in the main card group. The sum doesn’t account for any plural quantities of card names.</p>
				</li>
				<li>
					<p><strong>Total Cards</strong> – This shows the sum of every card (including any repeated card names) in the main card group. A “⚠” (warning symbol) appears beside the number when the total is fewer than 60, which is the minimum limit for decks by <i>Magic</i>’s standard <router-link to="intro#game-rules">game rules</router-link>; or when the total is close to but not exactly 100, which is the requirement for decks in the Commander format.</p>
				</li>
			</ul>
			<p>Note that these basic statistics displayed in the deck page header are only a small portion of all the statistics available to you in MTG Deck Builder. You can view even more deck data in the <router-link to="stats-analyzer">Stats Analyzer mode</router-link>.</p>
		</section>

		<section id="mode-menu">
			<h4>Mode Menu</h4>
			<p>The mode menu is a section of the <router-link to="deck-page-header">deck page header</router-link> that consists of a row of tabs, one for each <router-link to="deck-pages#deck-page-modes">deck page mode</router-link>: the <router-link to="list-editor">List Editor</router-link>, the <router-link to="stats-analyzer">Stats Analyzer</router-link>, the <router-link to="draw-sim">Draw Simulator</router-link>, and the <router-link to="text-renderer">Text Renderer</router-link>.</p>
			<p>Click a tab in the mode menu, or use a <router-link to="keyboard-shortcuts#kbsc-deck-page-modes">keyboard shortcut</router-link>, to set the <router-link to="deck-pages">deck page</router-link> to your chosen mode. The active mode’s tab is highlighted with a gray background.</p>
		</section>

		<section id="deck-actions">
			<h4>Deck Actions</h4>
			<p>In the <a href="#deck-page-header">deck page header</a>, click the Deck Actions button to display a dropdown menu with options that let you do special actions to your decks. These actions are <a href="#duplicate-action">duplicate</a>, <a href="#archive-action">archive</a>, and <a href="#delete-action">delete</a>, and their effects are explained in the next subchapters.</p>

			<section id="duplicate-action">
				<h5>Duplicate</h5>
				<p>You can instantly create a new deck that starts as an identical copy of the <router-link to="app-header#deck-menu">deck you’re currently viewing</router-link> at the time of duplication.</p>
				<p>To do so, select Duplicate from the <a href="#deck-actions">Deck Actions</a> menu. The app prompts you to give the duplicate deck a <router-link to="#deck-name">unique name</router-link>.</p>
				<p>Immediately after duplicating, you’re directed to the <router-link to="deck-pages">deck page</router-link> of the duplicate.</p>
			</section>

			<section id="archive-action">
				<h5>Archive</h5>
				<p>In MTG Deck Builder, to “archive” a deck means to have the app make for you a <router-link to="storage-of-deck-data#deck-archive-files">deck archive file</router-link> from any decks whose data is <router-link to="storage-of-deck-data">stored in this app</router-link>.</p>
				<p>A deck archive file has the complete copied data of chosen decks. Anyone who has a deck archive file—whether yourself or someone whom you’ve sent the file to—can <router-link to="create-deck#replicate-archived-decks">replicate the decks</router-link> from its data.</p>
				<p>In the <a href="#deck-actions">Deck Actions</a> menu, select “Archive&hellip;” to go to the Archive Decks page. From there, select at least one of your decks to archive. The archive file is saved on your computer or phone to wherever your web browser puts downloads.</p>
				<p>If you archive one deck alone, then the archive file is automatically named after that deck’s name. If you archive multiple decks together, then the file is automatically named “My Decks.” You may rename the file whatever you want, as long as you keep its “.deck” file extension.</p>
			</section>

			<section id="delete-action">
				<h5>Delete</h5>
				<p>In the <a href="#deck-actions">Deck Actions</a> menu, select “Delete&hellip;” to go to the Delete Decks page. From there, you can select any decks to permanently remove from your web browser’s <router-link to="storage-of-deck-data">data storage</router-link> for MTG Deck Builder.</p>
				<p>After a deck is deleted, if you’d try to go back to the URL that had belonged to that <router-link to="deck-pages">deck’s page</router-link>, then you’d be redirected to an “Error: Page Not Found” page instead.</p>
			</section>
		</section>
	</section>
</template>
