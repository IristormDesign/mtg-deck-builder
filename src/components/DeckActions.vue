<template>
	<div class="deck-actions">
		<button @click="copyDeck(deck)">Copy Deck</button>
		<button @click="deleteDeck(deck)">Delete Deck</button>
	</div>
</template>

<script>
export default {
	name: 'deck-actions',
	props: {
		deck: Object
	},
	methods: {
		copyDeck (srcDeck) {
			const toCopyConfirmed = confirm(`Create a new deck that’s a copy of “${srcDeck.name}”?`)

			if (toCopyConfirmed) {
				const store = this.$store
				const srcDeckName = srcDeck.name
				const copySuffixRegex = new RegExp(/\(\d+\)$/, 'g') // A string that ends with `(N)`, where N is any number.
				let dupDeckName = srcDeckName
				let dupDeckPath

				// It's possible that this copied deck's name could match an existing deck's name. In this case, keep increasing the copy suffix's number by 1 until it no longer matches another deck's name.
				const makeUniqueDeckName = (copyNum) => {
					dupDeckPath = store.getters.stringToPath(dupDeckName)

					if (store.getters.existingDeck(dupDeckPath)) {
						copyNum++

						dupDeckName = dupDeckName.replace(copySuffixRegex, `(${copyNum})`)

						makeUniqueDeckName(copyNum)
					}
				}

				if (copySuffixRegex.test(srcDeckName)) { // If the deck name has the copy suffix...
					const suffix = srcDeckName.match(copySuffixRegex) // From the deck name, get the copy suffix alone.
					let copyNum = suffix[0].match(/\d+/) // From the suffix, get the number alone.

					copyNum = Number(copyNum[0]) + 1 // Convert `copyNum[0]` from a string into a number type, then increase it by 1.

					dupDeckName = dupDeckName.replace(copySuffixRegex, `(${copyNum})`)

					makeUniqueDeckName(copyNum)
				} else {
					dupDeckName += ' (2)'
					makeUniqueDeckName(2)
				}

				store.state.getDecks.push({
					name: dupDeckName,
					path: dupDeckPath,
					cards: srcDeck.cards,
					editDate: new Date(),
					description: srcDeck.description,
					viewedCard: srcDeck.viewedCard
				})
				localStorage.setItem(
					'decks', JSON.stringify(store.state.getDecks)
				)
				store.state.getDecks.find((deck) => {
					if (deck.name === dupDeckName) {
						this.$router.push({
							name: 'deck',
							params: { deckPath: deck.path }
						})
					}
				})
			}
		},
		deleteDeck (deck) {
			const state = this.$store.state
			const deletedDeckName = deck.name
			const deletionConfirmed = confirm(`Are you sure you want to permanently delete the deck “${deletedDeckName}”?`)

			if (deletionConfirmed) {
				const remainingDecks = state.getDecks.filter(
					deck => deck.name !== deletedDeckName
				)
				this.$nextTick(() => {
					localStorage.setItem(
						'decks', JSON.stringify(remainingDecks)
					)
				})
				this.$store.commit('mutateDeletedDeckName', deletedDeckName)
				this.$router.replace({ name: 'deckDeleted' })
			}
		}
	}
}
</script>
