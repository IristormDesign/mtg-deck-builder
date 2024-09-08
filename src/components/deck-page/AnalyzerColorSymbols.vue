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
			<tbody>
				<template v-for="symbol in colorSymbolsMinusHybrid">
					<tr
						v-if="symbol.ct > 0"
						:key="symbol.name"
						:ref="`colorSymbols-${symbol.name}`"
						@click="filterFromTableRow('colorSymbols', symbol.name)"
					>
						<th>
							<div
								class="vert-center-cell"
								v-html="`
									<small>${symbol.name}</small>
									${manaSymbol[symbol.key]}
								`"
							></div>
						</th>
						<td>{{ symbol.ct }}</td>
						<td>{{ symbol.pct.toFixed(1) }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tbody v-show="colorSymbols.hybrid.ct > 0">
				<tr>
					<th>
						<div
							class="vert-center-cell"
							v-html="`
								<small>${colorSymbols.hybrid.name}</small>
								${manaSymbol[colorSymbols.hybrid.key]}
							`"
						></div>
					</th>
					<td>{{ colorSymbols.hybrid.ct }}</td>
					<td>{{ colorSymbols.hybrid.pct.toFixed(1) }}<span>%</span></td>
				</tr>
			</tbody>
			<tbody class="total">
				<tr>
					<th>All mana symbols</th>
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
				white: {
					ct: 0,
					key: 'w',
					name: 'White',
					regex: /.W./g
				},
				blue: {
					ct: 0,
					key: 'u',
					name: 'Blue',
					regex: /.U./g
				},
				black: {
					ct: 0,
					key: 'b',
					name: 'Black',
					regex: /.B./g
				},
				red: {
					ct: 0,
					key: 'r',
					name: 'Red',
					regex: /.R./g
				},
				green: {
					ct: 0,
					key: 'g',
					name: 'Green',
					regex: /.G./g
				},
				colorless: {
					ct: 0,
					key: 'c',
					name: 'Colorless',
					regex: /.C./g
				},
				snow: {
					ct: 0,
					key: 's',
					name: 'Snow',
					regex: /.S./g
				},
				hybrid: {
					ct: 0,
					key: 'hybrid',
					name: 'Hybrid',
					regex: /.\/./g
				}
			}
		}
	},
	computed: {
		colorSymbolsMinusHybrid () {
			const csCopy = { ...this.colorSymbols }

			delete csCopy.hybrid

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
	mounted () {
		this.countColorSymbols()
		this.calculatePercentage()

		this.colorSymbols = this.sortTableByCounts(this.colorSymbols)
	},
	methods: {
		countColorSymbols () {
			this.deck.cards.forEach(card => {
				const countedOnFrontFace = {}

				for (const symbolName in this.colorSymbols) {
					const symbolsPerFace = (faceMana) => {
						if (!faceMana) return

						const allSymbolMatches = faceMana.match(this.colorSymbols[symbolName].regex)

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
