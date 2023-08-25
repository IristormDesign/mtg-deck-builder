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
			setTimeout(() => {
				switch (this.deckAction) {
					case 'copy':
						this.copyDeck(this.deck); break
					case 'export':
						this.exportDeck(this.deck); break
					case 'delete':
						this.deleteDeck(this.deck); break
				}

				this.deckAction = ''
			}, 1)
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
			this.$router.push({
				name: 'deleteDecks',
				params: { presetDeckName: deck.name }
			})
		},
		exportDeck (deck) {
			const toExportConfirmed = confirm(`Export a deck data file of “${deck.name}”?`)

			if (toExportConfirmed) {
				const deckData = JSON.stringify(deck)
				const transitoryLink = document.createElement('a')

				transitoryLink.style.display = 'none'
				transitoryLink.setAttribute('href', `data:text/plain;charset=utf-8,${deckData}`)
				transitoryLink.setAttribute('download', `${deck.name}.deck`)

				document.body.appendChild(transitoryLink)
				transitoryLink.click()
				document.body.removeChild(transitoryLink)
			}
		}
	}
}
</script>
