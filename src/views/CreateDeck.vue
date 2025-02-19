<template>
	<article class="create-deck-page content-box">
		<h2>Create Deck</h2>

		<div class="intro">
			<figure>
				<img class="card-illustration" src="~@/img/terramorphic-expanse.jpg" width="626" height="457" alt="An illustration of a landscape magically transforming into various types of terrain" />
				<figcaption>Illustration from <i><a href="https://scryfall.com/card/j25/156/terramorphic-expanse" target="_blank">Terramorphic Expanse</a></i> by Alayna Danner</figcaption>
			</figure>
			<p>Create a deck in two ways: Either start from a new, empty deck page and add cards to it, or replicate the pre-constructed decks from a deck archive file. <router-link to="/guide/create-deck">(More info&hellip;)</router-link></p>
		</div>
		<div class="columns">
			<div class="new-deck">
				<h3>New Deck</h3>
				<form @submit.prevent="submitDeckName()">
					<label for="deck-name">Give your deck a name:</label>
					<input
						autocomplete="off"
						id="deck-name"
						@input="checkDeckNameLength()"
						maxlength="50"
						ref="deckNameInput"
						type="text"
						v-model="deckNameInput"
					/>
					<div class="button-container">
						<button :disabled="deckNameInput.length === 0">
							Start
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M665.08-450H180v-60h485.08L437.23-737.85 480-780l300 300-300 300-42.77-42.15L665.08-450Z"/></svg>
						</button>
					</div>
				</form>
			</div>
			<div class="replicate-decks">
				<h3>Replicate Archived Decks</h3>
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
		<dialogs-deck-name :deckName="deckNameInput" />
		<standard-dialog dialogID="errorWrongFile">
			<h4>Error: Wrong File</h4>
			<p>The file you’ve selected ({{this.fileName}}) isn’t a deck archive for MTG Deck Builder. Deck archive files have the “.deck” file extension.</p>
		</standard-dialog>
		<standard-dialog dialogID="errorCorruptedData">
			<h4>Error: Corrupted Data</h4>
			<p>Sorry, no deck could be replicated from the archive file you’ve selected ({{fileName}}). That file’s data has been somehow corrupted.</p>
		</standard-dialog>
		<standard-dialog dialogID="singleExistingDeck">
			<p>Because you already have a deck named <i>{{existingDeckName}}</i>, the archived deck you’re replicating with that same name is going to be renamed <span class="no-text-break"><i>{{firstAmendedDeckName}}</i></span>.</p>
		</standard-dialog>
		<standard-dialog dialogID="multipleExistingDecks">
			<p>There are archived decks you’re replicating that share the same names as decks you already have. To make each name unique, the replicated decks are going to be slightly renamed as if they were duplicates.</p>
		</standard-dialog>
	</article>
</template>

<script>
import DialogsDeckName from '@/components/DialogsDeckName.vue'
import StandardDialog from '@/components/StandardDialog.vue'
import latestDataVersions from '@/mixins/latestDataVersions.js'
import stringMethods from '@/mixins/stringMethods.js'
import sortDeckMenu from '@/mixins/sortDeckMenu.js'
import copyDeck from '@/mixins/copyDeck.js'

