<template>
	<div class="sorter">
		<h3>Sort Cards By</h3>

		<select v-model="sortBy" @change="sortCards(sortBy)">
			<option value="name">Name</option>
			<option value="mana">Converted mana cost</option>
			<option value="type">Type</option>
			<option value="qty">Quantity</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'card-sorter',
	data () {
		return {
			sortBy: this.$store.state.sortBy
		}
	},
	props: {
		deck: Object
	},
	mounted () {
		this.$store.state.decks.forEach(deck => {
			this.sortCards(this.sortBy)
		})
	},
	methods: {
		sortCards (prop) {
			this.$store.commit('changeCardSorting', prop)

			const deck = this.deck

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
