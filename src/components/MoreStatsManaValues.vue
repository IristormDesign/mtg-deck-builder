<template>
	<section>
		<h4>Mana Values of Spells</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody v-if="cmcItems.length <= 0" v-html="tableBodyEmpty" />
				<tbody v-else>
					<tr v-for="cmc in cmcItems" :key="cmc">
						<th>
							<span class="mana-symbol">{{ cmc }}</span>
						</th>
						<td>{{ cmcCounts[cmc] }}</td>
						<td>{{ calculatePercentage(cmcCounts[cmc]) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
import moreStatsMixins from '@/mixins/moreStatsMixins.js'

export default {
	mixins: [moreStatsMixins],
	props: {
		deck: Object
	},
	data () {
		return {
			allCmc: [],
			cmcItems: [],
			cmcCounts: {}
		}
	},
	mounted () {
		const allCmc = this.allCmc
		const cmcItems = this.cmcItems
		const cmcCounts = this.cmcCounts

		this.deck.cards.forEach(card => {
			if (card.mana !== '') { // Exclude land cards
				for (let i = 0; i < card.qty; i++) {
					allCmc.push(card.cmc)
				}
			}
		})

		allCmc.forEach(cmc => {
			if (cmcItems.indexOf(cmc) < 0) {
				cmcItems.push(cmc)
			}
		})

		cmcItems.sort((a, b) => a - b)

		cmcItems.forEach(item => {
			cmcCounts[item] = 0
		})

		allCmc.forEach(cmc => {
			for (const item in cmcCounts) {
				if (String(cmc) === item) {
					cmcCounts[item]++
				}
			}
		})
	}
}
</script>
