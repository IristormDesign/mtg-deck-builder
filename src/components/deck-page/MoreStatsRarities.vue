<template>
	<section>
		<h4>Rarities</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody>
				<template v-for="(count, rarityName) in rarityCounts">
					<tr
						v-if="count > 0"
						:key="rarityName"
					>
						<th>
							<div class="vert-center-cell">
								<small>{{ rarityName }}</small>
								<div v-html="raritySymbol[rarityName.charAt(0).toLowerCase()]" />
							</div>
						</th>
						<td>{{ count }}</td>
						<td>{{ calculatePercentage(count) }}</td>
					</tr>
				</template>
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
			rarityCounts: {
				Common: 0,
				Uncommon: 0,
				Rare: 0,
				'Mythic rare': 0,
				Special: 0
			}
		}
	},
	mounted () {
		this.countRarities()
	},
	methods: {
		countRarities () {
			const count = this.rarityCounts

			this.deck.cards.forEach(({ rarity, qty }) => {
				switch (rarity) {
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
