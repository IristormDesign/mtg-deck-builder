<template>
	<div class="more-stats content-box">
		<h3>More Deck Statistics</h3>

		<div class="tables">
			<more-stats-colors :deck="deck" :manaSymbol="manaSymbol" />
			<more-stats-mana-values :deck="deck" />
			<more-stats-types :deck="deck" />
			<more-stats-subtypes :deck="deck" />
			<more-stats-rarities :deck="deck" :raritySymbol="raritySymbol" />
			<more-stats-misc :deck="deck" />
		</div>

		<p class="return-link">
			<router-link :to="{ name: 'deckMain' }">
				◂ Return to the card list
			</router-link>
		</p>
	</div>
</template>

<script>
import findRelevantDeck from '@/mixins/findRelevantDeck.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'
import MoreStatsColors from '@/components/MoreStatsColors.vue'
import MoreStatsManaValues from '@/components/MoreStatsManaValues.vue'
import MoreStatsTypes from '@/components/MoreStatsTypes.vue'
import MoreStatsSubtypes from '@/components/MoreStatsSubtypes.vue'
import MoreStatsRarities from '@/components/MoreStatsRarities.vue'
import MoreStatsMisc from '@/components/MoreStatsMisc.vue'

export default {
	mixins: [findRelevantDeck, symbolsMarkup],
	components: { MoreStatsColors, MoreStatsManaValues, MoreStatsTypes, MoreStatsSubtypes, MoreStatsRarities, MoreStatsMisc }
}
</script>

<style lang="scss">
	@import '@/sass/page-more-stats.scss';
</style>
