<template>
	<section id="stats-powerToughness">
		<h4>Power & Toughness</h4>
		<div
			v-if="ptTotal === 0 && variablePT.ct === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<template v-if="ptTotal > 0">
				<thead class="distinct-head">
					<tr>
						<th></th>
						<th>Power</th>
						<th>Tough.</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Greatest</th>
						<td>{{ powerStats.greatest }}</td>
						<td>{{ toughnessStats.greatest }}</td>
					</tr>
					<tr>
						<th>Average</th>
						<td>{{ powerStats.average }}</td>
						<td>{{ toughnessStats.average }}</td>
					</tr>
					<tr>
						<th>Least</th>
						<td>{{ powerStats.least }}</td>
						<td>{{ toughnessStats.least }}</td>
					</tr>
				</tbody>
			</template>
			<template v-if="variablePT.ct">
				<thead v-html="tableHeadCommon"></thead>
				<tbody
					v-show="variablePT.ct"
					class="filterable-stats"
				>
					<tr
						:class="activeFilterClass('powerToughness', 'variable')"
						@click="handleRowClick('powerToughness', 'variable')"
					>
						<th>Variable P/T</th>
						<td>{{ variablePT.ct }}</td>
						<td>{{ variablePT.pct }}<span>%</span></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th>{{ totalRowLabel('spells') }}</th>
						<td>{{ allSpellsCount }}</td>
						<td>100.0<span>%</span></td>
					</tr>
				</tfoot>
			</template>
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
			powerStats: {},
			toughnessStats: {},
			ptTotal: 0,
			variablePT: {
				ct: 0,
				pct: 0
			},
			allSpellsCount: 0
		}
	},
	watch: {
		analyzerFilter () {
			this.powerStats = {}
			this.toughnessStats = {}
			this.ptTotal = 0
			this.variablePT = {
				ct: 0,
				pct: 0
			}
			this.allSpellsCount = 0

			this.preparePTStats()
		}
	},
	mounted () {
		this.preparePTStats()
	},
	methods: {
		preparePTStats () {
			this.initializePTStats()

			this.countVariablePT()
			this.calculatePercentageOfSpells(this.variablePT)
		},
		initializePTStats () {
			const cardsWithPT = this.filteredCards().filter(
				card => card.toughness // Find only the cards that have the toughness attribute. If a card has it, then it'd be paired with the power attribute too.
			)

			if (cardsWithPT.length > 0) {
				const p = this.powerStats
				const t = this.toughnessStats

				p.greatest = 0
				t.greatest = 0
				p.average = 0
				t.average = 0
				p.least = Infinity
				t.least = Infinity

				cardsWithPT.forEach(card => {
					this.determinePTStats(card, 'power')
					this.determinePTStats(card, 'toughness')

					if (
						!isNaN(card.power) ||
						!isNaN(card.toughness)
					) { // If the P/T value is an integer (not a star symbol)...
						this.ptTotal += card.qty
					}
					if (
						!isNaN(card.power2) ||
						!isNaN(card.toughness2)
					) { // If the P/T value is an integer (not a star symbol)...
						this.ptTotal += card.qty
					}
				})

				this.calculatePTAverage('power')
				this.calculatePTAverage('toughness')
			}
		},
		determinePTStats (card, ptLabel) {
			const ptPerFace = (facePTLabel) => {
				if (!facePTLabel) return

				const ptNum = Number(card[facePTLabel]) // Convert the power or toughness data into a number type, as it originally comes from the Scryfall API as a string type.

				if (isNaN(ptNum)) return // The card's power/toughness value needs to be actual digits rather than `NaN`. If it does happen to be `NaN`, that means it has a variable symbol for P/T, and it should be ignored for these statistics.

				const ptDataSet = this[ptLabel + 'Stats']

				ptDataSet.average += ptNum * card.qty

				if (ptNum > ptDataSet.greatest) {
					ptDataSet.greatest = ptNum
				}
				if (ptNum < ptDataSet.least) {
					ptDataSet.least = ptNum
				}
			}

			ptPerFace(ptLabel)
			ptPerFace(ptLabel + '2') // For P/T on card's back face, if available.
		},
		calculatePTAverage (ptLabel) {
			const stats = this[ptLabel + 'Stats']

			if (this.ptTotal > 0) {
				stats.average /= this.ptTotal
			}
			stats.average = stats.average.toFixed(1)
		},
		countVariablePT () {
			this.filteredCards().forEach(card => {
				this.variablePT.ct += this.determineVariablePowerToughness(card)

				function faceIsSpell (faceType) {
					if (!faceType) return

					return !/\bLand\b/.test(faceType)
				}

				if (
					faceIsSpell(card.type) ||
					faceIsSpell(card.type2)
				) {
					this.allSpellsCount += card.qty
				}
			})

			/* In the condition that all of the deck's currently filtered cards are only cards that have variable P/T values, then the P/T stats would display confusing or misleading values, particularly the "Least" stat, which would display the word "Infinity." Under that condition, the following code replaces those stats' values with an asterisk instead. */
			if (this.totalCards === this.variablePT.ct) {
				const p = this.powerStats
				const t = this.toughnessStats

				if (p.least === Infinity) {
					p.greatest = '*'
					p.average = '*'
					p.least = '*'
				}
				if (t.least === Infinity) {
					t.greatest = '*'
					t.average = '*'
					t.least = '*'
				}
			}
		},
		calculatePercentageOfSpells (stat) {
			stat.pct = ((stat.ct / this.allSpellsCount) * 100).toFixed(1)
		}
	}
}
</script>
