<template>
	<article class="create-deck-page content-box">
		<h2>Create Deck</h2>
		<img class="intro-illustration" src="~@/img/armillary-sphere.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
		<p>To create a deck, either you can start on an empty deck page and add cards as you want, or you can import a deck data file to load a pre-made deck.</p>

		<div class="columns">
			<div class="new-deck">
				<h3>Start a New Deck</h3>
				<form @submit.prevent="submitDeckName()">
					<label for="deck-name">Give your deck a name:</label>
					<input
						id="deck-name"
						type="text"
						v-model="deckNameInput"
						required="required"
						maxlength="50"
					/>
					<button class="primary-btn">Submit</button>
				</form>
			</div>
			<div class="import-data">
				<h3>Import a Deck</h3>
				<input
					id="data-file"
					type="file" accept=".deck"
					style="display: none"
				/>
				<button id="file-btn" class="primary-btn">Open Deck<br> Data File</button>
			</div>
		</div>
		<small>(Illustration: <i><a href="https://scryfall.com/card/cmr/298/armillary-sphere" target="_blank" rel="noopener noreferrer">Armillary Sphere</a></i> by Franz Vohwinkel)</small>
	</article>
</template>

<script>
import { methodsDupDeck } from '@/mixins/methodsDupDeck.js'

export default {
	mixins: [methodsDupDeck],
	data () {
		return {
			deckNameInput: ''
		}
	},
	mounted () {
		// Hide the file input element and make the Open File button gain its functionality.
		const openFileButton = document.getElementById('file-btn')
		const fileInput = document.getElementById('data-file')

		openFileButton.addEventListener('click', () => {
			fileInput.click()
		}, false)
		fileInput.addEventListener('change', this.importDeckData, false)
	},
	methods: {
		submitDeckName () {
			const store = this.$store
			let name = this.deckNameInput

			// First edit the given name to remove any excess white space.
			if (name) {
				name = name.trim()
				name = store.state.curlApostrophes(name)
			}
			if (name) { // If the user entered any name...
				const path = store.state.stringToPath(name)
				const deckExists = store.getters.existingDeck(path)

				if (deckExists) {
					alert(store.state.alertNameExists(name))
				} else if (name.length > 50) {
					alert(store.state.alertNameTooLong)
				} else {
					const updatedDecksArray = store.state.decks

					updatedDecksArray.push({
						name: name,
						path: path,
						cards: [],
						editDate: new Date(),
						viewedCard: ''
					})
					store.commit('setDecks', updatedDecksArray)
					store.commit('sortDeckMenu')

					this.$router.push({
						name: 'deck',
						params: { deckPath: path }
					})
				}
			} else {
				this.$refs.focus.focus()
			}
		},
		importDeckData () {
			const fileInputEl = document.getElementById('data-file')
			const importedFile = fileInputEl.files[0]

			if (importedFile) {
				const fileReader = new FileReader()

				fileReader.readAsText(importedFile)
				fileReader.onload = () => {
					const fileReaderResult = fileReader.result

					if (this.isValidDeckData(importedFile, fileReaderResult)) {
						const store = this.$store
						const deckData = JSON.parse(fileReaderResult)
						const updatedDecksArray = store.state.decks

						if (store.getters.existingDeck(deckData.path)) {
							const dupDeckData = this.fixDupDeckName(store, deckData)
							const dupDeckName = dupDeckData[0]
							const dupDeckPath = dupDeckData[1]

							updatedDecksArray.push({
								name: dupDeckName,
								path: dupDeckPath,
								cards: deckData.cards,
								editDate: new Date(),
								viewedCard: deckData.viewedCard
							})
							store.commit('setDecks', updatedDecksArray)
							store.commit('sortDeckMenu')

							alert(`⚠ Since you already have another deck named “${deckData.name},” the deck you’re importing is going to be renamed “${dupDeckName}” instead.`)

							this.redirectToDupDeckPage(store, dupDeckName)
						} else {
							updatedDecksArray.push({
								name: deckData.name,
								path: deckData.path,
								cards: deckData.cards,
								editDate: deckData.editDate,
								viewedCard: deckData.viewedCard
							})
							store.commit('setDecks', updatedDecksArray)
							store.commit('sortDeckMenu')

							this.$router.push({
								name: 'deck',
								params: { deckPath: deckData.path }
							})
						}
					} else {
						// Clear the deck file input in case the user tries to load a file of the same name again.
						fileInputEl.value = null
					}
				}
			}
		},
		isValidDeckData (file, string) {
			try {
				const deckData = JSON.parse(string)

				if (
					deckData.name && deckData.path && deckData.cards && deckData.editDate
				) {
					return true
				} else {
					throw new SyntaxError()
				}
			} catch (error) {
				if (error instanceof SyntaxError) {
					const deckExtRegex = new RegExp(/\.deck$/, 'i')
					const fileName = file.name

					if (deckExtRegex.test(fileName)) {
						alert(`⚠ File Import Error\n\nSorry, the deck data file you’ve selected (${fileName}) couldn’t be imported because the data contained in it is invalid or corrupted.`)
					} else {
						alert(`⚠ File Import Error\n\nThe file you’ve selected (${fileName}) is not a deck data file for MTG Deck Builder. Deck data files are in the “.deck” file format.`)
					}
				} else {
					alert(error)
					throw error
				}

				return false
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-create-deck.scss';
</style>
