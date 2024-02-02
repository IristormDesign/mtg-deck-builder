export default {
	methods: {
		/**
		 * @param {Object} deck
		 * @param {string} sortBy
		 */
		addSortingClusterGaps (deck, sortBy) {
			function findWhereToPutGaps (cards) {
				for (let i = 0; i < cards.length; i++) {
					const thisCard = cards[i]
					const nextCard = cards[(i + 1)]

					thisCard.gapAfter = false

					if (nextCard) {
						if (sortBy === 'starred') {
							if (thisCard.starred && !nextCard.starred) {
								thisCard.gapAfter = true
							}
						} else if (sortBy === 'cmc') {
							if (thisCard.cmc < nextCard.cmc) {
								thisCard.gapAfter = true
							}
						} else if (sortBy === 'type') {
							const regexFrontFaceType = (card) => {
								// If the card is double-faced, get only the type of its front face (any string up to a slash character).
								return card.type.match(/[^/]*/)[0]
							}
							const cardType = regexFrontFaceType(thisCard)
							const nextCardType = regexFrontFaceType(nextCard)

							function isCreature (string) {
								return /\bCreature\b/.test(string)
							}
							function isPlaneswalker (string) {
								return /\bPlaneswalker\b/.test(string)
							}
							function isEnchantment (string) {
								return /\bEnchantment\b/.test(string)
							}
							function isArtifact (string) {
								return /\bArtifact\b/.test(string)
							}
							function isSorcery (string) {
								return /\bSorcery\b/.test(string)
							}
							function isInstant (string) {
								return /\bInstant\b/.test(string)
							}
							function isLand (string) {
								return /\bLand\b/.test(string)
							}

							if (isCreature(cardType)) {
								if (!isCreature(nextCardType)) {
									thisCard.gapAfter = true
								}
							} else if (isPlaneswalker(cardType)) {
								if (!isPlaneswalker(nextCardType)) {
									thisCard.gapAfter = true
								}
							} else if (isEnchantment(cardType)) {
								if (!isEnchantment(nextCardType)) {
									thisCard.gapAfter = true
								}
							} else if (isArtifact(cardType)) {
								if (!isArtifact(nextCardType)) {
									thisCard.gapAfter = true
								}
							} else if (isSorcery(cardType)) {
								if (!isSorcery(nextCardType)) {
									thisCard.gapAfter = true
								}
							} else if (isInstant(cardType)) {
								if (!isInstant(nextCardType)) {
									thisCard.gapAfter = true
								}
							} else if (isLand(cardType)) {
								if (!isLand(nextCardType)) {
									thisCard.gapAfter = true
								}
							} else { // A card type other than any of the standard card types
								if (isCreature(nextCardType) || isPlaneswalker(nextCardType) || isEnchantment(nextCardType) || isArtifact(nextCardType) || isSorcery(nextCardType) || isInstant(nextCardType) || isLand(nextCardType)) {
									thisCard.gapAfter = true
								}
							}
						} else if (sortBy === 'subtype') {
							const hasSubtype = (card) => {
								const regexSubtype = / — \w/

								return regexSubtype.test(card.type)
							}

							if (hasSubtype(thisCard) && !hasSubtype(nextCard)) {
								thisCard.gapAfter = true
							}
						} else if (sortBy === 'supertype') {
							const hasSupertype = (card) => {
								const regexSupertype = /^\b(Basic|Elite|Legendary|Ongoing|Snow|Token|World)\b \w/

								return regexSupertype.test(card.type)
							}

							if (hasSupertype(thisCard) && !hasSupertype(nextCard)) {
								thisCard.gapAfter = true
							}
						} else if (sortBy === 'pt-sum') {
							if (thisCard.power !== undefined && nextCard.power === undefined) {
								thisCard.gapAfter = true
							}
						} else if (sortBy === 'qty') {
							if (thisCard.qty > nextCard.qty) {
								thisCard.gapAfter = true
							}
						}
					} else { // The last card in the list (before any newly added cards)
						thisCard.gapAfter = true
					}
				}
			}

			findWhereToPutGaps(deck.cards)
			findWhereToPutGaps(deck.sideboard.cards)
		}
	}
}
