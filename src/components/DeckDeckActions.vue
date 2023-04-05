<template>
	<div class="deck-actions">
		<form>
			<label for="deckActionSelect">Deck actions:</label>
			<select v-model="deckAction" @change="doDeckAction()" id="deckActionSelect">
				<option value="">(Select)</option>
				<option value="copy">Copy</option>
				<option value="export">Export</option>
				<option value="delete">Delete</option>
			</select>
		</form>
	</div>
</template>

<script>
import methodsDupDeck from '@/mixins/methodsDupDeck.js'

export default {
	mixins: [methodsDupDeck],
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
		copyDeck (srcDeck) {
			const toCopyConfirmed = confirm(`Create a new deck that’s a duplicate of “${srcDeck.name}”?`)

			if (toCopyConfirmed) {
				const dupDeckData = this.amendDupDeckName(srcDeck)
				const dupDeck = JSON.parse(JSON.stringify(srcDeck)) // Technique for deep-cloning objects, which is necessary here.

				this.storeDupDeckAndRedirect(dupDeck, dupDeckData)
			}
		},
		deleteDeck (deck) {
			const store = this.$store
			const deckName = deck.name
			const deletionConfirmed = confirm(`Are you sure you want to permanently delete this deck, “${deckName}”?`)

			if (deletionConfirmed) {
				const remainingDecks = store.state.decks.filter(
					deck => deck.name !== deckName
				)
				this.$nextTick(() => {
					store.commit('setDecks', remainingDecks)
				})
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
