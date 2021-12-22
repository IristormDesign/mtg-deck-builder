<template>
	<section>
		<h4>Colors of Spells</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Count</th>
					<th>Percent</th>
				</tr>
			</thead>
			<tbody v-if="!emptyTable">
				<tr v-show="countColor('white')">
					<th>
						<div class="vert-center-cell">
							<small>White</small>
							<div v-html="manaSymbol.w"></div>
						</div>
					</th>
					<td>{{ countColor('white') }}</td>
					<td>{{ calculatePercentage(countColor('white')) }}</td>
				</tr>
				<tr v-show="countColor('blue')">
					<th>
						<div class="vert-center-cell">
							<small>Blue</small>
							<div v-html="manaSymbol.u"></div>
						</div>
					</th>
					<td>{{ countColor('blue') }}</td>
					<td>{{ calculatePercentage(countColor('blue')) }}</td>
				</tr>
				<tr v-show="countColor('black')">
					<th>
						<div class="vert-center-cell">
							<small>Black</small>
							<div v-html="manaSymbol.b"></div>
						</div>
					</th>
					<td>{{ countColor('black') }}</td>
					<td>{{ calculatePercentage(countColor('black')) }}</td>
				</tr>
				<tr v-show="countColor('red')">
					<th>
						<div class="vert-center-cell">
							<small>Red</small>
							<div v-html="manaSymbol.r"></div>
						</div>
					</th>
					<td>{{ countColor('red') }}</td>
					<td>{{ calculatePercentage(countColor('red')) }}</td>
				</tr>
				<tr v-show="countColor('green')">
					<th>
						<div class="vert-center-cell">
							<small>Green</small>
							<div v-html="manaSymbol.g"></div>
						</div>
					</th>
					<td>{{ countColor('green') }}</td>
					<td>{{ calculatePercentage(countColor('green')) }}</td>
				</tr>
				<tr v-show="countColor('colorless')">
					<th>Colorless</th>
					<td>{{ countColor('colorless') }}</td>
					<td>{{ calculatePercentage(countColor('colorless')) }}</td>
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
	</section>
</template>

<script>
import calculatePercentage from '@/mixins/calculatePercentage.js'

export default {
	mixins: [calculatePercentage],
	props: {
		deck: Object,
		manaSymbol: Object
	},
	computed: {
		emptyTable () {
			if (
				this.countColor('white') === 0 &&
				this.countColor('blue') === 0 &&
				this.countColor('black') === 0 &&
				this.countColor('red') === 0 &&
				this.countColor('green') === 0 &&
				this.countColor('colorless') === 0
			) {
				return true
			}
			return false
		}
	},
	methods: {
		countColor (givenColor) {
			const counts = {
				white: 0,
				blue: 0,
				black: 0,
				red: 0,
				green: 0,
				colorless: 0
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (card.mana !== '') { // Excludes land
						if (card.colors[0] === undefined) {
							counts.colorless++
						} else {
							card.colors.forEach(color => {
								if (color === 'W') {
									counts.white++
								} else if (color === 'U') {
									counts.blue++
								} else if (color === 'B') {
									counts.black++
								} else if (color === 'R') {
									counts.red++
								} else if (color === 'G') {
									counts.green++
								}
							})
						}
					}
				}
			})

			switch (givenColor) {
			case 'white':
				return counts.white
			case 'blue':
				return counts.blue
			case 'black':
				return counts.black
			case 'red':
				return counts.red
			case 'green':
				return counts.green
			case 'colorless':
				return counts.colorless
			}
		}
	}
}
</script>
