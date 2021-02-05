<template>
	<div class="card-sorter" v-show="deck.cards.length >= 2">
		<label for="propSelect">Sort cards by:</label>
		<select
			v-model="sortProperty" @change="sortCards()" id="propSelect"
		>
			<option v-if="sortProperty == ''" value="">
				(Select a property)
			</option>
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
			sortProperty: this.$store.state.sortProperty
		}
	},
	props: {
		deck: Object
	},
	methods: {
		sortCards () {
			const property = this.sortProperty
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
	},
	mounted () {
		// Using `$store.subscribe` seems to be the only way that gets the <select> element to change its value other than clicking its options.
		this.$store.subscribe((mutation) => {
			// `$store.subscribe` will activate when anything in the store is mutated; this `if` statement narrows down to the relevant type and payload.
			if (mutation.type === 'setSortProperty' && mutation.payload === '') {
				localStorage.setItem('sortProperty', mutation.payload)
				this.sortProperty = mutation.payload
			}
		})
	}
}
</script>
