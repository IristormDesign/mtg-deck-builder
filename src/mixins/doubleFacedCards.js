export default {
	methods: {
		hasDoubleCastableFaces (card) {
			switch (card.layout) {
				case 'adventure':
				case 'modal_dfc':
				case 'split':
					return true
				default:
					return false
			}
		},
		doubleFacedCardName (card) {
			let fullName = card.name

			if (this.hasDoubleCastableFaces(card)) {
				fullName += ` // ${card.name2}`
			}

			return fullName
		}
	}
}
