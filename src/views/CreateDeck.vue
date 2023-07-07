<template>
	<article class="create-deck-page content-box">
		<h2>Create Deck</h2>
		<figure>
			<img class="intro-illustration" src="~@/img/armillary-sphere.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
			<figcaption>(Illustration: <i><a href="https://scryfall.com/card/cmr/298/armillary-sphere" target="_blank">Armillary Sphere</a></i> by Franz Vohwinkel)</figcaption>
		</figure>
		<p>You can create a deck in two ways: Either start from a new, empty deck page and add cards to it, or import a pre-made deck from a deck data file.</p>

		<div class="columns">
			<div class="new-deck">
				<h3>Start a New Deck</h3>
				<form @submit.prevent="submitDeckName()">
					<label for="deck-name">Give your deck a name:</label>
					<input
						id="deck-name"
						type="text"
						v-model="deckNameInput"
						minlength="1"
						maxlength="50"
						ref="focus"
						autocomplete="off"
					/>
					<button>Start</button>
				</form>
			</div>
			<div class="import-data">
				<h3>Import a Deck</h3>
				<input
					id="data-file"
					type="file" accept=".deck"
					style="display: none"
				/>
				<button id="file-btn">Open Deck<br> Data File</button>
			</div>
		</div>
	</article>
</template>

<script>
import stringMethods from '@/mixins/stringMethods.js'
import methodsDupDeck from '@/mixins/methodsDupDeck.js'

export default {
	mixins: [stringMethods, methodsDupDeck],
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
			let name = this.deckNameInput

			// First, clean up the submitted name.
			if (name) {
				name = name.trim()
				name = this.curlApostrophes(name)
			}
			if (name) { // If the user has submitted any name, after having trimmed any excess white space from it...
				if (this.minimumDeckNameLimit(name)) {
					this.createNewDeck(name)
				}
			} else {
				this.$refs.focus.focus()
			}
		},
		createNewDeck (name) {
			const path = this.stringToPath(name)
			const deckExists = this.$store.getters.deckExists(path)

			if (deckExists) {
				alert(this.alertNameExists(name))
			} else {
				const updatedDecksArray = this.$store.state.decks

				updatedDecksArray.push({
					name: name,
					path: path,
					cards: [],
					viewedCard: '',
					sideboard: {
						cards: [],
						viewedCard: ''
					},
					editDate: new Date(),
					colors: [],
					sortBy: 'unsorted'
				})

				this.finalizeDeckCreation(updatedDecksArray, path)
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
						const deckData = JSON.parse(fileReaderResult)
						const deckPath = deckData.path

						if (this.$store.getters.deckExists(deckPath)) {
							const dupDeckData = this.amendDupDeckName(deckData)

							alert(`⚠ Since you have another deck named “${deckData.name},” the deck you’re importing is going to be renamed “${dupDeckData[0]}.”`)

							this.storeDupDeckAndRedirect(deckData, dupDeckData)
						} else {
							const updatedDecksArray = this.$store.state.decks

							updatedDecksArray.push({
								name: deckData.name,
								path: deckPath,
								cards: deckData.cards,
								viewedCard: deckData.viewedCard,
								sideboard: deckData.sideboard,
								editDate: deckData.editDate,
								colors: deckData.colors,
								sortBy: deckData.sortBy
							})

							this.finalizeDeckCreation(updatedDecksArray, deckPath)
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
					const deckExtRegex = /\.deck$/i
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
		},
		finalizeDeckCreation (updatedDecksArray, deckPath) {
			this.$store.commit('setDecks', updatedDecksArray)
			this.$store.commit('sortDeckMenu')

			this.$router.push({
				name: 'deckMain',
				params: { deckPath: deckPath }
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-create-deck.scss';
</style>
