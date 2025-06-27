<template>
	<section id="stats-otherSubtypes">
		<h4>Other Subtypes</h4>
		<div
			v-if="Object.keys(subtypeCounts).length === 0"
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
						v-for="(ct, name) in subtypeCounts"
						:key="name"
						:class="activeFilterClass('otherSubtypes', name)"
						@click="handleRowClick('otherSubtypes', name)"
					>
						<th>{{ name }}</th>
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
		deck: Object,
		subtypeCounts: Object
	}
}
</script>
