<template>
	<section>
		<h4>Rarities</h4>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Count</th>
					<th>Percent</th>
				</tr>
			</thead>
			<tbody v-if="!emptyTable">
				<tr v-show="countRarities('c')">
					<th>
						<div class="vert-center-cell">
							<small>Common</small>
							<div v-html="raritySymbol.c"></div>
						</div>
					</th>
					<td>{{ countRarities('c') }}</td>
					<td>{{ calculatePercentage(countRarities('c')) }}</td>
				</tr>
				<tr v-show="countRarities('u')">
					<th>
						<div class="vert-center-cell">
							<small>Uncommon</small>
							<div v-html="raritySymbol.u"></div>
						</div>
					</th>
					<td>{{ countRarities('u') }}</td>
					<td>{{ calculatePercentage(countRarities('u')) }}</td>
				</tr>
				<tr v-show="countRarities('r')">
					<th>
						<div class="vert-center-cell">
							<small>Rare</small>
							<div v-html="raritySymbol.r"></div>
						</div>
					</th>
					<td>{{ countRarities('r') }}</td>
					<td>{{ calculatePercentage(countRarities('r')) }}</td>
				</tr>
				<tr v-show="countRarities('m')">
					<th>
						<div class="vert-center-cell">
							<small>Mythic rare</small>
							<div v-html="raritySymbol.m"></div>
						</div>
					</th>
					<td>{{ countRarities('m') }}</td>
					<td>{{ calculatePercentage(countRarities('m')) }}</td>
				</tr>
				<tr v-show="countRarities('s')">
					<th>
						<div class="vert-center-cell">
							<small>Special</small>
							<div v-html="raritySymbol.s"></div>
						</div>
					</th>
					<td>{{ countRarities('s') }}</td>
					<td>{{ calculatePercentage(countRarities('s')) }}</td>
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
		raritySymbol: Object
	},
	computed: {
		emptyTable () {
			if (
				this.countRarities('c') === 0 &&
				this.countRarities('u') === 0 &&
				this.countRarities('r') === 0 &&
				this.countRarities('m') === 0 &&
				this.countRarities('s') === 0
			) {
				return true
			}
			return false
		}
	},
	methods: {
		countRarities (givenRarity) {
			const counts = {
				c: 0,
				u: 0,
				r: 0,
				m: 0,
				s: 0
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (card.rarity === 'common') {
						counts.c++
					} else if (card.rarity === 'uncommon') {
						counts.u++
					} else if (card.rarity === 'rare') {
						counts.r++
					} else if (card.rarity === 'mythic') {
						counts.m++
					} else if (card.rarity === 'special') {
						counts.s++
					}
				}
			})

			switch (givenRarity) {
			case 'c':
				return counts.c
			case 'u':
				return counts.u
			case 'r':
				return counts.r
			case 'm':
				return counts.m
			case 's':
				return counts.s
			}
		}
	}
}
</script>
