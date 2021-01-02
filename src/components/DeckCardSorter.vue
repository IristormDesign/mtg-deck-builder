<template>
	<div class="sorter">
		<h3>Sort Cards By</h3>

		<select v-model="curProp" @change="sortCards()">
			<option value="name">Name</option>
			<option value="cmc">Converted mana cost</option>
			<option value="colors">Mana color</option>
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
	methods: {
		sortCards () {
			const curProp = this.curProp
			const prevProp = this.$store.state.cardSorting.prev
			let curReversed = false
			let prevReversed = false
			this.$store.state.cardSorting.cur = curProp

			this.$store.state.decks.forEach(deck => {
				let cards = deck.cards

				cards = cards.sort((a, b) => {
					const cardA = a[curProp]
					const cardB = b[curProp]

					if (curProp === 'qty') {
						curReversed = true
					}
					if (curProp === 'colors') {
						const colorOrder = [
							'W', 'U', 'B', 'R', 'G',
							'multicolor',
							undefined // `undefined` means colorless
						]
						const aColor = colorOrder.indexOf(a.colors[0])
						const bColor = colorOrder.indexOf(b.colors[0])

						if (aColor > bColor) {
							return 1
						} else if (aColor < bColor) {
							return -1
						}
					} else {
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
					}
				})
			})

			// The current property is now the new previous property.
			this.$store.state.cardSorting.prev = this.$store.state.cardSorting.cur
		}
	}
}
</script>
