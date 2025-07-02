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
		fullCardName (card) {
			return this.hasDoubleCastableFaces(card)
				? `${card.name} // ${card.name2}`
				: card.name
		}
	}
}
