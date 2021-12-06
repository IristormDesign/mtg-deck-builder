<template>
	<article class="home-page">
		<section class="intro">
			<div class="parallax" data-rellax-speed="-9" data-rellax-xs-speed="0" data-rellax-mobile-speed="0">
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
			</div>
			<div class="wrap">
				<div class="text-box">
					<header>
						<h2>Greetings, planeswalker.</h2>
					</header>
					<p>This is a free web app that lets you create and organize your decks for <i>Magic: The Gathering</i>.</p>
					<p class="button-group">
						<button @click="scrollToAppFeaturesSection()">Learn More</button>

						<button
							v-if="$store.state.decks.length > 0"
							class="primary-btn"
							@click="this.homeOpenDeckButton"
						>
							Open Deck
						</button>
						<router-link
							v-else to="create-deck" :class="'button primary-btn'">
							Create Deck
						</router-link>
					</p>
				</div>
			</div>
		</section>
		<section class="app-features">
			<div class="wrap" id="app-features">
				<picture>
					<source
						type="image/webp"
						srcset="
							@/img/deck-page-screenshot-1366.webp 1366w,
							@/img/deck-page-screenshot-1024.webp 1024w,
							@/img/deck-page-screenshot-768.webp  768w,
							@/img/deck-page-screenshot-576.webp  576w,
							@/img/deck-page-screenshot-432.webp  432w"
						sizes="
							(max-width: 840px) 99.9vw,
							(max-width: 1440px) 49.9vw,
							675px"
					/>
					<img
						src="@/img/deck-page-screenshot-1024.jpg"
						width="1366" height="1125"
						alt="Screenshot of MTG Deck Builder"
						loading="lazy"
					/>
				</picture>
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
						@click="this.homeOpenDeckButton"
					>
						Open a Deck
					</button>
					<router-link
						v-else to="create-deck" :class="'button primary-btn'">
						Create Deck
					</router-link>
				</p>
			</div>
		</section>
	</article>
</template>

<script>
import Rellax from 'rellax'

export default {
	data () {
		return {
			siteHeaderStyle: document.querySelector('.site-header').style
		}
	},
	mounted () {
		Rellax('.parallax')
	},
	methods: {
		scrollToAppFeaturesSection () {
			const appFeaturesSection = document.getElementById('app-features')

			appFeaturesSection.scrollIntoView(true)
		},
		homeOpenDeckButton () {
			this.$store.commit('setMouseoutEventActive', false)
			this.$store.commit('setShowDeckMenu', true)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-home.scss';
</style>
