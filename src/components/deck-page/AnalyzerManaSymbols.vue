<template>
	<section id="stats-manaSymbols">
		<h4>Mana Color Symbols<div> in Costs of Spells</div></h4>
		<div
			v-if="this.totalSymbolCount === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(symbol, symbolName) in basicManaSymbolsOnly">
					<tr
						v-if="symbol.ct > 0"
						:key="symbolName"
						:class="activeFilterClass('manaSymbols', symbolName)"
						@click="handleRowClick('manaSymbols', symbolName)"
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
				v-if="manaSymbols.Hybrid.ct > 0 || manaSymbols.Phyrexian.ct > 0"
				class="filterable-stats"
			>
				<tr
					v-if="manaSymbols.Hybrid.ct > 0"
					:class="activeFilterClass('manaSymbols', 'Hybrid')"
					@click="handleRowClick('manaSymbols', 'Hybrid')"
				>
					<th>Hybrid</th>
					<td>{{ manaSymbols.Hybrid.ct }}</td>
					<td>{{ manaSymbols.Hybrid.pct.toFixed(1) }}<span>%</span></td>
				</tr>
				<tr
					v-if="manaSymbols.Phyrexian.ct > 0"
					:class="activeFilterClass('manaSymbols', 'Phyrexian')"
					@click="handleRowClick('manaSymbols', 'Phyrexian')"
				>
					<th>Phyrexian</th>
					<td>{{ manaSymbols.Phyrexian.ct }}</td>
					<td>{{ manaSymbols.Phyrexian.pct.toFixed(1) }}<span>%</span></td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th>{{ totalRowLabel('symbols') }}</th>
					<td>{{ totalSymbolCount }}</td>
					<td>{{ totalSymbolPercentage.toFixed(1) }}<span>%</span></td>
				</tr>
			</tfoot>
		</table>
	</section>
</template>

<script>
import statsAnalyzer from '@/mixins/statsAnalyzer.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [statsAnalyzer, symbolsMarkup],
	props: {
		deck: Object
	},
	data () {
		return {
			manaSymbols: {
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
				},
				Phyrexian: {
					ct: 0,
					key: 'phyrexian'
				}
			}
		}
	},
	computed: {
		basicManaSymbolsOnly () {
			const csCopy = { ...this.manaSymbols }

			delete csCopy.Hybrid
			delete csCopy.Phyrexian

			return csCopy
		},
		totalSymbolCount () {
			return Object.values(this.basicManaSymbolsOnly).reduce(
				(total, symbol) => total + symbol.ct, 0
			)
		},
		totalSymbolPercentage () {
			return Object.values(this.basicManaSymbolsOnly).reduce(
				(total, symbol) => total + symbol.pct, 0
			)
		}
	},
	watch: {
		analyzerFilter () {
			for (const symbol in this.manaSymbols) {
				this.manaSymbols[symbol].ct = 0
			}

			this.prepareManaSymbolStats()
		}
	},
	mounted () {
		this.prepareManaSymbolStats()

		this.manaSymbols = this.sortTableByCounts(this.manaSymbols)
	},
	methods: {
		prepareManaSymbolStats () {
			this.countManaSymbols()
			this.calculatePercentage()
		},
		countManaSymbols () {
			this.filteredCards().forEach(card => {
				const countedOnFrontFace = {}

				for (const symbolName in this.manaSymbols) {
					const symbolsPerFace = (faceMana) => {
						if (!faceMana) return

						const regex = this.regexManaSymbols[symbolName]
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
						this.manaSymbols[symbolName].ct += countedOnFrontFace[symbolName] * card.qty
					}
				}
			})
		},
		calculatePercentage () {
			const cs = this.manaSymbols

			for (const symbol in cs) {
				cs[symbol].pct = (cs[symbol].ct / this.totalSymbolCount * 100)
			}
		}
	}
}
</script>
