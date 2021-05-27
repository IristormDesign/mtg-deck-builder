<template>
	<div class="more-stats solo-message">
		<h3>More Statistics on “{{ deck.name }}”</h3>

		<div class="tables">
			<section>
				<h4>Converted Mana Costs</h4>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Count</th>
							<th>Percent</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>0 mana</th>
							<td>{{ countCmc(0) }}</td>
							<td>{{ calculatePercentage(countCmc(0)) }}</td>
						</tr>
						<tr>
							<th>1 mana</th>
							<td>{{ countCmc(1) }}</td>
							<td>{{ calculatePercentage(countCmc(1)) }}</td>
						</tr>
						<tr>
							<th>2 mana</th>
							<td>{{ countCmc(2) }}</td>
							<td>{{ calculatePercentage(countCmc(2)) }}</td>
						</tr>
						<tr>
							<th>3 mana</th>
							<td>{{ countCmc(3) }}</td>
							<td>{{ calculatePercentage(countCmc(3)) }}</td>
						</tr>
						<tr>
							<th>4 mana</th>
							<td>{{ countCmc(4) }}</td>
							<td>{{ calculatePercentage(countCmc(4)) }}</td>
						</tr>
						<tr>
							<th>5 mana</th>
							<td>{{ countCmc(5) }}</td>
							<td>{{ calculatePercentage(countCmc(5)) }}</td>
						</tr>
						<tr>
							<th>6 mana</th>
							<td>{{ countCmc(6) }}</td>
							<td>{{ calculatePercentage(countCmc(6)) }}</td>
						</tr>
						<tr>
							<th>7 mana</th>
							<td>{{ countCmc(7) }}</td>
							<td>{{ calculatePercentage(countCmc(7)) }}</td>
						</tr>
						<tr>
							<th>8 or more mana</th>
							<td>{{ countCmc(8) }}</td>
							<td>{{ calculatePercentage(countCmc(8)) }}</td>
						</tr>
					</tbody>
				</table>
			</section>

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
					<tbody>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>White</small>
									<div v-html="this.$store.state.manaSymbol.w"></div>
								</div>
							</th>
							<td>{{ countColor('white') }}</td>
							<td>{{ calculatePercentage(countColor('white')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Blue</small>
									<div v-html="this.$store.state.manaSymbol.u"></div>
								</div>
							</th>
							<td>{{ countColor('blue') }}</td>
							<td>{{ calculatePercentage(countColor('blue')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Black</small>
									<div v-html="this.$store.state.manaSymbol.b"></div>
								</div>
							</th>
							<td>{{ countColor('black') }}</td>
							<td>{{ calculatePercentage(countColor('black')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Red</small>
									<div v-html="this.$store.state.manaSymbol.r"></div>
								</div>
							</th>
							<td>{{ countColor('red') }}</td>
							<td>{{ calculatePercentage(countColor('red')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Green</small>
									<div v-html="this.$store.state.manaSymbol.g"></div>
								</div>
							</th>
							<td>{{ countColor('green') }}</td>
							<td>{{ calculatePercentage(countColor('green')) }}</td>
						</tr>
						<tr>
							<th>Colorless</th>
							<td>{{ countColor('colorless') }}</td>
							<td>{{ calculatePercentage(countColor('colorless')) }}</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section>
				<h4>Types</h4>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Count</th>
							<th>Percent</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Creature</th>
							<td>{{ countTypes('creature') }}</td>
							<td>{{ calculatePercentage(countTypes('creature')) }}</td>
						</tr>
						<tr>
							<th>Planeswalker</th>
							<td>{{ countTypes('planeswalker') }}</td>
							<td>{{ calculatePercentage(countTypes('planeswalker')) }}</td>
						</tr>
						<tr>
							<th>Enchantment</th>
							<td>{{ countTypes('enchantment') }}</td>
							<td>{{ calculatePercentage(countTypes('enchantment')) }}</td>
						</tr>
						<tr>
							<th>Artifact</th>
							<td>{{ countTypes('artifact') }}</td>
							<td>{{ calculatePercentage(countTypes('artifact')) }}</td>
						</tr>
						<tr>
							<th>Sorcery</th>
							<td>{{ countTypes('sorcery') }}</td>
							<td>{{ calculatePercentage(countTypes('sorcery')) }}</td>
						</tr>
						<tr>
							<th>Instant</th>
							<td>{{ countTypes('instant') }}</td>
							<td>{{ calculatePercentage(countTypes('instant')) }}</td>
						</tr>
						<tr>
							<th>Land</th>
							<td>{{ countTypes('land') }}</td>
							<td>{{ calculatePercentage(countTypes('land')) }}</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section>
				<h4>Subtypes</h4>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Count</th>
							<th>Percent</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="subtype in subtypeNames" :key="subtype">
							<th>{{ subtype }}</th>
							<td>{{ subtypeCounts[subtype] }}</td>
							<td>{{ calculatePercentage(subtypeCounts[subtype]) }}</td>
						</tr>
					</tbody>
				</table>
			</section>

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
					<tbody>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Common</small>
									<div v-html="$store.state.raritySymbol.c"></div>
								</div>
							</th>
							<td>{{ countRarities('c') }}</td>
							<td>{{ calculatePercentage(countRarities('c')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Uncommon</small>
									<div v-html="$store.state.raritySymbol.u"></div>
								</div>
							</th>
							<td>{{ countRarities('u') }}</td>
							<td>{{ calculatePercentage(countRarities('u')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Rare</small>
									<div v-html="$store.state.raritySymbol.r"></div>
								</div>
							</th>
							<td>{{ countRarities('r') }}</td>
							<td>{{ calculatePercentage(countRarities('r')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Mythic rare</small>
									<div v-html="$store.state.raritySymbol.m"></div>
								</div>
							</th>
							<td>{{ countRarities('m') }}</td>
							<td>{{ calculatePercentage(countRarities('m')) }}</td>
						</tr>
						<tr>
							<th>
								<div class="vert-center-cell">
									<small>Special</small>
									<div v-html="$store.state.raritySymbol.s"></div>
								</div>
							</th>
							<td>{{ countRarities('s') }}</td>
							<td>{{ calculatePercentage(countRarities('s')) }}</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section>
				<h4>Miscellaneous</h4>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Count</th>
							<th>Percent</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Monocolored</th>
							<td>{{ countMisc('monocolored') }}</td>
							<td>{{ calculatePercentage(countMisc('monocolored')) }}</td>
						</tr>
						<tr>
							<th>Multicolored</th>
							<td>{{ countMisc('multicolored') }}</td>
							<td>{{ calculatePercentage(countMisc('multicolored')) }}</td>
						</tr>
						<tr>
							<th>Basic Land</th>
							<td>{{ countMisc('basic land') }}</td>
							<td>{{ calculatePercentage(countMisc('basic land')) }}</td>
						</tr>
						<tr>
							<th>Legendary</th>
							<td>{{ countMisc('legendary') }}</td>
							<td>{{ calculatePercentage(countMisc('legendary')) }}</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>

		<p>(In some of these charts, some cards may belong to multiple categories. For example, a singular card that has the type of “artifact creature” adds the counts of both creature and artifact types. As a result, the count of each category may be larger than the total cards in the deck, and the sum of the percentages of all categories may be beyond 100%.)</p>
	</div>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	data: function () {
		return {
			subtypeNames: [],
			subtypeCounts: {}
		}
	},
	mounted () {
		this.displaySubtypes()
	},
	methods: {
		countCmc (givenCmc) {
			const counts = {
				cmc0: 0,
				cmc1: 0,
				cmc2: 0,
				cmc3: 0,
				cmc4: 0,
				cmc5: 0,
				cmc6: 0,
				cmc7: 0,
				cmc8Plus: 0
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (card.mana !== '') { // Excludes land
						if (card.cmc === 0) {
							counts.cmc0++
						} else if (card.cmc === 1) {
							counts.cmc1++
						} else if (card.cmc === 2) {
							counts.cmc2++
						} else if (card.cmc === 3) {
							counts.cmc3++
						} else if (card.cmc === 4) {
							counts.cmc4++
						} else if (card.cmc === 5) {
							counts.cmc5++
						} else if (card.cmc === 6) {
							counts.cmc6++
						} else if (card.cmc === 7) {
							counts.cmc7++
						} else if (card.cmc === 8) {
							counts.cmc8Plus++
						}
					}
				}
			})

			switch (givenCmc) {
			case 0:
				return counts.cmc0
			case 1:
				return counts.cmc1
			case 2:
				return counts.cmc2
			case 3:
				return counts.cmc3
			case 4:
				return counts.cmc4
			case 5:
				return counts.cmc5
			case 6:
				return counts.cmc6
			case 7:
				return counts.cmc7
			case 8:
				return counts.cmc8Plus
			}
		},
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
		},
		countTypes (givenType) {
			const regexCreature = RegExp(/\bCreature\b/)
			const regexPlaneswalker = RegExp(/\bPlaneswalker\b/)
			const regexEnchantment = RegExp(/\bEnchantment\b/)
			const regexArtifact = RegExp(/\bArtifact\b/)
			const regexSorcery = RegExp(/\bSorcery\b/)
			const regexInstant = RegExp(/\bInstant\b/)
			const regexLand = RegExp(/\bLand\b/)
			const counts = {
				creature: 0,
				planeswalker: 0,
				enchantment: 0,
				artifact: 0,
				sorcery: 0,
				instant: 0,
				land: 0
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (regexCreature.test(card.type)) {
						counts.creature++
					}
					if (regexPlaneswalker.test(card.type)) {
						counts.planeswalker++
					}
					if (regexEnchantment.test(card.type)) {
						counts.enchantment++
					}
					if (regexArtifact.test(card.type)) {
						counts.artifact++
					}
					if (regexSorcery.test(card.type)) {
						counts.sorcery++
					}
					if (regexInstant.test(card.type)) {
						counts.instant++
					}
					if (regexLand.test(card.type)) {
						counts.land++
					}
				}
			})

			switch (givenType) {
			case 'creature':
				return counts.creature
			case 'planeswalker':
				return counts.planeswalker
			case 'enchantment':
				return counts.enchantment
			case 'artifact':
				return counts.artifact
			case 'sorcery':
				return counts.sorcery
			case 'instant':
				return counts.instant
			case 'land':
				return counts.land
			case 'others':
				return counts.others
			}
		},
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
		},
		displaySubtypes () {
			const subtypeNames = this.subtypeNames
			const subtypeCounts = this.subtypeCounts
			const allSubtypes = []

			function getSubtypesPerFace (cardType) {
				// In each card's type line, get only the part that indicates the subtype: the em dash and all characters after it.
				const subtypesPattern = cardType.match(RegExp(/\s—\s.*/))

				// Ignore the following only if the card has no subtype.
				if (subtypesPattern !== null) {
					// The card's line of subtypes, which may have only a single subtype or multiple of them.
					const subtypeLine = subtypesPattern[0]

					// Within the string, get everything up to a slash character, indicating the beginning of the type line of a double-faced card's second face.
					// subtypeLine = subtypeLine.match(RegExp(/[^/]*/))[0]

					if (subtypeLine !== null) {
						// Delete the " — " (em dash) part that came from the collected subtype pattern.
						subtypeLine.replace(' — ', '')

						// Get every single subtype in the subtype lines having multiple subtypes. Duplicate single subtypes are included.
						const isolatedSubtypes = subtypeLine.match(RegExp(/\w+/g))

						// Put all of these isolated subtypes in the `subtypes` array.
						isolatedSubtypes.forEach(subtype => {
							allSubtypes.push(subtype)
						})
					}
				}
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					const typeLine = card.type

					// In each card's type line, find the pattern that indicates a double-faced card, which is a space, a slash, a space, and any characters after.
					const secondFace = typeLine.match(RegExp(/\s\/\s.*/))

					// If the card is double-faced...
					if (secondFace !== null) {
						// From the double-faced card's type line, get all of the part of the string that precedes the slash character.
						const firstFace = typeLine.match(RegExp(/[^/]*/))

						getSubtypesPerFace(firstFace[0])
						getSubtypesPerFace(secondFace[0])
					} else { // A regular single-face card.
						getSubtypesPerFace(typeLine)
					}
				}
			})

			// Make an array containing only the UNIQUE names among all the deck's subtypes.
			allSubtypes.forEach(subtype => {
				if (subtypeNames.indexOf(subtype) < 0) {
					subtypeNames.push(subtype)
				}
			})

			// Alphabetize the subtypes.
			subtypeNames.sort()

			// Set up an object having properties of the unique names of each subtype, with the count of each initially set to 0.
			subtypeNames.forEach(name => {
				subtypeCounts[name] = 0
			})

			// Apply the counts of each subtype.
			allSubtypes.forEach(subtype => {
				for (const name in subtypeCounts) {
					if (subtype === name) {
						subtypeCounts[subtype]++
					}
				}
			})
		},
		countMisc (givenValue) {
			const regexBasicLand = RegExp(/\bBasic (\w* )?Land\b/)
			const regexLegendary = RegExp(/\bLegendary\b/)
			const counts = {
				monocolored: 0,
				multicolored: 0,
				basicLand: 0,
				legendary: 0
			}

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					if (card.colors.length === 1) {
						counts.monocolored++
					}
					if (card.colors[0] === 'multicolor') {
						counts.multicolored++
					}
					if (regexBasicLand.test(card.type)) {
						counts.basicLand++
					}
					if (regexLegendary.test(card.type)) {
						counts.legendary++
					}
				}
			})

			switch (givenValue) {
			case 'monocolored':
				return counts.monocolored
			case 'multicolored':
				return counts.multicolored
			case 'basic land':
				return counts.basicLand
			case 'legendary':
				return counts.legendary
			}
		},
		calculatePercentage (givenValue) {
			let deckTotal = 0

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					deckTotal++
				}
			})

			const percentage = ((givenValue / deckTotal) * 100).toFixed(1) + '%'

			return percentage
		}
	}
}
</script>
