<template>
	<section>
		<h4>Rarities</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody v-html="markupTableRows([
				'Common', 'Uncommon', 'Rare', 'Mythic rare', 'Special'
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
		raritySymbol: Object
	},
	computed: {
		emptyTable () {
			if (
				this.countRarities('c') === 0 &&
				this.countRarities('u') === 0 &&
				this.countRarities('r') === 0 &&
				this.countRarities('m') === 0 &&
				this.countRarities('s') === 0
			) {
				return true
			}
			return false
		}
	},
	methods: {
		markupTableRows (headings) {
			let markup = ''

			if (this.emptyTable) {
				markup += this.tableBodyEmpty
			} else {
				headings.forEach(heading => {
					const rarityVar = heading.charAt(0).toLowerCase()
					const raritySymbol = this.raritySymbol[rarityVar]
					const count = this.countRarities(rarityVar)

					if (count > 0) {
						markup += `
							<tr>
								<th>
									<div class="vert-center-cell">
										<small>${heading}</small>
										<div>${raritySymbol}</div>
									</div>
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
		countRarities (givenRarity) {
			const counts = {
				c: 0,
				u: 0,
				r: 0,
				m: 0,
				s: 0
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					switch (card.rarity) {
						case 'common':
							counts.c++; break
						case 'uncommon':
							counts.u++; break
						case 'rare':
							counts.r++; break
						case 'mythic':
							counts.m++; break
						case 'special':
							counts.s++; break
					}
				}
			})

			switch (givenRarity) {
				case 'c': return counts.c
				case 'u': return counts.u
				case 'r': return counts.r
				case 'm': return counts.m
				case 's': return counts.s
			}
		}
	}
}
</script>
