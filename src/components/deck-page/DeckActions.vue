<template>
	<section class="deck-actions">
		<select
			v-model="deckAction"
			@change="doDeckAction()"
			id="deckActionSelect"
		>
			<option value="">Deck Actions ▾</option>
			<option value="duplicate">Duplicate</option>
			<option value="archive">Archive&hellip;</option>
			<option value="delete">Delete&hellip;</option>
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
				case 'duplicate':
					this.duplicateDeck(); break
				case 'archive':
					this.archiveDeck(); break
				case 'delete':
					this.deleteDeck(); break
			}

			this.deckAction = ''
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
		archiveDeck () {
			this.$router.push({
				name: 'archiveDecks',
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
