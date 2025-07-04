<template>
	<section id="stats-keywords">
		<h4>Keyword Abilities</h4>
		<div
			v-if="Object.keys(keywordCounts).length === 0"
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
						v-for="(ct, kwName) in keywordCounts"
						:key="kwName"
						:class="activeFilterClass('keywords', kwName)"
						@click="handleRowClick('keywords', kwName)"
					>
						<th :class="kwName.length > 14 ? 'small' : null">
							{{ kwName }}
						</th>
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

export default {
	mixins: [statsAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			keywordCounts: {}
		}
	},
	watch: {
		analyzerFilter () {
			this.keywordCounts = {}

			this.prepareKeywordStats()
		}
	},
	mounted () {
		this.prepareKeywordStats()
	},
	methods: {
		prepareKeywordStats () {
			this.countKeywords()
			this.sortKeywords()
		},
		countKeywords () {
			const counts = this.keywordCounts

			this.filteredCards().forEach(card => {
				if (!card.keywords) return

				card.keywords.forEach(kw => {
					if (!counts[kw]) {
						counts[kw] = 0
					}

					counts[kw] += card.qty
				})
			})
		},
		/**
		 * Sort the keywords by name alphabetically, then sort by their counts.
		 */
		sortKeywords () {
			this.keywordCounts = Object.fromEntries(
				Object.entries(this.keywordCounts).sort()
			)

			this.keywordCounts = this.sortTableByCounts(this.keywordCounts)
		}
	}
}
</script>
