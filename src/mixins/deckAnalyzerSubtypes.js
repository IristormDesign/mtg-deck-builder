import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
	data () {
		return {
			creatureSubtypeCounts: {},
			otherSubtypeCounts: {}
		}
	},
	mounted () {
		this.extractEverySubtype()

		this.creatureSubtypeCounts = this.alphabetizeSubtypes(this.creatureSubtypeCounts)
		this.creatureSubtypeCounts = this.sortTableByCounts(this.creatureSubtypeCounts)

		this.otherSubtypeCounts = this.alphabetizeSubtypes(this.otherSubtypeCounts)
		this.otherSubtypeCounts = this.sortTableByCounts(this.otherSubtypeCounts)
	},
	methods: {
		/**
		 * Go through the deck, checking for each card's subtypes, then tally each subtype.
		 */
		extractEverySubtype () {
			this.deck.cards.forEach(card => {
				const countedOnFrontFace = {}

				const subtypesPerFace = (typeLine) => {
					if (!typeLine) return

					const regexSubtypeSignifier = /\s—\s.+/ // Space, em dash, space, and any additional characters.
					const hasSubtype = typeLine.match(regexSubtypeSignifier) // From the card face's type line, find only the part that indicates there's at least one subtype.

					if (!hasSubtype) return

					const regexWholeWords = /\w+/g
					const individualSubtypes = hasSubtype[0].match(regexWholeWords) // Isolate each subtype from the subtypes string.

					this.countSubtypes(individualSubtypes, countedOnFrontFace, typeLine, card.qty)
				}

				subtypesPerFace(card.type)
				subtypesPerFace(card.type2)
			})
		},
		/**
		 * Tally each subtype of a card. The cumulative results go to the designated counts object for either creature subtypes or "other" subtypes. This function works with double-faced cards as well as single-faced ones.
		 * @param {Array} subtypes - An array of each extracted subtype of the card's face.
		 * @param {Object} countedOnFrontFace - An object that tracks whether each subtype of the card's front face has already been counted (for double-faced cards).
		 * @param {string} typeLine - A string of the card face's type line.
		 * @param {number} qty - The number of the card's quantity.
		 */
		countSubtypes (subtypes, countedOnFrontFace, typeLine, qty) {
			subtypes.forEach(subtype => {
				if (countedOnFrontFace[subtype]) return

				if (/\bCreature\b/.test(typeLine)) {
					countPerCategory(this.creatureSubtypeCounts)
				} else {
					countPerCategory(this.otherSubtypeCounts)
				}

				function countPerCategory (counts) {
					if (!counts[subtype]) {
						counts[subtype] = 0
					}

					counts[subtype] += qty
					countedOnFrontFace[subtype] = true
				}
			})
		},
		/**
		 * Arrange the subtypes by name in alphabetical order.
		 * @param {Object} counts The counts object for either creature subtypes or other subtypes.
		 * @returns Resorted subtypes object
		 */
		alphabetizeSubtypes (counts) {
			return Object.fromEntries(
				Object.entries(counts).sort()
			)
		}
	}
}