export default {
	components: { DialogsDeckName, StandardDialog },
	mixins: [latestDataVersions, stringMethods, sortDeckMenu, copyDeck],
	data () {
		return {
			deckNameInput: '',
			existingDeckName: '',
			fileName: '',
			firstAmendedDeckName: '',
			parsedJSON: {}
		}
	},
	computed: {
		fileInput () {
			return document.getElementById('archive-file')
		}
	},
	watch: {
		'$store.state.idOfShowingDialog' (curID, prevID) {
			if (
				curID === null && (
					prevID === 'singleExistingDeck' ||
					prevID === 'multipleExistingDecks'
				)
			) { // Once the user closes the opened dialog...
				this.goToDeckPage(this.parsedJSON.decks[0].path)
			}
		}
	},
	mounted () {
		this.hideFileInput()
	},
	methods: {
		checkDeckNameLength () {
			if (this.deckNameInput.length >= 50) {
				this.$store.commit('idOfShowingDialog', 'nameIsTooLong')
			}
		},
		/**
		 * Hide the file input element and make the Open File button gain its functionality.
		 */
		hideFileInput () {
			const openFileButton = document.getElementById('file-btn')

			openFileButton.addEventListener('click', () => {
				this.fileInput.click()
			})
			this.fileInput.addEventListener('change',
				this.loadFile
			)
		},
		submitDeckName () {
			const name = this.curlApostrophes(this.deckNameInput.trim()) // String trimming should happen here instead of in the component template. Otherwise, the dialog warning about overly long deck names won't appear if the deck name string begins with one or more spaces.
			const path = this.stringToPath(name)

			if (!this.hasLetterOrDigit(name)) {
				this.$store.commit('idOfShowingDialog', 'missingLetterOrDigit')
			} else if (this.deckExists(path)) {
				this.$store.commit('idOfShowingDialog', 'deckNameExists')
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

			if (!file) return

			this.fileName = file.name
			const fileReader = new FileReader()

			fileReader.readAsText(file)
			fileReader.onload = () => {
				if (!/\.deck$/i.test(this.fileName)) { // If the loaded file doesn't have the ".deck" file extension...
					this.$store.commit('idOfShowingDialog', 'errorWrongFile')
				} else {
					try {
						const data = JSON.parse(fileReader.result)
						this.parsedJSON = data

						if (data.decks) { // If the data is the new form of data, which includes a `decks` array containing any number of deck objects...
							this.handleFormatVersion2()
							return
						} else if (data.name && data.path && data.cards) { // Else if the data is the old form of data, which has the properties of only a singular deck...
							this.handleFormatVersion1()
							return
						} else {
							throw new SyntaxError()
						}
					} catch (error) {
						this.$store.commit('idOfShowingDialog', 'errorCorruptedData')
					}
				}

				/* Clear the deck file input in case the user tries to load a file of the same name again, typically after a failed file load. */
				this.fileInput.value = null
			}
		},
		handleFormatVersion2 () {
			const archDecks = this.parsedJSON.decks
			const store = this.$store

			for (let i = 0; i < archDecks.length; i++) {
				const deck = archDecks[i]

				if (this.deckExists(deck.path)) {
					this.existingDeckName = this.deckExists(deck.path).name

					const amendedDeck = this.amendCopiedDeckName(deck)

					if (i === 0) {
						this.firstAmendedDeckName = amendedDeck.name
					}

					deck.name = amendedDeck.name
					deck.path = amendedDeck.path

					this.replicateDeck(deck)

					if (archDecks.length === 1) {
						store.commit('idOfShowingDialog', 'singleExistingDeck')
					} else if (archDecks.length > 1) {
						store.commit('idOfShowingDialog', 'multipleExistingDecks')
					} else {
						store.commit('idOfShowingDialog', 'errorCorruptedData')
					}
				} else {
					this.replicateDeck(deck)

					if (
						i === archDecks.length - 1 &&
						store.state.idOfShowingDialog === null
					) {
						this.goToDeckPage(archDecks[0].path)
					}
				}
			}
		},
		handleFormatVersion1 () {
			const deck = this.parsedJSON

			if (this.deckExists(deck.path)) {
				const amendedDeckData = this.amendCopiedDeckName(deck)
				this.$store.commit('idOfShowingDialog', 'singleExistingDeck')

				this.storeCopiedDeckAndRedirect(deck, amendedDeckData)
			} else {
				this.replicateDeck(deck)

				this.$nextTick(() => {
					this.goToDeckPage(deck.path)
				})
			}
		},
		replicateDeck (deck) {
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
		goToDeckPage (path) {
			this.sortDeckMenu()

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
