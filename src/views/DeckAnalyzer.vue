<template>
	<div class="deck-analyzer content-box">
		<div
			v-if="deck.cards.length <= 0"
			class="no-cards"
		>
			<h4>No Data Yet</h4>
			<p>Statistics about your deck will appear here once you’ve added cards to the main card group in the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
		</div>
		<template v-else>
			<div class="tables">
				<analyzer-filter-notice />

				<analyzer-colors :deck="deck" />

				<analyzer-mana-symbols :deck="deck" />

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

				<analyzer-starred :deck="deck" />

				<footer>
					<div class="note">
						<h4>About These Statistics</h4>
						<ul>
							<li>
								<p>Any cards in the sideboard are excluded.</p>
							</li>
							<li>
								<p>Individual cards can be counted multiple times within a category if they match more than one attribute. (For example, if a card’s type line says “Artifact Creature,” then the Types category counts that card twice for being both an artifact and a creature.)</p>
							</li>
							<li>
								<p>For double-faced cards, most categories count the attributes of both faces together without repeating any same attributes between both. Only the “Mana Values of Spells” category ignores the back face.</p>
							</li>
							<li>
								<p>To learn more about the Deck Analyzer, see the <router-link to="/manual/#deck-analyzer">user manual</router-link>.</p>
							</li>
						</ul>
					</div>
				</footer>
			</div>
		</template>
	</div>
</template>

<script>
import AnalyzerFilterNotice from '@/components/deck-page/AnalyzerFilterNotice.vue'
import AnalyzerColors from '@/components/deck-page/AnalyzerColors.vue'
import AnalyzerManaSymbols from '@/components/deck-page/AnalyzerManaSymbols.vue'
import AnalyzerManaValues from '@/components/deck-page/AnalyzerManaValues.vue'
import AnalyzerSupertypes from '@/components/deck-page/AnalyzerSupertypes.vue'
import AnalyzerTypes from '@/components/deck-page/AnalyzerTypes.vue'
import AnalyzerCreatureSubtypes from '@/components/deck-page/AnalyzerCreatureSubtypes.vue'
import AnalyzerOtherSubtypes from '@/components/deck-page/AnalyzerOtherSubtypes.vue'
import AnalyzerRarities from '@/components/deck-page/AnalyzerRarities.vue'
import AnalyzerKeywords from '@/components/deck-page/AnalyzerKeywords.vue'
import AnalyzerPowerToughness from '@/components/deck-page/AnalyzerPowerToughness.vue'
import AnalyzerLayouts from '@/components/deck-page/AnalyzerLayouts.vue'
import AnalyzerStarred from '@/components/deck-page/AnalyzerStarred.vue'
import deckAnalyzer from '@/mixins/deckAnalyzer.js'
import deckAnalyzerSubtypes from '@/mixins/deckAnalyzerSubtypes.js'

export default {
	components: { AnalyzerFilterNotice, AnalyzerColors, AnalyzerManaSymbols, AnalyzerManaValues, AnalyzerSupertypes, AnalyzerTypes, AnalyzerCreatureSubtypes, AnalyzerOtherSubtypes, AnalyzerRarities, AnalyzerKeywords, AnalyzerPowerToughness, AnalyzerLayouts, AnalyzerStarred },
	mixins: [deckAnalyzer, deckAnalyzerSubtypes],
	props: {
		deck: Object
	},
	watch: {
		analyzerFilter (filter, prevFilter) {
			this.$nextTick(() => {
				if (filter.category) {
					this.scrollTableIntoView(filter.category)
				} else if (prevFilter && prevFilter.category) {
					this.scrollTableIntoView(prevFilter.category)
				}
			})
		}
	},
	methods: {
		scrollTableIntoView (category) {
			const section = document.querySelector(`#stats-${category}`)

			section.scrollIntoView({ block: 'nearest' })
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-analyzer.scss';
</style>
