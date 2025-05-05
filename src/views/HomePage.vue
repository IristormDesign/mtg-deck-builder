<template>
	<article class="home-page">
		<section class="intro">
			<div class="image-bg"></div>
			<div class="wrap">
				<div
					class="invisible-click-surface"
					@click="headerLinkAttention()">
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
						<li>Free of charge and free of advertisements</li>
						<li>No account registration required</li>
						<li>Add <i>Magic: The Gathering</i> cards to your decks with the card search engine (powered by Scryfall)</li>
						<li>Instantly sort all cards in card lists by various methods you can choose from</li>
						<li>See the image of any card in your decks</li>
						<li>See statistics about your decks, including their average mana value, the percentage of cards by various attributes, and more</li>
						<li>Simulate drawing cards from your shuffled decks</li>
						<li>Export your decks from this app to plain-text lists</li>
						<li>Sideboard list per deck also provided</li>
						<li>Attractive, user-friendly graphical interface</li>
					</ul>
				</div>
			</div>
		</section>
		<div class="final-call-to-action texture-bg">
			<div class="wrap">
				<div class="button-container">
					<router-link to="guide/intro" :class="'button'">
						<div>Read the<br/> User Guide</div>
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
import headerLinkAttention from '@/mixins/headerLinkAttention'

export default {
	mixins: [headerLinkAttention],
	methods: {
		scrollToAppFeaturesSection () {
			document.querySelector('.app-features')
				.scrollIntoView({ behavior: 'smooth' })
		},
		homeOpenDeckButton () {
			this.$store.commit('overlayHoverEnabled', false)
			this.$store.commit('showDeckMenu', true)

			document.querySelector('.deck-menu-toggler').focus()
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-home.scss';
</style>
