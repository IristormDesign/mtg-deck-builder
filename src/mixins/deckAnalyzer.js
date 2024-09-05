export default {
	computed: {
		analyzerFilter () {
			return this.$store.state.analyzerFilter
		},
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
			return this.deck.cards.reduce(
				(total, card) => total + card.qty,
				0
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
			return Object.fromEntries(
				Object.entries(counts)
					.sort((a, b) => {
						if (a[1].ct) {
							return b[1].ct - a[1].ct
						} else {
							return b[1] - a[1]
						}
					})
			)
		},
		filteredCards () {
			if (this.analyzerFilter) {
				const cards = this.deck.cards.filter(card => {
					if (/\bLand\b/.test(card.type)) return null

					const colorName = (colorCode) => {
						switch (colorCode) {
							case 'W': return 'White'
							case 'U': return 'Blue'
							case 'B': return 'Black'
							case 'R': return 'Red'
							case 'G': return 'Green'
						}
					}

					for (const color of card.colors) {
						if (this.analyzerFilter[1] === colorName(color)) {
							return card
						}
					}

					const length = card.colors.length

					switch (this.analyzerFilter[1]) {
						case 'Monocolored':
							if (length === 1) {
								return card
							}
							break
						case 'Multicolored':
							if (length > 1) {
								return card
							}
							break
						case 'Colorless':
							if (length < 1) {
								return card
							}
					}

					return null
				})

				return cards
			} else {
				return this.deck.cards
			}
		}
	}
}
