<template>
	<article class="list-entry content-box">
		<h3>Card List Entry</h3>
		<template v-if="!isLoadingCards">
			<header class="intro">
				<p>Here you can add multiple card names at once to the main card group of <i>{{ deck.name }}</i>. <router-link to="/guide/card-list-entry">(More info&hellip;)</router-link></p>
			</header>
			<div class="columns">
				<form>
					<label for="card-list-entry">Enter a list of cards:</label>
					<textarea
						id="card-list-entry"
						v-model.trim="textCardList"
						ref="textCardList"
						rows="12"
						maxlength="5000"
						spellcheck="false"
					></textarea>
					<div class="button-container">
						<button @click.prevent="submitList">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M650-131v-120H530v-60h120v-120h60v120h120v60H710v120h-60ZM130-250v-60h60v60h-60Zm140 0v-60h181.85q-1.85 15.8-1.35 30.09t2.35 29.91H270ZM130-410v-60h60v60h-60Zm140 0v-60h279.08q-17.23 12.15-31.5 27.15-14.27 15-25.96 32.85H270ZM130-570v-60h60v60h-60Zm140 0v-60h480v60H270ZM130-730v-60h60v60h-60Zm140 0v-60h480v60H270Z"/></svg>
							Add Cards
						</button>
					</div>
				</form>
				<section class="rules">
					<h4>Rules for List Formatting</h4>
					<p>Have only one card name per line of the list.</p>
					<p>Begin each line with a number for the card’s quantity, and follow with the card’s name.</p>
					<p>For example:</p>
					<p><code>
						13 Mountain<br>
						1 Balefire Dragon<br>
						4 Shock
					</code></p>
					<p>Spelling matters, but letter case doesn’t.</p>
				</section>
			</div>
		</template>
		<template v-else>
			<p>Loading your cards now. Please wait.</p>
			<p class="loading-percentage">
				<span v-if="loadingPercent >= 0">{{ loadingPercent }}%</span>
			</p>
		</template>

		<standard-dialog dialogID="excessiveQuantity">
			<h4>Error: Excessive Quantity</h4>
			<p>Your list has been rejected because it includes a card name with an overly huge quantity (“{{ dialogData.qty }} {{ dialogData.name }}”). The quantity of each name must be no longer than two digits.</p>
		</standard-dialog>
		<standard-dialog dialogID="tooManyCardNames">
			<p><strong>Error</strong>: Your list has too many card names. Please enter no more than 200.</p>
		</standard-dialog>
		<standard-dialog dialogID="invalidListFormat">
			<p><strong>Error</strong>: The text you’ve entered isn’t in the valid format for a card list.</p>
		</standard-dialog>
	</article>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import autosize from 'autosize'
import axios from 'axios'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import requestScryfallData from '@/mixins/requestScryfallData.js'
import removeCard from '@/mixins/removeCard.js'
import stringMethods from '@/mixins/stringMethods.js'

