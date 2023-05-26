<template>
	<section class="card-display">
		<transition name="cdo-fade">
			<div
				v-if="!!(this.card && this.$store.state.showCard)"
				class="card-display-container"
				@click="hideCDOverlay()"
			>
				<transition name="card-browse" appear appear-active-class="card-browse-appear-active">
					<a
						:key="card.name" :class="cardColorClass" :href="card.link"
						target="_blank" rel="noopener noreferrer"
						title="Click to open this card’s page on Scryfall"
					>
						<div class="loading-indicator">
							Loading&hellip;
						</div>
						<img :src="card.img" width="488" height="680" :alt="card.name" />
					</a>
				</transition>
				<button class="close primary-btn" @click="hideCDOverlay()" title="Close">
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
	created () {
		this.checkForOutdatedImageURLs()
	},
	mounted () {
		if (this.mobileView()) {
			this.$store.commit('setShowCard', false)
		} else {
			this.$store.commit('setShowCard', true)
		}

		window.addEventListener(
			'resize', debounce(this.resizingViewport, 125), false
		)
	},
	computed: {
		card () {
			let cards, viewedCard
			const deck = this.deck

			if (this.$store.state.showSideboard) {
				cards = deck.sideboard.cards
				viewedCard = deck.sideboard.viewedCard
			} else {
				cards = deck.cards
				viewedCard = deck.viewedCard
			}

			return cards.find(
				card => card.name === viewedCard
			)
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
	methods: {
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
		checkForOutdatedImageURLs () {
			const card = this.card
			const store = this.$store
			const latestImageVersion = store.state.latestImageVersion

			if (card && card.imgVersion !== latestImageVersion) {
				const regexOutdatedServer = /\/\/c(1|2|3)\.scryfall\.com/i // Detects the substrings `//c1.scryfall.com/`, `//c2.scryfall.com/`, or `//c3.scryfall.com/`.

				// Check whether the current card's image URL goes to one of Scryfall's outdated image servers. If so, update the URL.
				if (regexOutdatedServer.test(card.img) || !card.img) {
					const cardQuery = card.name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.
					const updateImageURLs = (response) => {
						const data = response.data

						// If the card is double-faced / else the card is single-faced...
						if (data.card_faces && !data.image_uris) {
							card.img = data.card_faces[0].image_uris.normal
						} else {
							card.img = data.image_uris.normal
						}

						card.link = data.scryfall_uri
						card.imgVersion = latestImageVersion

						this.$nextTick(() => {
							store.commit('setDecks', store.state.decks)
						})
					}

					// eslint-disable-next-line
					console.log(`Request Scryfall API for new image URL for "${card.name}"`)

					axios
						.get(
							`https://api.scryfall.com/cards/named?fuzzy=${cardQuery}`
						)
						.then(response => {
							updateImageURLs(response)
						})
						.catch(error => {
							// eslint-disable-next-line
							console.error(error)
						})
				}
			}
		}
	},
	watch: {
		card () {
			this.checkForOutdatedImageURLs()
		}
	}
}
</script>
