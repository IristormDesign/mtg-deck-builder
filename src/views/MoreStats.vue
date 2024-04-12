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

export default {
	components: { MoreStatsColors, MoreStatsColorSymbols, MoreStatsManaValues, MoreStatsTypes, MoreStatsSubtypes, MoreStatsRarities, MoreStatsMiscellaneous, MoreStatsKeywords, MoreStatsPowerToughness },
	mixins: [getActiveDeck],
	props: {
		toAutoScrollDown: Boolean
	},
	data () {
		return {
			creatureSubtypeCounts: {},
			otherSubtypeCounts: {}
		}
	},
	mounted () {
		this.getAllSubtypes()
		this.creatureSubtypeCounts = this.alphabetizeSubtypes(this.creatureSubtypeCounts)
		this.otherSubtypeCounts = this.alphabetizeSubtypes(this.otherSubtypeCounts)
		this.autoScrollDown()
	},
	methods: {
		autoScrollDown () {
			this.$nextTick(() => {
				if (this.toAutoScrollDown) {
					const article = document.querySelector('.more-stats h3')

					if (article) {
						article.scrollIntoView({
							behavior: 'smooth'
						})
					}
				}
			})
		},
		getAllSubtypes () {
			this.deck.cards.forEach(card => {
				const faceTypeLines = getEachCardFaceTypeLine(card.type)

				faceTypeLines.forEach(typeLine => {
					const regexSubtypeSignifier = /\s—\s.+/ // Space, em dash, space, and any additional characters.

					// From the card face's type line, find only the part that indicates there's at least one subtype.
					const hasSubtype = typeLine.match(regexSubtypeSignifier)

					if (hasSubtype) {
						// Get each subtype from the subtypes string.
						const regexWholeWords = /\w+/g
						const individualSubtypes = hasSubtype[0].match(regexWholeWords)

						// Count the subtypes.
						this.countSubtypes(individualSubtypes, card)
					}
				})
			})

			/**
			 * Get each type line of the card. If the card is double-faced, it has two type lines.
			 */
			function getEachCardFaceTypeLine (typeLine) {
				const regexDoubleFaced = /\s\/\s\w+/ // " / " plus any word characters.

				if (typeLine.match(regexDoubleFaced)) {
					const regexCardFaceDivider = /[^/]+/g // Match any continuous substrings that do NOT contain a slash character.
					const frontFaceTypeLine = typeLine.match(regexCardFaceDivider)[0]
					const backFaceTypeLine = typeLine.match(regexCardFaceDivider)[1]

					return [frontFaceTypeLine, backFaceTypeLine]

				// Else this card is an ordinary single-face one.
				} else {
					return [typeLine]
				}
			}
		},
		countSubtypes (subtypes, card) {
			const regexCreatureType = /\bCreature\b/

			// Put each isolated subtype in the proper subtypes object group (either creature or other).
			subtypes.forEach(subtype => {
				if (regexCreatureType.test(card.type)) {
					countSubtypesPerCategory(this.creatureSubtypeCounts)
				} else {
					countSubtypesPerCategory(this.otherSubtypeCounts)
				}

				function countSubtypesPerCategory (counts) {
					if (!counts[subtype]) {
						counts[subtype] = 0
					}

					counts[subtype] += card.qty
				}
			})
		},
		alphabetizeSubtypes (counts) {
			return Object.fromEntries(
				Object.entries(counts).sort()
			)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-more-stats.scss';
</style>
