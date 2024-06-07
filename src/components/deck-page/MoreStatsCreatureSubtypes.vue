<template>
	<section>
		<h4>Creature Subtypes</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody
					v-if="Object.keys(subtypeCounts).length === 0"
					v-html="tableBodyEmpty"
				/>
				<tbody v-else>
					<tr
						v-for="(ct, name) in subtypeCounts"
						:key="name"
					>
						<th>{{ name }}</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentageOfCreatureSubtype(ct) }}<span>%</span></td>
					</tr>
					<tr class="total">
						<th>All creatures</th>
						<td>{{ totalCreatureCards }}</td>
						<td>100.0<span>%</span></td>
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
	},
	computed: {
		totalCreatureCards () {
			return this.deck.cards.reduce(
				(total, { type, qty }) => {
					if (/\bCreature\b/.test(type)) {
						return total + qty
					}

					return total
				}, 0
			)
		}
	},
	methods: {
		calculatePercentageOfCreatureSubtype (ct) {
			return ((ct / this.totalCreatureCards) * 100).toFixed(1)
		}
	}
}
</script>
