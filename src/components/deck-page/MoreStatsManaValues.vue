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
import moreStats from '@/mixins/moreStats.js'

export default {
	mixins: [moreStats],
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
	created () {
		this.findAllCMCs()
		this.setUpCmcCounts()
		this.countCMCs()
	},
	methods: {
		findAllCMCs () {
			this.deck.cards.forEach(card => {
				if (card.mana !== '') { // Exclude land cards
					for (let i = 0; i < card.qty; i++) {
						this.allCmc.push(card.cmc)
					}
				}
			})
		},
		setUpCmcCounts () {
			const cmcItems = this.cmcItems

			this.allCmc.forEach(cmc => {
				if (cmcItems.indexOf(cmc) < 0) {
					cmcItems.push(cmc)
				}
			})

			cmcItems.sort((a, b) => a - b)
		},
		countCMCs () {
			const cmcCounts = this.cmcCounts

			this.cmcItems.forEach(item => {
				cmcCounts[item] = 0
			})

			this.allCmc.forEach(cmc => {
				for (const item in cmcCounts) {
					if (String(cmc) === item) {
						cmcCounts[item]++
					}
				}
			})
		}
	}
}
</script>
