<template>
	<div class="more-stats content-box">
		<div
			v-if="deck.cards.length <= 0"
			class="no-cards"
		>
			<p>Various statistics about your deck will be displayed here once you add cards to the main card group in the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
		</div>
		<div
			v-else
			class="tables"
		>
			<more-stats-colors :deck="deck" />

			<more-stats-color-symbols :deck="deck" />

			<more-stats-mana-values :deck="deck" />

			<more-stats-types :deck="deck" />

			<more-stats-creature-subtypes
				:deck="deck"
				:subtypeCounts="creatureSubtypeCounts"
			/>

			<more-stats-other-subtypes
				:deck="deck"
				:subtypeCounts="otherSubtypeCounts"
			/>

			<more-stats-rarities :deck="deck" />

			<template v-if="deck.dataVersion >= 2">
				<more-stats-keywords :deck="deck" />

				<more-stats-power-toughness :deck="deck" />
			</template>

			<more-stats-miscellaneous :deck="deck" />

			<footer>
				<div class="note">
					<h4>Notes</h4>
					<ul>
						<li>
							<p>These statistics don’t count cards in the sideboard.</p>
						</li>
						<li>
							<p>Single cards can be counted multiple times in a category when they match more than one attribute. (For example, if a card’s type line says “Artifact Creature,” then the Types category counts that card once as an artifact and once again as a creature.)</p>
						</li>
						<li>
							<p>See the user manual for <router-link to="/manual/#m-more-stats">more info</router-link> about this page.</p>
						</li>
					</ul>
				</div>
				<p class="return">
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
import MoreStatsCreatureSubtypes from '@/components/deck-page/MoreStatsCreatureSubtypes.vue'
import MoreStatsOtherSubtypes from '@/components/deck-page/MoreStatsOtherSubtypes.vue'
import MoreStatsRarities from '@/components/deck-page/MoreStatsRarities.vue'
import MoreStatsMiscellaneous from '@/components/deck-page/MoreStatsMiscellaneous.vue'
import MoreStatsKeywords from '@/components/deck-page/MoreStatsKeywords.vue'
import MoreStatsPowerToughness from '@/components/deck-page/MoreStatsPowerToughness.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import moreStatsSubtypes from '@/mixins/moreStatsSubtypes.js'

export default {
	components: { MoreStatsColors, MoreStatsColorSymbols, MoreStatsManaValues, MoreStatsTypes, MoreStatsCreatureSubtypes, MoreStatsOtherSubtypes, MoreStatsRarities, MoreStatsMiscellaneous, MoreStatsKeywords, MoreStatsPowerToughness },
	mixins: [getActiveDeck, moreStatsSubtypes]
}
</script>

<style lang="scss">
	@import '@/sass/page-more-stats.scss';
</style>
