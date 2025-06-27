<template>
	<section id="stats-powerToughness">
		<h4>Power & Toughness</h4>
		<div
			v-if="allPTCardsCount === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
			<template v-if="allPTCardsCount > 0">
				<thead class="distinct-head">
					<tr>
						<th></th>
						<th>Power</th>
						<th>Tough.</th>
					</tr>
				</thead>
				<tbody class="filterable-stats-multiple-tds">
					<tr>
						<th>Greatest</th>

						<td
							:class="activeFilterClass('powerToughness', {
								greatestPower: powerStats.greatest
							})"
							@click="handleRowClick(
								'powerToughness',
								{ greatestPower: powerStats.greatest },
								disabledCell(powerStats.greatest)
							)"
							:disabled="disabledCell(powerStats.greatest)"
						>{{ powerStats.greatest }}</td>

						<td
							:class="activeFilterClass('powerToughness', {
								greatestToughness: toughnessStats.greatest
							})"
							@click="handleRowClick(
								'powerToughness',
								{ greatestToughness: toughnessStats.greatest },
								disabledCell(toughnessStats.greatest)
							)"
							:disabled="disabledCell(toughnessStats.greatest)"
						>{{ toughnessStats.greatest }}</td>
					</tr>
					<tr>
						<th>Median</th>

						<td
							:class="activeFilterClass('powerToughness', {
								medianPower: powerStats.median
							})"
							@click="handleRowClick(
								'powerToughness',
								{ medianPower: powerStats.median },
								disabledCell(powerStats.median)
							)"
							:disabled="disabledCell(powerStats.median)"
						>{{ powerStats.median }}</td>

						<td
							:class="activeFilterClass('powerToughness', {
								medianToughness: toughnessStats.median
							})"
							@click="handleRowClick(
								'powerToughness',
								{ medianToughness: toughnessStats.median },
								disabledCell(toughnessStats.median)
							)"
							:disabled="disabledCell(toughnessStats.median)"
						>{{ toughnessStats.median }}</td>
					</tr>
					<tr>
						<th>Least</th>

						<td
							:class="activeFilterClass('powerToughness', {
								leastPower: powerStats.least
							})"
							@click="handleRowClick(
								'powerToughness',
								{ leastPower: powerStats.least },
								disabledCell(powerStats.least)
							)"
							:disabled="disabledCell(powerStats.least)"
						>{{ powerStats.least }}</td>

						<td
							:class="activeFilterClass('powerToughness', {
								leastToughness: toughnessStats.least
							})"
							@click="handleRowClick(
								'powerToughness',
								{ leastToughness: toughnessStats.least },
								disabledCell(toughnessStats.least)
							)"
							:disabled="disabledCell(toughnessStats.least)"
						>{{ toughnessStats.least }}</td>
					</tr>
				</tbody>
			</template>
			<template v-if="variablePT.ct > 0">
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
			</template>
			<thead v-else>
				<tr>
					<th></th>
					<th title="Count">Ct.</th>
					<th class="empty-cell"></th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>{{ this.totalRowLabel ('cards ') }}<br>with P/T</th>
					<td>{{ allPTCardsCount }}</td>
					<td v-if="variablePT.ct">100.0<span>%</span></td>
					<td
						v-else
						class="empty-cell"
					></td>
				</tr>
			</tfoot>
		</table>
	</section>
</template>

<script>
import statsAnalyzer from '@/mixins/statsAnalyzer.js'

