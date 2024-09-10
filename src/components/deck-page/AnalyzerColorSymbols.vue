<template>
	<section>
		<h4>Mana Color Symbols</h4>
		<div
			v-if="this.totalSymbolCount === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(symbol, symbolName) in colorSymbolsMinusHybrid">
					<tr
						v-if="symbol.ct > 0"
						:key="symbolName"
						:class="activeFilterClass('colorSymbols', symbolName)"
						@click="handleRowClick('colorSymbols', symbolName)"
					>
						<th>
							<div
								class="vert-center-cell"
								v-html="`
									<small>${symbolName}</small>
									${manaSymbol[symbol.key]}
								`"
							></div>
						</th>
						<td>{{ symbol.ct }}</td>
						<td>{{ symbol.pct.toFixed(1) }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tbody
				v-show="colorSymbols.Hybrid.ct > 0"
				class="filterable-stats"
			>
				<tr
					:class="activeFilterClass('colorSymbols', 'Hybrid')"
					@click="handleRowClick('colorSymbols', 'Hybrid')"
				>
					<th>
						<div
							class="vert-center-cell"
							v-html="`
								<small>Hybrid</small>
								${manaSymbol[colorSymbols.Hybrid.key]}
							`"
						></div>
					</th>
					<td>{{ colorSymbols.Hybrid.ct }}</td>
					<td>{{ colorSymbols.Hybrid.pct.toFixed(1) }}<span>%</span></td>
				</tr>
			</tbody>
			<tbody class="total">
				<tr>
					<th>{{ totalRowLabel('symbols') }}</th>
					<td>{{ totalSymbolCount }}</td>
					<td>{{ totalSymbolPercentage.toFixed(1) }}<span>%</span></td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import deckAnalyzer from '@/mixins/deckAnalyzer.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [deckAnalyzer, symbolsMarkup],
	props: {
		deck: Object
	},
	data () {
		return {
			colorSymbols: {
				White: {
					ct: 0,
					key: 'w'
				},
				Blue: {
					ct: 0,
					key: 'u'
				},
				Black: {
					ct: 0,
					key: 'b'
				},
				Red: {
					ct: 0,
					key: 'r'
				},
				Green: {
					ct: 0,
					key: 'g'
				},
				Colorless: {
					ct: 0,
					key: 'c'
				},
				Snow: {
					ct: 0,
					key: 's'
				},
				Hybrid: {
					ct: 0,
					key: 'hybrid'
				}
			}
		}
	},
	computed: {
		colorSymbolsMinusHybrid () {
			const csCopy = { ...this.colorSymbols }

			delete csCopy.Hybrid

			return csCopy
		},
		totalSymbolCount () {
			return Object.values(this.colorSymbolsMinusHybrid).reduce(
				(total, symbol) => total + symbol.ct, 0
			)
		},
		totalSymbolPercentage () {
			return Object.values(this.colorSymbolsMinusHybrid).reduce(
				(total, symbol) => total + symbol.pct, 0
			)
		}
	},
	watch: {
		analyzerFilter () {
			for (const symbol in this.colorSymbols) {
				this.colorSymbols[symbol].ct = 0
			}

			this.prepareColorSymbolStats()
		}
	},
	mounted () {
		this.prepareColorSymbolStats()

		this.colorSymbols = this.sortTableByCounts(this.colorSymbols)
	},
	methods: {
		prepareColorSymbolStats () {
			this.countColorSymbols()
			this.calculatePercentage()
		},
		countColorSymbols () {
			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				for (const symbolName in this.colorSymbols) {
					const symbolsPerFace = (faceMana) => {
						if (!faceMana) return

						const regex = this.$store.state.regex.manaSymbols[symbolName]
						const allSymbolMatches = faceMana.match(regex)

						if (!allSymbolMatches) return

						if (
							!countedOnFrontFace[symbolName] ||
								countedOnFrontFace[symbolName] < allSymbolMatches.length
						) {
							countedOnFrontFace[symbolName] = allSymbolMatches.length
						}
					}

					symbolsPerFace(card.mana)
					symbolsPerFace(card.mana2)

					if (countedOnFrontFace[symbolName]) {
						this.colorSymbols[symbolName].ct += countedOnFrontFace[symbolName] * card.qty
					}
				}
			})
		},
		calculatePercentage () {
			const cs = this.colorSymbols

			for (const symbol in cs) {
				cs[symbol].pct = (cs[symbol].ct / this.totalSymbolCount * 100)
			}
		}
	}
}
</script>
