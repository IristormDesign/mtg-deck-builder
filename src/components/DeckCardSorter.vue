<template>
	<div class="sorter">
		<h3>Sort Cards By</h3>

		<select v-model="curProp" @change="sortCards()">
			<option value="name">Name</option>
			<option value="mana">Converted mana cost</option>
			<option value="type">Type</option>
			<option value="qty">Quantity</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'deck-card-sorter',
	data () {
		return {
			curProp: this.$store.state.cardSorting.cur
		}
	},
	props: {
		deck: Object
	},
	mounted () {
		this.sortCards()
	},
	methods: {
		sortCards () {
			const cards = this.deck.cards
			const curProp = this.curProp
			const prevProp = this.$store.state.cardSorting.prev
			let curReversed = false
			let prevReversed = false
			this.$store.state.cardSorting.cur = curProp

			cards.sort((a, b) => {
				let cardA = a[curProp]
				let cardB = b[curProp]

				// If curProp uses a string (e.g., card name), make it case insensitive.
				if (cardA instanceof String) {
					cardA = cardA.toUpperCase()
					cardB = cardB.toUpperCase()
				}
				if (curProp === 'qty') {
					curReversed = true
				}

				if (cardA < cardB) {
					if (curReversed) {
						return 1
					} else {
						return -1
					}
				} else if (cardA > cardB) {
					if (curReversed) {
						return -1
					} else {
						return 1
					}
				} else {
					// Do a secondary level of sorting using the previously selected property.
					cards.sort((c, d) => {
						let cardC = c[prevProp]
						let cardD = d[prevProp]

						if (cardC instanceof String) {
							cardC = cardC.toUpperCase()
							cardD = cardD.toUpperCase()
						}
						if (prevProp === 'qty') {
							prevReversed = true
						}

						if (cardC < cardD) {
							if (prevReversed) {
								return 1
							} else {
								return -1
							}
						} else if (cardC > cardD) {
							if (prevReversed) {
								return -1
							} else {
								return 1
							}
						} else {
							// Sort by card name as a last resort (if card name wasn't the previously selected property).
							if (prevProp !== 'name') {
								cards.sort((e, f) => {
									curReversed = false
									prevReversed = false

									const cardEName = e.name.toUpperCase()
									const cardFName = f.name.toUpperCase()

									if (cardEName < cardFName) {
										return -1
									} else if (cardEName > cardFName) {
										return 1
									}
								})
							}

							return 0
						}
					})
				}
			})

			// The current property is now the new previous property.
			this.$store.state.cardSorting.prev = this.$store.state.cardSorting.cur
		}
	}
}
</script>
