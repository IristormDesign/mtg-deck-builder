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

				if (this.hasGapAfter(thisCard, nextCard)) {
					thisCard.gapAfter = true
				} else {
					delete thisCard.gapAfter
				}
			}
		},
		hasGapAfter (thisCard, nextCard) {
			if (nextCard) {
				switch (this.deck.sortBy.toLowerCase()) {
					case 'starred':
						return this.gapsStarred(thisCard, nextCard)
					case 'mana color':
						return this.gapsColor(thisCard, nextCard)
					case 'mana value':
						return this.gapsCmc(thisCard, nextCard)
					case 'supertype':
						return this.gapsSupertype(thisCard, nextCard)
					case 'type':
						return this.gapsType(thisCard, nextCard)
					case 'first subtype':
						return this.gapsSubtype(thisCard, nextCard, false)
					case 'last subtype':
						return this.gapsSubtype(thisCard, nextCard, true)
					case 'rarity':
						return this.gapsRarity(thisCard, nextCard)
					case 'mana sources':
						return this.gapsManaSources(thisCard, nextCard)
					case 'p/t':
						return this.gapsPT(thisCard, nextCard)
					case 'quantity':
						return this.gapsQty(thisCard, nextCard)
				}
			} else { // The last card in the list (before any newly added cards)
				setTimeout(() => {
					return true
				}, 1000) // Delay long enough for the `.card-li-fade` transition to finish.
			}
		},
		isLand (cardType) {
			const regexLand = /\bLand\b/

			return regexLand.test(cardType)
		},
		gapsStarred (thisCard, nextCard) {
			return (thisCard.starred && !nextCard.starred)
		},
		gapsColor (thisCard, nextCard) {
			return (
				(
					nextCard.colors.length === 1 &&
					thisCard.colors[0] !== nextCard.colors[0]
				) || (
					thisCard.colors.length === 1 &&
					nextCard.colors.length !== 1 // If next card is either multicolored or colorless
				) || (
					thisCard.colors.length >= 2 &&
					nextCard.colors.length === 0
				) || (
					thisCard.colors.length === 0 &&
					!this.isLand(thisCard.type) &&
					this.isLand(nextCard.type)
				)
			)
		},
		gapsCmc (thisCard, nextCard) {
			if (
				this.isLand(thisCard.type) &&
				!this.isLand(nextCard.type)
			) {
				return true
			} else {
				return (thisCard.cmc < nextCard.cmc)
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
				return !isCreature(nextCardType)
			} else if (isPlaneswalker(thisCardType)) {
				return !isPlaneswalker(nextCardType)
			} else if (isEnchantment(thisCardType)) {
				return !isEnchantment(nextCardType)
			} else if (isArtifact(thisCardType)) {
				return !isArtifact(nextCardType)
			} else if (isSorcery(thisCardType)) {
				return !isSorcery(nextCardType)
			} else if (isInstant(thisCardType)) {
				return !isInstant(nextCardType)
			} else if (isLand(thisCardType)) {
				return !isLand(nextCardType)
			} else { // A card type other than any of the standard card types
				return (
					isCreature(nextCardType) ||
					isPlaneswalker(nextCardType) ||
					isEnchantment(nextCardType) ||
					isArtifact(nextCardType) ||
					isSorcery(nextCardType) ||
					isInstant(nextCardType) ||
					isLand(nextCardType)
				)
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

			if (getSubtype(thisCard) && !getSubtype(nextCard)) {
				return true
			}
		},
		gapsSupertype (thisCard, nextCard) {
			const regexSupertype = /^\b(?:Basic|Elite|Host|Legendary|Ongoing|Snow|Token|World)\b/

			function getSupertype (card) {
				if (card.type.match(regexSupertype)) {
					return card.type.match(regexSupertype)[0]
				}
			}

			if (getSupertype(thisCard) && !getSupertype(nextCard)) {
				return true
			} else if (getSupertype(thisCard) !== getSupertype(nextCard)) {
				return true
			}
		},
		gapsRarity (thisCard, nextCard) {
			if (thisCard.rarity.charAt(0) !== nextCard.rarity.charAt(0)) {
				return true
			}
		},
		gapsManaSources (thisCard, nextCard) {
			if (thisCard.prodMana?.length !== nextCard.prodMana?.length) {
				return true
			} else if (thisCard.prodMana) {
				for (const color of thisCard.prodMana) {
					if (!nextCard.prodMana.includes(color)) {
						return true
					}
				}
			}
		},
		gapsPT (thisCard, nextCard) {
			function ptSum (card) {
				function setNaNToZero (pt) {
					if (isNaN(pt)) {
						return 0
					} else {
						return Number(pt)
					}
				}

				if (card.toughness) {
					return setNaNToZero(card.power) + setNaNToZero(card.toughness)
				} else if (card.loyalty) {
					return setNaNToZero(card.loyalty)
				}
			}

			if ((
				thisCard.toughness !== undefined ||
				thisCard.loyalty !== undefined
			) && (
				nextCard.toughness === undefined &&
				nextCard.loyalty === undefined
			)) {
				return true
			} else if (ptSum(thisCard) !== ptSum(nextCard)) {
				return true
			}
		},
		gapsQty (thisCard, nextCard) {
			if (thisCard.qty > nextCard.qty) {
				return true
			}
		}
	}
}
