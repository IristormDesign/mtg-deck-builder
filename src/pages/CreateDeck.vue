<template>
	<article class="content-box">
		<h2>Create Deck</h2>
		<p>To create a deck, you can either start on an empty deck page and add any cards you want, or import a deck data file (if you have one) to see a pre-made deck.</p>

		<div class="columns">
			<form @submit.prevent="submitDeckName()">
				<h3>Start a New Deck</h3>
				<label for="deck-name">Give a name for your deck:</label>
				<input
					id="deck-name"
					ref="focus"
					type="text"
					v-model="deckNameInput"
				/>
				<button class="primary-btn">Go</button>
			</form>

			<p><em>—or—</em></p>

			<form @submit.prevent="importDeckData()">
				<h3>Import Deck Data</h3>
				<label for="data-file">Select a deck data file:</label>
				<input
					id="data-file"
					type="file" accept=".json"
				/>
				<button class="primary-btn">Import</button>
			</form>
		</div>
	</article>
</template>

<script>
export default {
	data () {
		return {
			deckNameInput: ''
		}
	},
	mounted () {
		this.$refs.focus.focus()
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
			const importedFile = document.getElementById('data-file').files[0]

			if (importedFile) {
				const fileReader = new FileReader()

				fileReader.readAsText(importedFile)
				fileReader.onload = () => {
					const fileReaderResult = fileReader.result

					if (isValidJSON(fileReaderResult)) {
						const store = this.$store
						const deckData = JSON.parse(fileReaderResult)
						const updatedDecksArray = store.state.decks

						if (store.getters.existingDeck(deckData.path)) {
							const importedDeckName = deckData.name

							const copySuffixRegex = new RegExp(/\(\d+\)$/, 'g') // A string that ends with `(N)`, where N is any number.
							let dupDeckName = importedDeckName
							let dupDeckPath

							const makeUniqueDeckName = (copyNum) => {
								dupDeckPath = store.state.stringToPath(dupDeckName)

								if (store.getters.existingDeck(dupDeckPath)) {
									copyNum++

									dupDeckName = dupDeckName.replace(
										copySuffixRegex, `(${copyNum})`
									)
									makeUniqueDeckName(copyNum)
								}
							}

							if (copySuffixRegex.test(importedDeckName)) { // If the deck name has the copy suffix...
								const suffix = importedDeckName.match(copySuffixRegex) // From the deck name, get the copy suffix alone.
								let copyNum = suffix[0].match(/\d+/) // From the suffix, get the number alone.

								copyNum = Number(copyNum[0]) + 1 // Convert `copyNum[0]` from a string into a number type, then increase it by 1.

								dupDeckName = dupDeckName.replace(
									copySuffixRegex, `(${copyNum})`
								)
								makeUniqueDeckName(copyNum)
							} else {
								dupDeckName += ' (2)'
								makeUniqueDeckName(2)
							}

							const updatedDecksArray = store.state.decks

							updatedDecksArray.push({
								name: dupDeckName,
								path: dupDeckPath,
								cards: deckData.cards,
								editDate: new Date(),
								viewedCard: deckData.viewedCard
							})
							store.commit('setDecks', updatedDecksArray)
							store.commit('sortDeckMenu')

							alert(`⚠ Since you already have another deck named “${importedDeckName},” the deck you’re importing is going to be renamed “${dupDeckName}” instead.`)

							store.state.decks.find((deck) => {
								if (deck.name === dupDeckName) {
									this.$router.push({
										name: 'deck',
										params: { deckPath: deck.path }
									})
								}
							})
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
					}

					function isValidJSON (text) {
						try {
							JSON.parse(text)
							return true
						} catch (error) {
							if (error instanceof SyntaxError && importedFile.type === 'application/json') {
								alert('⚠ File Import Error\n\nSorry, the deck data file you’ve selected couldn’t be imported because the data in it is invalid or corrupted.')
							} else if (error instanceof SyntaxError) {
								alert(`⚠ File Import Error\n\nThe file you’ve selected (${importedFile.name}) is not a deck data file for MTG Deck Builder. Deck data files are in the JSON file format.`)
							} else {
								alert(error)
								throw error
							}
							return false
						}
					}
				}
			}
		}
	}
}
</script>