export default {
	mixins: [statsAnalyzer],
	props: {
		deck: Object
	},
	data () {
		return {
			powerStats: {},
			toughnessStats: {},
			variablePT: {
				ct: 0,
				pct: 0
			},
			allPTCardsCount: 0,
			allPowerValues: [],
			allToughnessValues: []
		}
	},
	watch: {
		analyzerFilter () {
			this.powerStats = {}
			this.toughnessStats = {}
			this.variablePT = {
				ct: 0,
				pct: 0
			}
			this.allPTCardsCount = 0
			this.allPowerValues = []
			this.allToughnessValues = []

			this.preparePTStats()
		}
	},
	mounted () {
		this.preparePTStats()
	},
	methods: {
		preparePTStats () {
			this.initializePTStats()
			this.countPTCards()
			this.calculatePercentageOfSpells(this.variablePT)
		},
		initializePTStats () {
			const cardsWithPT = this.filteredCards().filter(
				card => {
					return ( // Find the cards that have only the toughness attribute. If a card has that, then it'd be paired with the power attribute too.
						card.toughness ||
						card.toughness2
					)
				}
			)

			if (cardsWithPT.length > 0) {
				const p = this.powerStats
				const t = this.toughnessStats

				p.greatest = 0
				t.greatest = 0
				p.median = 0
				t.median = 0
				p.least = Infinity
				t.least = Infinity

				cardsWithPT.forEach(card => {
					this.determinePTStats(card, 'power')
					this.determinePTStats(card, 'toughness')
				})

				this.powerStats.median = this.calculateMedian(this.allPowerValues)
				this.toughnessStats.median = this.calculateMedian(this.allToughnessValues)
			}
		},
		determinePTStats (card, ptLabel) {
			const ptPerFace = (facePTLabel) => {
				if (!facePTLabel) return

				const ptNum = Number(card[facePTLabel]) // Convert the power or toughness data into a number type, as it originally comes from the Scryfall API as a string type.

				if (isNaN(ptNum)) return // The card's power/toughness value needs to be actual digits rather than `NaN`. If it does happen to be `NaN`, that means it has a variable symbol for P/T, and it should be ignored for these statistics.

				const ptDataSet = this[ptLabel + 'Stats']

				if (ptNum > ptDataSet.greatest) {
					ptDataSet.greatest = ptNum
				}
				if (ptNum < ptDataSet.least) {
					ptDataSet.least = ptNum
				}

				for (let i = 0; i < card.qty; i++) {
					switch (ptLabel) {
						case 'power':
							this.allPowerValues.push(Number(card[facePTLabel]))
							break
						case 'toughness':
							this.allToughnessValues.push(Number(card[facePTLabel]))
					}
				}
			}

			ptPerFace(ptLabel)
			ptPerFace(ptLabel + '2') // For P/T on card's back face, if available.
		},
		calculateMedian (values) {
			values.sort((a, b) => a - b)

			const midIndex = Math.floor(values.length / 2)

			if (values.length % 2) {
				return values[midIndex]
			} else {
				const mean = (
					values[midIndex - 1] +
					values[midIndex]
				) / 2

				return Number(mean.toFixed(1)) // The `toFixed()` method causes the output to be a string that may sometimes result in the displayed number ending with an unwanted ".0". By using the `Number()` method to make the output have the number type instead of the string type, the extra ".0" disappears.
			}
		},
		countPTCards () {
			this.filteredCards().forEach(card => {
				if (
					card.toughness !== undefined ||
					card.toughness2 !== undefined
				) {
					this.allPTCardsCount += card.qty

					this.variablePT.ct += this.determineVariablePowerToughness(card)
				}
			})

			/* In the condition that all of the deck's currently filtered cards are only cards that have variable P/T values, then the P/T stats would display confusing or misleading values, particularly the "Least" stat, which would display the word "Infinity." Under that condition, the following code replaces those stats' values with an asterisk instead. */
			const p = this.powerStats
			const t = this.toughnessStats

			if (p.least === Infinity) {
				p.greatest = '*'
				p.median = '*'
				p.least = '*'
			}
			if (t.least === Infinity) {
				t.greatest = '*'
				t.median = '*'
				t.least = '*'
			}
		},
		calculatePercentageOfSpells (stat) {
			stat.pct = ((stat.ct / this.allPTCardsCount) * 100).toFixed(1)
		},
		disabledCell (stat) {
			return stat === '*'
		}
	}
}
</script>
