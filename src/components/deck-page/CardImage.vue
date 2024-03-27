<template>
	<section class="card-image">
		<transition name="placement-outline-fade">
			<div
				v-if="this.showPlacementOutline"
				class="card-placement-outline"
			></div>
		</transition>
		<transition name="cd-overlay-fade">
			<div
				class="cd-overlay"
				v-if="this.card && this.$store.state.showCard"
				@click="hideCDOverlay()"
			>
				<transition
					name="card-browse"
					appear
					appear-active-class="card-browse-appear-active"
				>
					<div class="card-edge" :key="card.name">
						<a
							:href="card.link"
							target="_blank"
							ref="cardLink"
						>
							<div class="card-shape" :class="cardColorClass">
								<img
									:src="card.img"
									width="488"
									height="680"
									:alt="card.name"
								/>
							</div>
						</a>
					</div>
				</transition>
				<button
					class="close"
					@click="hideCDOverlay()"
					title="Close this card popup"
				>×</button>
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
			if (this.$route.name === 'drawSim') {
				return this.$store.state.viewedDrawnCard
			} else if (this.$store.state.showSideboard) {
				return this.deck.sideboard.viewedCard
			} else {
				return this.deck.viewedCard
			}
		},
		cardColorClass () {
			const color = this.card.colors[0]
			const hasLandType = /\bLand\b/.test(this.card.type)

			if (!color && hasLandType) {
				return 'land'
			} else {
				return color
			}
		},
		showCard () {
			return this.$store.state.showCard
		},
		showPlacementOutline () {
			if (this.$route.name === 'drawSim') {
				return true
			} else {
				return this.deck.cards.length <= 0
			}
		}
	},
	watch: {
		card () {
			this.checkForOutdatedImageURLs()
		},
		showCard (isShowing) {
			if (this.$store.state.isMobileLayout() && this.card) {
				this.$nextTick(() => {
					if (isShowing) {
						this.$refs.cardLink.focus()
					} else { // The card image popup has now been hidden.
						const lis = document
							.querySelector('.card-list-section')
							.querySelectorAll('li')

						for (let i = 0; i < lis.length; i++) {
							if (i === this.$store.state.focusCardButton) {
								lis[i].querySelector('.card-button').focus()

								break
							}
						}
					}
				})
			}
		},
		$route () {
			this.delayTransitionOfCardImage()
		}
	},
	created () {
		this.checkForOutdatedImageURLs()
	},
	mounted () {
		this.showCardPerViewport()
		this.letEscKeyCloseCardImagePopup()

		window.addEventListener(
			'resize', debounce(this.resizingViewport, 125)
		)
	},
	methods: {
		showCardPerViewport () {
			this.$store.commit(
				'showCard', !this.$store.state.isMobileLayout()
			)
		},
		letEscKeyCloseCardImagePopup () {
			document.addEventListener('keyup', (event) => {
				if (event.key === 'Escape' || event.key === 'Esc') {
					this.hideCDOverlay()
				}
			})
		},
		hideCDOverlay () {
			if (this.$store.state.isMobileLayout()) {
				this.$store.commit('showCard', false)
			}
		},
		resizingViewport () {
			if (this.$store.state.isMobileLayout()) {
				this.hideCDOverlay()
			} else {
				this.$store.commit('showCard', true)
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
				this.$store.commit('decks', this.$store.state.decks)
			})
		},
		/**
		 * This effect is used for navigating from one deck page directly to another at wide viewports.
		 */
		delayTransitionOfCardImage () {
			if (this.$store.state.showCard) {
				this.$store.state.showCard = false

				this.$nextTick(() => {
					this.$store.state.showCard = true
				})
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/card-image.scss';
</style>
