<template>
	<section>
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
				<tbody>
					<tr
						v-for="(ct, name) in subtypeCounts"
						:key="name"
						:class="activeFilterClass('subtypes', name)"
						@click="handleRowClick('subtypes', name)"
					>
						<th>{{ name }}</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentage(ct) }}<span>%</span></td>
					</tr>
				</tbody>
				<tbody class="total">
					<tr>
						<th>{{ totalRowLabel('cards') }}</th>
						<td>{{ totalCards }}</td>
						<td>100.0<span>%</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
	props: {
		deck: Object,
		subtypeCounts: Object
	}
}
</script>
