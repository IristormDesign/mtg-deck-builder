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
						v-for="(count, name) in keywordCounts"
						:key="name"
					>
						<th>{{ name }}</th>
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
		deck: Object
	},
	data () {
		return {
			keywordCounts: {}
		}
	},
	created () {
		this.countKeywords()
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
		}
	}
}
</script>
