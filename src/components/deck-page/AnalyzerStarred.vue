<template>
	<section id="stats-starred">
		<h4>Starred</h4>
		<div
			v-if="starredCount === 0"
			class="no-data"
		>
			(No data)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<tr
					v-if="starredCount > 0"
					:class="activeFilterClass('starred', 'starred')"
					@click="handleRowClick('starred', 'starred')"
				>
					<th>Starred</th>
					<td>{{ starredCount }}</td>
					<td>{{ calculatePercentage(starredCount) }}<span>%</span></td>
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
	</section>
</template>

<script>
import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			starredCount: 0
		}
	},
	watch: {
		analyzerFilter () {
			this.starredCount = 0
			this.prepareStarredCount()
		}
	},
	mounted () {
		this.prepareStarredCount()
	},
	methods: {
		prepareStarredCount () {
			this.countStarred()

			// this.starredCount = this.sortTableByCounts(this.starredCount)
		},
		countStarred () {
			this.filteredCards().forEach(
				({ starred, qty }) => {
					if (!starred) return

					this.starredCount += qty
				}
			)
		}
	}
}
</script>
