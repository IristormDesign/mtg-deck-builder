<template>
	<section class="deck-actions">
		<select
			v-model="deckAction"
			@change="doDeckAction()"
			id="deckActionSelect"
		>
			<option value="">Deck Actions&hellip;</option>
			<option value="copy">Copy</option>
			<option value="convertToText">Convert to text</option>
			<option value="export">Export</option>
			<option value="delete">Delete</option>
		</select>
	</section>
</template>

<script>
import copyDeck from '@/mixins/copyDeck.js'

export default {
	mixins: [copyDeck],
	props: {
		deck: Object
	},
	data () {
		return {
			deckAction: ''
		}
	},
	methods: {
		doDeckAction () {
			switch (this.deckAction) {
				case 'copy':
					this.copyDeck(); break
				case 'convertToText':
					this.convertToText(); break
				case 'export':
					this.exportDeck(); break
				case 'delete':
					this.deleteDeck(); break
			}

			this.deckAction = ''
		},
		copyDeck () {
			const sourceDeck = this.deck

			let deckCopyName = prompt(
				'Give a new name for the deck copy:',
				this.amendCopiedDeckName(sourceDeck).name
			)

			if (deckCopyName) {
				deckCopyName = deckCopyName.trim()
			}
			if (deckCopyName) { // Check for a string existing again after having trimmed it.
				const deckCopyPath = this.stringToPath(deckCopyName)

				if (deckCopyPath === this.$route.params.deckPath) {
					alert(this.alertNameExists(deckCopyName))

					this.copyDeck(sourceDeck)
				} else if (this.nameIsApproved(deckCopyName, deckCopyPath)) {
					const copiedDeck = JSON.parse(JSON.stringify(sourceDeck)) // The technique for deep-cloning objects, which is necessary here.
					const newData = {
						name: deckCopyName,
						path: deckCopyPath
					}

					this.storeCopiedDeckAndRedirect(copiedDeck, newData)
				} else {
					this.copyDeck(sourceDeck)
				}
			}
		},
		convertToText () {
			if (this.$route.name === 'convertToText') return // Vue throws an error if the app would try to go to the "List as Text" page while already on that page, so don't let that happen.

			this.$router.push({
				name: 'convertToText',
				params: { activeDeck: this.deck }
			})
		},
		exportDeck () {
			this.$router.push({
				name: 'exportDecks',
				params: { presetDeckName: this.deck.name }
			})
		},
		deleteDeck () {
			this.$router.push({
				name: 'deleteDecks',
				params: { presetDeckName: this.deck.name }
			})
		}
	}
}
</script>
