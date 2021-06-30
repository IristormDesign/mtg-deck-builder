<template>
	<transition name="cdo-fade">
		<section
			class="card-display" v-show="$store.state.showCard" @click="hideCDOverlay()"
		>
			<transition
				v-for="card in deck.cards" :key="card.name"
				name="card-browse" appear appear-active-class="card-browse-appear-active"
			>
				<a
					v-if="deck.viewedCard === card.name" :class="card.colors[0]"
					:href="card.link" target="_blank" rel="noopener noreferrer"
					:key="card.name" title="Click to open this card’s page on Scryfall"
				>
					<div class="loading-indicator">
						Loading image&hellip;
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
export default {
	props: {
		deck: Object
	},
	mounted () {
		if (window.innerWidth > 768) { // Must match media query width in CSS.
			this.$store.commit('setShowCard', true)
		} else {
			this.$store.commit('setShowCard', false)
		}
	},
	methods: {
		hideCDOverlay () {
			this.$store.commit('setShowCard', false)
		}
	}
}
</script>
