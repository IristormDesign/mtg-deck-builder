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

export default {
	mixins: [copyDeck],
	data () {
		return {
			deckAction: ''
		}
	},
	props: {
		deck: Object
	},
	methods: {
		doDeckAction () {
			const deck = this.deck

			setTimeout(() => {
				switch (this.deckAction) {
					case 'copy':
						this.copyDeck(deck); break
					case 'export':
						this.exportDeck(deck); break
					case 'delete':
						this.deleteDeck(deck); break
				}

				this.deckAction = ''
			})
		},
		copyDeck (sourceDeck) {
			const toCopyConfirmed = confirm(
				`Do you want to create a separate deck that’s a duplicate of “${sourceDeck.name}”?`
			)

			if (toCopyConfirmed) {
				const copiedDeck = JSON.parse(JSON.stringify(sourceDeck)) // The technique for deep-cloning objects, which is necessary here.
				const newData = this.amendCopiedDeckName(sourceDeck)

				this.storeCopiedDeckAndRedirect(copiedDeck, newData)
			}
		},
		deleteDeck (deck) {
			const store = this.$store
			const deckName = deck.name
			const deletionConfirmed = confirm(`Are you sure you want to permanently delete the deck “${deckName}”?`)

			if (deletionConfirmed) {
				store.commit('setDeletedDeckName', deckName)

				this.$router.replace({ name: 'deckDeleted' })
			}
		},
		exportDeck (deck) {
			const deckName = deck.name
			const toExportConfirmed = confirm(`Export a deck data file of “${deckName}”?`)

			if (toExportConfirmed) {
				const deckData = JSON.stringify(deck)
				const transitoryLink = document.createElement('a')

				transitoryLink.style.display = 'none'
				transitoryLink.setAttribute('href', `data:text/plain;charset=utf-8,${deckData}`)
				transitoryLink.setAttribute('download', `${deckName}.deck`)

				document.body.appendChild(transitoryLink)
				transitoryLink.click()
				document.body.removeChild(transitoryLink)
			}
		}
	}
}
</script>
