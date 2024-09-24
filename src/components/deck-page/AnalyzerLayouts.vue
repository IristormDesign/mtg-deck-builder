<template>
	<section id="stats-layouts">
		<h4>Layouts</h4>
		<div
			v-if="Object.keys(layoutStats).length === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<thead v-html="tableHeadCommon"></thead>
			<tbody class="filterable-stats">
				<template v-for="(layout, layoutKey) in layoutStats">
					<tr
						v-if="layout.ct > 0"
						:key="layoutKey"
						:class="activeFilterClass('layouts', layoutKey)"
						@click="handleRowClick('layouts', layoutKey)"
					>
						<th :class="layout.label.length > 15 ? 'small' : null">
							{{ layout.label }}
						</th>
						<td>{{ layout.ct }}</td>
						<td>{{ calculatePercentage(layout.ct) }}<span>%</span></td>
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
			layoutStats: {}
		}
	},
	watch: {
		analyzerFilter () {
			this.layoutStats = {}
			this.prepareLayoutStats()

			console.log(Object.keys(this.layoutStats).length)
		}
	},
	mounted () {
		this.prepareLayoutStats()
	},
	methods: {
		prepareLayoutStats () {
			this.countLayouts()
			this.setPreferredLayoutLabels()

			this.layoutStats = this.sortTableByCounts(this.layoutStats)
		},
		countLayouts () {
			this.filteredCards().forEach(
				({ layout, qty }) => {
					if (!layout) return

					if (!this.layoutStats[layout]) {
						this.layoutStats[layout] = {
							ct: 0
						}
					}

					this.layoutStats[layout].ct += qty
				}
			)
		},
		setPreferredLayoutLabels () {
			for (const key in this.layoutStats) {
				this.layoutStats[key].label = this.layoutStatLabel(key)
			}
		}
	}
}
</script>
