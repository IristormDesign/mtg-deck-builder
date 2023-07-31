<template>
	<section>
		<h4>Colors of Spells</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody v-html="markupTableRows([
				['White', 'w'],
				['Blue', 'u'],
				['Black', 'b'],
				['Red', 'r'],
				['Green', 'g'],
				['Colorless', ''],
			])" />
		</table>
	</section>
</template>

<script>
import moreStats from '@/mixins/moreStats.js'

export default {
	mixins: [moreStats],
	props: {
		deck: Object,
		manaSymbol: Object
	},
	computed: {
		emptyTable () {
			if (
				this.countColor('white') === 0 &&
				this.countColor('blue') === 0 &&
				this.countColor('black') === 0 &&
				this.countColor('red') === 0 &&
				this.countColor('green') === 0 &&
				this.countColor('colorless') === 0
			) {
				return true
			}
			return false
		}
	},
	methods: {
		markupTableRows (params) {
			let markup = ''

			if (this.emptyTable) {
				markup += this.tableBodyEmpty
			} else {
				params.forEach(param => {
					const heading = param[0]
					const manaSymbol = this.manaSymbol[param[1]]
					const count = this.countColor(heading.toLowerCase())

					if (count > 0) {
						markup += `
						<tr>
							<th>`
						if (manaSymbol) {
							markup += `
							<div class="vert-center-cell">
								<small>${heading}</small>
								<div>${manaSymbol}</div>
							</div>
						`
						} else {
							markup += heading
						}
						markup += `
							</th>
							<td>${count}</td>
							<td>${this.calculatePercentage(count)}</td>
						</tr>
					`
					}
				})
			}

			return markup
		},
		countColor (givenColor) {
			const counts = {
				white: 0,
				blue: 0,
				black: 0,
				red: 0,
				green: 0,
				colorless: 0
			}

			this.deck.cards.forEach(card => {
				if (card.mana !== '') { // Exclude land cards
					for (let i = 0; i < card.qty; i++) {
						if (card.colors[0] === undefined) {
							counts.colorless++
						} else {
							card.colors.forEach(color => {
								switch (color) {
									case 'W': counts.white++; break
									case 'U': counts.blue++; break
									case 'B': counts.black++; break
									case 'R': counts.red++; break
									case 'G': counts.green++; break
								}
							})
						}
					}
				}
			})

			switch (givenColor) {
				case 'white':
					return counts.white
				case 'blue':
					return counts.blue
				case 'black':
					return counts.black
				case 'red':
					return counts.red
				case 'green':
					return counts.green
				case 'colorless':
					return counts.colorless
			}
		}
	}
}
</script>
