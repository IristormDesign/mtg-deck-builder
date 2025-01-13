<template>
	<article class="create-deck-page content-box">
		<h2>Create Deck</h2>

		<div class="intro">
			<figure>
				<img class="intro-illustration" src="~@/img/terramorphic-expanse.jpg" width="626" height="457" alt="An illustration of a landscape magically transforming into various types of terrain" />
				<figcaption>Illustration: <i><a href="https://scryfall.com/card/j25/156/terramorphic-expanse" target="_blank">Terramorphic Expanse</a></i> by Alayna Danner</figcaption>
			</figure>
			<p>You can create a deck in two ways: Either start from a new, empty deck page and add cards to it, or reproduce pre-made decks from a deck archive file you may have. <router-link to="/manual/#create-deck">(More info&hellip;)</router-link></p>
		</div>
		<div class="columns">
			<div class="new-deck">
				<h3>New Deck</h3>
				<form @submit.prevent="submitDeckName()">
					<label for="deck-name">Give your deck a name:</label>
					<input
						id="deck-name"
						type="text"
						v-model="deckNameInput"
						ref="focus"
						autocomplete="off"
					/>
					<div class="button-container">
						<button>
							Start
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M665.08-450H180v-60h485.08L437.23-737.85 480-780l300 300-300 300-42.77-42.15L665.08-450Z"/></svg>
						</button>
					</div>
				</form>
			</div>
			<div class="reproduce-decks">
				<h3>Reproduce Archived Decks</h3>
				<input
					id="archive-file"
					type="file" accept=".deck"
					style="display: none"
				/>
				<div class="button-container">
					<button id="file-btn">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M455.95-225.69h50.25v-193.9l82.67 82.92 35.39-35.59L480-514.62 336.82-371.18l35.33 35.13 83.8-83.54v193.9ZM242.57-100q-25.79 0-44.18-18.39T180-162.57v-634.86q0-25.79 18.39-44.18T242.57-860h337.58L780-660.15v497.58q0 25.79-18.39 44.18T717.43-100H242.57Zm312.46-536.51v-173.23H242.57q-4.62 0-8.47 3.84-3.84 3.85-3.84 8.47v634.86q0 4.62 3.84 8.47 3.85 3.84 8.47 3.84h474.86q4.62 0 8.47-3.84 3.84-3.85 3.84-8.47v-473.94H555.03ZM230.26-809.74v173.23-173.23 659.48-659.48Z"/></svg>
						Open Deck<br> Archive File
					</button>
				</div>
			</div>
		</div>
	</article>
</template>

<script>
import latestDataVersions from '@/mixins/latestDataVersions.js'
import stringMethods from '@/mixins/stringMethods.js'
import copyDeck from '@/mixins/copyDeck.js'

export default {
	mixins: [latestDataVersions, stringMethods, copyDeck],
	data () {
		return {
			deckNameInput: '',
			fileName: '',
			formatVer: 0
		}
	},
	computed: {
		fileInput () {
			return document.getElementById('archive-file')
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
				if (name.length > 50) {
					alert(this.alertNameTooLong(name.length))
					this.$refs.focus.focus()
				} else if (this.hasNoLetters(name)) {
					alert(this.alertNoLetters())
					this.$refs.focus.focus()
				} else {
					name = this.curlApostrophes(name)
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
					cards: [],
					colors: [],
					dataVersion: this.latestDeckDataVersion,
					editDate: new Date(),
					name: name,
					path: path,
					sideboard: {
						cards: [],
						viewedCard: null
					},
					sortBy: '',
					viewedCard: null
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
						/* Clear the deck file input in case the user tries to load a file of the same name again. */
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
						this.alertFileReproductionError(this.fileName)
					} else {
						alert(
							`⚠ Error\n\nThe file you’ve selected (${this.fileName}) is not a deck archive file for MTG Deck Builder. Deck archive files are in the “.deck” file format.`
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

					this.reproduceDeck(deck)

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
						`There are ${numExistingDecks} decks you’re reproducing that have the same names as decks you already have, so those reproduced decks are going to be renamed as if they were copies.\n\nFor example, the reproduced “${existingDeckName}” is going to be named “${decks[decks.length - 1].name}” instead.`
					)
				}
			} else {
				this.alertFileReproductionError(this.fileName)
			}
		},
		handleFormatVer1 (data) {
			const deck = data

			if (this.$store.getters.deckExists(deck.path)) {
				const amendedDeckData = this.amendCopiedDeckName(deck)

				this.alertSingleExistingDeck(deck.name, amendedDeckData.name)
				this.storeCopiedDeckAndRedirect(deck, amendedDeckData)
			} else {
				this.reproduceDeck(deck)

				this.$nextTick(() => {
					this.goToDeckPage(deck.path)
				})
			}
		},
		reproduceDeck (deck) {
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
		alertSingleExistingDeck (existingName, reproducedName) {
			alert(
				`Because you already have a deck named “${existingName},” the deck you’re reproducing with that same name is going to be renamed “${reproducedName}.”`
			)
		},
		alertFileReproductionError (fileName) {
			alert(
				`⚠ Error\n\nSorry, no deck could be reproduced from the deck archive file you’ve selected (${fileName}) because the file’s data is invalid or corrupted.`
			)
		},
		goToDeckPage (path) {
			this.$store.commit('sortDeckMenu')

			this.$router.push({
				name: 'listEditor',
				params: { deckPath: path }
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-create-deck.scss';
</style>
