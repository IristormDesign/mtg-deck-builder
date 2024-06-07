<template>
	<section>
		<h4>Keyword Abilities</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody
					v-if="Object.keys(keywordCounts).length === 0"
					v-html="tableBodyEmpty"
				/>
				<tbody v-else>
					<tr
						v-for="(ct, name) in keywordCounts"
						:key="name"
					>
						<th>{{ name }}</th>
						<td>{{ ct }}</td>
						<td>{{ calculatePercentage(ct) }}<span>%</span></td>
					</tr>
					<tr class="total">
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
import moreStats from '@/mixins/moreStats.js'

export default {
	mixins: [moreStats],
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
