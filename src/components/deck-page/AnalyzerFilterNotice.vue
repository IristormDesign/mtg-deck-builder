<template>
	<aside
		v-if="showNotice"
		class="filter-notice active"
	>
		<div>
			<header>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M444-169q-16 0-27.5-11T405-207v-235L179-730q-14.5-19-4.25-40T210-791h540q25 0 35.25 21T781-730L555-442v235q0 16-11.5 27T516-169h-72Zm36-299 195-248H285l195 248Zm0 0Z"/></svg>
				<h4>Filter: On</h4>
			</header>
			<p v-show="activeFilterDescription">The displayed statistics involve only <strong>{{ activeFilterDescription }}</strong>.</p>
			<div class="button-container">
				<button
					@click="stopFiltering()"
					title="(Esc)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q55 0 104-18t89-50L236-673q-32 40-50 89t-18 104q0 130 91 221t221 91Zm244-119q32-40 50-89t18-104q0-130-91-221t-221-91q-55 0-104 18t-89 50l437 437Z"/></svg>
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
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M585.5-481 532-534.5 675-716H350.5l-75-75H750q24 0 34.75 21T781-730L585.5-481Zm201 413.5L555-299v91q0 16-11.5 27.5T516-169h-72q-16 0-27.5-11.5T405-208v-241L67-787l53-53.5 720 720-53.5 53ZM532-534.5Z"/></svg>
				<h4>Filter: Off</h4>
			</header>
			<p>The displayed statistics involve your <strong>whole deck</strong>.</p>
			<div class="button-container">
				<button
					disabled
					title="No statistics filter is in use right now."
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q55 0 104-18t89-50L236-673q-32 40-50 89t-18 104q0 130 91 221t221 91Zm244-119q32-40 50-89t18-104q0-130-91-221t-221-91q-55 0-104 18t-89 50l437 437Z"/></svg>
					Stop Filtering
				</button>
			</div>
		</div>
	</aside>
</template>

<script>
import statsAnalyzer from '@/mixins/statsAnalyzer.js'

export default {
	mixins: [statsAnalyzer],
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
						case 'Kindred/Tribal':
							return 'cards of the kindred or tribal type'
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
						case 'Not starred':
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
