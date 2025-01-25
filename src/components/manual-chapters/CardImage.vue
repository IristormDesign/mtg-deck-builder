<template functional>
	<section id="card-image" key="card-image">
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
		<p>Whenever you <a href="#card-adder">add a card name</a> to the card list, or whenever you navigate up or down the list’s rows by <a href="#keyboard-shortcuts">pressing the <kbd>W</kbd> or <kbd>S</kbd> keys</a>, the relevant image is automatically shown.</p>
		<p>To look at the card image up closer, hover your mouse pointer over it, or press <kbd>C</kbd>.</p>
		<p>If you’re using MTG Deck Builder on a phone instead of a computer with a larger screen, then the card image is normally invisible. You can still look at any card’s image by tapping the card’s bar in the card list, which makes the image appear hovering over the page. Then, to hide the image, tap the “X” button by the page’s top-right corner.</p>
		<p>Click/tap the image, or press <span class="no-text-break"><kbd class="shift-key">Shift</kbd>+<kbd>C</kbd></span>, to see that card’s page on <a href="https://scryfall.com/" target="_blank">Scryfall</a>, which opens in a new browser tab. Scryfall is a search engine and database for <i>Magic</i> cards.</p>
		<p>Whenever the displayed image is of a double-faced card, a button labeled “Turn Over” appears below the image. Click that button, or press <kbd>Z</kbd>, to see the card’s back face.</p>
	</section>
</template>
