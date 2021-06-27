<template>
	<article
		class="home-page"
		@click="$store.getters.attentionHeaderButton"
	>
		<section class="intro">
			<img
				srcset="
					@/img/welcome-2560.jpg 2560w,
					@/img/welcome-1920.jpg 1920w,
					@/img/welcome-1440.jpg 1440w,
					@/img/welcome-1080.jpg 1080w"
				src="@/img/welcome-1920.jpg"
				width="1920" height="1080" alt="Fantasy illustration"
			/>
			<div class="wrap">
				<div class="text-box">
					<header>
						<h2>Greetings, planeswalker.</h2>
					</header>
					<p>This app lets you <strong>build and organize your decks</strong> for <i>Magic: The Gathering</i>.</p>
					<p>Click the <strong>Open Deck</strong> button above to <strong>view a pre-made deck</strong>. Or, click the <strong>Create Deck</strong> button above to <strong>start a new one</strong>!</p>
					<p>For <strong>help</strong>, click the <strong>Manual</strong> button above.</p>
				</div>
			</div>
		</section>
		<section class="app-features">
			<div class="wrap">
				<img
					srcset="@/img/deck-page-screenshot.jpg 1x, @/img/deck-page-screenshot-2x.jpg 2x"
					src="@/img/deck-page-screenshot.jpg" width="668" height="575"
					alt="Screenshot of MTG Deck Builder" loading="lazy" />
				<div class="app-features-text">
					<h2>App Features</h2>
					<ul>
						<li>Add <i>Magic</i> cards to your decks via the card search feature (powered by Scryfall)</li>
						<li>Decks show each card’s name, mana cost, type, rarity, and quantity</li>
						<li>See statistics about the deck, such as which mana colors it’s using, the average mana value of cards, the amount of cards by certain attributes, and more</li>
						<li>The order of the cards in card lists can be automatically rearranged by a variety of sorting options</li>
						<li>View the image of any card in your decks</li>
						<li>App is free of charge and has no advertisements</li>
						<li>No account registration needed</li>
						<li>Attractive, easy-to-use graphical user interface</li>
					</ul>
				</div>
				<p class="centered-p">Click on the “Open Deck” button at the top to begin, or the “Manual” button for more info!</p>
			</div>
		</section>
	</article>
</template>
