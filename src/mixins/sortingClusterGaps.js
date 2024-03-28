export default {
	methods: {
		/**
		 * @param {Object} deck
		 */
		addSortingClusterGaps (deck) {
			this.findWhereToPutGaps(deck.cards)
			this.findWhereToPutGaps(deck.sideboard.cards)
		},
		findWhereToPutGaps (cards) {
			for (let i = 0; i < cards.length; i++) {
				const thisCard = cards[i]
				const nextCard = cards[(i + 1)]

				thisCard.gapAfter = false

				function gapsStarred () {
					if (thisCard.starred && !nextCard.starred) {
						thisCard.gapAfter = true
					}
				}
				function gapsCmc () {
					if (thisCard.cmc < nextCard.cmc) {
						thisCard.gapAfter = true
					}
				}
				function gapsType () {
					const regexFrontFaceType = (card) => {
						// If the card is double-faced, get only the type of its front face (any string up to a slash character).
						return card.type.match(/[^/]*/)[0]
					}
					const thisCardType = regexFrontFaceType(thisCard)
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

					if (isCreature(thisCardType)) {
						if (!isCreature(nextCardType)) {
							thisCard.gapAfter = true
						}
					} else if (isPlaneswalker(thisCardType)) {
						if (!isPlaneswalker(nextCardType)) {
							thisCard.gapAfter = true
						}
					} else if (isEnchantment(thisCardType)) {
						if (!isEnchantment(nextCardType)) {
							thisCard.gapAfter = true
						}
					} else if (isArtifact(thisCardType)) {
						if (!isArtifact(nextCardType)) {
							thisCard.gapAfter = true
						}
					} else if (isSorcery(thisCardType)) {
						if (!isSorcery(nextCardType)) {
							thisCard.gapAfter = true
						}
					} else if (isInstant(thisCardType)) {
						if (!isInstant(nextCardType)) {
							thisCard.gapAfter = true
						}
					} else if (isLand(thisCardType)) {
						if (!isLand(nextCardType)) {
							thisCard.gapAfter = true
						}
					} else { // A card type other than any of the standard card types
						if (isCreature(nextCardType) || isPlaneswalker(nextCardType) || isEnchantment(nextCardType) || isArtifact(nextCardType) || isSorcery(nextCardType) || isInstant(nextCardType) || isLand(nextCardType)) {
							thisCard.gapAfter = true
						}
					}
				}
				function gapsSubtype () {
					const hasSubtype = (card) => {
						const regexSubtype = / — \w/

						return regexSubtype.test(card.type)
					}

					if (hasSubtype(thisCard) && !hasSubtype(nextCard)) {
						thisCard.gapAfter = true
					}
				}
				function gapsSupertype () {
					const hasSupertype = (card) => {
						const regexSupertype = /^\b(Basic|Elite|Legendary|Ongoing|Snow|Token|World)\b \w/

						return regexSupertype.test(card.type)
					}

					if (hasSupertype(thisCard) && !hasSupertype(nextCard)) {
						thisCard.gapAfter = true
					}
				}
				function gapsPTSum () {
					if (thisCard.power !== undefined && nextCard.power === undefined) {
						thisCard.gapAfter = true
					}
				}
				function gapsQty () {
					if (thisCard.qty > nextCard.qty) {
						thisCard.gapAfter = true
					}
				}

				if (nextCard) {
					switch (this.deck.sortBy) {
						case 'starred':
							gapsStarred(); break
						case 'cmc':
							gapsCmc(); break
						case 'supertype':
							gapsSupertype(); break
						case 'type':
							gapsType(); break
						case 'subtype':
							gapsSubtype(); break
						case 'pt-sum':
							gapsPTSum(); break
						case 'qty':
							gapsQty(); break
					}
				} else { // The last card in the list (before any newly added cards)
					setTimeout(() => {
						thisCard.gapAfter = true
					}, 1000) // Delay long enough for the `.card-li-fade` transition to finish.
				}
			}
		}
	}
}
