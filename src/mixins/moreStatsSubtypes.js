export default {
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
	},
	methods: {
		/**
		 * Go through the deck, checking for each card's subtypes, then tally each subtype.
		 */
		getAllSubtypes () {
			this.deck.cards.forEach(card => {
				const faceTypeLines = this.getEachCardFaceTypeLine(card.type)

				faceTypeLines.forEach(typeLine => {
					const regexSubtypeSignifier = /\s—\s.+/ // Space, em dash, space, and any additional characters.

					// From the card face's type line, find only the part that indicates there's at least one subtype.
					const hasSubtype = typeLine.match(regexSubtypeSignifier)

					if (hasSubtype) {
						const regexWholeWords = /\w+/g

						// Isolate each subtype from the subtypes string.
						const individualSubtypes = hasSubtype[0].match(regexWholeWords)

						this.countSubtypes(individualSubtypes, card)
					}
				})
			})
		},
		/**
		 * Return each type line of the given card. Most cards have only one type line, but double-faced cards have two.
		 * @param {string} typeLine
		 * @returns {Array} An array containing either one or two strings
		 */
		getEachCardFaceTypeLine (typeLine) {
			const regexDoubleFaced = /\s\/\s\w+/ // " / " plus any word characters.

			if (typeLine.match(regexDoubleFaced)) {
				const regexCardFaceDivider = /[^/]+/g // Match any continuous substrings that do NOT contain a slash character.
				const frontFaceTypeLine = typeLine.match(regexCardFaceDivider)[0]
				const backFaceTypeLine = typeLine.match(regexCardFaceDivider)[1]

				return [frontFaceTypeLine, backFaceTypeLine]
			} else {
				return [typeLine]
			}
		},
		/**
		 * Tally each subtype. The results go to the designated counts object for either creature subtypes or other subtypes.
		 * @param {Array} subtypes
		 * @param {Object} card
		 */
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
