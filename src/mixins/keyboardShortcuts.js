export default {
	data () {
		return {
			disableImageEnlargeAtIndex: -1,
			imageEnlarged: false,
			mainLastHighlightedIndex: -1,
			sideboardLastHighlightedIndex: -1
		}
	},
	computed: {
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
		document.addEventListener('keydown', this.listenForDeckEditorKBShortcuts)
		document.addEventListener('click', this.quitKBShortcuts)
	},
	destroyed () {
		document.removeEventListener('keydown', this.listenForDeckEditorKBShortcuts)
		document.removeEventListener('click', this.quitKBShortcuts)
	},
	methods: {
		listenForDeckEditorKBShortcuts (event) {
			if (!event.key) return // Exit this function now if there's no detected key press. Apparently this function is triggered whenever a card is added to the card list, even if no key has been pressed.
			if (event.repeat) return // Ignore key events from held-down key presses, which would trigger multiple events too rapidly.

			const keyEvent = event.key.toLowerCase() // If the shift or caps lock keys have been pressed, then the letter keys may not respond as expected. So, force the key events to always be lowercase.

			switch (keyEvent) {
				case 'escape': case 'esc':
					if (this.highlightedIndex > -1) {
						event.preventDefault()
						this.setHighlightedIndex(-1)
					}
					return
			}

			if (this.anyInputActive()) return

			if (this.$route.name === 'deckEditor') {
				this.kbShortcutsDeckEditor(keyEvent, event.shiftKey)
			} else if (this.$route.name === 'drawSim') {
				this.kbShortcutsDrawSim(keyEvent, event)
			}

			this.kbShortcutsAllDeckPageModes(keyEvent)
		},
		quitKBShortcuts () {
			const cardButtons = document.querySelectorAll('.card-button')

			for (let i = 0; i < cardButtons.length; i++) {
				if (cardButtons[i] === document.activeElement) {
					return
				}
			}

			this.setHighlightedIndex(-1, true)
		},
		kbShortcutsAllDeckPageModes (keyEvent) {
			const switchToMode = (routeName) => {
				if (this.$route.name !== routeName) {
					this.$router.push({ name: routeName })
				}
			}

			switch (keyEvent) {
				case '1': switchToMode('deckEditor')
					break
				case '2': switchToMode('moreStats')
					break
				case '3': switchToMode('drawSim')
			}
		},
		kbShortcutsDeckEditor (keyEvent, shiftKeyEvent) {
			switch (keyEvent) { // The following keyboard shortcuts can be used anytime, even while the card list has no highlighted items.
				case 'r': this.switchCardGroup()
			}

			this.startKBShortcutsFromFocusedCardButton()

			if (this.highlightedIndex < 0) {
				switch (keyEvent) {
					case 'w': case 's': case 'e': case 'd': case 'a': case 'q':
						this.setHighlightedIndex(0)
						this.viewCardAtHighlightedIndex()
				}
			} else {
				if (shiftKeyEvent) {
					switch (keyEvent) {
						case 'w':
							this.highlightPrevLI()
							this.highlightPrevLI()
							break
						case 's':
							this.highlightNextLI()
							this.highlightNextLI()
							break
						case 'e':
							this.adjustCardQty(2)
							break
						case 'd':
							this.adjustCardQty(-2)
							break
						case 'q':
							this.openScryfallPage()
					}
				} else {
					switch (keyEvent) {
						case 'w': this.highlightPrevLI()
							break
						case 's': this.highlightNextLI()
							break
						case 'e': this.adjustCardQty(1)
							break
						case 'd': this.adjustCardQty(-1)
							break
						case 'a': this.starCard()
							break
						case 'q': this.toggleCardImageEnlargement()
					}
				}

				if (this.imageEnlarged) {
					switch (keyEvent) {
						case 'w': case 's': case 'e': case 'd': case 'a': case 'r':
							this.toggleCardImageEnlargement()
					}
				}
			}
		},
		kbShortcutsDrawSim (keyEvent, event) {
			switch (keyEvent) {
				case ' ':
					event.preventDefault()
					this.drawCard()
					break
				case 'r':
					this.restartDrawSim()
					break
				case 'q':
					this.toggleCardImageEnlargement()
					break
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
		anyInputActive () {
			const allInputs = document.getElementsByTagName('input')

			for (const input of allInputs) {
				if (document.activeElement === input) {
					return true
				}
			}

			return false
		},
		setHighlightedIndex (index, keepFocus) {
			if (!keepFocus) {
				document.activeElement.blur()
			}

			this.$store.commit('highlightedCardLIIndex', index)
		},
		highlightPrevLI () {
			if (this.highlightedIndex === 0) {
				this.setHighlightedIndex(this.activeCardList.cards.length - 1)
			} else {
				this.setHighlightedIndex(this.highlightedIndex - 1)
			}

			this.viewCardAtHighlightedIndex()
		},
		highlightNextLI () {
			if (this.highlightedIndex === this.activeCardList.cards.length - 1) {
				this.setHighlightedIndex(0)
			} else {
				this.setHighlightedIndex(this.highlightedIndex + 1)
			}

			this.viewCardAtHighlightedIndex()
		},
		adjustCardQty (number) {
			this.scrollLIIntoView()

			const card = this.relevantCardAtHighlightedIndex()

			if (!card) return

			card.qty = card.qty + number
		},
		starCard () {
			const card = this.relevantCardAtHighlightedIndex()

			if (!card) return

			const cardLIs = document.getElementsByClassName('card-li') // Using `.getElementsByClassName` instead of `.querySelectorAll` here because the former gets a live node list. The live node list automatically updates whenever the card list switches between main and sideboard.
			const star = cardLIs[this.highlightedIndex].querySelector('.card-star')

			if (!star) return

			this.scrollLIIntoView()
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
			const image = document.querySelector('.card-image .image-overlay')

			if (!image) return // If no card image even exists, then exit this function now.

			const imageLinkCL = image.querySelector('a').classList
			const imageCardShadowCL = image.querySelector('.card-shadow').classList

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

			if (!cardPage) return

			window.open(cardPage, '_blank')
		},
		drawCard () {
			if (this.imageEnlarged) {
				this.toggleCardImageEnlargement()
			}

			const button = document.querySelector('.draw-card')

			button.click()
		},
		restartDrawSim () {
			const button = document.querySelector('.restart')

			button.click()
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
		viewCardAtHighlightedIndex () {
			const card = this.relevantCardAtHighlightedIndex()

			if (!card) return

			this.viewCard(card)
		},
		relevantCardAtHighlightedIndex (index = this.highlightedIndex) {
			return this.activeCardList.cards.find(card =>
				this.activeCardList.cards.indexOf(card) === index
			)
		}
	}
}
