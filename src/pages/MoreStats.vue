<template>
	<div class="more-stats content-box">
		<h3>More Deck Statistics</h3>

		<div class="tables">
			<more-stats-colors :deck="deck" :manaSymbol="manaSymbol" />
			<more-stats-mana-values :deck="deck" />
			<more-stats-types :deck="deck" />
			<more-stats-subtypes
				:deck="deck"
				:subtypeNames="subtypeCreaturesNames"
				:subtypeCounts="subtypeCounts"
			>Creatures</more-stats-subtypes>
			<more-stats-subtypes
				:deck="deck"
				:subtypeNames="subtypeOtherNames"
				:subtypeCounts="subtypeCounts"
			>Other Cards</more-stats-subtypes>
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
	components: { MoreStatsColors, MoreStatsManaValues, MoreStatsTypes, MoreStatsSubtypes, MoreStatsRarities, MoreStatsMisc },
	data () {
		return {
			subtypeCreaturesNames: [],
			subtypeOtherNames: [],
			subtypeCounts: {}
		}
	},
	mounted () {
		this.displaySubtypes()
	},
	methods: {
		displaySubtypes () {
			const subtypeCreaturesNames = this.subtypeCreaturesNames
			const subtypeOtherNames = this.subtypeOtherNames
			const subtypeCounts = this.subtypeCounts
			const allSubtypesCreatures = []
			const allSubtypesOther = []

			function getSubtypesPerFace (cardFace) {
				// In each card's type line, get only the part that indicates the subtype: the em dash and all characters after it.
				const subtypesPattern = cardFace.match(RegExp(/\s—\s.*/))

				// Ignore the following only if the card has no subtype.
				if (subtypesPattern) {
					// The card's line of subtypes, which may have only a single subtype or multiple of them.
					const subtypeLine = subtypesPattern[0]

					if (subtypeLine) {
						// Delete the " — " (em dash) part that came from the collected subtype pattern.
						subtypeLine.replace(' — ', '')

						// Get every single subtype in the subtype lines having multiple subtypes. Duplicate single subtypes are included.
						const isolatedSubtypes = subtypeLine.match(RegExp(/\w+/g))

						// Put all of these isolated subtypes in the `subtypes` array.
						isolatedSubtypes.forEach(subtype => {
							const regexCreatureType = RegExp(/\bCreature\b/)

							if (regexCreatureType.test(cardFace)) {
								allSubtypesCreatures.push(subtype)
							} else {
								allSubtypesOther.push(subtype)
							}
						})
					}
				}
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					const typeLine = card.type

					// Find the pattern that indicates the card is double-faced, which is a space, a slash, a space, and any characters afterward in the card's type line. (This doesn't look at the second face's entire type line.)
					const isDoubleFaced = typeLine.match(RegExp(/\s\/\s\w*/))

					if (isDoubleFaced) {
						// Get the part of the string that precedes the slash character.
						const firstFace = typeLine.match(RegExp(/[^/]*/))[0]

						// Get the part of the string that follows the slash character.
						const secondFace = typeLine.match(RegExp(/\/.*/))[0]

						getSubtypesPerFace(firstFace)
						getSubtypesPerFace(secondFace)
					} else { // A regular single-face card.
						getSubtypesPerFace(typeLine)
					}
				}
			})

			// Make an array containing only the UNIQUE names among all the deck's subtypes.
			allSubtypesCreatures.forEach(subtype => {
				if (subtypeCreaturesNames.indexOf(subtype) < 0) {
					subtypeCreaturesNames.push(subtype)
				}
			})
			allSubtypesOther.forEach(subtype => {
				if (subtypeOtherNames.indexOf(subtype) < 0) {
					subtypeOtherNames.push(subtype)
				}
			})

			// Alphabetize the subtypes.
			subtypeCreaturesNames.sort()
			subtypeOtherNames.sort()

			// Set up an object having properties of the unique names of each subtype, with the count of each initially set to 0.
			subtypeCreaturesNames.forEach(name => {
				subtypeCounts[name] = 0
			})
			subtypeOtherNames.forEach(name => {
				subtypeCounts[name] = 0
			})

			// Apply the counts of each subtype.
			allSubtypesCreatures.forEach(subtype => {
				for (const name in subtypeCounts) {
					if (subtype === name) {
						subtypeCounts[subtype]++
					}
				}
			})
			allSubtypesOther.forEach(subtype => {
				for (const name in subtypeCounts) {
					if (subtype === name) {
						subtypeCounts[subtype]++
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-more-stats.scss';
</style>
