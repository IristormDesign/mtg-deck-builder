<template>
	<aside
		v-if="$store.state.analyzerFilter.attribute"
		class="filter-notice active"
	>
		<div>
			<header>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M455.39-180q-15.08 0-25.23-10.16Q420-200.31 420-215.39v-231.53L196.08-731.38q-11.54-15.39-3.35-32 8.2-16.62 27.66-16.62h519.22q19.46 0 27.66 16.62 8.19 16.61-3.35 32L540-446.92v231.53q0 15.08-10.16 25.23Q519.69-180 504.61-180h-49.22ZM480-468l198-252H282l198 252Zm0 0Z"/></svg>
				<h4>Data Filter: On</h4>
			</header>

			<p v-if="filter.category === 'manaSymbols' || filter.category === 'producibleMana'">
				Filtering for <strong v-html="activeFilterDescription"></strong>
			</p>
			<p v-else-if="activeFilterDescription">
				Filtering for <strong>{{ activeFilterDescription }}</strong>
			</p>

			<div class="button-container">
				<button
					@click="stopFiltering()"
					title="[Esc]"
				>
					<svg><use href="#cancel-icon" /></svg>
					Stop Filtering
				</button>
			</div>
		</div>
	</aside>
	<aside
		v-else
		class="filter-notice"
	>
		<div>
			<header>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M577.77-495.23 535-538l143-182H353l-60-60h446.61q18.85 0 27.35 16.62 8.5 16.61-3.04 32L577.77-495.23Zm214.38 412.3L540-335.08v119.69q0 15.08-10.16 25.23Q519.69-180 504.61-180h-49.22q-15.08 0-25.23-10.16Q420-200.31 420-215.39v-239.69L82.93-792.15l42.15-42.77 709.84 709.84-42.77 42.15ZM535-538Z"/></svg>
				<h4>Data Filter: Off</h4>
			</header>
			<p>Displaying statistics about your <strong>whole deck</strong></p>
			<div class="button-container">
				<button
					disabled
					title="No data filter is in use right now."
				>
					<svg><use href="#cancel-icon" /></svg>
					Stop Filtering
				</button>
			</div>
		</div>
	</aside>
</template>

<script>
import statsAnalyzer from '@/mixins/statsAnalyzer.js'
import symbolsMarkup from '@/mixins/symbolsMarkup'

export default {
	mixins: [statsAnalyzer, symbolsMarkup],
	computed: {
		filter () {
			return this.$store.state.analyzerFilter
		},
		activeFilterDescription () {
			const attr = this.filter.attribute
			const extraAttr = this.filter.extraAttribute

			switch (this.filter.category) {
				case 'names':
					return `“${attr}”`

				case 'colors':
					return `${attr.toLowerCase()} spells`

				case 'manaSymbols':
					switch (attr) {
						case 'Hybrid':
							return 'mana costs with hybrid mana symbols'
						case 'Phyrexian':
							return 'mana costs with Phyrexian mana symbols'
						default:
							if (extraAttr) {
								return `mana costs with ${this.manaSymbol[extraAttr]}`
							} else {
								return null
							}
					}

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
							return `cards of the ${attr.toLowerCase()} supertype`
					}

				case 'types':
					switch (attr) {
						case 'Sorcery':
							return 'sorceries'
						case 'Kindred/Tribal':
							return 'kindred or tribal cards'
						case 'Other':
							return 'cards of non-standard card types'
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
						case 'Bonus':
							return 'bonus cards'
						case 'Other':
							return 'cards of non-standard rarities'
						default:
							return `${attr.toLowerCase()}s`
					}

				case 'producibleMana':
					if (attr) {
						return `sources of ${this.manaSymbol[attr.toLowerCase()]}`
					} else {
						return null
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
							if (attr.greatestPower !== undefined) {
								return `cards with power ${attr.greatestPower}`
							} else if (attr.greatestToughness !== undefined) {
								return `cards with toughness ${attr.greatestToughness}`
							} else if (attr.medianPower !== undefined) {
								if (Number.isInteger(Number(attr.medianPower))) {
									return `cards with power ${Math.floor(attr.medianPower)}`
								} else {
									return `cards with power ${Math.floor(attr.medianPower)} or ${Math.ceil(attr.medianPower)}`
								}
							} else if (attr.medianToughness !== undefined) {
								if (Number.isInteger(Number(attr.medianToughness))) {
									return `cards with toughness ${Math.floor(attr.medianToughness)}`
								} else {
									return `cards with toughness ${Math.floor(attr.medianToughness)} or ${Math.ceil(attr.medianToughness)}`
								}
							} else if (attr.leastPower !== undefined) {
								return `cards with power ${attr.leastPower}`
							} else if (attr.leastToughness !== undefined) {
								return `cards with toughness ${attr.leastToughness}`
							} else {
								return null
							}
					}

				case 'layouts':
					return `cards with the ${this.layoutStatLabel(attr).toLowerCase()} layout`

				case 'starred':
					switch (attr) {
						case 'Starred':
							return 'starred cards'
						case 'Un-starred':
							return 'cards that aren’t starred'
						default:
							return null
					}

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
