<template>
	<div class="more-stats content-box">
		<div
			v-if="deck.cards.length <= 0"
			class="no-cards"
		>
			<h4>No Data Available</h4>
			<p>Various statistics about your deck will be displayed here once you’ve added cards to the main card group in the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
		</div>
		<div
			v-else
			class="tables"
		>
			<more-stats-colors :deck="deck" />

			<more-stats-color-symbols :deck="deck" />

			<more-stats-mana-values :deck="deck" />

			<more-stats-supertypes :deck="deck" />

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

			<template v-if="deck.dataVersion >= 3">
				<more-stats-layouts :deck="deck" />
			</template>

			<footer>
				<div class="note">
					<h4>About These Statistics</h4>
					<ul>
						<li>
							<p>Cards in the sideboard are ignored.</p>
						</li>
						<li>
							<p>Individual cards can be counted multiple times within a category if they match more than one attribute. (For example, if a card’s type line says “Artifact Creature,” then the Types category counts that card twice for being both an artifact and a creature.)</p>
						</li>
						<li>
							<p>For double-faced cards, most categories count the attributes of both faces together without repeating any same attributes between both. Only the “Mana Values of Spells” category ignores the back face.</p>
						</li>
						<li>
							<p>For more info about this More Statistics mode, see the <router-link to="/manual/#m-more-stats">user manual</router-link>.</p>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import MoreStatsColors from '@/components/deck-page/MoreStatsColors.vue'
import MoreStatsColorSymbols from '@/components/deck-page/MoreStatsColorSymbols.vue'
import MoreStatsManaValues from '@/components/deck-page/MoreStatsManaValues.vue'
import MoreStatsSupertypes from '@/components/deck-page/MoreStatsSupertypes.vue'
import MoreStatsTypes from '@/components/deck-page/MoreStatsTypes.vue'
import MoreStatsCreatureSubtypes from '@/components/deck-page/MoreStatsCreatureSubtypes.vue'
import MoreStatsOtherSubtypes from '@/components/deck-page/MoreStatsOtherSubtypes.vue'
import MoreStatsRarities from '@/components/deck-page/MoreStatsRarities.vue'
import MoreStatsKeywords from '@/components/deck-page/MoreStatsKeywords.vue'
import MoreStatsPowerToughness from '@/components/deck-page/MoreStatsPowerToughness.vue'
import MoreStatsLayouts from '@/components/deck-page/MoreStatsLayouts.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import moreStatsSubtypes from '@/mixins/moreStatsSubtypes.js'

export default {
	components: { MoreStatsColors, MoreStatsColorSymbols, MoreStatsManaValues, MoreStatsSupertypes, MoreStatsTypes, MoreStatsCreatureSubtypes, MoreStatsOtherSubtypes, MoreStatsRarities, MoreStatsKeywords, MoreStatsPowerToughness, MoreStatsLayouts },
	mixins: [getActiveDeck, moreStatsSubtypes]
}
</script>

<style lang="scss">
	@import '@/sass/page-more-stats.scss';
</style>
