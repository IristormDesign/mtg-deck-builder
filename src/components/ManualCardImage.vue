<template>
	<section id="m-card-image">
		<p>
			<img class="screenshot float-left"
				srcset="@/img/manual-card-image.jpg 1x, @/img/manual-card-image-2x.jpg 1.5x"
				src="@/img/manual-card-image.jpg" width="265" height="356"
				alt="Snippet of card image" title="Screenshot" loading="lazy" />
		</p>
		<h4>Card Image</h4>
		<p>This section shows the image of a scanned card pertaining to the last selected card in the current <a href="#m-card-list">card list</a>.</p>
		<p>If you’re viewing this app on a mobile device instead of a larger computer screen, then this section is usually invisible, but you can still tap on any card button in the card list to make the card image appear as a popup over the page.</p>
		<p>You can click on the image itself to open that card’s page on <a href="https://scryfall.com/" target="_blank" rel="noopener noreferrer">Scryfall</a>, which is a search engine and database for <i>Magic</i> cards (and it’s also where MTG Deck Builder gets its card data from).</p>
	</section>
</template>
