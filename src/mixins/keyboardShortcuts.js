export default {
	data () {
		return {
			mainLastHighlightedIndex: -1,
			sideboardLastHighlightedIndex: -1,
			imageEnlarged: false,
			disableImageEnlargeAtIndex: -1
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
			this.disableImageEnlargeAtIndex = curIndex

			setTimeout(() => {
				if (curIndex !== this.disableImageEnlargeAtIndex) return

				this.disableImageEnlargeAtIndex = -1
			}, 382) // This timeout's duration is to be equal to the CSS card browse transition's duration. This delay is needed so that the card browse transition doesn't interfere with the image-enlarge transition.

			if (curIndex > -1) {
				const curLI = document.querySelector(`.card-li:nth-of-type(${curIndex + 1})`)

				if (curLI) {
					curLI.classList.add('highlight')

					curLI.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest'
					})
				}
			} else {
				if (this.imageEnlarged) {
					this.toggleCardImageEnlargement()
				}
			}

			const prevLI = document.querySelector(`.card-li:nth-of-type(${prevIndex + 1})`)

			if (prevLI) {
				prevLI.classList.remove('highlight')
			}
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
				case 'Escape': case 'Esc':
					if (this.highlightedIndex > -1) {
						event.preventDefault()
						this.setHighlightedIndex(-1)
					}
					return
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
					case 'q':
						this.setHighlightedIndex(0)
				}
			} else {
				switch (event.key) {
					case 'w':
						this.highlightPrevLI()
						break
					case 's':
						this.highlightNextLI()
						break
					case 'e':
						this.relevantCardAtHighlightedIndex().qty++
						break
					case 'd':
						this.relevantCardAtHighlightedIndex().qty--
						break
					case 'a':
						this.starCard()
						break
					case 'q':
						this.toggleCardImageEnlargement()
						break
				}

				if (this.imageEnlarged) {
					switch (event.key) {
						case 'w':
						case 's':
						case 'a':
						case 'e':
						case 'd':
						case 'r':
							this.toggleCardImageEnlargement()
					}
				}
			}
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
		highlightPrevLI () {
			if (this.highlightedIndex === 0) {
				this.setHighlightedIndex(this.activeCardList.cards.length - 1)
			} else {
				this.setHighlightedIndex(this.highlightedIndex - 1)
			}

			this.viewCard(this.relevantCardAtHighlightedIndex())
		},
		highlightNextLI () {
			if (this.highlightedIndex === this.activeCardList.cards.length - 1) {
				this.setHighlightedIndex(0)
			} else {
				this.setHighlightedIndex(this.highlightedIndex + 1)
			}

			this.viewCard(this.relevantCardAtHighlightedIndex())
		},
		starCard () {
			const card = this.relevantCardAtHighlightedIndex()
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
		toggleCardImageEnlargement () {
			const imageLinkCL = document.querySelector('.card-image a').classList
			const imageCardShadowCL = document.querySelector('.card-image .card-shadow').classList

			if (this.imageEnlarged) {
				imageLinkCL.remove('kb-highlight')
				imageCardShadowCL.remove('kb-highlight')

				this.imageEnlarged = false
			} else {
				if (this.disableImageEnlargeAtIndex > -1) return

				imageLinkCL.add('kb-highlight')
				imageCardShadowCL.add('kb-highlight')

				this.imageEnlarged = true
			}
		},
		setHighlightedIndex (index) {
			document.activeElement.blur()

			this.$store.commit('highlightedCardLIIndex', index)
		},
		relevantCardAtHighlightedIndex (index = this.highlightedIndex) {
			return this.activeCardList.cards.find(card =>
				this.activeCardList.cards.indexOf(card) === index
			)
		}
	}
}
