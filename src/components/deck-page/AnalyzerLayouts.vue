<template>
	<section>
		<h4>Layouts</h4>
		<table>
			<thead v-html="tableHeadCommon"></thead>
			<tbody>
				<template v-for="(layout, layoutKey) in layoutStats">
					<tr
						v-if="layout.ct > 0"
						:key="layoutKey"
					>
						<th :class="layout.label.length > 15 ? 'small' : null">
							{{ layout.label }}
						</th>
						<td>{{ layout.ct }}</td>
						<td>{{ calculatePercentage(layout.ct) }}<span>%</span></td>
					</tr>
				</template>
			</tbody>
			<tbody class="total">
				<tr>
					<th>All cards</th>
					<td>{{ totalCards }}</td>
					<td>100.0<span>%</span></td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import deckAnalyzer from '@/mixins/deckAnalyzer.js'

export default {
	mixins: [deckAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			layoutStats: {}
		}
	},
	mounted () {
		this.countLayouts()
		this.setPreferredLayoutLabels()

		this.layoutStats = this.sortTableByCounts(this.layoutStats)
	},
	methods: {
		countLayouts () {
			this.deck.cards.forEach(({ layout, qty }) => {
				if (!layout) return

				if (!this.layoutStats[layout]) {
					this.layoutStats[layout] = {
						ct: 0
					}
				}

				this.layoutStats[layout].ct += qty
			})
		},
		setPreferredLayoutLabels () {
			for (const key in this.layoutStats) {
				this.layoutStats[key].label = setLabel()

				function setLabel () {
					switch (key) {
						case 'modal_dfc':
							return 'Modal double-faced'
						case 'double_faced_token':
							return 'Double-faced token'
						default:
							return makeLabelFromKeyName(key)
					}
				}

				// Use the layout's key name directly as the label, with some modifications to it.
				function makeLabelFromKeyName (key) {
					key = key.charAt(0).toUpperCase() + key.slice(1) // Capitalize the initial letter.
					key = key.replace(/_/g, ' ') // Replace any underscores with spaces.

					return key
				}
			}
		}
	}
}
</script>
