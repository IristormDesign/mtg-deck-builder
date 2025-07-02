<template>
	<section id="stats-starred">
		<h4>Starred</h4>
		<div v-if="noData" class="no-data">
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
	computed: {
		starredCounts () {
			const counts = {
				Starred: 0,
				'Un-starred': 0
			}

			this.filteredCards().forEach(card => {
				if (card.starred) {
					counts.Starred += card.qty
				} else {
					counts['Un-starred'] += card.qty
				}
			})

			return this.sortTableByCounts(counts)
		},
		noData () {
			return Object.values(this.starredCounts).every(ct => ct === 0)
		}
	}
}
</script>
