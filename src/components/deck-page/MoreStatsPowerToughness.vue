<template>
	<section>
		<h4>Power & Toughness</h4>
		<div
			v-if="power.total === 0 && toughness.total === 0"
			class="no-data"
		>
			(None)
		</div>
		<table v-else>
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
					<td>{{ power.greatest }}</td>
					<td>{{ toughness.greatest }}</td>
				</tr>
				<tr>
					<th>Average</th>
					<td>{{ power.average }}</td>
					<td>{{ toughness.average }}</td>
				</tr>
				<tr>
					<th>Least</th>
					<td>{{ power.least }}</td>
					<td>{{ toughness.least }}</td>
				</tr>
			</tbody>
			<template v-if="variablePT.ct">
				<thead v-html="tableHeadCommon" />
				<tbody v-show="variablePT.ct">
					<tr>
						<th>Variable P/T</th>
						<td>{{ variablePT.ct }}</td>
						<td>{{ variablePT.pct }}<span>%</span></td>
					</tr>
				</tbody>
				<tbody class="total">
					<tr>
						<th>All spells</th>
						<td>{{ allSpellsCount }}</td>
						<td>100.0<span>%</span></td>
					</tr>
				</tbody>
			</template>
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
			power: {
				total: 0
			},
			toughness: {
				total: 0
			},
			variablePT: {
				ct: 0,
				pct: 0
			},
			allSpellsCount: 0
		}
	},
	mounted () {
		this.setUpPTStats()
		this.countVariablePT()
		this.calculatePercentageOfSpells(this.variablePT)
	},
	methods: {
		setUpPTStats () {
			const cardsWithPT = this.deck.cards.filter(
				card => card.toughness // Find only the cards that have the toughness attribute. If a card has it, then it'd be paired with the power attribute too.
			)

			if (cardsWithPT.length > 0) {
				const p = this.power
				const t = this.toughness

				p.greatest = 0
				t.greatest = 0
				p.average = 0
				t.average = 0
				p.least = Infinity
				t.least = Infinity

				cardsWithPT.forEach(card => {
					this.determinePTStats(card, 'power')
					this.determinePTStats(card, 'toughness')
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

				const ptDataSet = this[ptLabel]

				ptDataSet.average += ptNum * card.qty
				ptDataSet.total += card.qty

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
			if (!ptLabel) return

			const stats = this[ptLabel]

			if (stats.total > 0) {
				stats.average /= stats.total
			}
			stats.average = stats.average.toFixed(1)
		},
		countVariablePT () {
			this.deck.cards.forEach(card => {
				function hasVariablePT (forBackFace) {
					if (forBackFace) {
						return (
							card.power2 === '*' ||
							card.toughness2 === '*'
						)
					} else {
						return (
							card.power === '*' ||
							card.toughness === '*'
						)
					}
				}

				let countedOnFrontFace = false

				const variablePTPerFace = (forBackFace) => {
					if (
						!countedOnFrontFace &&
						hasVariablePT(forBackFace)
					) {
						this.variablePT.ct += card.qty
						countedOnFrontFace = true
					}
				}

				variablePTPerFace()
				variablePTPerFace(true)

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
		},
		calculatePercentageOfSpells (stat) {
			stat.pct = ((stat.ct / this.allSpellsCount) * 100).toFixed(1)
		}
	}
}
</script>
