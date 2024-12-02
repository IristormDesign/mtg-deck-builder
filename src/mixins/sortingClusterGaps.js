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

				if (nextCard) {
					switch (this.deck.sortBy) {
						case 'starred':
							this.gapsStarred(thisCard, nextCard)
							break
						case 'color':
							this.gapsColor(thisCard, nextCard)
							break
						case 'cmc':
							this.gapsCmc(thisCard, nextCard)
							break
						case 'supertype':
							this.gapsSupertype(thisCard, nextCard)
							break
						case 'type':
							this.gapsType(thisCard, nextCard)
							break
						case 'firstSubtype':
							this.gapsSubtype(thisCard, nextCard, false)
							break
						case 'lastSubtype':
							this.gapsSubtype(thisCard, nextCard, true)
							break
						case 'rarity':
							this.gapsRarity(thisCard, nextCard)
							break
						case 'pt-sum':
							this.gapsPTSum(thisCard, nextCard)
							break
						case 'qty':
							this.gapsQty(thisCard, nextCard)
							break
					}
				} else { // The last card in the list (before any newly added cards)
					setTimeout(() => {
						thisCard.gapAfter = true
					}, 1000) // Delay long enough for the `.card-li-fade` transition to finish.
				}
			}
		},
		gapsStarred (thisCard, nextCard) {
			if (thisCard.starred && !nextCard.starred) {
				thisCard.gapAfter = true
			}
		},
		gapsColor (thisCard, nextCard) {
			if (
				(
					nextCard.colors.length === 1 &&
					thisCard.colors[0] !== nextCard.colors[0]
				) || (
					thisCard.colors.length === 1 &&
					nextCard.colors.length > 1
				) || (
					thisCard.colors.length > 1 &&
					nextCard.colors.length === 0
				)
			) {
				thisCard.gapAfter = true
			}
		},
		gapsCmc (thisCard, nextCard) {
			if (thisCard.cmc < nextCard.cmc) {
				thisCard.gapAfter = true
			}
		},
		gapsType (thisCard, nextCard) {
			const regexFrontFaceType = (card) => {
				/* If the card is double-faced, get only the type of its front face (any string up to a slash character). */
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
		},
		gapsSubtype (thisCard, nextCard, lastPosition) {
			const regexFirstSubtype = /— \w+/
			const regexLastSubtype = /— (?:\w+ )*(\w+)$/

			function getSubtype (card) {
				if (lastPosition) {
					if (card.type.match(regexLastSubtype)) {
						return card.type.match(regexLastSubtype)[1]
					}
				} else {
					if (card.type.match(regexFirstSubtype)) {
						return card.type.match(regexFirstSubtype)[0]
					}
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
		},
		gapsSupertype (thisCard, nextCard) {
			const regexSupertype = /^\b(?:Basic|Elite|Host|Legendary|Ongoing|Snow|Token|World)\b/

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
		},
		gapsRarity (thisCard, nextCard) {
			if (thisCard.rarity !== nextCard.rarity) {
				thisCard.gapAfter = true
			}
		},
		gapsPTSum (thisCard, nextCard) {
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
		},
		gapsQty (thisCard, nextCard) {
			if (thisCard.qty > nextCard.qty) {
				thisCard.gapAfter = true
			}
		}
	}
}
