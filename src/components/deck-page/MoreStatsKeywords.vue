<template>
	<section>
		<h4>Keyword Abilities</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody
					v-if="keywordNames.length === 0"
					v-html="tableBodyEmpty"
				/>
				<tbody v-else>
					<tr
						v-for="keyword in keywordNames"
						:key="keyword"
					>
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
		this.findAllKeywords()
		this.setUpKeywordCounts()
		this.countKeywords()
	},
	methods: {
		findAllKeywords () {
			this.deck.cards.forEach(card => {
				if (!card.keywords) return // This check is needed to potentially prevent an error caused by non-updated cards that lack the `keywords` attribute.

				card.keywords.forEach(keyword => {
					for (let i = 0; i < card.qty; i++) {
						this.allKeywords.push(keyword)
					}
				})
			})
		},
		setUpKeywordCounts () {
			const kwNames = this.keywordNames

			this.allKeywords.forEach(keyword => {
				if (kwNames.indexOf(keyword) < 0) {
					kwNames.push(keyword)
				}
			})

			kwNames.sort()
		},
		countKeywords () {
			this.keywordNames.forEach(name => {
				this.keywordCounts[name] = 0
			})

			this.allKeywords.forEach(keyword => {
				for (const item in this.keywordCounts) {
					if (keyword === item) {
						this.keywordCounts[item]++
					}
				}
			})
		}
	}
}
</script>
