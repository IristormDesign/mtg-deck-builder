<template>
	<section>
		<h4><slot /> Subtypes</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Count</th>
					<th>Percent</th>
				</tr>
			</thead>
			<tbody v-if="subtypeNames.length > 0">
				<tr v-for="subtype in subtypeNames" :key="subtype">
					<th>{{ subtype }}</th>
					<td>{{ subtypeCounts[subtype] }}</td>
					<td>{{ calculatePercentage(subtypeCounts[subtype]) }}</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<th><i>(None)</i></th>
					<td>—</td>
					<td>—</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import calculatePercentage from '@/mixins/calculatePercentage.js'

export default {
	mixins: [calculatePercentage],
	props: {
		deck: Object,
		subtypeNames: Array,
		subtypeCounts: Object
	}
}
</script>
