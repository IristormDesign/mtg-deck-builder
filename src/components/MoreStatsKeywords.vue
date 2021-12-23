<template>
	<section>
		<h4>Keyword Abilities</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Count</th>
					<th>Percent</th>
				</tr>
			</thead>
			<tbody v-if="keywordNames.length > 0">
				<tr v-for="keyword in keywordNames" :key="keyword">
					<th>{{ keyword }}</th>
					<td>{{ keywordCounts[keyword] }}</td>
					<td>{{ calculatePercentage(keywordCounts[keyword]) }}</td>
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
			for (let i = 0; i < card.qty; i++) {
				allKeywords.push(card.keyword)
			}
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
