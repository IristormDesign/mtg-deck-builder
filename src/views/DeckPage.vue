<template>
	<div
		class="deck"
		:class="($store.state.showSideboard) ? 'sideboard-visible' : null"
	>
		<article>
			<div class="wrap">
				<header class="deck-header">
					<deck-name :deck="getCurrentDeck" />
					<deck-colors :deck="getCurrentDeck" />
					<average-mana-value :deck="getCurrentDeck" />
					<date-edited :deck="getCurrentDeck" />
					<card-names :deck="getCurrentDeck" />
					<card-total :deck="getCurrentDeck" />
					<more-stats-button :deck="getCurrentDeck" />
				</header>
			</div>

			<router-view />
		</article>
	</div>
</template>

<script>
import DeckName from '@/components/DeckHeaderDeckName.vue'
import DeckColors from '@/components/DeckHeaderDeckColors.vue'
import AverageManaValue from '@/components/DeckHeaderAverageManaValue.vue'
import DateEdited from '@/components/DeckHeaderDateEdited.vue'
import CardNames from '@/components/DeckHeaderCardNames.vue'
import CardTotal from '@/components/DeckHeaderCardTotal.vue'
import MoreStatsButton from '@/components/DeckHeaderMoreStatsButton.vue'

export default {
	components: { DeckName, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, MoreStatsButton },
	created () {
		const store = this.$store

		store.commit('setShowSideboard', false)

		// For each deck, add the `sideboard` object property if it doesn't exist yet (because of old deck data).
		store.state.decks.forEach((deck) => {
			if (!deck.sideboard) {
				deck.sideboard = {
					cards: [],
					viewedCard: ''
				}
				store.commit('setDecks', store.state.decks)
			}
		})
	},
	beforeRouteUpdate (to, from, next) {
		this.$store.commit('setShowSideboard', false)

		next()
	},
	computed: {
		getCurrentDeck () {
			const decks = this.$store.state.decks

			for (let i = 0; i < decks.length; i++) {
				const deck = decks[i]
				const currentURL = this.$route.path.toLowerCase()
				const deckPathToCheck = `/deck/${deck.path}/`

				if (currentURL.includes(deckPathToCheck)) {
					return deck
				}
			}
			return null
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck.scss';
</style>
