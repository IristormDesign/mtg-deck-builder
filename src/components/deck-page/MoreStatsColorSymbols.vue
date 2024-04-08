<template>
	<section>
		<h4>Mana Color Symbols</h4>
		<table>
			<thead v-html="tableHeadCommon" />
			<tbody v-html="markupTableRows" />
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
			symbolCounts: {
				white: 0,
				blue: 0,
				black: 0,
				red: 0,
				green: 0,
				colorless: 0
			}
		}
	},
	computed: {
		tableIsEmpty () {
			for (const color in this.symbolCounts) {
				if (this.symbolCounts[color] > 0) {
					return false
				}
			}
			return true
		},
		markupTableRows () {
			let markup = ''

			if (this.tableIsEmpty) {
				markup += this.tableBodyEmpty
			} else {
				const colors = {
					White: 'w',
					Blue: 'u',
					Black: 'b',
					Red: 'r',
					Green: 'g',
					Colorless: 'c'
				}

				for (const colorName in colors) {
					const manaSymbol = this.manaSymbol[colors[colorName]]
					const count = this.symbolCounts[colorName.toLowerCase()]

					if (count > 0) {
						markup += `
							<tr>
								<th>
									<div class="vert-center-cell">
										<small>${colorName}</small>
										<div>${manaSymbol}</div>
									</div>
								</th>
								<td>${count}</td>
								<td>${this.calculatePercentage(count)}</td>
							</tr>
						`
					}
				}
			}

			return markup
		}
	},
	mounted () {
		this.countColorSymbols()
	},
	methods: {
		symbolMatches (mana) {
			return {
				white: mana.match(/.W./g),
				blue: mana.match(/.U./g),
				black: mana.match(/.B./g),
				red: mana.match(/.R./g),
				green: mana.match(/.G./g),
				colorless: mana.match(/.C./g)
			}
		},
		countColorSymbols () {
			this.deck.cards.forEach(card => {
				for (const color in this.symbolCounts) {
					const colorMatches = this.symbolMatches(card.mana)[color]

					if (colorMatches) {
						this.symbolCounts[color] += colorMatches.length * card.qty
					}
				}
			})
		},
		calculatePercentage (count) {
			let totalCounts = 0

			for (const color in this.symbolCounts) {
				totalCounts += this.symbolCounts[color]
			}

			const percentage = (count / totalCounts * 100).toFixed(1) + '%'

			return percentage
		}
	}
}
</script>
