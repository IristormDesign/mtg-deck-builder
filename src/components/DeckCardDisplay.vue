<template>
	<section class="card-display">
		<transition name="cdo-fade">
			<div
				v-if="!!(this.card && this.$store.state.showCard)"
				class="card-display-container"
				@click="hideCDOverlay()"
			>
				<transition name="card-browse" appear appear-active-class="card-browse-appear-active">
					<a :key="card.name" :class="cardColorClass" :href="card.link" target="_blank">
						<img :src="card.img" width="488" height="680" :alt="card.name" />
					</a>
				</transition>
				<button class="close" @click="hideCDOverlay()" title="Close">
					×
				</button>
			</div>
		</transition>
	</section>
</template>

<script>
import axios from 'axios'
import debounce from 'debounce'

export default {
	props: {
		deck: Object
	},
	computed: {
		card () {
			function findCurrentCard (group) {
				return group.cards.find(card =>
					card.name === group.viewedCard
				)
			}

			if (this.$store.state.showSideboard) {
				return findCurrentCard(this.deck.sideboard)
			} else {
				return findCurrentCard(this.deck)
			}
		},
		cardColorClass () {
			const color = this.card.colors[0]

			if (!color && /\bLand\b/.test(this.card.type)) {
				return 'land'
			} else {
				return color
			}
		}
	},
	watch: {
		card () {
			this.checkForOutdatedImageURLs()
		}
	},
	created () {
		this.checkForOutdatedImageURLs()
	},
	mounted () {
		this.showCardPerViewport()

		window.addEventListener(
			'resize', debounce(this.resizingViewport, 125)
		)
	},
	methods: {
		showCardPerViewport () {
			if (this.mobileView()) {
				this.$store.commit('setShowCard', false)
			} else {
				this.$store.commit('setShowCard', true)
			}
		},
		mobileView () {
			return window.innerWidth <= 768 // Must match media query's width in CSS.
		},
		hideCDOverlay () {
			if (this.mobileView()) {
				this.$store.commit('setShowCard', false)
			}
		},
		resizingViewport () {
			if (this.mobileView()) {
				this.hideCDOverlay()
			} else {
				this.$store.commit('setShowCard', true)
			}
		},
		/**
		 * Check whether the current card's image URL goes to one of Scryfall's outdated image servers. If so, update the URL.
		 */
		checkForOutdatedImageURLs () {
			const card = this.card

			if (card && card.imgVersion !== this.$store.state.latestImageVersion) {
				const regexOutdatedServer = /\/\/c(1|2|3)\.scryfall\.com/i // Detects the substrings `//c1.scryfall.com/`, `//c2.scryfall.com/`, or `//c3.scryfall.com/`.

				if (regexOutdatedServer.test(card.img) || !card.img) {
					const cardQuery = card.name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

					// eslint-disable-next-line
					console.log(`New image URL for "${card.name}" requested with Scryfall API`)

					axios
						.get(
							`https://api.scryfall.com/cards/named?fuzzy=${cardQuery}`
						)
						.then(response => {
							this.updateImageURL(response)
						})
						.catch(error => {
							// eslint-disable-next-line
							console.error(error)
						})
				}
			}
		},
		updateImageURL (response) {
			const data = response.data
			const card = this.card

			if (data.card_faces && !data.image_uris) { // If the card is double-faced...
				card.img = data.card_faces[0].image_uris.normal
			} else { // Else the card is single-faced
				card.img = data.image_uris.normal
			}

			card.link = data.scryfall_uri
			card.imgVersion = this.$store.state.latestImageVersion

			this.$nextTick(() => {
				this.$store.commit('setDecks', this.$store.state.decks)
			})
		}
	}
}
</script>
