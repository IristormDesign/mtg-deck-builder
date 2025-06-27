<template>
	<section id="stats-starred">
		<h4>Starred</h4>
		<div v-if="noData()" class="no-data">
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(starredStatus, starredStatusKey) in starredCounts">
					<tr
						v-if="starredStatus > 0"
						:key="starredStatusKey"
						:class="activeFilterClass('starred', starredStatusKey)"
						@click="handleRowClick('starred', starredStatusKey)"
					>
						<th>{{ starredStatusKey }}</th>
						<td>{{ starredStatus }}</td>
						<td>{{ calculatePercentage(starredStatus) }}<span>%</span></td>
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

export default {
	mixins: [statsAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			starredCounts: {
				Starred: 0,
				'Un-starred': 0
			}
		}
	},
	watch: {
		analyzerFilter () {
			this.starredCounts.Starred = 0
			this.starredCounts['Un-starred'] = 0

			this.prepareStarredCounts()
		}
	},
	mounted () {
		this.prepareStarredCounts()
	},
	methods: {
		noData () {
			this.filteredCards() // This is needed here to make the table's data update after filtering.

			return Object.values(this.starredCounts).every(
				ct => ct === 0
			)
		},
		prepareStarredCounts () {
			this.countStarred()

			this.starredCounts = this.sortTableByCounts(this.starredCounts)
		},
		countStarred () {
			this.filteredCards().forEach(
				({ starred, qty }) => {
					if (starred) {
						this.starredCounts.Starred += qty
					} else {
						this.starredCounts['Un-starred'] += qty
					}
				}
			)
		}
	}
}
</script>
