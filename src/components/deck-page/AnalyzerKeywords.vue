<template>
	<section>
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
				<tbody>
					<tr
						v-for="(ct, kwName) in keywordCounts"
						:key="kwName"
					>
						<th :class="kwName.length > 15 ? 'small' : null">{{ kwName }}</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentage(ct) }}<span>%</span></td>
					</tr>
				</tbody>
				<tbody class="total">
					<tr>
						<th>All cards</th>
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
		deck: Object
	},
	data () {
		return {
			keywordCounts: {}
		}
	},
	mounted () {
		this.countKeywords()
		this.alphabetizeKeywords()

		this.keywordCounts = this.sortTableByCounts(this.keywordCounts)
	},
	methods: {
		countKeywords () {
			const counts = this.keywordCounts

			this.deck.cards.forEach(card => {
				card.keywords.forEach(kw => {
					if (!counts[kw]) {
						counts[kw] = 0
					}

					counts[kw] += card.qty
				})
			})
		},
		alphabetizeKeywords () {
			this.keywordCounts = Object.fromEntries(
				Object.entries(this.keywordCounts).sort()
			)
		}
	}
}
</script>
