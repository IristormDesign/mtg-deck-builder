<template>
	<div class="deck-analyzer content-box">
		<div
			v-if="deck.cards.length <= 0"
			class="no-cards"
		>
			<h4>No Data Yet</h4>
			<p>Statistics about your deck will be displayed here once you’ve added cards to the main card group in the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
		</div>
		<div
			v-else
			class="tables"
		>
			<analyzer-colors :deck="deck" />

			<analyzer-color-symbols :deck="deck" />

			<analyzer-mana-values :deck="deck" />

			<analyzer-supertypes :deck="deck" />

			<analyzer-types :deck="deck" />

			<analyzer-creature-subtypes
				:deck="deck"
				:subtypeCounts="creatureSubtypeCounts"
			/>

			<analyzer-other-subtypes
				:deck="deck"
				:subtypeCounts="otherSubtypeCounts"
			/>

			<analyzer-rarities :deck="deck" />

			<template v-if="deck.dataVersion >= 2">
				<analyzer-keywords :deck="deck" />

				<analyzer-power-toughness :deck="deck" />
			</template>

			<template v-if="deck.dataVersion >= 3">
				<analyzer-layouts :deck="deck" />
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
							<p>To learn more about the Deck Analyzer, see the <router-link to="/manual/#m-deck-analyzer">user manual</router-link>.</p>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import AnalyzerColors from '@/components/deck-page/AnalyzerColors.vue'
import AnalyzerColorSymbols from '@/components/deck-page/AnalyzerColorSymbols.vue'
import AnalyzerManaValues from '@/components/deck-page/AnalyzerManaValues.vue'
import AnalyzerSupertypes from '@/components/deck-page/AnalyzerSupertypes.vue'
import AnalyzerTypes from '@/components/deck-page/AnalyzerTypes.vue'
import AnalyzerCreatureSubtypes from '@/components/deck-page/AnalyzerCreatureSubtypes.vue'
import AnalyzerOtherSubtypes from '@/components/deck-page/AnalyzerOtherSubtypes.vue'
import AnalyzerRarities from '@/components/deck-page/AnalyzerRarities.vue'
import AnalyzerKeywords from '@/components/deck-page/AnalyzerKeywords.vue'
import AnalyzerPowerToughness from '@/components/deck-page/AnalyzerPowerToughness.vue'
import AnalyzerLayouts from '@/components/deck-page/AnalyzerLayouts.vue'
import deckAnalyzerSubtypes from '@/mixins/deckAnalyzerSubtypes.js'

export default {
	components: { AnalyzerColors, AnalyzerColorSymbols, AnalyzerManaValues, AnalyzerSupertypes, AnalyzerTypes, AnalyzerCreatureSubtypes, AnalyzerOtherSubtypes, AnalyzerRarities, AnalyzerKeywords, AnalyzerPowerToughness, AnalyzerLayouts },
	mixins: [deckAnalyzerSubtypes],
	props: {
		deck: Object
	},
	mounted () {
		this.$store.commit('analyzerFilter', null)
	}
	// computed: {
	// 	analyzerFilter () {
	// 		return this.$store.state.analyzerFilter
	// 	}
	// },
	// watch: {
	// 	analyzerFilter (value) {
	// 		if (value) {

	// 		}
	// 	}
	// }
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-analyzer.scss';
</style>
