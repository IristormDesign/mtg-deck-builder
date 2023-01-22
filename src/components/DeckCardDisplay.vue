<template>
	<transition name="cdo-fade">
		<section
			class="card-display"
			v-if="displayCardConditions"
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
		</section>
	</transition>
</template>

<script>
import debounce from 'debounce'

export default {
	props: {
		deck: Object
	},
	computed: {
		card () {
			return this.deck.cards.find(card => {
				if (card) {
					return card.name === this.deck.viewedCard
				}
				return null
			})
		},
		cardColorClass () {
			const color = this.card.colors[0]

			if (!color && /\bLand\b/.test(this.card.type)) {
				return 'land'
			} else {
				return color
			}
		},
		displayCardConditions () {
			if (this.$store.state.showCard && this.card) return true
			else return false
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
