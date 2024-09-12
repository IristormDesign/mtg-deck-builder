<template>
	<section>
		<h4>Creature Subtypes</h4>
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
						:class="activeFilterClass('creatureSubtypes', name)"
						@click="handleRowClick('creatureSubtypes', name)"
					>
						<th>{{ name }}</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentageOfCreatureSubtype(ct) }}<span>%</span></td>
					</tr>
				</tbody>
				<tbody class="total">
					<tr>
						<th>{{ totalRowLabel('creatures') }}</th>
						<td>{{ totalCreatureCards }}</td>
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
	},
	computed: {
		totalCreatureCards () {
			return this.filteredCards().reduce(
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
