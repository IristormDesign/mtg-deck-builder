<template>
	<section>
		<h4>Mana Values of Spells</h4>
		<div class="height-limiter">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Count</th>
						<th>Percent</th>
					</tr>
				</thead>
				<tbody v-if="cmcItems.length > 0">
					<tr v-for="cmc in cmcItems" :key="cmc">
						<th>
							<span class="mana-symbol">{{ cmc }}</span>
						</th>
						<td>{{ cmcCounts[cmc] }}</td>
						<td>{{ calculatePercentage(cmcCounts[cmc]) }}</td>
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
		</div>
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