export default {
	components: { StandardDialog },
	mixins: [getActiveDeck, requestScryfallData, removeCard, stringMethods],
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
			hasExcessiveQuantity: false,
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
				this.$store.commit('idOfShowingDialog', {
					dialogID: 'invalidListFormat',
					variableData: {
						callback: this.focusOnTextarea
					}
				})

				return false
			} else {
				return true
			}
		},
		loadingPercent () {
			return Math.floor(
				this.numberOfNewCardsRequested / this.cardsToAdd.length * 100
			)
		},
		dialogData () {
			return this.$store.state.dialogVariableData || ''
		}
	},
	mounted () {
		autosize(this.$refs.textCardList)
	},
	beforeRouteLeave (to, from, next) {
		if (
			this.submittedCards.length > 0 ||
			this.repeatedCardNames.length > 0 ||
			this.textCardList.length < 10
		) {
			next()
		} else {
			const confirmLeave = confirm('If you leave this page, then the list you’ve entered in the submission form will be lost. Continue?')

			if (confirmLeave) {
				next()
			}
		}
	},
	methods: {
		submitList () {
			this.hasExcessiveQuantity = false

			if (!this.textCardList) {
				this.focusOnTextarea()
				return
			}

			if (!this.validateList) return

			this.parseEntries()

			if (this.hasExcessiveQuantity) return

			if (this.submittedCards.length > 200) {
				this.$store.commit('idOfShowingDialog', {
					dialogID: 'tooManyCardNames',
					variableData: {
						callback: this.focusOnTextarea
					}
				})

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
			if (
				this.cardsToAddZeroQty.length > 0 &&
				this.cardsToAdd.length === 0 &&
				this.cardsToUpdate.length === 0
			) {
				this.goToResultsPage()
			}
		},
		parseEntries () {
			const regexInvalidEntry = /^(?!(?:\s*)\d+ .+).+/gim // Any line in a multiline string that contains any characters but is NOT in the valid format for card list entries.
			this.invalidEntries = this.textCardList.match(regexInvalidEntry) || []

			const regexQuantity = /^(\d+)(?= )/i // A substring that begins with a number and ends with a space.
			const regexName = /^\d+ (.+)/i // A substring of any characters that follow the `regexQuantity` pattern.
			const regexFrontFaceName = /^\d+ (.[^/]+)(?= *\/+)/i // A substring like the `regexName` pattern, except that it ends before the first "/" (slash), while the whole string does contain at least one "/".

			this.submittedCards = [] // Clear this array in case it contains leftover data from a previous submission attempt.
			this.repeatedCardNames = []

			for (let item of this.listEntries) {
				item = item.trim()

				let qty = item.match(regexQuantity)[1]
				let name

				if (item.match(regexFrontFaceName)) {
					name = item.match(regexFrontFaceName)[1]
				} else {
					name = item.match(regexName)[1]
				}

				if (!qty && !name) break

				qty = Number(qty)
				name = this.cleanedCardName(name)

				if (qty > 99) {
					this.$store.commit('idOfShowingDialog', {
						dialogID: 'excessiveQuantity',
						variableData: {
							qty: qty,
							name: name,
							callback: this.focusOnTextarea
						}
					})

					this.hasExcessiveQuantity = true

					return
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
			}
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
				const cardIndex = this.deck.cards.findIndex(foundCard => {
					return foundCard.name.toUpperCase() === submittedCard.name.toUpperCase()
				})
				const existingCard = this.deck.cards[cardIndex]

				existingCard.qty = submittedCard.qty

				if (existingCard.qty <= 0) {
					this.removeCard(cardIndex, true)

					this.anyCardRemoved = true
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

					// this.cardRequestsAborted.push(card)
					// done()
					this.requestCardFromScryfallAPI(card, done)
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
					this.recordForResultsPage(response.data, card)

					this.assignCardData(response.data, null, card.qty)
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
							console.error(error)
							this.cardRequestOtherError.push(card)
					}
				})
				.finally(() => {
					return callback()
				})
		},
		recordForResultsPage (data, card) {
			if (data.card_faces) {
				card.name = this.cleanedCardName(data.card_faces[0].name)
				card.name2 = this.cleanedCardName(data.card_faces[1].name)
			} else {
				card.name = this.cleanedCardName(data.name)
			}

			const existingCard = this.findExistingCardByName(card.name, this.deck)

			if (existingCard) {
				this.cardsToUpdate.push(card)
				this.updateExistingQuantities()
			} else {
				this.cardsSuccessfullyAdded.push(card)
			}
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
		cleanedCardName (cardName) {
			cardName = this.removeExcessSpaces(cardName)
			cardName = this.curlApostrophes(cardName)

			return cardName
		},
		focusOnTextarea () {
			this.$refs.textCardList.focus()
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-list-entry.scss';
</style>
