<template>
	<section>
		<h4>Layouts</h4>
		<table>
			<thead v-html="tableHeadCommon" />
			<tbody>
				<template v-for="(layout, layoutName) in layoutStats">
					<tr
						v-if="layout.ct > 0"
						:key="layoutName"
					>
						<th :class="layoutName.length > 15 ? 'small' : null">
							{{ layoutName }}
						</th>
						<td>{{ layout.ct }}</td>
						<td>{{ calculatePercentage(layout.ct) }}<span>%</span></td>
					</tr>
				</template>
				<tr class="total">
					<th>All cards</th>
					<td>{{ totalCards }}</td>
					<td>100.0<span>%</span></td>
				</tr>
			</tbody>
		</table>
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
			layoutStats: {
				Adventure: {
					id: 'adventure'
				},
				Augment: {
					id: 'augment'
				},
				Battle: {
					id: 'battle'
				},
				Case: {
					id: 'case'
				},
				Class: {
					id: 'class'
				},
				'Double-faced token': {
					id: 'double_faced_token'
				},
				Emblem: {
					id: 'emblem'
				},
				Flip: {
					id: 'flip'
				},
				Host: {
					id: 'host'
				},
				Leveler: {
					id: 'leveler'
				},
				Meld: {
					id: 'meld'
				},
				'Modal double-faced': {
					id: 'modal_dfc'
				},
				Mutate: {
					id: 'mutate'
				},
				Normal: {
					id: 'normal'
				},
				Planar: {
					id: 'planar'
				},
				Prototype: {
					id: 'prototype'
				},
				Saga: {
					id: 'saga'
				},
				Scheme: {
					id: 'scheme'
				},
				Split: {
					id: 'split'
				},
				Token: {
					id: 'token'
				},
				Transform: {
					id: 'transform'
				},
				Vanguard: {
					id: 'vanguard'
				},
				Other: {
				}
			}
		}
	},
	mounted () {
		this.countLayouts()

		this.layoutStats = this.sortTableByCounts(this.layoutStats)
	},
	methods: {
		countLayouts () {
			this.deck.cards.forEach(card => {
				let recognizedLayout = false

				for (const layoutName in this.layoutStats) {
					const stat = this.layoutStats[layoutName]

					if (!stat.ct) {
						stat.ct = 0
					}
					if (card.layout === stat.id) {
						stat.ct += card.qty
						recognizedLayout = true
					}
				}

				if (!recognizedLayout) {
					this.layoutStats.Other.ct += card.qty
				}
			})
		}
	}
}
</script>
