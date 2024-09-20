<template>
	<aside
		v-if="showNotice"
		class="filter-notice active"
	>
		<div>
			<h4>Filter: On</h4>
			<p v-show="activeFilterDescription">The displayed statistics involve only <strong>{{ activeFilterDescription }}</strong>.</p>
			<div class="button-container">
				<button @click="stopFiltering()">Stop Filtering</button>
			</div>
		</div>
	</aside>
	<aside
		v-else
		class="filter-notice"
	>
		<div>
			<h4>Filter: Off</h4>
			<p>The displayed statistics involve <strong>all cards</strong>.</p>
			<div class="button-container">
				<button
					disabled
					title="No statistics filter is in use right now."
				>Stop Filtering</button>
			</div>
		</div>
	</aside>
</template>

<script>
import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
	computed: {
		showNotice () {
			return this.$store.state.analyzerFilter.attribute
		},
		activeFilterDescription () {
			const attr = this.$store.state.analyzerFilter.attribute

			switch (this.$store.state.analyzerFilter.category) {
				case 'colors':
					return `${attr.toLowerCase()} spells`

				case 'manaSymbols':
					return `spells with ${attr.toLowerCase()} mana symbols`

				case 'manaValues':
					switch (attr) {
						case 'variable':
							return 'spells with a variable mana cost'
						default:
							return `spells with mana value ${attr}`
					}

				case 'supertypes':
					switch (attr) {
						case 'Basic':
							return 'basic (land) cards'
						case 'Legendary':
							return 'legendary cards'
						case 'Snow':
							return 'snow cards'
						default:
							return `cards of the “${attr.toLowerCase()}” supertype`
					}

				case 'types':
					switch (attr) {
						case 'Sorcery':
							return 'sorceries'
						case 'Other':
							return 'non-standard card types'
						default:
							return `${attr.toLowerCase()}s`
					}

				case 'creatureSubtypes':
					return `${attr} creatures`

				case 'otherSubtypes':
					return `${attr} cards`

				case 'rarities':
					switch (attr) {
						case 'Special':
							return 'cards of special rarity'
						case 'Other':
							return 'cards of non-standard rarities'
						default:
							return `${attr.toLowerCase()}s`
					}

				case 'keywords':
					switch (attr) {
						case 'For Mirrodin!':
							return 'cards with “For Mirrodin!”'
						default:
							return `cards with ${attr.toLowerCase()}`
					}

				case 'powerToughness':
					switch (attr) {
						case 'variable':
							return 'cards with variable power or toughness'
						default:
							if (typeof attr.greatestPower === 'number') {
								return `spells with power ${attr.greatestPower}`
							} else if (typeof attr.greatestToughness === 'number') {
								return `spells with toughness ${attr.greatestToughness}`
							} else if (typeof attr.leastPower === 'number') {
								return `spells with power ${attr.leastPower}`
							} else if (typeof attr.leastToughness === 'number') {
								return `spells with toughness ${attr.leastToughness}`
							} else {
								return null
							}
					}

				case 'layouts':
					return `cards with the ${this.layoutStatLabel(attr).toLowerCase()} layout`

				default:
					return null
			}
		}
	},
	beforeDestroy () {
		this.stopFiltering()
	},
	methods: {
		stopFiltering () {
			this.$store.commit('analyzerFilter', {
				category: null,
				attribute: null
			})
		}
	}
}
</script>
