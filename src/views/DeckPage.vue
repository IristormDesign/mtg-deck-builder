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

			<update-data-notice :deck="deck" />
		</article>
	</div>
</template>

<script>
import getActiveDeck from '@/mixins/getActiveDeck.js'
import DeckName from '@/components/DeckHeaderDeckName.vue'
import DeckColors from '@/components/DeckHeaderDeckColors.vue'
import AverageManaValue from '@/components/DeckHeaderAverageManaValue.vue'
import DateEdited from '@/components/DeckHeaderDateEdited.vue'
import CardNames from '@/components/DeckHeaderCardNames.vue'
import CardTotal from '@/components/DeckHeaderCardTotal.vue'
import MoreStatsButton from '@/components/DeckHeaderMoreStatsButton.vue'
import UpdateDataNotice from '@/components/DeckUpdateDataNotice.vue'

export default {
	mixins: [getActiveDeck],
	components: { DeckName, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, MoreStatsButton, UpdateDataNotice },
	created () {
		this.$store.commit('setShowSideboard', false)

		this.addSideboardObject()
	},
	methods: {
		/**
		 * Add the `sideboard` object property for any decks that are missing it. (Decks created from earlier app versions didn't have sideboards.)
		 */
		addSideboardObject () {
			let dataModified = false

			this.$store.state.decks.forEach(deck => {
				if (!deck.sideboard) {
					deck.sideboard = {
						cards: [],
						viewedCard: ''
					}
					dataModified = true
				}
			})

			this.$nextTick(() => {
				if (dataModified) {
					this.$store.commit('setDecks', this.$store.state.decks)
				}
			})
		}
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
