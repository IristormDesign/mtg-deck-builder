<template>
	<section id="m-card-image">
		<h4>Card Image</h4>
		<p>
			<img class="screenshot float-left"
				srcset="@/img/manual-card-image.jpg 1x, @/img/manual-card-image-2x.jpg 1.5x"
				src="@/img/manual-card-image.jpg" width="265" height="356"
				alt="Snippet of card image" title="Screenshot" loading="lazy" />
		</p>
		<p>In the <a href="#m-deck-editor">Deck Editor</a>, the card image section shows the image of a scanned <i>Magic</i> card that pertains to the last selected <a href="#m-card-buttons">card button</a> from your deck’s active <a href="#m-card-list">card list</a>.</p>
		<p>If you’re using MTG Deck Builder on a mobile device instead of a computer with a larger screen, then the image is normally invisible. You can still look at any card’s image by tapping on a button in the card list, which makes the image appear hovering over the page. Then, to hide the image, tap on the “X” button by the page’s top-right corner.</p>
		<p>You can click/tap on the image itself to open that card’s page on <a href="https://scryfall.com/" target="_blank">Scryfall</a>, which is a search engine and database for <i>Magic</i> cards (and it’s also where MTG Deck Builder gets card data from).</p>
		<p>When the card you’re viewing is double-faced, a button labeled “Turn Over” appears below the image. You can click that button to see the card’s back face.</p>
	</section>
</template>
