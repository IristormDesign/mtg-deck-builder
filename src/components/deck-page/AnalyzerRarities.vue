<template>
	<section id="stats-rarities">
		<h4>Rarities</h4>
		<div v-if="noData" class="no-data">
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(ct, name) in rarityCounts">
					<tr
						v-if="ct > 0"
						:key="name"
						:class="activeFilterClass('rarities', name)"
						@click="handleRowClick('rarities', name)"
					>
						<th>
							<div
								v-if="name !== 'Other'"
								class="vert-center-cell"
								v-html="`
									<small>${name}</small>
									${raritySymbol[name.charAt(0).toLowerCase()]}
								`"
							></div>
							<div v-else>Other</div>
						</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentage(ct) }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tfoot>
				<tr>
					<th>{{ totalRowLabel('cards') }}</th>
					<td>{{ totalCards }}</td>
					<td>100.0<span>%</span></td>
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
	computed: {
		rarityCounts () {
			const counts = {
				Common: 0,
				Uncommon: 0,
				Rare: 0,
				'Mythic rare': 0,
				Special: 0,
				Bonus: 0,
				Other: 0
			}

			this.filteredCards().forEach(({ rarity, qty }) => {
				switch (rarity) {
					case 'common':
					case 'c':
						counts.Common += qty
						return
					case 'uncommon':
					case 'u':
						counts.Uncommon += qty
						return
					case 'rare':
					case 'r':
						counts.Rare += qty
						return
					case 'mythic':
					case 'm':
						counts['Mythic rare'] += qty
						return
					case 'special':
					case 's':
						counts.Special += qty
						return
					case 'bonus':
					case 'b':
						counts.Bonus += qty
						return
					default:
						counts.Other += qty
				}
			})

			return counts
		},
		noData () {
			return Object.values(this.rarityCounts).every(ct => ct === 0)
		}
	}
}
</script>
