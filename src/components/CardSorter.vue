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
			<option value="rarity">Rarity</option>
			<option value="qty">Quantity</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'card-sorter',
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
			const store = this.$store
			const property = this.sortProperty
			store.commit('setSortProperty', property)

			store.state.decks.forEach(deck => {
				deck.cards.sort((a, b) => {
					const cardA = a[property]
					const cardB = b[property]

					if (property === 'colors') {
						const colorOrder = [
							'W', 'U', 'B', 'R', 'G',
							'multicolor',
							undefined // `undefined` means colorless
						]
						const colorA = colorOrder.indexOf(a.colors[0])
						const colorB = colorOrder.indexOf(b.colors[0])

						if (colorA > colorB) return 1
						else if (colorA < colorB) return -1
					//
					} else if (property === 'type') {
						const cardAType = determineMainType(cardA)
						const cardBType = determineMainType(cardB)
						const typeOrder = ['creature', 'planeswalker', 'enchantment', 'artifact', 'sorcery', 'instant', 'other', 'land']
						const typeA = typeOrder.indexOf(cardAType)
						const typeB = typeOrder.indexOf(cardBType)

						if (typeA > typeB) return 1
						else if (typeA < typeB) return -1
					//
					} else if (property === 'rarity') {
						const rarityOrder = ['mythic', 'rare', 'uncommon', 'common']
						const rarityA = rarityOrder.indexOf(a.rarity)
						const rarityB = rarityOrder.indexOf(b.rarity)

						if (rarityA > rarityB) return 1
						else if (rarityA < rarityB) return -1
					//
					} else if (property === 'qty') {
						if (cardA > cardB) return -1
						else if (cardA < cardB) return 1
					//
					} else {
						if (cardA > cardB) return 1
						else if (cardA < cardB) return -1
					}
				})
			})

			store.commit('setDecks', store.state.decks)

			function determineMainType (card) {
				const regexCreature = RegExp('Creature')
				const regexPlaneswalker = RegExp('Planeswalker')
				const regexEnchantment = RegExp('Enchantment')
				const regexArtifact = RegExp('Artifact')
				const regexSorcery = RegExp('Sorcery')
				const regexInstant = RegExp('Instant')
				const regexLand = RegExp('Land')

				if (regexCreature.test(card)) return 'creature'
				else if (regexPlaneswalker.test(card)) return 'planeswalker'
				else if (regexEnchantment.test(card)) return 'enchantment'
				else if (regexArtifact.test(card)) return 'artifact'
				else if (regexSorcery.test(card)) return 'sorcery'
				else if (regexInstant.test(card)) return 'instant'
				else if (regexLand.test(card)) return 'land'
				else return 'other'
			}
		}
	},
	mounted () {
		// Using `$store.subscribe` seems to be the only way that gets the <select> element to change its value other than clicking its options.
		this.$store.subscribe((mutation) => {
			// `$store.subscribe` will activate when anything in the store is mutated; this `if` statement narrows down to the relevant type and payload.
			if (mutation.type === 'setSortProperty' &&
				mutation.payload === '') {
				this.sortProperty = mutation.payload
			}
		})
	}
}
</script>
