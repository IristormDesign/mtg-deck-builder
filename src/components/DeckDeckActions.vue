<template>
	<section class="deck-actions">
		<form>
			<label for="deckActionSelect">Do Deck Action:</label>
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
import stringMethods from '@/mixins/stringMethods.js'

export default {
	mixins: [copyDeck, stringMethods],
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
		copyDeck (sourceDeck, failedName) {
			const defaultCopyName = () => {
				if (failedName) {
					return failedName
				} else {
					return this.amendCopiedDeckName(sourceDeck).name
				}
			}
			let deckCopyName = prompt(
				'Give a name for the deck copy:',
				defaultCopyName()
			)

			deckCopyName = this.removeExcessSpaces(deckCopyName)

			if (deckCopyName) {
				const path = this.stringToPath(deckCopyName)

				if (path === this.deck.path) {
					alert('Please give the deck copy a name that’s unique.')
					this.copyDeck(sourceDeck)
				} else if (this.nameIsApproved(deckCopyName, path)) {
					const copiedDeck = JSON.parse(JSON.stringify(sourceDeck)) // The technique for deep-cloning objects, which is necessary here.
					const newData = {
						name: deckCopyName,
						path: path
					}

					this.storeCopiedDeckAndRedirect(copiedDeck, newData)
				} else {
					this.copyDeck(sourceDeck, deckCopyName)
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
