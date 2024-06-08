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
			<thead v-html="tableHeadCommon" />
			<tbody>
				<template v-for="symbol in colorSymbols">
					<tr
						v-if="symbol.ct > 0"
						:key="symbol.name"
					>
						<th>
							<div class="vert-center-cell">
								<small>{{ symbol.name }}</small>
								<div v-html="manaSymbol[symbol.letter]" />
							</div>
						</th>
						<td>{{ symbol.ct }}</td>
						<td>{{ symbol.pct.toFixed(1) }}<span>%</span></td>
					</tr>
				</template>
				<tr class="total">
					<th>Total symbols</th>
					<td>{{ totalSymbolCount }}</td>
					<td>{{ totalSymbolPercentage.toFixed(1) }}<span>%</span></td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import moreStats from '@/mixins/moreStats.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [moreStats, symbolsMarkup],
	props: {
		deck: Object
	},
	data () {
		return {
			colorSymbols: {
				white: {
					ct: 0,
					letter: 'w',
					name: 'White',
					regex: /.W./g
				},
				blue: {
					ct: 0,
					letter: 'u',
					name: 'Blue',
					regex: /.U./g
				},
				black: {
					ct: 0,
					letter: 'b',
					name: 'Black',
					regex: /.B./g
				},
				red: {
					ct: 0,
					letter: 'r',
					name: 'Red',
					regex: /.R./g
				},
				green: {
					ct: 0,
					letter: 'g',
					name: 'Green',
					regex: /.G./g
				},
				colorless: {
					ct: 0,
					letter: 'c',
					name: 'Colorless',
					regex: /.C./g
				}
			}
		}
	},
	computed: {
		totalSymbolCount () {
			return Object.values(this.colorSymbols).reduce(
				(total, symbol) => total + symbol.ct, 0
			)
		},
		totalSymbolPercentage () {
			return Object.values(this.colorSymbols).reduce(
				(total, symbol) => total + symbol.pct, 0
			)
		}
	},
	mounted () {
		this.countColorSymbols()
		this.calculatePercentage()
	},
	methods: {
		countColorSymbols () {
			this.deck.cards.forEach(({ mana, qty }) => {
				const cs = this.colorSymbols

				for (const symbol in cs) {
					const symbolMatches = mana.match(cs[symbol].regex)

					if (symbolMatches) {
						cs[symbol].ct += symbolMatches.length * qty
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
