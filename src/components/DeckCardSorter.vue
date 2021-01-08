<template>
	<div class="card-sorter">
		<label for="propSelect">Sort cards by:</label>
		<select v-model="property" @change="sortCards()" id="propSelect">
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
			property: localStorage.getItem('sortProperty')
		}
	},
	props: {
		deck: Object
	},
	methods: {
		sortCards () {
			const property = this.property
			localStorage.setItem('sortProperty', property)

			this.$store.state.decks.forEach(deck => {
				deck.cards.sort((a, b) => {
					const cardA = a[property]
					const cardB = b[property]

					if (property === 'colors') {
						const colorOrder = [
							'W', 'U', 'B', 'R', 'G',
							'multicolor',
							undefined // `undefined` means colorless
						]
						const aColor = colorOrder.indexOf(a.colors[0])
						const bColor = colorOrder.indexOf(b.colors[0])

						if (aColor > bColor) return 1
						else if (aColor < bColor) return -1
					} else if (property === 'qty') {
						if (cardA > cardB) return -1
						else if (cardA < cardB) return 1
					} else {
						if (cardA > cardB) return 1
						else if (cardA < cardB) return -1
					}
				})
			})
		}
	}
}
</script>
