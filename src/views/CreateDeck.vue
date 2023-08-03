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
import copyDeck from '@/mixins/copyDeck.js'

export default {
	mixins: [stringMethods, copyDeck],
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
		})
		fileInput.addEventListener('change', this.importDeckData)
	},
	methods: {
		submitDeckName () {
			let name = this.deckNameInput.trim()

			if (name.length > 0) { // If the user has submitted any name, after having trimmed any excess white space from it...
				name = this.curlApostrophes(name)
				this.createNewDeck(name)
			} else {
				this.$refs.focus.focus()
			}
		},
		createNewDeck (name) {
			const path = this.stringToPath(name)
			const store = this.$store
			const deckExists = store.getters.deckExists(path)

			if (deckExists) {
				alert(this.alertNameExists(name))
			} else {
				const updatedDecksArray = store.state.decks

				updatedDecksArray.push({
					cards: [],
					colors: [],
					dataVersion: store.state.latestDeckDataVersion,
					editDate: new Date(),
					name: name,
					path: path,
					sideboard: {
						cards: [],
						viewedCard: ''
					},
					sortBy: 'unsorted',
					viewedCard: ''
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
						const deck = JSON.parse(fileReaderResult)

						if (this.$store.getters.deckExists(deck.path)) {
							const amendedDeckData = this.amendCopiedDeckName(deck)

							alert(`⚠ Since you have another deck named “${deck.name},” the deck you’re importing is going to be renamed “${amendedDeckData.name}.”`)

							this.storeCopiedDeckAndRedirect(deck, amendedDeckData)
						} else {
							const updatedDecksArray = this.$store.state.decks

							updatedDecksArray.push({
								cards: deck.cards,
								colors: deck.colors,
								dataVersion: deck.dataVersion,
								editDate: deck.editDate,
								name: deck.name,
								path: deck.path,
								sideboard: deck.sideboard,
								sortBy: deck.sortBy,
								viewedCard: deck.viewedCard
							})

							this.finalizeDeckCreation(updatedDecksArray, deck.path)
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

				if (deckData.name && deckData.path && deckData.cards) {
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
