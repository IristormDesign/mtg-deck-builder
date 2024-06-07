<template>
	<section>
		<h4>Rarities</h4>
		<table>
			<thead v-html="tableHeadCommon" />

			<tbody>
				<template v-for="(ct, name) in rarityCounts">
					<tr
						v-if="ct > 0"
						:key="name"
					>
						<th>
							<div class="vert-center-cell">
								<small>{{ name }}</small>
								<div v-html="raritySymbol[name.charAt(0).toLowerCase()]" />
							</div>
						</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentage(ct) }}<span>%</span></td>
					</tr>
				</template>
				<tr class="total">
					<th>All cards</th>
					<td>{{ totalCards }}</td>
					<td>100.0<span>%</span></td>
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
			const ct = this.rarityCounts

			this.deck.cards.forEach(({ rarity, qty }) => {
				switch (rarity) {
					case 'common':
						ct.Common += qty
						break
					case 'uncommon':
						ct.Uncommon += qty
						break
					case 'rare':
						ct.Rare += qty
						break
					case 'mythic':
						ct['Mythic rare'] += qty
						break
					default:
						ct.Special += qty
				}
			})
		}
	}
}
</script>
