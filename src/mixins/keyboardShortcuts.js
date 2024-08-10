export default {
	data () {
		return {
			mainListLastFocusedIndex: 0,
			sideboardListLastFocusedIndex: 0
		}
	},
	computed: {
		cardLIs () {
			return document.getElementsByClassName('card-li') // Using `.getElementsByClassName` instead of `.querySelectorAll` here because the former uses live node lists that automatically change whenever the card list switches between main and sideboard.
		},
		noActiveInputs () {
			// if (this.qtyElIHighlighted >= 0) return false

			const allPageInputs = document.querySelectorAll('input[type="text"], input[type="number"]')

			for (const input of allPageInputs) {
				if (document.activeElement === input) {
					return false
				}
			}

			return true
		},

		qtyElIHighlighted () {
			return this.$store.state.qtyElIHighlighted // Negative 1 means no quantity element anywhere has keyboard shortcut focus. Any greater number is the index position of the quantity element in the card list.
		},
		showSideboard () {
			return this.$store.state.showSideboard
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
			console.log('⌨ ' + event.key)

			if (event.key === 'Escape' || event.key === 'Esc') {
				document.activeElement.blur()
				return
			}

			if (!this.noActiveInputs) return

			if (this.cardListUnfocused()) {
				switch (event.key) {
					case 'w':
					case 's':
						this.focusOntoCardList()
						this.viewCard(this.relevantCardAtIndex(0))
						break
					case 'e':
						this.switchCardGroup()
				}
			} else {
				for (let i = 0; i < this.cardLIs.length; i++) {
					const cardButton = this.cardLIs[i].querySelector('.card-button')

					if (
						document.activeElement !== cardButton &&
						this.qtyElIHighlighted !== i
					) {
						continue
					}

					switch (event.key) {
						case 'w':
							this.pressedW(i)
							return
						case 's':
							this.pressedS(i)
							return
						case 'a':
							this.pressedA(i)
							return
						case 'd':
							this.pressedD(i)
							return
						case 'e':
							this.switchCardGroup(i)
							return
					}

					break
				}
			}
		},
		cardListUnfocused () {
			if (this.qtyElIHighlighted > -1) return false

			for (const li of this.cardLIs) {
				const cardButton = li.querySelector('.card-button')

				if (document.activeElement === cardButton) {
					return false
				}
			}

			return true
		},
		focusOntoCardList () {
			const firstCardListItem = this.cardLIs[0]
			const topCardButton = firstCardListItem.querySelector('.card-button')

			topCardButton.focus({ focusVisible: true })
		},
		pressedW (i) {
			if (this.qtyElIHighlighted >= 0) {
				if (i === this.qtyElIHighlighted) {
					this.increaseCardQty(i)
				}
			} else {
				this.focusPrevCardButton(i)
			}
		},
		pressedS (i) {
			if (i === this.qtyElIHighlighted) {
				this.decreaseCardQty(i)
			} else {
				this.focusNextCardButton(i)
			}
		},
		pressedA (i) {
			if (i === this.qtyElIHighlighted) {
				this.$store.commit('qtyElIHighlighted', -1)

				const cardButton = this.cardLIs[i].querySelector('.card-button')

				cardButton.focus()
			} else {
				this.starCard(i)
			}
		},
		pressedD (i) {
			// If the card quantity element doesn't currently have focus.
			if (this.qtyElIHighlighted < 0) {
				const cardButton = this.cardLIs[i].querySelector('.card-button')

				cardButton.blur()

				this.$store.commit('qtyElIHighlighted', i)
			}
		},
		focusPrevCardButton (i) {
			let prevIndex = --i

			if (prevIndex < 0) { // If the focus is on the first card button of the card list, then move focus onto the last card button.
				prevIndex = this.cardLIs.length - 1
			}

			const prevCardButton = this.cardLIs[prevIndex].querySelector('.card-button')

			prevCardButton.focus({ focusVisible: true })
			this.viewCard(this.relevantCardAtIndex(prevIndex))
		},
		focusNextCardButton (i) {
			let nextIndex = ++i

			if (nextIndex > this.cardLIs.length - 1) { // If the focus is on the last card button of the card list, then move focus onto the first card button.
				nextIndex = 0
			}

			const nextCardButton = this.cardLIs[nextIndex].querySelector('.card-button')

			nextCardButton.focus({ focusVisible: true })
			this.viewCard(this.relevantCardAtIndex(nextIndex))
		},
		increaseCardQty (i) {
			this.relevantCardAtIndex(i).qty++
		},
		decreaseCardQty (i) {
			this.relevantCardAtIndex(i).qty--
		},
		starCard (i) {
			const cardStar = this.cardLIs[i].querySelector('.card-star')
			const cardButton = this.cardLIs[i].querySelector('.card-button')
			const card = this.relevantCardAtIndex(i)

			card.starred = !card.starred

			if (
				document.activeElement === cardButton &&
				!card.starred
			) {
				cardStar.classList.add('force-transparency')
			} else {
				cardStar.classList.remove('force-transparency')
			}
		},
		switchCardGroup (index = 0) {
			const store = this.$store

			if (store.state.showSideboard) {
				this.sideboardListLastFocusedIndex = index
			} else {
				this.mainListLastFocusedIndex = index
			}

			store.commit('qtyElIHighlighted', -1)
			store.commit('showSideboard', !store.state.showSideboard)

			const returningCardIndex = () => {
				if (store.state.showSideboard) {
					return this.sideboardListLastFocusedIndex
				} else {
					return this.mainListLastFocusedIndex
				}
			}

			// After switching the card list, focus on the list's most recently focused card button.
			this.$nextTick(() => {
				const cardButton = this.cardLIs[returningCardIndex()].querySelector('.card-button')

				cardButton.focus()

				this.viewCard(this.relevantCardAtIndex(returningCardIndex()))
			})
		},
		relevantCardAtIndex (index) {
			return this.activeCardList.cards.find(card => {
				return this.activeCardList.cards.indexOf(card) === index
			})
		}
	}
}
