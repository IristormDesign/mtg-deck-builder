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
import debounce from 'debounce'

export default {
	props: {
		deck: Object
	},
	computed: {
		card () {
			const deck = this.deck
			let cards = deck.cards
			let viewedCard = deck.viewedCard

			if (this.$store.state.showSideboard) {
				cards = deck.sideboard.cards
				viewedCard = deck.sideboard.viewedCard
			}

			return cards.find(card => {
				if (card) {
					return card.name === viewedCard
				} else {
					return null
				}
			})
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
	mounted () {
		if (this.mobileView()) {
			this.$store.commit('setShowCard', false)
		} else {
			this.$store.commit('setShowCard', true)
		}

		window.addEventListener('resize', debounce(this.resizingViewport, 125), false)
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
		}
	}
}
</script>
