<template>
	<article class="home-page">
		<section class="intro">
			<img
				srcset="
					@/img/welcome-2560.jpg 2560w,
					@/img/welcome-1920.jpg 1920w,
					@/img/welcome-1440.jpg 1440w,
					@/img/welcome-1080.jpg 1080w,
					@/img/welcome-810.jpg  810w,
					@/img/welcome-608.jpg  608w,
					@/img/welcome-456.jpg  456w,
					@/img/welcome-341.jpg  341w"
				src="@/img/welcome-1920.jpg"
				width="1920" height="1080"
				alt="Fantasy illustration from Magic: The Gathering"
				@click="$store.getters.attentionHeaderButton"
			/>
			<div class="wrap">
				<div class="text-box">
					<header>
						<h2>Greetings, planeswalker.</h2>
					</header>
					<p>This app lets you build and organize your decks for <i>Magic: The Gathering</i>.</p>
					<p class="button-group">
						<a href="#app-features" class="button">Learn More</a>

						<button
							v-if="$store.state.decks.length > 0"
							class="primary-btn"
							@click="$store.commit('setShowDeckMenu', true)"
						>
							Open Deck
						</button>
						<button
							v-else class="primary-btn"
							@click="$store.dispatch('createDeck')"
						>
							Create Deck
						</button>
					</p>
				</div>
			</div>
		</section>
		<section class="app-features">
			<div class="wrap" id="app-features">
				<img
					srcset="
						@/img/deck-page-screenshot-1366.jpg 1366w,
						@/img/deck-page-screenshot-1024.jpg 1024w,
						@/img/deck-page-screenshot-768.jpg  768w,
						@/img/deck-page-screenshot-576.jpg  576w,
						@/img/deck-page-screenshot-432.jpg  432w"
					sizes="(max-width: 840px) 100vw, 49vw"
					src="@/img/deck-page-screenshot-1366.jpg"
					width="1366" height="1125"
					alt="Screenshot of MTG Deck Builder"
					loading="lazy"
				/>
				<div class="app-features-text">
					<h2>App Features</h2>
					<ul>
						<li>Add <i>Magic</i> cards to your decks via the card search feature (powered by Scryfall)</li>
						<li>Decks show each card’s name, mana cost, type, rarity, and quantity</li>
						<li>Analyze various statistics about the deck, such as which mana colors it uses, the average mana value of cards, the percentages of cards by certain attributes, and more</li>
						<li>The order of the cards in card lists can be automatically rearranged by multiple sorting options</li>
						<li>View the image of any card in your decks</li>
						<li>App is free of charge and has no advertisements</li>
						<li>No account registration needed</li>
						<li>Attractive, easy-to-use graphical user interface</li>
					</ul>
				</div>
				<p class="button-group">
					<router-link to="manual" :class="'button'">
						Read the User Manual
					</router-link>

					<button
						v-if="$store.state.decks.length > 0"
						class="primary-btn"
						@click="$store.commit('setShowDeckMenu', true)"
					>
						Open a Deck
					</button>
					<button
						v-else class="primary-btn"
						@click="$store.dispatch('createDeck')"
					>
						Create a Deck
					</button>
				</p>
			</div>
		</section>
	</article>
</template>
