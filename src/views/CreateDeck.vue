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
						v-model.trim="deckNameInput"
						minlength="1"
						maxlength="50"
						ref="focus"
						autocomplete="off"
					/>
					<button>Start</button>
				</form>
			</div>
			<div class="import-data">
				<h3>Import Decks</h3>
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
			deckNameInput: '',
			fileName: '',
			formatVer: 0
		}
	},
	computed: {
		fileInput () {
			return document.getElementById('data-file')
		}
	},
	mounted () {
		this.hideFileInput()
	},
	methods: {
		/**
		 * Hide the file input element and make the Open File button gain its functionality.
		 */
		hideFileInput () {
			const openFileButton = document.getElementById('file-btn')

			openFileButton.addEventListener('click', () => {
				this.fileInput.click()
			})
			this.fileInput.addEventListener('change', this.loadFile)
		},
		submitDeckName () {
			let name = this.deckNameInput

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
					sortBy: '',
					viewedCard: ''
				})

				this.$store.commit('decks', updatedDecksArray)
				this.goToDeckPage(path)
			}
		},
		loadFile () {
			const file = this.fileInput.files[0]

			if (file) {
				const fileReader = new FileReader()

				fileReader.readAsText(file)

				fileReader.onload = () => {
					const data = JSON.parse(fileReader.result)
					this.fileName = file.name
					this.formatVer = this.determineDataFormat(data)

					if (this.formatVer === 2) {
						this.handleFormatVer2(data)
					} else if (this.formatVer === 1) {
						this.handleFormatVer1(data)
					} else {
						// Clear the deck file input in case the user tries to load a file of the same name again.
						this.fileInput.value = null
					}
				}
			}
		},
		determineDataFormat (data) {
			try {
				if (data.decks) { // If the data is the new form of data, which includes a `decks` array containing any number of deck objects...
					return 2
				} else if (data.name && data.path && data.cards) { // Else if the data is the old form of data, which has the properties of only a singular deck...
					return 1
				} else {
					throw new SyntaxError()
				}
			} catch (error) {
				if (error instanceof SyntaxError) {
					const deckExtRegex = /\.deck$/i

					if (deckExtRegex.test(this.fileName)) {
						this.alertFileImportError(this.fileName)
					} else {
						alert(
							`⚠ File Import Error\n\nThe file you’ve selected (${this.fileName}) is not a deck data file for MTG Deck Builder. Deck data files are in the “.deck” file format.`
						)
					}
				} else {
					alert(error)
					throw error
				}

				return 0
			}
		},
		handleFormatVer2 (data) {
			const decks = data.decks

			if (decks.length > 0) {
				let numExistingDecks = 0
				let existingDeckName = ''
				let firstAmendedDeckName = ''

				for (let i = 0; i < decks.length; i++) {
					const deck = decks[i]

					if (this.$store.getters.deckExists(deck.path)) {
						numExistingDecks++
						existingDeckName = deck.name

						const amendedDeck = this.amendCopiedDeckName(deck)

						if (numExistingDecks === 1) {
							firstAmendedDeckName = amendedDeck.name
						}

						deck.name = amendedDeck.name
						deck.path = amendedDeck.path
						deck.editDate = new Date()
					}

					this.createImportedDeck(deck)

					if (i === decks.length - 1) {
						this.$nextTick(() => {
							this.goToDeckPage(decks[0].path) // Go to the deck page of the first alphabetically listed deck.
						})
					}
				}

				if (numExistingDecks === 1) {
					this.alertSingleExistingDeck(existingDeckName, firstAmendedDeckName)
				} else if (numExistingDecks > 1) {
					alert(
						`There are ${numExistingDecks} decks you’re importing that have the same names as decks you already have, so those imported decks are going to be renamed as if they were copies.\n\nFor example, the imported “${existingDeckName}” is going to be named “${decks[decks.length - 1].name}” instead.`
					)
				}
			} else {
				this.alertFileImportError(this.fileName)
			}
		},
		handleFormatVer1 (data) {
			const deck = data

			if (this.$store.getters.deckExists(deck.path)) {
				const amendedDeckData = this.amendCopiedDeckName(deck)

				this.alertSingleExistingDeck(deck.name, amendedDeckData.name)
				this.storeCopiedDeckAndRedirect(deck, amendedDeckData)
			} else {
				this.createImportedDeck(deck)

				this.$nextTick(() => {
					this.goToDeckPage(deck.path)
				})
			}
		},
		createImportedDeck (deck) {
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

			this.$store.commit('decks', updatedDecksArray)
		},
		alertSingleExistingDeck (existingName, importingName) {
			alert(
				`Because you already have a deck named “${existingName},” the deck you’re importing with that same name is going to be renamed “${importingName}.”`
			)
		},
		alertFileImportError (fileName) {
			alert(
				`⚠ File Import Error\n\nSorry, no deck could be imported from the deck data file you’ve selected (${fileName}) because the file’s data is invalid or corrupted.`
			)
		},
		goToDeckPage (path) {
			this.$store.commit('sortDeckMenu')

			this.$router.push({
				name: 'deckMain',
				params: { deckPath: path }
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-create-deck.scss';
</style>
