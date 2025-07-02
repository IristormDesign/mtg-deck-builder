<template>
	<section id="stats-names">
		<h4>Names</h4>
		<div
			v-if="Object.keys(nameCounts).length === 0"
			class="no-data"
		>
			(None)
		</div>
		<div
			v-else
			class="height-limiter"
			tabindex="0"
		>
			<table>
				<thead v-html="tableHeadCommon"></thead>
				<tbody class="filterable-stats">
					<tr
						v-for="(ct, name) in nameCounts"
						:key="name"
						:class="activeFilterClass('names', name)"
						@click="handleRowClick('names', name)"
					>
						<th class="small">{{ name }}</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentage(ct) }}<span>%</span></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>{{ totalRowLabel('cards') }}</th>
						<td>{{ totalCards }}</td>
						<td>100.0<span>%</span></td>
					</tr>
				</tfoot>
			</table>
		</div>
	</section>
</template>

<script>
import statsAnalyzer from '@/mixins/statsAnalyzer.js'
import doubleFacedCards from '@/mixins/doubleFacedCards.js'

export default {
	mixins: [statsAnalyzer, doubleFacedCards],
	props: {
		deck: Object
	},
	data () {
		return {
			nameCounts: {}
		}
	},
	watch: {
		analyzerFilter () {
			this.nameCounts = {}

			this.prepareNameStats()
		}
	},
	mounted () {
		this.prepareNameStats()
	},
	methods: {
		prepareNameStats () {
			this.countNames()
			this.sortNames()
		},
		countNames () {
			const counts = this.nameCounts

			this.filteredCards().forEach(card => {
				const cardName = this.doubleFacedCardName(card)

				if (!counts[cardName]) {
					counts[cardName] = 0
				}

				counts[cardName] += card.qty
			})
		},
		sortNames () {
			/* First alphabetize the names. */
			this.nameCounts = Object.fromEntries(
				Object.entries(this.nameCounts).sort()
			)

			/* Then sort the names by counts. */
			this.nameCounts = this.sortTableByCounts(this.nameCounts)
		}
	}
}
</script>
