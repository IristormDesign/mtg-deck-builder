<template>
	<section>
		<h4>Keyword Abilities</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody v-if="keywordNames.length <= 0" v-html="tableBodyEmpty" />
				<tbody v-else>
					<tr v-for="keyword in keywordNames" :key="keyword">
						<th>{{ keyword }}</th>
						<td>{{ keywordCounts[keyword] }}</td>
						<td>{{ calculatePercentage(keywordCounts[keyword]) }}</td>
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
			allKeywords: [],
			keywordNames: [],
			keywordCounts: {}
		}
	},
	mounted () {
		const allKeywords = this.allKeywords
		const keywordNames = this.keywordNames
		const keywordCounts = this.keywordCounts

		this.deck.cards.forEach(card => {
			card.keywords.forEach(keyword => {
				for (let i = 0; i < card.qty; i++) {
					allKeywords.push(keyword)
				}
			})
		})

		allKeywords.forEach(keyword => {
			if (keywordNames.indexOf(keyword) < 0) {
				keywordNames.push(keyword)
			}
		})

		keywordNames.sort()

		keywordNames.forEach(item => {
			keywordCounts[item] = 0
		})

		allKeywords.forEach(keyword => {
			for (const item in keywordCounts) {
				if (keyword === item) {
					keywordCounts[item]++
				}
			}
		})
	}
}
</script>
