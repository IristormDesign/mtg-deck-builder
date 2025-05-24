<template>
	<transition name="image-fade">
		<section
			class="card-image"
			v-show="showCard"
			@mouseover="reactToHoverOverImage()"
			@click="attentionAddCard()"
			ref="cardImage"
			aria-label="Card Image"
		>
			<transition name="placement-outline-fade">
				<div
					v-if="showPlacementOutline"
					class="card-placement-outline"
				></div>
			</transition>
			<div class="image-container">
				<div
					class="image-overlay"
					v-if="card"
					@click="hideImageOverlay()"
				>
					<transition
						name="card-browse"
						appear
						appear-active-class="card-browse-appear-active"
					>
						<div
							class="card-shadow"
							:class="(turningOverCard) ? 'card-turning-over' : null"
							:key="drawnCards || card.name"
						><!-- The shadow is needed as its own element because Safari doesn't support more than drop-shadow filter on one element. -->
							<div class="card-edge">
								<a
									:href="card.link"
									target="_blank"
									ref="cardLink"
									:class="shouldRotateSideways ? 'sideways' : null"
									@focus="$store.commit('showingAnyPopup', false)"
								>
									<div
										class="card-shape"
										:class="cardColorClass"
									>
										<img
											:src="cardImage"
											width="488"
											height="680"
											:alt="card.name"
										/>
									</div>
								</a>
							</div>
						</div>
					</transition>
					<button
						class="close"
						@click="hideImageOverlay()"
						title="Close this card popup"
					>×</button>
				</div>
			</div>
			<div class="turn-over">
				<transition name="turn-over-button-transition">
					<button
						v-if="card && card.img2"
						@click="clickedTurnOver()"
						title="[Z]"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M482-170q-129.77 0-220.88-90.31Q170-350.62 170-480v-31.23l-74 74-42.15-42.15L200-625.54l146.15 146.16L304-437.23l-74-74V-480q0 104.23 73.38 177.12Q376.77-230 482-230q24.85 0 49.65-5.42 24.81-5.43 48.43-16.27l45 45q-33.77 18.15-69.73 27.42Q519.38-170 482-170Zm278-164.46L613.85-480.62 656-522.77l74 74V-480q0-104.23-73.38-177.12Q583.23-730 478-730q-24.85 0-49.65 5.42-24.81 5.43-48.43 16.27l-45-45q33.77-18.15 69.73-27.42Q440.62-790 478-790q129.77 0 220.88 90.31Q790-609.38 790-480v31.23l74-74 42.15 42.15L760-334.46Z"/></svg>
						Turn Over
					</button>
				</transition>
			</div>
		</section>
	</transition>
</template>

<script>
import cardListFunctions from '@/mixins/cardListFunctions'
import latestDataVersions from '@/mixins/latestDataVersions.js'
import axios from 'axios'
import debounce from 'debounce'

