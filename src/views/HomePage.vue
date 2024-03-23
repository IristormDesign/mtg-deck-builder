<template>
	<article class="home-page">
		<section class="intro">
			<div class="image-bg"></div>
			<div class="wrap">
				<div
					class="invisible-click-surface"
					@click="headerButtonAttention()">
				</div>
				<div class="text-box">
					<header>
						<h2>Your move, planeswalker.</h2>
					</header>
					<p>Construct and organize your decks for <i>Magic: The Gathering</i> with this free web app!</p>
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
						<li>App is free of charge and free of advertisements</li>
						<li>No account registration required</li>
						<li>Add <i>Magic</i> cards to your decks with the card name search engine (powered by Scryfall)</li>
						<li>Analyze statistics about your decks such as their average mana value, percentage of cards by certain attributes, and more</li>
						<li>Instantly sort all cards in card lists by various methods to choose from</li>
						<li>See the image of any card in your decks</li>
						<li>Switch between main and sideboard card lists per deck</li>
						<li>Attractive, user-friendly graphical interface</li>
					</ul>
				</div>
			</div>
		</section>
		<div class="final-call-to-action texture-bg">
			<div class="wrap">
				<div class="button-container">
					<router-link to="manual" :class="'button'">
						<div>Read the<br/> User Manual</div>
					</router-link>
				</div>

				<div class="button-container">
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
				</div>
			</div>
		</div>
	</article>
</template>

<script>
import headerButtonAttention from '@/mixins/headerButtonAttention'

export default {
	mixins: [headerButtonAttention],
	methods: {
		scrollToAppFeaturesSection () {
			document.querySelector('.app-features')
				.scrollIntoView({ behavior: 'smooth' })
		},
		homeOpenDeckButton () {
			this.$store.commit('overlayHoverEnabled', false)
			this.$store.commit('showDeckMenu', true)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-home.scss';
</style>
