<template>
	<article class="home-page">
		<section class="intro">
			<picture>
				<source
					type="image/webp"
					media="(max-width: 810px)"
					srcset="
						@/img/welcome-810.webp 810w,
						@/img/welcome-608.webp 608w,
						@/img/welcome-456.webp 456w,
						@/img/welcome-341.webp 341w"
				/>
				<source
					type="image/webp"
					media="(max-width: 1920px)"
					srcset="
						@/img/welcome-1920.webp 1920w,
						@/img/welcome-1440.webp 1440w,
						@/img/welcome-1080.webp 1080w"
				/>
				<source
					type="image/webp"
					srcset="@/img/welcome-2560.webp 2560w"
				/>
				<img
					src="@/img/welcome-1920.jpg"
					width="1920" height="1080"
					alt="Fantasy illustration from Magic: The Gathering"
					@click="$store.getters.attentionHeaderButton"
				/>
			</picture>
			<div class="wrap">
				<div class="text-box">
					<header>
						<h2>Greetings, planeswalker.</h2>
					</header>
					<p>With this free web app, you can construct and organize your decks for <i>Magic: The Gathering</i>.</p>
					<p class="button-group">
						<button @click="scrollToAppFeaturesSection()">Learn More</button>

						<button
							v-if="$store.state.decks.length > 0"
							@click="this.homeOpenDeckButton"
						>
							Open Deck
						</button>
						<router-link
							v-else
							:to="{name: 'createDeck'}"
							:class="'button'"
						>
							Create Deck
						</router-link>
					</p>
				</div>
			</div>
		</section>
		<section class="app-features">
			<div class="wrap">
				<img
					srcset="@/img/home-deck-page-675.jpg 1x, @/img/home-deck-page-1012.jpg 1.5x, @/img/home-deck-page-1350.jpg 2x"
					src="@/img/home-deck-page-675.jpg" width="675" height="466"
					alt="Screenshot of MTG Deck Builder" loading="lazy"
				/>
				<div class="app-features-text">
					<h2>App Features</h2>
					<ul>
						<li>Customize card lists for your own <i>Magic: The Gathering</i> decks</li>
						<li>Using app is free of charge and free of advertisements</li>
						<li>No account registration required</li>
						<li>Attractive, user-friendly graphical interface</li>
						<li>Add cards to your decks with the card name search engine (powered by <a href="https://scryfall.com" target="_blank">Scryfall</a>)</li>
						<li>Analyze many statistics about your decks, such as their average mana value, the percentage of cards by certain attributes, and more</li>
						<li>Instantly sort all cards in card lists by various methods to choose from</li>
						<li>See the image of any card in your decks</li>
						<li>Switch between main and sideboard card lists per deck</li>
					</ul>
				</div>
			</div>
		</section>
		<div class="final-call-to-action">
			<p class="wrap">
				<router-link to="manual" :class="'button'">
					<div>Read the<br/> User Manual</div>
				</router-link>

				<button
					v-if="$store.state.decks.length > 0"
					@click="this.homeOpenDeckButton"
				>
					Open a Deck
				</button>
				<router-link
					v-else
					:to="{name: 'createDeck'}"
					:class="'button'"
				>
					Create Deck
				</router-link>
			</p>
		</div>
	</article>
</template>

<script>
export default {
	methods: {
		scrollToAppFeaturesSection () {
			document.querySelector('.app-features')
				.scrollIntoView({ behavior: 'smooth' })
		},
		homeOpenDeckButton () {
			this.$store.commit('setShowDeckMenu', true)
			this.$store.commit('setStickAppHeader', true)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-home.scss';
</style>
