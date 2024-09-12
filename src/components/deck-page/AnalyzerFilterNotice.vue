<template>
	<aside
		v-if="showNotice"
		class="analyzer-filter-notice filter-on"
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
		class="analyzer-filter-notice filter-off"
	>
		<div>
			<h4>Filter: Off</h4>
			<p>The displayed statistics involve <strong>all cards</strong>.</p>
			<div class="button-container">
				<button disabled>Stop Filtering</button>
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
			return (
				this.$route.name === 'deckAnalyzer' &&
				this.$store.state.analyzerFilter
			)
		},
		activeFilterDescription () {
			const filter = this.$store.state.analyzerFilter
			const attr = filter[1]

			switch (filter[0]) {
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
					if (attr === 'variable') {
						return 'spells with variable power or toughness'
					} else {
						return null
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
			this.$store.commit('analyzerFilter', null)
		}
	}
}
</script>
