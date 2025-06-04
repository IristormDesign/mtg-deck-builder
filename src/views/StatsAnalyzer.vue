<template>
	<div
		class="stats-analyzer content-box"
		role="tabpanel" aria-labelledby="stats-analyzer-tab"
	>
		<p
			v-if="deck.cards.length <= 0"
			class="no-cards"
		>
			Statistics about your deck will appear here once you’ve added cards to the main card group in the <router-link :to="{name: 'listEditor'}">List Editor</router-link>.
		</p>
		<div v-else class="tables">
			<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
				<symbol id="cancel-icon" viewBox="0 -960 960 960">
					<path d="m339-301.85 141-141 141 141L658.15-339l-141-141 141-141L621-658.15l-141 141-141-141L301.85-621l141 141-141 141L339-301.85ZM480.07-116q-74.84 0-141.21-28.42t-116.18-78.21q-49.81-49.79-78.25-116.13Q116-405.1 116-479.93q0-75.84 28.42-141.71t78.21-115.68q49.79-49.81 116.13-78.25Q405.1-844 479.93-844q75.84 0 141.71 28.42t115.68 78.21q49.81 49.79 78.25 115.63Q844-555.9 844-480.07q0 74.84-28.42 141.21t-78.21 116.18q-49.79 49.81-115.63 78.25Q555.9-116 480.07-116Zm-.07-52q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/>
				</symbol>
			</svg>
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
							<p>Cards in the sideboard are excluded.</p>
						</li>
						<li>
							<p>Within each category, individual cards can be counted multiple times if they match multiple attributes. (For example, if a card’s type line says “Artifact Creature,” then the Types category includes that card as both an artifact and a creature.) Cards counted in this way don’t inflate the overall number of cards.</p>
						</li>
						<li>
							<p>For every double-faced card, most categories count the attributes of the front and back faces together without repeating any same attributes between both. Only the “Mana Values of Spells” category ignores the back face.</p>
						</li>
						<li>
							<p>For more info about the Stats Analyzer, see the <router-link to="/guide/stats-analyzer">User Guide</router-link>.</p>
						</li>
					</ul>
				</div>
			</footer>
		</div>
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
import statsAnalyzer from '@/mixins/statsAnalyzer.js'
import statsAnalyzerSubtypes from '@/mixins/statsAnalyzerSubtypes.js'

export default {
	components: { AnalyzerFilterNotice, AnalyzerColors, AnalyzerManaSymbols, AnalyzerManaValues, AnalyzerSupertypes, AnalyzerTypes, AnalyzerCreatureSubtypes, AnalyzerOtherSubtypes, AnalyzerRarities, AnalyzerKeywords, AnalyzerPowerToughness, AnalyzerLayouts, AnalyzerStarred },
	mixins: [statsAnalyzer, statsAnalyzerSubtypes],
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
	metaInfo () {
		return {
			title: this.deck.name + ' · Stats Analyzer'
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
	@use '@/sass/page-stats-analyzer.scss';
</style>
