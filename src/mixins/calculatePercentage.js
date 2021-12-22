export default {
	methods: {
		calculatePercentage (givenValue) {
			let deckTotal = 0

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					deckTotal++
				}
			})

			const percentage = ((givenValue / deckTotal) * 100).toFixed(1)

			return percentage + '%'
		}
	}
}
