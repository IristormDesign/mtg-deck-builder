<template>
	<section>
		<h4>Mana Values of Spells</h4>
		<div class="height-limiter" tabindex="0">
			<table>
				<thead v-html="tableHeadCommon" />

				<tbody
					v-if="Object.keys(manaValueCounts).length === 0"
					v-html="tableBodyEmpty"
				/>
				<tbody v-else>
					<tr
						v-for="(count, mv) in manaValueCounts"
						:key="mv"
					>
						<th><span class="mana-symbol">{{ mv }}</span></th>
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
			manaValueCounts: {}
		}
	},
	created () {
		this.countManaValues()
	},
	methods: {
		countManaValues () {
			this.deck.cards.forEach(({ mana, cmc, qty }) => {
				if (!mana) return // Exclude land cards

				const count = this.manaValueCounts

				if (!count[cmc]) {
					count[cmc] = 0
				}

				count[cmc] += qty
			})
		}
	}
}
</script>
