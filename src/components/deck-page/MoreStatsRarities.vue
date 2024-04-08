<template>
	<section>
		<h4>Rarities</h4>
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
			rarityCounts: {
				Common: 0,
				Uncommon: 0,
				Rare: 0,
				'Mythic rare': 0,
				Special: 0
			}
		}
	},
	computed: {
		tableIsEmpty () {
			for (const rarity in this.rarityCounts) {
				if (this.rarityCounts[rarity] > 0) {
					return false
				}
			}
			return true
		},
		tableRowMarkup () {
			let markup = ''

			if (this.tableIsEmpty) {
				markup = this.tableBodyEmpty
			} else {
				for (const rarityName in this.rarityCounts) {
					const count = this.rarityCounts[rarityName]
					const raritySymbol = this.raritySymbol[rarityName.charAt(0).toLowerCase()]

					if (count > 0) {
						markup += `
							<tr>
								<th>
									<div class="vert-center-cell">
										<small>${rarityName}</small>
										<div>${raritySymbol}</div>
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
		this.countRarities()
	},
	methods: {
		countRarities () {
			const count = this.rarityCounts

			this.deck.cards.forEach(card => {
				const qty = card.qty

				switch (card.rarity) {
					case 'common':
						count.Common += qty
						break
					case 'uncommon':
						count.Uncommon += qty
						break
					case 'rare':
						count.Rare += qty
						break
					case 'mythic':
						count['Mythic rare'] += qty
						break
					case 'special':
						count.Special += qty
				}
			})
		}
	}
}
</script>
