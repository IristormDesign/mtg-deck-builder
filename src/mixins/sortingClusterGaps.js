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
					const regexSubtype = / — \w+/

					function getSubtype (card) {
						if (card.type.match(regexSubtype)) {
							return card.type.match(regexSubtype)[0]
						}
					}

					if (
						getSubtype(thisCard) &&
						!getSubtype(nextCard)
					) {
						thisCard.gapAfter = true
					} else if (
						getSubtype(thisCard) !== getSubtype(nextCard)
					) {
						thisCard.gapAfter = true
					}
				}
				function gapsSupertype () {
					const regexSupertype = /^\b(?:Basic|Elite|Host|Legendary|Ongoing|Snow|Token|World)\b /

					function getSupertype (card) {
						if (card.type.match(regexSupertype)) {
							return card.type.match(regexSupertype)[0]
						}
					}

					if (
						getSupertype(thisCard) &&
						!getSupertype(nextCard)
					) {
						thisCard.gapAfter = true
					} else if (
						getSupertype(thisCard) !== getSupertype(nextCard)
					) {
						thisCard.gapAfter = true
					}
				}
				function gapsRarity () {
					if (thisCard.rarity !== nextCard.rarity) {
						thisCard.gapAfter = true
					}
				}
				function gapsPTSum () {
					function ptSum (card) {
						function setNaNToZero (pt) {
							if (isNaN(pt)) {
								return 0
							} else {
								return Number(pt)
							}
						}

						return setNaNToZero(card.power) + setNaNToZero(card.toughness)
					}

					if (
						thisCard.power !== undefined &&
						nextCard.power === undefined
					) {
						thisCard.gapAfter = true
					} else if (ptSum(thisCard) !== ptSum(nextCard)) {
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
						case 'rarity':
							gapsRarity(); break
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
