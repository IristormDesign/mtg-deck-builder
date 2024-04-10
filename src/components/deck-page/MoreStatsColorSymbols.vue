<template>
	<section>
		<h4>Mana Color Symbols</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody
				v-if="this.totalSymbolCount === 0"
				v-html="tableBodyEmpty"
			/>
			<tbody v-else>
				<template v-for="color in colorSymbols">
					<tr
						v-if="color.count > 0"
						:key="color.name"
					>
						<th>
							<div class="vert-center-cell">
								<small>{{ color.name }}</small>
								<div v-html="manaSymbol[color.letter]" />
							</div>
						</th>
						<td>{{ color.count }}</td>
						<td>{{ color.percentage }}</td>
					</tr>
				</template>
			</tbody>
		</table>
		<p class="note"><strong>Notes:</strong> Percentages are of the total count of all mana color symbols in spells’ mana costs. Hybrid mana symbols each count as multiple basic mana symbols. Generic mana symbols and any mana symbols in cards’ abilities are ignored.</p>
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
					count: 0,
					letter: 'w',
					name: 'White',
					regex: /.W./g
				},
				blue: {
					count: 0,
					letter: 'u',
					name: 'Blue',
					regex: /.U./g
				},
				black: {
					count: 0,
					letter: 'b',
					name: 'Black',
					regex: /.B./g
				},
				red: {
					count: 0,
					letter: 'r',
					name: 'Red',
					regex: /.R./g
				},
				green: {
					count: 0,
					letter: 'g',
					name: 'Green',
					regex: /.G./g
				},
				colorless: {
					count: 0,
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
				(total, symbol) => total + symbol.count, 0
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

				for (const color in cs) {
					const colorMatches = mana.match(cs[color].regex)

					if (colorMatches) {
						cs[color].count += colorMatches.length * qty
					}
				}
			})
		},
		calculatePercentage () {
			const cs = this.colorSymbols

			for (const color in cs) {
				cs[color].percentage = (cs[color].count / this.totalSymbolCount * 100).toFixed(1) + '%'
			}
		}
	}
}
</script>
