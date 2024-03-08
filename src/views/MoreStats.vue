<template>
	<div class="more-stats content-box">
		<div
			v-if="deck.cards.length <= 0"
			class="no-cards"
		>
			<p>This deck’s main card group has no cards yet. Statistics about it will display here once you’ve added cards with the <router-link :to="{name: 'deckEditor'}">deck editor</router-link>.</p>
		</div>
		<div
			v-else
			class="tables"
		>
			<more-stats-colors :deck="deck" />

			<more-stats-mana-values :deck="deck" />

			<more-stats-types :deck="deck" />

			<more-stats-subtypes
				:deck="deck" :subtypeNames="subtypeCreaturesNames" :subtypeCounts="subtypeCounts"
			>Creature</more-stats-subtypes>

			<more-stats-subtypes
				:deck="deck" :subtypeNames="subtypeOtherNames" :subtypeCounts="subtypeCounts"
			>Other</more-stats-subtypes>

			<more-stats-rarities :deck="deck" />

			<template v-if="deck.dataVersion >= 2">
				<more-stats-keywords :deck="deck" />

				<more-stats-power-toughness :deck="deck" />
			</template>

			<more-stats-misc :deck="deck" />

			<footer>
				<p v-if="deck.sideboard.cards.length >= 1">
					<small>Note: The statistics ignore cards in the sideboard.</small>
				</p>
				<p>
					<router-link :to="{ name: 'deckEditor' }">
						◂ Return to the deck editor
					</router-link>
				</p>
			</footer>
		</div>
	</div>
</template>

<script>
import MoreStatsColors from '@/components/MoreStatsColors.vue'
import MoreStatsManaValues from '@/components/MoreStatsManaValues.vue'
import MoreStatsTypes from '@/components/MoreStatsTypes.vue'
import MoreStatsSubtypes from '@/components/MoreStatsSubtypes.vue'
import MoreStatsRarities from '@/components/MoreStatsRarities.vue'
import MoreStatsMisc from '@/components/MoreStatsMisc.vue'
import MoreStatsKeywords from '@/components/MoreStatsKeywords.vue'
import MoreStatsPowerToughness from '@/components/MoreStatsPowerToughness.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { MoreStatsColors, MoreStatsManaValues, MoreStatsTypes, MoreStatsSubtypes, MoreStatsRarities, MoreStatsMisc, MoreStatsKeywords, MoreStatsPowerToughness },
	mixins: [getActiveDeck],
	props: {
		toAutoScrollDown: Boolean
	},
	data () {
		return {
			subtypeCreaturesNames: [],
			subtypeOtherNames: [],
			subtypeCounts: {}
		}
	},
	mounted () {
		this.autoScrollDown()
		this.displaySubtypes()
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
		displaySubtypes () {
			const allSubtypesCreatures = []
			const allSubtypesOther = []
			const subtypeCounts = this.subtypeCounts

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					const typeLine = card.type

					// Find the pattern that indicates the card is double-faced, which is a space, a slash, a space, and any characters afterward in the card's type line. (This doesn't look at the second face's entire type line.)
					const isDoubleFaced = typeLine.match(/\s\/\s\w*/)

					if (isDoubleFaced) {
						// Get the part of the string that precedes the slash character.
						const firstFace = typeLine.match(/[^/]*/)[0]

						// Get the part of the string that follows the slash character.
						const secondFace = typeLine.match(/\/.*/)[0]

						getSubtypesPerFace(firstFace)
						getSubtypesPerFace(secondFace)
					} else { // A regular single-face card.
						getSubtypesPerFace(typeLine)
					}
				}
			})

			function getSubtypesPerFace (cardFace) {
				// In each card's type line, get only the part that indicates the subtype: the em dash and all characters after it.
				const subtypesPattern = cardFace.match(/\s—\s.*/)

				// Ignore the following only if the card has no subtype.
				if (subtypesPattern) {
					// The card's line of subtypes, which may have only a single subtype or multiple of them.
					const subtypeLine = subtypesPattern[0]

					if (subtypeLine) {
						// Delete the " — " (em dash) part that came from the collected subtype pattern.
						subtypeLine.replace(' — ', '')

						// Get every single subtype in the subtype lines having multiple subtypes. Duplicate single subtypes are included.
						const isolatedSubtypes = subtypeLine.match(/\w+/g)

						// Put all of these isolated subtypes in the `subtypes` array.
						isolatedSubtypes.forEach(subtype => {
							const regexCreatureType = /\bCreature\b/

							if (regexCreatureType.test(cardFace)) {
								allSubtypesCreatures.push(subtype)
							} else {
								allSubtypesOther.push(subtype)
							}
						})
					}
				}
			}

			prepareSubtypesTable(allSubtypesCreatures, this.subtypeCreaturesNames)
			prepareSubtypesTable(allSubtypesOther, this.subtypeOtherNames)

			function prepareSubtypesTable (allSubtypes, subtypeNames) {
				// Make an array containing only the UNIQUE names among all the deck's subtypes.
				allSubtypes.forEach(subtype => {
					if (subtypeNames.indexOf(subtype) < 0) {
						subtypeNames.push(subtype)
					}
				})

				// Alphabetize the subtypes.
				subtypeNames.sort()

				// Set up an object having properties of the unique names of each subtype, with the count of each initially set to 0.
				subtypeNames.forEach(name => {
					subtypeCounts[name] = 0
				})

				// Apply the counts of each subtype.
				allSubtypes.forEach(subtype => {
					for (const name in subtypeCounts) {
						if (subtype === name) {
							subtypeCounts[subtype]++
						}
					}
				})
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-more-stats.scss';
</style>
