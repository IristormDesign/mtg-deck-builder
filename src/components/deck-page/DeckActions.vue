<template>
	<section class="deck-actions">
		<select
			v-model="deckAction"
			@change="doDeckAction()"
			id="deckActionSelect"
		>
			<option value="">Deck Actions&hellip;</option>
			<option value="renderAsText">Render as text</option>
			<option value="duplicate">Duplicate</option>
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
				case 'renderAsText':
					this.renderAsText(); break
				case 'duplicate':
					this.duplicateDeck(); break
				case 'export':
					this.exportDeck(); break
				case 'delete':
					this.deleteDeck(); break
			}

			this.deckAction = ''
		},
		renderAsText () {
			if (this.$route.name === 'renderAsText') return // Vue throws an error if the app would try to go to the "Render as Text" page while already on that page, so don't let that happen.

			this.$router.push({
				name: 'renderAsText',
				params: { activeDeck: this.deck }
			})

			document.activeElement.blur() // This is needed so that the browser focus doesn't remain on the Deck Actions select menu when using the keyboard.
		},
		duplicateDeck () {
			const sourceDeck = this.deck

			let dupDeckName = prompt(
				'Give a new name for the duplicate deck:',
				this.amendCopiedDeckName(sourceDeck).name
			)

			if (dupDeckName) {
				dupDeckName = dupDeckName.trim()
			}
			if (dupDeckName) { // Check for a string existing again after having trimmed it.
				const dupDeckPath = this.stringToPath(dupDeckName)

				if (dupDeckPath === this.$route.params.deckPath) {
					alert(this.alertNameExists(dupDeckName))

					this.copyDeck(sourceDeck)
				} else if (this.nameIsApproved(dupDeckName, dupDeckPath)) {
					const copiedDeck = JSON.parse(JSON.stringify(sourceDeck)) // The technique for deep-cloning objects, which is necessary here.
					const newData = {
						name: dupDeckName,
						path: dupDeckPath
					}

					this.storeCopiedDeckAndRedirect(copiedDeck, newData)
				} else {
					this.copyDeck(sourceDeck)
				}
			}
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
