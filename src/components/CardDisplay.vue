<template>
	<transition name="cdo-fade">
		<section
			class="card-display" v-show="$store.state.showCard" @click="hideCDOverlay()"
		>
			<div v-for="card in deck.cards" :key="card.name">
				<transition name="card-browse" appear appear-active-class="card-browse-appear-active">
					<a
						v-if="deck.viewedCard === card.name" :key="card.name"
						:class="cardColorClass(card)" :href="card.link"
						target="_blank" rel="noopener noreferrer"
						title="Click to open this card’s page on Scryfall"
					>
						<div class="loading-indicator">
							Loading&hellip;
						</div>
						<img :src="card.img" width="488" height="680" :alt="card.name" />
					</a>
				</transition>
			</div>
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
	mounted () {
		if (this.mobileView()) {
			this.$store.commit('setShowCard', false)
		} else {
			this.$store.commit('setShowCard', true)
		}

		window.addEventListener('resize', debounce(this.resizingViewport, 125), false)
	},
	methods: {
		cardColorClass (card) {
			const color = card.colors[0]

			if (!color && RegExp(/\bLand\b/).test(card.type)) {
				return 'land'
			} else {
				return color
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
		}
	}
}
</script>
