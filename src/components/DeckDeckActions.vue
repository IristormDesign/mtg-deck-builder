<template>
	<section class="deck-actions">
		<form>
			<label for="deckActionSelect">Do deck action:</label>
			<select v-model="deckAction" @change="doDeckAction()" id="deckActionSelect">
				<option value="">(Select)</option>
				<option value="copy">Copy</option>
				<option value="export">Export</option>
				<option value="delete">Delete</option>
			</select>
		</form>
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
					this.copyDeck(this.deck); break
				case 'export':
					this.exportDeck(this.deck); break
				case 'delete':
					this.deleteDeck(this.deck); break
			}

			this.deckAction = ''
		},
		copyDeck (sourceDeck) {
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
		exportDeck (deck) {
			this.$router.push({
				name: 'exportDecks',
				params: { presetDeckName: deck.name }
			})
		},
		deleteDeck (deck) {
			this.$router.push({
				name: 'deleteDecks',
				params: { presetDeckName: deck.name }
			})
		}
	}
}
</script>
