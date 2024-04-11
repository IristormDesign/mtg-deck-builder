<template>
	<section>
		<h4>Colors of Spells</h4>
		<table>
			<thead v-html="tableHeadCommon" />
			<tbody v-html="tableRowMarkup" />
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
			colorCounts: {
				White: 0,
				Blue: 0,
				Black: 0,
				Red: 0,
				Green: 0,
				Colorless: 0
			}
		}
	},
	computed: {
		noData () {
			for (const color in this.colorCounts) {
				if (this.colorCounts[color] > 0) {
					return false
				}
			}
			return true
		},
		tableRowMarkup () {
			let markup = ''

			if (this.noData) {
				markup = this.tableBodyEmpty
			} else {
				for (const colorName in this.colorCounts) {
					const count = this.colorCounts[colorName]

					if (count > 0) {
						markup += `
							<tr>
								<th>${colorName}</th>
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
		this.countColor()
	},
	methods: {
		countColor () {
			const count = this.colorCounts

			this.deck.cards.forEach(card => {
				if (card.mana !== '') { // Exclude non-spell cards
					const qty = card.qty

					if (card.colors.length > 0) {
						card.colors.forEach(color => {
							switch (color) {
								case 'W':
									count.White += qty
									break
								case 'U':
									count.Blue += qty
									break
								case 'B':
									count.Black += qty
									break
								case 'R':
									count.Red += qty
									break
								case 'G':
									count.Green += qty
							}
						})
					} else {
						count.Colorless += qty
					}
				}
			})
		}
	}
}
</script>
