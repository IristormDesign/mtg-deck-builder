<template>
	<section>
		<h4><slot /> Subtypes</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody
					v-if="subtypeNames.length === 0"
					v-html="tableBodyEmpty"
				/>
				<tbody v-else>
					<tr
						v-for="subtype in subtypeNames"
						:key="subtype"
					>
						<th>{{ subtype }}</th>
						<td>{{ subtypeCounts[subtype] }}</td>
						<td>{{ calculatePercentage(subtypeCounts[subtype]) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
import moreStats from '@/mixins/moreStats.js'

export default {
	mixins: [moreStats],
	props: {
		deck: Object,
		subtypeNames: Array,
		subtypeCounts: Object
	}
}
</script>
