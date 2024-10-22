<template>
	<article class="list-entry content-box">
		<h3>Card List Entry</h3>
		<template v-if="!isLoadingCards">
			<p>Here you can add multiple cards at once to this deck’s main card group.</p>
			<div class="columns">
				<section class="rules">
					<h4>Rules for List Formatting</h4>
					<p>Have only one card name per line of the list.</p>
					<p>Each line must begin with a number for the card’s quantity, and follow with the card’s name. For example:</p>
					<p><code>
						13 Mountain<br>
						1 Balefire Dragon<br>
						4 Shock
					</code></p>
					<p>Spelling matters, but letter case doesn’t.</p>
				</section>
				<form>
					<label for="card-list-entry">Enter a list of cards:</label>
					<textarea
						class="textarea-card-list"
						id="card-list-entry"
						v-model.trim="textCardList"
						ref="textCardList"
						rows="10"
						cols="36"
						maxlength="5000"
						spellcheck="false"
					></textarea><!-- The `cols` property is set to fit a list entry with the card name "Okina, Temple to the Grandfathers" (the longest name of a non-joke card), plus one extra character. -->
					<div class="button-container">
						<button @click.prevent="submitList">Add Cards</button>
					</div>
				</form>
			</div>
		</template>
		<template v-else>
			<p>Loading your cards now. Please wait.</p>
			<p class="loading-percentage"><span>{{ loadingPercent }}%</span></p>
		</template>
	</article>
</template>

<script>
import autosize from 'autosize'
import axios from 'axios'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import requestScryfallData from '@/mixins/requestScryfallData.js'
import deckColors from '@/mixins/deckColors.js'
import sortingClusterGaps from '@/mixins/sortingClusterGaps.js'
import stringMethods from '@/mixins/stringMethods.js'

