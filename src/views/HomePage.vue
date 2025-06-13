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
					<router-link to="/guide">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M484.02-260.46q13.29 0 22.56-9.49 9.27-9.48 9.27-22.76 0-12.91-9.3-22.37-9.29-9.46-22.57-9.46-13.29 0-22.75 9.48-9.46 9.49-9.46 22.39 0 13.28 9.48 22.75 9.49 9.46 22.77 9.46ZM456.31-398h45.54q.38-24.46 7.65-44.04 7.27-19.58 37.04-44.88 29.84-26.39 42.46-49.85 12.61-23.46 12.61-51.66 0-49.42-32.34-79.88-32.35-30.46-83.65-30.46-44.39 0-78.62 22.77-34.23 22.77-50.46 59.62l41.84 16.15q11.39-26.85 32.43-41.77 21.04-14.92 51.81-14.92 36.69 0 57.3 20.04 20.62 20.03 20.62 49.42 0 21.61-12.23 40.15T513-508.92q-29.23 26-42.96 51.3-13.73 25.31-13.73 59.62Zm23.76 298q-78.22 0-147.4-29.92t-120.99-81.71q-51.81-51.79-81.75-120.94Q100-401.71 100-479.93q0-78.84 29.92-148.21t81.71-120.68q51.79-51.31 120.94-81.25Q401.71-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.22-29.92 147.4t-81.21 120.99q-51.29 51.81-120.63 81.75Q558.9-100 480.07-100Zm-.07-45.39q139.69 0 237.15-97.76 97.46-97.77 97.46-236.85 0-139.69-97.46-237.15-97.46-97.46-237.15-97.46-139.08 0-236.85 97.46-97.76 97.46-97.76 237.15 0 139.08 97.76 236.85 97.77 97.76 236.85 97.76ZM480-480Z"/></svg>
						<div class="text-label">
							<small>Read the</small> User Guide
						</div>
					</router-link>
				</div>
				<div class="button-container">
					<router-link to="/release-notes"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M180-204.62V-250h72.31v-315.92q0-81.24 49.31-144.89 49.3-63.65 128.38-78.92V-810q0-20.83 14.57-35.42Q459.14-860 479.95-860q20.82 0 35.43 14.58Q530-830.83 530-810v20.46q79.08 15.08 128.38 78.73 49.31 63.65 49.31 144.89V-250H780v45.38H180Zm300-294.69Zm-.07 407q-29.85 0-51.04-21.24-21.2-21.24-21.2-51.07h144.62q0 29.93-21.26 51.12-21.26 21.19-51.12 21.19ZM297.69-250h364.62v-315.92q0-75.77-53.27-129.04-53.27-53.27-129.04-53.27-75.77 0-129.04 53.27-53.27 53.27-53.27 129.04V-250Z"/></svg>
						<div class="text-label">
							<small>Read the</small> Release Notes
						</div>
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
	metaInfo: {
		title: 'MTG Deck Builder by Iristorm Design – Make your own Magic: The Gathering decks',
		titleTemplate: null,
		meta: [
			{
				name: 'description',
				content: 'Construct and manage your Magic: The Gathering decks with this free web app!'
			},
			{
				name: 'canonical',
				content: 'https://magic.iristormdesign.com'
			}
		]
	},
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
