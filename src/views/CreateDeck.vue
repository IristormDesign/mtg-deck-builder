<template>
	<article class="create-deck-page content-box">
		<h2>Create Deck</h2>

		<div class="intro">
			<figure>
				<img class="intro-illustration" src="~@/img/terramorphic-expanse.jpg" width="626" height="457" alt="An illustration of a landscape magically transforming into various types of terrain" />
				<figcaption>Illustration: <i><a href="https://scryfall.com/card/j25/156/terramorphic-expanse" target="_blank">Terramorphic Expanse</a></i> by Alayna Danner</figcaption>
			</figure>
			<p>Create a deck in two ways: Either start from a new, empty deck page and add cards to it, or reproduce the decks from a deck archive file you may have. <router-link to="/manual/#create-deck">(More info&hellip;)</router-link></p>
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-558.61 335.74-414.62l34.31 34.57 84.82-84.82v194.1h50.26v-194.1l84.82 84.82 34.31-34.57L480-558.61ZM190.26-660.36v457.79q0 5.39 3.46 8.85t8.85 3.46h554.86q5.39 0 8.85-3.46t3.46-8.85v-457.79H190.26ZM205.64-140q-25.7 0-45.67-19.97Q140-179.94 140-205.64v-479q0-10.61 3.37-20.53 3.37-9.91 10.12-18.29l57.23-72.8q8.36-11.1 21.42-17.42Q245.2-820 259.8-820h439.22q14.6 0 27.85 6.32 13.26 6.32 21.62 17.42l58.02 73.57q6.75 8.37 10.12 18.48Q820-694.1 820-683.49v477.85q0 25.7-19.97 45.67Q780.06-140 754.36-140H205.64Zm.64-570.61h546.39l-44.78-54.9q-1.93-1.93-4.43-3.08-2.5-1.15-5.19-1.15H260.59q-2.69 0-5.32 1.15-2.63 1.15-4.29 3.08l-44.7 54.9ZM480-425.31Z"/></svg>
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

			openFileButton.addEventListener(
				'click', () => {
					this.fileInput.click()
				}
			)
			this.fileInput.addEventListener(
				'change', this.loadFile
			)
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
