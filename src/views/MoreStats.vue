<template>
	<div class="more-stats content-box">
		<div
			v-if="deck.cards.length <= 0"
			class="no-cards"
		>
			<p>More statistics about your deck will be displayed here once you’ve added cards to the main card group in the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
		</div>
		<div
			v-else
			class="tables"
		>
			<more-stats-colors :deck="deck" />

			<more-stats-color-symbols :deck="deck" />

			<more-stats-mana-values :deck="deck" />

			<more-stats-types :deck="deck" />

			<more-stats-subtypes
				:deck="deck"
				:subtypeCounts="creatureSubtypeCounts"
			>Creature</more-stats-subtypes>

			<more-stats-subtypes
				:deck="deck"
				:subtypeCounts="otherSubtypeCounts"
			>Other</more-stats-subtypes>

			<more-stats-rarities :deck="deck" />

			<template v-if="deck.dataVersion >= 2">
				<more-stats-keywords :deck="deck" />

				<more-stats-power-toughness :deck="deck" />
			</template>

			<more-stats-miscellaneous :deck="deck" />

			<footer>
				<p
					v-if="deck.sideboard.cards.length >= 1"
					class="note"
				>
					<strong>Note:</strong> These statistics ignore cards in the sideboard.
				</p>
				<p>
					<router-link :to="{ name: 'deckEditor' }">
						◂ Return to the Deck Editor
					</router-link>
				</p>
			</footer>
		</div>
	</div>
</template>

<script>
import MoreStatsColors from '@/components/deck-page/MoreStatsColors.vue'
import MoreStatsColorSymbols from '@/components/deck-page/MoreStatsColorSymbols.vue'
import MoreStatsManaValues from '@/components/deck-page/MoreStatsManaValues.vue'
import MoreStatsTypes from '@/components/deck-page/MoreStatsTypes.vue'
import MoreStatsSubtypes from '@/components/deck-page/MoreStatsSubtypes.vue'
import MoreStatsRarities from '@/components/deck-page/MoreStatsRarities.vue'
import MoreStatsMiscellaneous from '@/components/deck-page/MoreStatsMiscellaneous.vue'
import MoreStatsKeywords from '@/components/deck-page/MoreStatsKeywords.vue'
import MoreStatsPowerToughness from '@/components/deck-page/MoreStatsPowerToughness.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import moreStatsSubtypes from '@/mixins/moreStatsSubtypes.js'

export default {
	components: { MoreStatsColors, MoreStatsColorSymbols, MoreStatsManaValues, MoreStatsTypes, MoreStatsSubtypes, MoreStatsRarities, MoreStatsMiscellaneous, MoreStatsKeywords, MoreStatsPowerToughness },
	mixins: [getActiveDeck, moreStatsSubtypes]
}
</script>

<style lang="scss">
	@import '@/sass/page-more-stats.scss';
</style>
