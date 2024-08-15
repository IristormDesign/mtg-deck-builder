export default {
	data () {
		return {
			mainLastHighlightedIndex: -1,
			sideboardLastHighlightedIndex: -1
		}
	},
	computed: {
		cardLIs () {
			return document.getElementsByClassName('card-li') // Using `.getElementsByClassName` instead of `.querySelectorAll` here because the former gets a live node list. The live node list automatically updates whenever the card list switches between main and sideboard.
		},
		noActiveInputs () {
			const allPageInputs = document.querySelectorAll('input[type="text"], input[type="number"]')

			for (const input of allPageInputs) {
				if (document.activeElement === input) {
					return false
				}
			}

			return true
		},
		highlightedIndex () {
			return this.$store.state.highlightedCardLIIndex // A value of -1 means no card list item currently has attention by keyboard shortcuts. A value of any higher number means the index position of the list item that's currently highlighted by keyboard shortcuts.
		},
		showSideboard () {
			return this.$store.state.showSideboard
		}
	},
	watch: {
		highlightedIndex (curIndex, prevIndex) {
			document.activeElement.blur()

			this.$nextTick(() => {
				if (curIndex > -1) {
					const curLI = document.querySelector(`.card-li:nth-of-type(${curIndex + 1})`)

					if (curLI) {
						curLI.classList.add('highlight')

						curLI.scrollIntoView({
							behavior: 'smooth',
							block: 'nearest'
						})
					}
				}

				const prevLI = document.querySelector(`.card-li:nth-of-type(${prevIndex + 1})`)

				if (prevLI) {
					prevLI.classList.remove('highlight')
				}
			})
		}
	},
	mounted () {
		document.addEventListener('keyup', this.doKeyboardShortcut)
	},
	destroyed () {
		document.removeEventListener('keyup', this.doKeyboardShortcut)
	},
	methods: {
		doKeyboardShortcut (event) {
			switch (event.key) {
				case 'Escape':
				case 'Esc':
					if (this.highlightedIndex > -1) {
						event.preventDefault()
						this.setHighlightedIndex(-1)

						return
					}
					break
				case 'r':
					this.switchCardGroup()
					break
			}

			// if (!this.noActiveInputs) return

			if (this.highlightedIndex < 0) {
				switch (event.key) {
					case 'w':
					case 's':
					case 'a':
					case 'e':
					case 'd':
						this.setHighlightedIndex(0)
				}
			} else {
				switch (event.key) {
					case 'w':
						this.focusPrevLI()
						break
					case 's':
						this.focusNextLI()
						break
					case 'e':
						this.relevantCardAtIndex(this.highlightedIndex).qty++
						break
					case 'd':
						this.relevantCardAtIndex(this.highlightedIndex).qty--
						break
					case 'a':
						this.starCard()
						break
				}
			}

			// switch (event.key) {
			// 	case 'w':
			// 	case 'e':
			// 	case 'a':
			// 	case 's':
			// 	case 'd':
			// 	case 'r':
			// 		if (this.cardListUnfocused()) {
			// 			const alreadyViewedCard = () => {
			// 				return this.activeCardList.cards.find(
			// 					card => card.name === this.activeCardList.viewedCard.name
			// 				)
			// 			}

			// 			if (alreadyViewedCard()) {
			// 				for (let i = 0; i < this.cardLIs.length; i++) {
			// 					if (alreadyViewedCard().name === this.relevantCardAtIndex(i).name) {
			// 						const cardButton = this.cardLIs[i].querySelector('.card-button')

			// 						cardButton.focus({ focusVisible: true })

			// 						break
			// 					}
			// 				}
			// 			} else {
			// 				console.log('🧐')

			// 				switch (event.key) {
			// 					case 'w':
			// 					case 's':
			// 						this.focusOntoCardList()
			// 						this.viewCard(this.relevantCardAtIndex(0))
			// 						break
			// 					case 'r':
			// 						this.switchCardGroup()
			// 				}
			// 			}
			// 		} else {
			// 			for (let i = 0; i < this.cardLIs.length; i++) {
			// 				const cardButton = this.cardLIs[i].querySelector('.card-button')

			// 				if (
			// 					document.activeElement !== cardButton &&
			// 					this.qtyElIHighlighted !== i
			// 				) {
			// 					continue
			// 				}

			// 				switch (event.key) {
			// 					case 'w':
			// 						this.pressedW(i)
			// 						return
			// 					case 's':
			// 						this.pressedS(i)
			// 						return
			// 					case 'e':
			// 						this.pressedE(i)
			// 						return
			// 					case 'd':
			// 						this.pressedD(i)
			// 						return
			// 					case 'a':
			// 						this.pressedA(i)
			// 						return
			// 					case 'r':
			// 						this.switchCardGroup(i)
			// 						return
			// 				}

			// 				break
			// 			}
			// 		}
			// }
		},
		cardListUnfocused () {
			for (const li of this.cardLIs) {
				const cardButton = li.querySelector('.card-button')
				const cardStar = li.querySelector('.card-star')

				if (
					document.activeElement === cardButton ||
					document.activeElement === cardStar
				) {
					return false
				}
			}

			return true
		},
		focusPrevLI () {
			if (this.highlightedIndex === 0) {
				this.setHighlightedIndex(this.activeCardList.cards.length - 1)
			} else {
				this.setHighlightedIndex(this.highlightedIndex - 1)
			}

			this.viewCard(this.relevantCardAtIndex(this.highlightedIndex))
		},
		focusNextLI () {
			if (this.highlightedIndex === this.activeCardList.cards.length - 1) {
				this.setHighlightedIndex(0)
			} else {
				this.setHighlightedIndex(this.highlightedIndex + 1)
			}

			this.viewCard(this.relevantCardAtIndex(this.highlightedIndex))
		},
		starCard () {
			const card = this.relevantCardAtIndex(this.highlightedIndex)
			const star = this.cardLIs[this.highlightedIndex].querySelector('.card-star')

			card.starred = !card.starred
			this.$store.commit('decks', this.$store.state.decks)

			star.classList.add('active')

			setTimeout(() => {
				star.classList.remove('active')
			}, 125)
		},
		switchCardGroup () {
			if (this.$store.state.showSideboard) {
				this.sideboardLastHighlightedIndex = this.highlightedIndex
				this.setHighlightedIndex(this.mainLastHighlightedIndex)
			} else {
				this.mainLastHighlightedIndex = this.highlightedIndex
				this.setHighlightedIndex(this.sideboardLastHighlightedIndex)
			}

			this.$store.commit('showSideboard', !this.$store.state.showSideboard)
		},
		setHighlightedIndex (index) {
			this.$store.commit('highlightedCardLIIndex', index)
		},
		relevantCardAtIndex (index) {
			return this.activeCardList.cards.find(card =>
				this.activeCardList.cards.indexOf(card) === index
			)
		}
	}
}
