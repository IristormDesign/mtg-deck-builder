<template>
	<div class="sorter">
		<h3>Sort Cards By</h3>

		<select v-model="sort">
			<option>Name</option>
			<option>Converted mana cost</option>
			<option>Type</option>
			<option>Quantity</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'card-sorter',
	data () {
		return {
			sort: 'Type'
		}
	},
	props: {
		deck: Object
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
	},
	methods: {
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
		}
	}
}
</script>
