<template>
	<div
		class="deck"
		:class="($store.state.showSideboard) ? 'sideboard-visible' : null"
	>
		<article>
			<div class="wrap">
				<header class="deck-header">
					<deck-name :deck="deck" />
					<deck-colors :deck="deck" />
					<average-mana-value :deck="deck" />
					<date-edited :deck="deck" />
					<card-names :deck="deck" />
					<card-total :deck="deck" />
					<more-stats-button :deck="deck" />
				</header>
			</div>

			<router-view />
		</article>
	</div>
</template>

<script>
import findRelevantDeck from '@/mixins/findRelevantDeck.js'
import DeckName from '@/components/DeckHeaderDeckName.vue'
import DeckColors from '@/components/DeckHeaderDeckColors.vue'
import AverageManaValue from '@/components/DeckHeaderAverageManaValue.vue'
import DateEdited from '@/components/DeckHeaderDateEdited.vue'
import CardNames from '@/components/DeckHeaderCardNames.vue'
import CardTotal from '@/components/DeckHeaderCardTotal.vue'
import MoreStatsButton from '@/components/DeckHeaderMoreStatsButton.vue'

export default {
	mixins: [findRelevantDeck],
	components: { DeckName, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, MoreStatsButton },
	data () {
		return {
			deckObjectData: this.deck
		}
	},
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
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck.scss';
</style>
