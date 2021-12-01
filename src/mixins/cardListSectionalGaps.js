export default {
	methods: {
		addSectionalGaps (deck, sortAttribute) {
			function isCreature (string) {
				return RegExp(/\bCreature\b/).test(string)
			}
			function isPlaneswalker (string) {
				return RegExp(/\bPlaneswalker\b/).test(string)
			}
			function isEnchantment (string) {
				return RegExp(/\bEnchantment\b/).test(string)
			}
			function isArtifact (string) {
				return RegExp(/\bArtifact\b/).test(string)
			}
			function isSorcery (string) {
				return RegExp(/\bSorcery\b/).test(string)
			}
			function isInstant (string) {
				return RegExp(/\bInstant\b/).test(string)
			}
			function isLand (string) {
				return RegExp(/\bLand\b/).test(string)
			}

			for (let i = 0; i < deck.cards.length; i++) {
				const card = deck.cards[i]
				const nextCard = deck.cards[(i + 1)]

				card.gapAfter = false

				if (nextCard) {
					if (sortAttribute === 'cmc') {
						if (card.cmc < nextCard.cmc) {
							card.gapAfter = true
						}
					} else if (sortAttribute === 'type') {
						const regexFrontFaceType = (card) => {
							// If the card is double-faced, get only the type of its front face (any string up to a slash character).
							return card.type.match(RegExp(/[^/]*/))[0]
						}
						const cardType = regexFrontFaceType(card)
						const nextCardType = regexFrontFaceType(nextCard)

						if (isCreature(cardType)) {
							if (!isCreature(nextCardType)) {
								card.gapAfter = true
							}
						} else if (isPlaneswalker(cardType)) {
							if (!isPlaneswalker(nextCardType)) {
								card.gapAfter = true
							}
						} else if (isEnchantment(cardType)) {
							if (!isEnchantment(nextCardType)) {
								card.gapAfter = true
							}
						} else if (isArtifact(cardType)) {
							if (!isArtifact(nextCardType)) {
								card.gapAfter = true
							}
						} else if (isSorcery(cardType)) {
							if (!isSorcery(nextCardType)) {
								card.gapAfter = true
							}
						} else if (isInstant(cardType)) {
							if (!isInstant(nextCardType)) {
								card.gapAfter = true
							}
						} else if (isLand(cardType)) {
							if (!isLand(nextCardType)) {
								card.gapAfter = true
							}
						} else { // A card type other than any of the standard card types
							if (isCreature(nextCardType) || isPlaneswalker(nextCardType) || isEnchantment(nextCardType) || isArtifact(nextCardType) || isSorcery(nextCardType) || isInstant(nextCardType) || isLand(nextCardType)) {
								card.gapAfter = true
							}
						}
					} else if (sortAttribute === 'subtype') {
						const hasSubtype = (card) => {
							return RegExp(/\s—\s.*/).test(card.type)
						}

						if (hasSubtype(card) && !hasSubtype(nextCard)) {
							card.gapAfter = true
						}
					}
				} else { // The last card in the list (before any newly added cards)
					card.gapAfter = true
				}
			}
		}
	}
}