export default {
	mixins: [getActiveDeck, requestScryfallData, deckColors, sortingClusterGaps, stringMethods],
	data () {
		return {
			anyCardRemoved: false,
			cardRequestsAborted: [],
			cardRequestInvalid: [],
			cardRequestOtherError: [],
			cardsSuccessfullyAdded: [],
			cardsToAdd: [],
			cardsToAddZeroQty: [],
			cardsToUpdate: [],
			invalidCardNames: [],
			invalidEntries: [],
			invalidQuantities: [],
			isLoadingCards: false,
			numberOfNewCardsRequested: 0,
			repeatedCardNames: [],
			submittedCards: [],
			textCardList: ''
		}
	},
	computed: {
		listEntries () {
			const regexValidEntry = /^(?:\s*)\d+ .+/gim // Any line in a multiline string beginning with a number, then a space, then any other characters. The line may begin with any number of whitespace characters.

			return this.textCardList.match(regexValidEntry)
		},
		validateList () {
			if (!this.listEntries) {
				this.alertInvalidList()
				return false
			} else {
				return true
			}
		},
		loadingPercent () {
			return Math.floor(
				this.numberOfNewCardsRequested / this.cardsToAdd.length * 100
			)
		}
	},
	mounted () {
		autosize(this.$refs.textCardList)

		this.$refs.textCardList.focus()
	},
	methods: {
		submitList () {
			if (!this.textCardList) {
				this.$refs.textCardList.focus()
				return
			}

			if (!this.validateList) return

			this.parseEntries()

			if (this.submittedCards.length > 200) {
				this.tooManyCards()
				return
			}

			this.determineNewOrExistingCardNames()

			if (this.cardsToAdd.length > 0) {
				this.addNewCardsToDeck()
				this.isLoadingCards = true
			}
			if (this.cardsToUpdate.length > 0) {
				this.updateExistingQuantities()
				this.isLoadingCards = true
			}
		},
		parseEntries () {
			const regexInvalidEntry = /^(?!(?:\s*)\d+ .+).+/gim // Any line in a multiline string that contains any characters but is NOT in the valid format for card list entries.
			this.invalidEntries = this.textCardList.match(regexInvalidEntry) || []

			const regexQuantity = /^(\d+)(?= )/i // A substring that begins with a number and ends with a space.
			const regexName = /^\d+ (.+)/i // A substring of any characters that follow the `regexQuantity` pattern.

			this.submittedCards = [] // Clear this array in case it contains leftover data from a previous submission attempt.

			this.listEntries.forEach(item => {
				item = item.trim()

				let qty = item.match(regexQuantity)[1]
				let name = item.match(regexName)[1]

				if (!qty && !name) return

				qty = Number(qty)
				name = this.cleanedCardName(name)

				if (qty > 99) {
					qty = 99
				}

				const existingNameInAddList = this.submittedCards.find(existingCard =>
					existingCard.name.toUpperCase() === name.toUpperCase()
				)

				if (existingNameInAddList) {
					this.repeatedCardNames.push({
						qty: qty,
						name: name
					})
				} else {
					this.submittedCards.push({
						qty: qty,
						name: name
					})
				}
			})
		},
		tooManyCards () {
			alert('⚠ Error: Your list has too many card names. Please enter no more than 200.')

			this.$refs.textCardList.focus()
		},
		determineNewOrExistingCardNames () {
			this.submittedCards.forEach(card => {
				const existingCard = this.findExistingCardByName(card.name, this.deck)

				if (existingCard) {
					card.name = existingCard.name
					card.name2 = existingCard.name2

					this.cardsToUpdate.push(card)
				} else if (card.qty <= 0) {
					this.cardsToAddZeroQty.push(card)
				} else {
					this.cardsToAdd.push(card)
				}
			})
		},
		updateExistingQuantities () {
			this.cardsToUpdate.forEach(submittedCard => {
				const cardToUpdate = this.deck.cards.find(existingCard =>
					existingCard.name.toUpperCase() === submittedCard.name.toUpperCase()
				)

				cardToUpdate.qty = submittedCard.qty

				if (cardToUpdate.qty <= 0) {
					this.removeCard(submittedCard)
				}
			})

			this.$store.commit('decks', this.$store.state.decks)

			if (this.cardsToAdd.length === 0) {
				this.goToResultsPage()
			}
		},
		addNewCardsToDeck () {
			this.cardsToAdd.forEach((card, index) => {
				setTimeout(() => {
					const done = () => {
						this.numberOfNewCardsRequested++

						if (this.numberOfNewCardsRequested === this.cardsToAdd.length) {
							this.goToResultsPage()
						}
					}

					this.requestCardFromScryfallAPI(card, done)
					// this.cardRequestOtherError.push(card)
					// done()
				}, ((index + 1) * 125))
			})
		},
		requestCardFromScryfallAPI (card, callback) {
			console.info(`Card named "${card.name}" requested with Scryfall API`)

			const urlEncodedQuery = card.name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

			axios
				.get(
					`https://api.scryfall.com/cards/named?fuzzy=${urlEncodedQuery}`,
					{ timeout: 8000 }
				)
				.then(response => {
					const data = response.data

					this.assignCardData(data)

					const convertSubmittedNameToRealName = () => {
						if (data.card_faces) {
							const dataFace1 = data.card_faces[0]
							const dataFace2 = data.card_faces[1]

							return `${this.cleanedCardName(dataFace1.name)} // ${this.cleanedCardName(dataFace2.name)}`
						} else {
							return this.cleanedCardName(data.name)
						}
					}

					card.name = convertSubmittedNameToRealName(card.name)

					this.cardsSuccessfullyAdded.push(card)
				})
				.catch(error => {
					switch (error.code) {
						case 'ECONNABORTED':
							this.cardRequestsAborted.push(card)
							break
						case 'ERR_BAD_REQUEST':
							this.cardRequestInvalid.push(card)
							break
						default:
							this.cardRequestOtherError.push(card)
					}
				})
				.finally(() => {
					return callback()
				})
		},
		alertInvalidList () {
			alert('⚠ Error: Invalid Card List\n\nNone of the text you’ve entered is in the valid format for a card list. See the rules for list formatting.')
		},
		goToResultsPage () {
			this.$router.replace({
				name: 'listEntryResults',
				params: {
					anyCardRemoved: this.anyCardRemoved,
					cardRequestsAborted: this.cardRequestsAborted,
					cardRequestInvalid: this.cardRequestInvalid,
					cardRequestOtherError: this.cardRequestOtherError,
					cardsSuccessfullyAdded: this.cardsSuccessfullyAdded,
					cardsToAddZeroQty: this.cardsToAddZeroQty,
					cardsToUpdate: this.cardsToUpdate,
					invalidEntries: this.invalidEntries,
					invalidQuantities: this.invalidQuantities,
					repeatedCardNames: this.repeatedCardNames
				}
			})
		},
		removeCard (cardToRemove) {
			this.deck.cards = this.deck.cards.filter(filteringCard =>
				filteringCard.name.toUpperCase() !== cardToRemove.name.toUpperCase()
			)

			if (this.$store.state.sortAttribute !== '') {
				this.addSortingClusterGaps(this.deck, this.$store.state.sortAttribute)
			}

			this.determineDeckColors()

			this.anyCardRemoved = true
		},
		cleanedCardName (cardName) {
			cardName = this.removeExcessSpaces(cardName)
			cardName = this.curlApostrophes(cardName)

			return cardName
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-list-entry.scss';
</style>
