<template>
	<header class="deck-header">
		<h2>
			<button
				@click="renameDeck(deck, $store.state.decks)"
				class="rename-btn"
				title="Change the name of this deck"
			><span>{{ deck.name }}</span> <small>Rename</small></button>
		</h2>

		<div class="sorter">
			<h3>Sort Cards By</h3>

			<select v-model="sort">
				<option>Name</option>
				<option>Converted mana cost</option>
				<option>Type</option>
				<option>Quantity</option>
			</select>
		</div>

		<div class="date-edited">
			<h3>Last Edited On</h3>

			<div class="date">
				{{ dateEdited(deck).date }}<br>
				{{ dateEdited(deck).time }}
			</div>
		</div>

		<div class="total-cards">
			<h3>Total Cards</h3>

			<div class="amount">
				{{ totalCards() }}
				<span
					class="warning-symbol" v-show="totalCards() < 60"
					title="The minimum card limit is 60."
				>⚠</span>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'deck-header',
	data () {
		return {
			sort: 'Type'
		}
	},
	props: {
		deck: Object
	},
	methods: {
		dateEdited (deck) {
			const date = deck.editDate

			if (date instanceof Date) {
				let month = date.getMonth() + 1
				const day = date.getDate()
				const year = date.getFullYear()
				let hour = date.getHours()
				let minute = date.getMinutes()
				let meridiem

				switch (month) {
				case 1:
					month = 'Jan.'
					break
				case 2:
					month = 'Feb.'
					break
				case 3:
					month = 'Mar.'
					break
				case 4:
					month = 'Apr.'
					break
				case 5:
					month = 'May'
					break
				case 6:
					month = 'June'
					break
				case 7:
					month = 'July'
					break
				case 8:
					month = 'Aug.'
					break
				case 9:
					month = 'Sep.'
					break
				case 10:
					month = 'Oct.'
					break
				case 11:
					month = 'Nov.'
					break
				case 12:
					month = 'Dec.'
					break
				}

				if (hour < 12) {
					meridiem = 'a.m.'
				} else {
					hour = hour - 12
					meridiem = 'p.m.'
				}

				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}

				const output = {
					date: `${month} ${day}, ${year}`,
					time: `${hour}:${minute} ${meridiem}`
				}

				return output
			} else {
				return false
			}
		},
		renameDeck (deck, decks) {
			const pendingName = prompt('Change the name of this deck:', deck.name)

			function existingDeckName () {
				for (let i = 0; i < decks.length; i++) {
					if (pendingName.toUpperCase() === decks[i].name.toUpperCase()) {
						// Return deck name in its original letter case.
						return decks[i].name
					}
				}
			}

			if (pendingName) {
				if (existingDeckName() && pendingName.toUpperCase() !== deck.name.toUpperCase()) {
					alert(`⚠ Another deck is already named “${existingDeckName()}.” Please give a different name.`)

					this.renameDeck(deck, decks)
				} else { // Apply the new name to the deck.
					deck.name = pendingName
					deck.editDate = new Date()
					this.$emit('renamed-tab', deck)
				}
			}
		},
		sortCards (prop, deck) {
			deck.cards.sort((a, b) => {
				let reverseOrder = false

				if (prop === 'qty') {
					reverseOrder = true
				}

				let cardA = a[prop]
				let cardB = b[prop]

				// If prop is a card name, mana cost, or type...
				if (a[prop] instanceof String) {
					cardA = cardA.toUpperCase()
					cardB = cardB.toUpperCase()
				}

				if (cardA < cardB) {
					if (reverseOrder) {
						return 1
					} else {
						return -1
					}
				} else if (cardA > cardB) {
					if (reverseOrder) {
						return -1
					} else {
						return 1
					}
				}

				const prevProp = deck.previousSortProp
				let prevReverseOrder = false

				if (prevProp === 'qty') {
					prevReverseOrder = true
				}

				if (a[prevProp] < b[prevProp]) {
					if (prevReverseOrder) {
						return 1
					} else {
						return -1
					}
				} else if (a[prevProp] > b[prevProp]) {
					if (prevReverseOrder) {
						return -1
					} else {
						return 1
					}
				}

				// Sort by name as a last resort (if name isn't the previously selected property).
				if (prevProp !== 'name') {
					if (a.name < b.name) {
						return -1
					} else if (a.name > b.name) {
						return 1
					}
				}

				return 0
			})

			deck.previousSortProp = prop
		},
		totalCards () {
			let total = 0

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					total++
				}
			})

			return total
		}
	},
	mounted () {
		this.$store.state.decks.forEach(deck => {
			this.sortCards('type', deck)
		})
	},
	computed: {
		// The Vue 2 `watch` feature doesn't work with multiple parameters, so this is a workaround.
		parametersForSorting () {
			return [this.sort, this.deck]
		}
	},
	watch: {
		parametersForSorting: function (p) {
			const sortOption = p[0]
			const deck = p[1]

			switch (sortOption) {
			case 'Name':
				this.sortCards('name', deck)
				break
			case 'Converted mana cost':
				this.sortCards('mana', deck)
				break
			case 'Type':
				this.sortCards('type', deck)
				break
			case 'Quantity':
				this.sortCards('qty', deck)
				break
			}
		}
	}
}
</script>