export default {
	mixins: [cardListFunctions, latestDataVersions],
	props: {
		deck: Object,
		drawnCards: Number
	},
	data () {
		return {
			showingFrontFace: true,
			turningOverCard: false
		}
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
			function perFace (colors, type) {
				if (colors.length > 1) {
					return 'multi'
				} else if (colors.length === 1) {
					return colors[0]
				} else if (/\bLand\b/.test(type)) {
					return 'land'
				} else {
					return null // Default to colorless spell.
				}
			}

			const card = this.card

			if (this.showingFrontFace) {
				return perFace(card.colors, card.type)
			} else {
				return perFace(card.colors2, card.type2)
			}
		},
		debounceResizingViewport () {
			return debounce(this.applyEffectsOnViewportResizing, 125)
		},
		shouldRotateSideways () {
			if (this.card.layout === 'split') {
				const hasAftermathAbility = this.card.keywords.find(
					keyword => keyword === 'Aftermath'
				)

				return !hasAftermathAbility
			} else if (
				this.showingFrontFace &&
				/\bBattle\b/.test(this.card.type)
			) {
				return true
			} else if (this.card.type.includes('Plane ')) {
				return true
			} else {
				return false
			}
		},
		showCard () {
			return this.$store.state.showCard
		},
		showPlacementOutline () {
			if (this.isMobileLayout()) {
				return false
			} else if (this.$route.name === 'listEditor') {
				return this.activeCardList.cards.length === 0
			} else if (this.$route.name === 'drawSim') {
				return !this.$store.state.viewedDrawnCard
			} else {
				return true
			}
		},
		cardImage () {
			if (!this.card.img2 || this.showingFrontFace) { // If the displayed card is a normal single-faced card, or if it's a double-faced card that's showing the front face...
				return this.card.img
			} else { // Else, the displayed card is double-faced and showing its back face.
				return this.card.img2
			}
		}
	},
	watch: {
		card () {
			this.checkForOutdatedImageURLs()

			this.showingFrontFace = true // Whenever viewing another card, if it's a double-faced card, switch to its front-face image.
		},
		showCard (isShowing) {
			if (
				this.isMobileLayout() &&
				this.card
			) {
				this.$nextTick(() => {
					if (isShowing) {
						this.$refs.cardLink.focus()
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

		this.$refs.cardImage.addEventListener(
			'keydown', this.hideImageOverlayByKeyPress
		)
		window.addEventListener(
			'resize', this.debounceResizingViewport
		)
	},
	beforeDestroy () {
		this.$refs.cardImage.removeEventListener(
			'keydown', this.hideImageOverlayByKeyPress
		)
		window.removeEventListener(
			'resize', this.debounceResizingViewport
		)
	},
	methods: {
		showCardPerViewport () {
			this.$store.commit(
				'showCard', !this.isMobileLayout()
			)
		},
		hideImageOverlay () {
			if (this.isMobileLayout()) {
				this.$store.commit('showCard', false)
			}
		},
		hideImageOverlayByKeyPress (event) {
			switch (event.key) {
				case 'Escape':
				case 'Esc':
					this.hideImageOverlay()
			}
		},
		applyEffectsOnViewportResizing () {
			if (this.isMobileLayout()) {
				this.hideImageOverlay()
			} else {
				this.$store.commit('showCard', true)
			}
		},
		/**
		 * Check whether the current card's image URL goes to one of Scryfall's outdated image servers. If so, update the URL.
		 */
		checkForOutdatedImageURLs () {
			const card = this.card

			if (
				!card ||
				card.imgVersion === this.latestImageVersion
			) return

			const regexOutdatedServer = /\/\/c(1|2|3)\.scryfall\.com/i // Detects the substrings `//c1.scryfall.com/`, `//c2.scryfall.com/`, or `//c3.scryfall.com/`.

			if (
				!card.img ||
				regexOutdatedServer.test(card.img)
			) {
				const cardQuery = card.name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

				console.info(`New image URL for "${card.name}" requested with Scryfall API`)

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
			card.imgVersion = this.latestImageVersion

			this.$nextTick(() => {
				this.$store.commit('decks', this.$store.state.decks)
			})
		},
		/**
		 * This effect is used for navigating from one deck page directly to another at wide viewports.
		 */
		delayTransitionOfCardImage () {
			if (this.showCard) {
				this.$store.commit('showCard', false)

				this.$nextTick(() => {
					this.$store.commit('showCard', true)
				})
			}
		},
		clickedTurnOver () {
			/* If the user has been using keyboard shortcuts, put the focus back onto keyboard shortcuts. */
			const currentLIIndex = this.$store.state.highlightedCardLIIndex

			if (currentLIIndex > -1) {
				/* In order to trigger behavior from Vue watching the keyboard-highlighted index (in @/mixin/keyboardShortcuts.js), set the index to -1, then immediately set it back to what the index was before. */

				this.$store.commit('highlightedCardLIIndex', -1)

				setTimeout(() => {
					this.$store.commit('highlightedCardLIIndex', currentLIIndex)
				}, 1)
			}

			if (this.turningOverCard) return // This early exit prevents the card image from switching faces while it's already in the animation of turning over. This situation could happen if the user clicks the Turn Over button many times rapidly.

			this.turningOverCard = true

			const ms = 333.3

			setTimeout(() => {
				this.showingFrontFace = !this.showingFrontFace
			}, ms)
			setTimeout(() => {
				this.turningOverCard = false
			}, ms * 2)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/card-image.scss';
</style>
