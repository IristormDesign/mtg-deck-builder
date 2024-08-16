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
		highlightedIndex () {
			return this.$store.state.highlightedCardLIIndex // A value of -1 means no card list item currently has attention by keyboard shortcuts. A value of any higher number means the index position of the list item that's currently highlighted by keyboard shortcuts.
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
				this.scrollLIIntoView()
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
		document.addEventListener('click', this.quitKBShortcuts)
	},
	destroyed () {
		document.removeEventListener('keyup', this.doKeyboardShortcut)
		document.removeEventListener('click', this.quitKBShortcuts)
	},
	methods: {
		anyInputActive () {
			const allInputs = document.getElementsByTagName('input')

			for (const input of allInputs) {
				if (document.activeElement === input) {
					return true
				}
			}

			return false
		},
		scrollLIIntoView () {
			const li = document.querySelector(`.card-li:nth-of-type(${this.highlightedIndex + 1})`)

			if (li) {
				li.classList.add('highlight')

				li.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest'
				})
			}
		},
		doKeyboardShortcut (event) {
			const eventKey = event.key.toLowerCase() // If the shift or caps lock keys have been pressed, then the letter keys may not respond as expected. So, force the key events to always be lowercase.

			switch (eventKey) {
				case 'escape': case 'esc':
					if (this.highlightedIndex > -1) {
						event.preventDefault()
						this.setHighlightedIndex(-1)
					}
					return
			}

			if (this.anyInputActive()) return

			switch (eventKey) {
				case 'r':
					this.switchCardGroup()
					break
			}

			this.startKBShortcutsFromFocusedCardButton()

			if (this.highlightedIndex < 0) {
				switch (eventKey) {
					case 'w':
					case 's':
					case 'a':
					case 'e':
					case 'd':
					case 'q':
						this.setHighlightedIndex(0)
						this.viewCard(this.relevantCardAtHighlightedIndex())
				}
			} else {
				this.scrollLIIntoView()

				if (event.shiftKey) {
					switch (eventKey) {
						case 'q':
							this.openScryfallPage()
					}
				} else {
					switch (eventKey) {
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
				}

				if (this.imageEnlarged) {
					switch (eventKey) {
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
		startKBShortcutsFromFocusedCardButton () {
			const cardButtons = document.querySelectorAll('.card-button')

			for (let i = 0; i < cardButtons.length; i++) {
				if (cardButtons[i] === document.activeElement) {
					this.$nextTick(() => {
						this.setHighlightedIndex(i)
					})
				}
			}
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
		openScryfallPage () {
			const cardPage = this.relevantCardAtHighlightedIndex().link

			window.open(cardPage, '_blank')
		},
		setHighlightedIndex (index, keepFocus) {
			if (!keepFocus) {
				document.activeElement.blur()
			}

			this.$store.commit('highlightedCardLIIndex', index)
		},
		relevantCardAtHighlightedIndex (index = this.highlightedIndex) {
			return this.activeCardList.cards.find(card =>
				this.activeCardList.cards.indexOf(card) === index
			)
		},
		quitKBShortcuts () {
			const cardButtons = document.querySelectorAll('.card-button')

			for (let i = 0; i < cardButtons.length; i++) {
				if (cardButtons[i] === document.activeElement) {
					return
				}
			}

			this.setHighlightedIndex(-1, true)
		}
	}
}
