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

			if (prevIndex > -1) { // If there had been a previously highlighted list item when the current list item got highlighted...
				const prevLI = document.querySelector(`.card-li:nth-of-type(${prevIndex + 1})`)

				if (prevLI) {
					prevLI.classList.remove('highlight')
				}
			} else { // Else check the whole card list for any highlighted list items that may exist other than the actively highlighted one. This may happen by effects of the card adder component.
				if (curIndex < 0) return

				const allLIs = document.querySelectorAll('.card-li')

				for (let i = 0; i < allLIs.length; i++) {
					if (i === curIndex) continue

					allLIs[i].classList.remove('highlight')
				}
			}
		}
	},
	mounted () {
		document.addEventListener('keydown', this.listenForKeyboardShortcuts)
		document.addEventListener('click', this.clickToQuitKeyboardShortcuts)
	},
	destroyed () {
		document.removeEventListener('keydown', this.listenForKeyboardShortcuts)
		document.removeEventListener('click', this.clickToQuitKeyboardShortcuts)
	},
	methods: {
		listenForKeyboardShortcuts (event) {
			if (!event.key) return // Exit this function now if there's no detected key press. Apparently this function is triggered whenever a card is added to the card list, even if no key has been pressed.
			if (event.repeat) return // Ignore key events from held-down key presses, which would trigger multiple events too rapidly.

			const keyEvent = event.key.toLowerCase() // If the shift or caps lock keys have been pressed, then the letter keys may not respond as expected. So, force the key events to always be lowercase.

			switch (keyEvent) {
				case 'escape': case 'esc':
					if (this.highlightedIndex > -1) {
						event.preventDefault()
						this.setHighlightedIndex(-1)
					} else {
						document.activeElement.blur()
					}

					return
			}

			if (keyEvent === 'tab') {
				this.$nextTick(() => {
					this.setHighlightedIndex(-1)
				})
			} else {
				if (this.anyInputActive()) return
			}

			if (this.$route.name === 'deckEditor') {
				this.kbShortcutsDeckEditor(keyEvent, event)
			} else if (this.$route.name === 'drawSim') {
				this.kbShortcutsDrawSim(keyEvent, event)
			}

			this.kbShortcutsAllDeckPageModes(keyEvent)
		},
		clickToQuitKeyboardShortcuts () {
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
				} else {
					const actionBar = document.querySelector('.deck-action-bar')

					actionBar.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest'
					})
				}
			}

			switch (keyEvent) {
				case '1': switchToMode('deckEditor')
					break
				case '2': switchToMode('moreStats')
					break
				case '3': switchToMode('drawSim')
			}

			if (this.imageEnlarged) {
				switch (keyEvent) {
					case 'w': case 'e': case 'r':
					case 'a': case 's': case 'd':
					case 'z': case 'x':
					case 'tab': case ' ':
						this.toggleCardImageEnlargement()
				}
			}
		},
		kbShortcutsDeckEditor (keyEvent, event) {
			// The following keyboard shortcuts can work at anytime, even when the card list is empty.
			if (event.shiftKey) { // If pressing Shift + another key...
				switch (keyEvent) {
					case 'x': this.openScryfallSearch()
						return
				}
			} else { // Else not holding Shift.
				switch (keyEvent) {
					case 'r': this.switchCardGroup()
						return
					case 'x': this.focusOntoCardAdder(event)
						return
				}
			}

			this.startKBShortcutsFromCardOfViewedImage()

			if (event.shiftKey) { // If pressing Shift + another key...
				switch (keyEvent) {
					case 'q': this.openCardScryfallPage()
						return
					case 'w':
						this.highlightPrevLI()
						this.highlightPrevLI()
						return
					case 'e': this.adjustCardQty(2)
						return
					case 's':
						this.highlightNextLI()
						this.highlightNextLI()
						return
					case 'd': this.adjustCardQty(-2)
				}
			} else { // Else not holding Shift.
				switch (keyEvent) {
					case 'q': this.toggleCardImageEnlargement()
						return
					case 'w': this.highlightPrevLI()
						return
					case 'e': this.adjustCardQty(1)
						return
					case 'a': this.starCard()
						return
					case 's': this.highlightNextLI()
						return
					case 'd': this.adjustCardQty(-1)
						return
					case 'z': this.turnOverCardImage()
				}
			}
		},
		kbShortcutsDrawSim (keyEvent, event) {
			if (event.shiftKey) { // If pressing Shift + another key...
				switch (keyEvent) {
					case 'q': this.openCardScryfallPage()
				}
			} else {
				switch (keyEvent) {
					case 'q': this.toggleCardImageEnlargement()
						return
					case 'r': this.restartDrawSim()
						return
					case 'z': this.turnOverCardImage()
						return
					case ' ': this.drawCard(event)
				}
			}
		},
		startKBShortcutsFromCardOfViewedImage () {
			if (this.highlightedIndex > -1) return // If the highlighted index is already set, exit this function now.

			const list = this.activeCardList

			for (let i = 0; i < list.cards.length; i++) {
				if (list.cards[i].name === list.viewedCard.name) {
					this.setHighlightedIndex(i)

					break
				}
			}
		},
		anyInputActive () {
			const allInputs = document.getElementsByTagName('input')

			for (const input of allInputs) {
				if (
					document.activeElement === input &&
					input.getAttribute('type') !== 'radio'
				) {
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
			const star = document
				.querySelector(`.card-li:nth-of-type(${this.highlightedIndex + 1})`)
				.querySelector('.card-star')

			if (!star) return

			this.scrollLIIntoView()
			star.click()

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
		openCardScryfallPage () {
			const cardLink = document.querySelector('.card-image a')

			if (!cardLink) return

			cardLink.click()
		},
		turnOverCardImage () {
			const button = document.querySelector('.turn-over button')

			if (!button) return

			const cardImage = document.querySelector('.card-image .card-shadow')

			if (cardImage.classList.contains('card-browse-leave-active')) return // If the card image already has an ongoing animation, then do nothing right now. Otherwise, it may cause a glitchy-looking animation.

			button.click()
		},
		focusOntoCardAdder (event) {
			event.preventDefault()

			const cardAdder = document.querySelector('.card-adder input')

			cardAdder.focus()
		},
		openScryfallSearch () {
			const scryfallSearch = document.querySelector('.scryfall-button a')

			scryfallSearch.click()
		},
		drawCard (event) {
			event.preventDefault()

			if (this.imageEnlarged) {
				this.toggleCardImageEnlargement()
			}

			const button = document.querySelector('.draw-card')

			document.activeElement.blur()
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
