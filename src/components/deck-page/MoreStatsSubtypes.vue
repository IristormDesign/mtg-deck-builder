<template>
	<section>
		<h4><slot /> Subtypes</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody
					v-if="Object.keys(subtypeCounts).length === 0"
					v-html="tableBodyEmpty"
				/>
				<tbody v-else>
					<tr
						v-for="(count, subtypeName) in subtypeCounts"
						:key="subtypeName"
					>
						<th>{{ subtypeName }}</th>
						<td>{{ count }}</td>
						<td>{{ calculatePercentage(count) }}</td>
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
		subtypeCounts: Object
	}
}
</script>
