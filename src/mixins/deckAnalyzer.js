import deckAnalyzerFiltering from './deckAnalyzerFiltering'
import regexPatterns from '@/mixins/regexPatterns.js'

export default {
	mixins: [deckAnalyzerFiltering, regexPatterns],
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
			let variablePTCount = 0

			function perFace (p, t) {
				if (!p || !t) return

				const isVariablePT = (
					isNaN(Number(p)) ||
					isNaN(Number(t))
				)

				if (isVariablePT) {
					variablePTCount += card.qty
				}
			}

			perFace(card.power, card.toughness)
			perFace(card.power2, card.toughness2)

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
