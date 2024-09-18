import deckAnalyzerFiltering from './deckAnalyzerFiltering'

export default {
	mixins: [deckAnalyzerFiltering],
	computed: {
		tableHeadCommon () {
			return `
				<tr>
					<th></th>
					<th title="Count">Ct.</th>
					<th>Percent</th>
				</tr>
			`
		},
		totalCards () {
			return this.filteredCards().reduce(
				(total, card) => total + card.qty, 0
			)
		}
	},
	methods: {
		/**
		 * @param {number} count
		 * @returns {string} Percentage
		 */
		calculatePercentage (count) {
			return ((count / this.totalCards) * 100).toFixed(1)
		},
		/**
		 * @param {Object} counts
		 * @returns {Object} Object with properties sorted by count
		 */
		sortTableByCounts (counts) {
			return Object.fromEntries(Object.entries(counts).sort(
				(a, b) => {
					if (a[1].ct) {
						return b[1].ct - a[1].ct
					} else {
						return b[1] - a[1]
					}
				}
			))
		},
		totalRowLabel (subjectString) {
			if (this.$store.state.analyzerFilter.attribute) {
				return `All filtered ${subjectString}`
			} else {
				return `All ${subjectString}`
			}
		},
		determineVariablePowerToughness (card) {
			if (!card.toughness) {
				return 0
			}

			function hasVariablePT (forBackFace) {
				if (forBackFace) {
					return (
						card.power2 === '*' ||
						card.toughness2 === '*'
					)
				} else {
					return (
						card.power === '*' ||
						card.toughness === '*'
					)
				}
			}

			let countedOnFrontFace = false
			let variablePTCount = 0

			const variablePTPerFace = (forBackFace) => {
				if (
					!countedOnFrontFace &&
					hasVariablePT(forBackFace)
				) {
					variablePTCount += card.qty
					countedOnFrontFace = true
				}
			}

			variablePTPerFace()
			variablePTPerFace(true)

			return variablePTCount
		},
		layoutStatLabel (key) {
			switch (key) {
				case 'modal_dfc':
					return 'Modal double-faced'
				case 'double_faced_token':
					return 'Double-faced token'
				default:
					return key
						.replace(/_/g, ' ') // Replace any underscores with spaces.
						.charAt(0).toUpperCase() + key.slice(1) // Capitalize the initial letter.
			}
		}
	}
}
