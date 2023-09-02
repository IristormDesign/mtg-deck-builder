<template>
	<section id="m-deck-actions">
		<h4>Deck Actions</h4>
		<p>The deck actions section (labeled “Do Deck Action”) has a drop-down menu from which you can choose to do special actions to your decks. The options and their effects are the following:</p>
		<ul>
			<li>
				<h5>Copy</h5>
				<p>From the <a href="#m-deck-menu">deck you’re currently viewing</a>, create another deck that’s identical to it at the time of copying.</p>
				<p>The deck copy is automatically given the same name as the origin deck, except that the copy’s has a unique number within parentheses appended to it. (You could <a href="#m-deck-name">rename</a> it afterward.)</p>
				<p>Immediately after copying, the app takes you to the copy’s <a href="#m-deck-pages">deck page</a>.</p>
			</li>
			<li>
				<h5>Export</h5>
				<p>You’re taken to the Export Decks page, where you can select any of your decks in MTG Deck Builder to “export,” which means to have the app generate a <a href="#m-deck-data-files">deck data file</a> of them. This file gets saved on your computer or device to wherever your web browser puts downloads.</p>
				<p>With a deck data file, you—or anyone whom you give the file to—can “<a href="#m-create-deck">import</a>” it, which means to have the app recreate the whole decks from the data contained in the file.</p>
				<p>If you export a single deck alone, the deck data file is named after that deck’s name. If you export multiple decks together, the file is named “My Decks.” In either case, the file has “.deck” as its file extension.</p>
			</li>
			<li>
				<h5>Delete</h5>
				<p>You’re taken to the Delete Decks page, where you can select any of your decks to permanently remove from MTG Deck Builder. (If you’d later try to access the URL that belonged to the deck page of a deleted deck, then you’d be redirected to a “Page Not Found” error page instead.)</p>
			</li>
		</ul>
	</section>
</template>
