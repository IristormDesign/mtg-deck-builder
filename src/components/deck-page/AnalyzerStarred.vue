<template>
	<section id="stats-starred">
		<h4>Starred</h4>
		<div
			v-if="Object.keys(starredCounts).length === 0"
			class="no-data"
		>
			(No data)
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
import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			starredCounts: {
				Starred: 0,
				'Not starred': 0
			}
		}
	},
	watch: {
		analyzerFilter () {
			this.starredCounts.Starred = 0
			this.starredCounts['Not starred'] = 0

			this.prepareStarredCounts()
		}
	},
	mounted () {
		this.prepareStarredCounts()
	},
	methods: {
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
						this.starredCounts['Not starred'] += qty
					}
				}
			)
		}
	}
}
</script>
