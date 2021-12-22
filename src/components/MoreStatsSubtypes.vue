<template>
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
			<tbody v-if="subtypeNames.length > 0">
				<tr v-for="subtype in subtypeNames" :key="subtype">
					<th>{{ subtype }}</th>
					<td>{{ subtypeCounts[subtype] }}</td>
					<td>{{ calculatePercentage(subtypeCounts[subtype]) }}</td>
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
		deck: Object
	},
	data () {
		return {
			subtypeNames: [],
			subtypeCounts: {}
		}
	},
	mounted () {
		this.displaySubtypes()
	},
	methods: {
		displaySubtypes () {
			const subtypeNames = this.subtypeNames
			const subtypeCounts = this.subtypeCounts
			const allSubtypes = []

			function getSubtypesPerFace (cardFace) {
				// In each card's type line, get only the part that indicates the subtype: the em dash and all characters after it.
				const subtypesPattern = cardFace.match(RegExp(/\s—\s.*/))

				// Ignore the following only if the card has no subtype.
				if (subtypesPattern) {
					// The card's line of subtypes, which may have only a single subtype or multiple of them.
					const subtypeLine = subtypesPattern[0]

					if (subtypeLine) {
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

					// Find the pattern that indicates the card is double-faced, which is a space, a slash, a space, and any characters afterward in the card's type line. (This doesn't look at the second face's entire type line.)
					const isDoubleFaced = typeLine.match(RegExp(/\s\/\s\w*/))

					if (isDoubleFaced) {
						// Get the part of the string that precedes the slash character.
						const firstFace = typeLine.match(RegExp(/[^/]*/))[0]

						// Get the part of the string that follows the slash character.
						const secondFace = typeLine.match(RegExp(/\/.*/))[0]

						getSubtypesPerFace(firstFace)
						getSubtypesPerFace(secondFace)
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
		}
	}
}
</script>
