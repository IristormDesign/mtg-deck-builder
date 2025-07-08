<template>
	<article class="list-entry content-box">
		<h3>Card List Entry</h3>

		<template v-if="isLoadingCards">
			<p>Loading your cards now. Please wait.</p>
			<p class="loading-percentage">
				<span v-if="loadingPercent >= 0">{{ loadingPercent }}%</span>
			</p>
		</template>
		<template v-else>
			<header class="intro">
				<p>Here you can add multiple cards at once to <i>{{ deck.name }}</i>. <router-link to="/guide/card-list-entry">(More info&hellip;)</router-link></p>
			</header>
			<div class="columns">
				<form class="list-entry-form">
					<label for="card-list-entry">Enter a list of cards:</label>
					<textarea
						id="card-list-entry"
						v-model.trim="textCardList"
						ref="textCardList"
						rows="20"
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
					<p>Spelling matters, but letter case doesn’t.</p>
					<p>By default, all cards you enter will be added to your deck’s main group.</p>
					<p>You can direct some cards to the sideboard group instead: Below the main group’s card list, enter a blank line, and then below that, enter a second card list for the sideboard.</p>
					<p>If you enter other lines of text that don’t match these formatting patterns, they’ll be ignored.</p>
					<p>Example:</p>
					<p><code>
						MAIN<br>
						4 Shock<br>
						1 Balefire Dragon<br>
						15 Mountain<br>
						<br>
						SIDEBOARD<br>
						2 Vandalblast<br>
						1 Blood Moon
					</code></p>
					<p>(The lines with the headings “MAIN” and “SIDEBOARD” have no effect on this process. The blank line between the lists is what actually distinguishes the two card groups.)</p>
				</section>
			</div>
		</template>

		<standard-dialog dialogID="excessiveQuantity">
			<h4>Error: Excessive Quantity</h4>
			<p>Your list has been rejected because it includes a card name with an overly huge quantity (“{{ dd.qty }} {{ dd.name }}”).</p>
			<p>The quantity of each name must be no longer than two digits.</p>
		</standard-dialog>
		<standard-dialog dialogID="tooManyCardNames">
			<p><strong>Error</strong>: Your list has too many card names. Please enter no more than 200.</p>
		</standard-dialog>
		<standard-dialog dialogID="invalidListFormat">
			<p><strong>Error</strong>: The text you’ve entered isn’t in the valid format for a card list.</p>
		</standard-dialog>
		<standard-dialog
			dialogID="leavingPageWarning"
			class="with-two-buttons"
		>
			<p>⚠ If you leave this page now, the card list you’ve entered in the submission form will be lost.</p>
			<form slot="form" method="dialog">
				<div class="button-container">
					<button @click="leaveWarningUserResponse = true">Leave</button>
				</div>
				<div class="button-container">
					<button
						@click="leaveWarningUserResponse = false"
						class="cancel"
						autofocus
					>Cancel</button>
				</div>
			</form>
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

const regexCardEntry = /^(?:\s*)\d+\s+.+/gim // Any line in a multiline string beginning with a number, then a space, then any other characters. The line may begin with any number of whitespace characters.

export default {
	components: { StandardDialog },
	mixins: [getActiveDeck, requestScryfallData, removeCard, stringMethods],
	data () {
		return {
			anyCardRemoved: false,
			cardRequestsAborted: [],
			cardRequestInvalid: [],
			cardRequestOtherError: [],
			cardsSuccessfullyAdded: {
				main: [], sideboard: []
			},
			cardsToAdd: {
				main: [], sideboard: []
			},
			cardsToAddZeroQty: [],
			cardsToUpdate: {
				main: [], sideboard: []
			},
			hasExcessiveQuantity: false,
			invalidCardNames: {
				main: [], sideboard: []
			},
			invalidQuantities: {
				main: [], sideboard: []
			},
			isLoadingCards: false,
			numberOfNewCardsRequested: 0,
			repeatedCardNames: {
				main: [], sideboard: []
			},
			submittedCards: {
				main: [], sideboard: []
			},
			textCardList: '',
			leaveWarningUserResponse: false
		}
	},
	computed: {
		validateList () {
			if (!this.textCardList.match(regexCardEntry)) {
				this.$store.commit('idOfShowingDialog', {
					id: 'invalidListFormat',
					data: {
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
				this.numberOfNewCardsRequested / (this.cardsToAdd.main.length + this.cardsToAdd.sideboard.length) * 100
			)
		},
		dd () {
			return this.$store.state.dialogData
		}
	},
	mounted () {
		autosize(this.$refs.textCardList)
	},
	beforeRouteLeave (to, from, next) {
		if (
			this.submittedCards.main.length > 0 ||
			this.repeatedCardNames.main.length > 0 ||
			this.textCardList.length < 10
		) {
			next()
		} else {
			this.$store.commit('idOfShowingDialog', {
				id: 'leavingPageWarning',
				data: {
					callback: () => {
						if (this.leaveWarningUserResponse) {
							next()
						} else {
							next(false)
						}
					}
				}
			})
		}
	},
	metaInfo () {
		return {
			title: this.deck.name + ' · Card List Entry'
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

			this.processSubmission()

			if (this.hasExcessiveQuantity) return

			if (this.submittedCards.main.length + this.submittedCards.sideboard.length > 200) {
				this.$store.commit('idOfShowingDialog', {
					id: 'tooManyCardNames',
					data: {
						callback: this.focusOnTextarea
					}
				})

				return
			}

			this.determineNewOrExistingCardNames('main')
			this.determineNewOrExistingCardNames('sideboard')

			const ca = this.cardsToAdd
			const cu = this.cardsToUpdate

			if (ca.main.length > 0) {
				this.addNewCardsToDeck('main')
				this.isLoadingCards = true
			}
			if (ca.sideboard.length > 0) {
				this.addNewCardsToDeck('sideboard')
				this.isLoadingCards = true
			}
			if (cu.main.length > 0) {
				this.updateExistingQuantities('main')
				this.isLoadingCards = true
			}
			if (cu.sideboard.length > 0) {
				this.updateExistingQuantities('sideboard')
				this.isLoadingCards = true
			}

			this.$store.commit('decks', this.$store.state.decks)

			if (
				(
					this.cardsToAddZeroQty.length > 0 ||
					cu.main.length + cu.sideboard.length > 0
				) &&
				ca.main.length + ca.sideboard.length === 0
			) {
				this.goToResultsPage()
			}
		},
		processSubmission () {
			const allLines = this.textCardList.split('\n')
			const regexEmptyLine = /^\s*$/ // A substring that contains nothing from beginning to end, except maybe whitespace characters. (The newline characters have been removed from the `split()` method above.)
			let sideboardBeginningIndex = -1
			const validListEntries = {
				main: [], sideboard: []
			}

			for (let i = 0; i < allLines.length; i++) {
				const line = allLines[i]?.trim() || ''
				const prevLine = allLines[i - 1]?.trim() || ''

				if (sideboardBeginningIndex < 0) { // If the sideboard beginning index hasn't been found yet...
					if (prevLine.match(regexCardEntry) && line.match(regexEmptyLine)) {
						sideboardBeginningIndex = i
					} else if (line.match(regexCardEntry)) {
						validListEntries.main.push(line)
					}
				} else { // Else the sideboard beginning index has already been found.
					if (line.match(regexCardEntry)) {
						validListEntries.sideboard.push(line)
					}
				}
			}

			const regexQuantity = /^(\d+)(?= )/i // A substring that begins with a number and ends with a space.
			const regexName = /^\d+ (.+)/i // A substring of any characters that follow the `regexQuantity` pattern.
			const regexFrontFaceName = /^\d+ (.[^/]+)(?= *\/+)/i // A substring like the `regexName` pattern, except that it ends before the first "/" (slash), while the whole string does contain at least one "/".

			/* Reset the following arrays in case they contain leftover data from a previous submission attempt. */
			this.submittedCards = {
				main: [], sideboard: []
			}
			this.repeatedCardNames = {
				main: [], sideboard: []
			}

			const parseEntries = (groupName) => {
				for (const item of validListEntries[groupName]) {
					let cardQty = item.match(regexQuantity)[1]
					let cardName

					if (item.match(regexFrontFaceName)) {
						cardName = item.match(regexFrontFaceName)[1]
					} else {
						cardName = item.match(regexName)[1]
					}

					if (!cardQty && !cardName) break

					cardQty = Number(cardQty)
					cardName = this.cleanedCardName(cardName)

					if (cardQty > 99) {
						this.$store.commit('idOfShowingDialog', {
							id: 'excessiveQuantity',
							data: {
								qty: cardQty,
								name: cardName,
								callback: this.focusOnTextarea
							}
						})

						this.hasExcessiveQuantity = true

						return
					}

					const existingNameInAddList = this.submittedCards[groupName].find(existingCard =>
						existingCard.name.toUpperCase() === cardName.toUpperCase()
					)

					if (existingNameInAddList) {
						this.repeatedCardNames[groupName].push({
							qty: cardQty,
							name: cardName
						})
					} else {
						this.submittedCards[groupName].push({
							qty: cardQty,
							name: cardName
						})
					}
				}
			}
			parseEntries('main')
			parseEntries('sideboard')
		},
		determineNewOrExistingCardNames (groupName) {
			this.submittedCards[groupName].forEach(card => {
				const groupObject = (() => {
					if (groupName === 'sideboard') {
						return this.deck.sideboard
					} else {
						return this.deck
					}
				})()
				const existingCard = this.findExistingCardByName(card.name, groupObject)

				if (existingCard) {
					card.name = existingCard.name
					card.name2 = existingCard.name2

					this.cardsToUpdate[groupName].push(card)
				} else if (card.qty <= 0) {
					this.cardsToAddZeroQty.push(card)
				} else {
					this.cardsToAdd[groupName].push(card)
				}
			})
		},
		updateExistingQuantities (groupName) {
			console.log(`Updating existing card quantities in the deck's ${groupName} group.`)

			this.cardsToUpdate[groupName].forEach(submittedCard => {
				const targetGroup = (() => {
					if (groupName === 'sideboard') {
						return this.deck.sideboard
					} else {
						return this.deck
					}
				})()
				const cardIndex = targetGroup.cards.findIndex(foundCard => {
					return foundCard.name.toUpperCase() === submittedCard.name.toUpperCase()
				})

				if (cardIndex >= 0) {
					const existingCard = targetGroup.cards[cardIndex]

					existingCard.qty = submittedCard.qty

					if (existingCard.qty <= 0) {
						this.removeCard(cardIndex, true)

						this.anyCardRemoved = true
					}
				} else {
					console.warn(`Card named "${submittedCard.name}" not found in the deck's ${groupName} group.`)
				}
			})
		},
		addNewCardsToDeck (groupName) {
			const sideboardTimeoutDuration = () => {
				if (groupName === 'sideboard') {
					return this.cardsToAdd.main.length + 1
				} else {
					return 1
				}
			}

			this.cardsToAdd[groupName].forEach((card, index) => {
				setTimeout(() => {
					const done = () => {
						this.numberOfNewCardsRequested++

						if (this.numberOfNewCardsRequested === (this.cardsToAdd.main.length + this.cardsToAdd.sideboard.length)) {
							this.goToResultsPage()
						}
					}

					// this.cardRequestsAborted.push(card)
					// done()
					this.requestCardFromScryfallAPI(card, done, groupName)
				}, (index * 125 * sideboardTimeoutDuration))
			})
		},
		requestCardFromScryfallAPI (card, callback, groupName) {
			console.info(`Card named "${card.name}" requested via Scryfall API.`)

			const urlEncodedQuery = card.name.replace(/\s/g, '+') // Turn any spaces into pluses from the card's name.

			axios
				.get(
					`https://api.scryfall.com/cards/named?fuzzy=${urlEncodedQuery}`,
					{ timeout: 10000 }
				)
				.then(response => {
					this.recordForResultsPage(response.data, card, groupName)

					this.assignCardData(response.data, null, {
						qty: card.qty,
						inSideboard: groupName === 'sideboard'
					})
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
		recordForResultsPage (data, card, groupName) {
			if (data.card_faces) {
				card.name = this.cleanedCardName(data.card_faces[0].name)
				card.name2 = this.cleanedCardName(data.card_faces[1].name)
			} else {
				card.name = this.cleanedCardName(data.name)
			}

			const existingCard = this.findExistingCardByName(card.name, (() => {
				if (groupName === 'sideboard') {
					return this.deck.sideboard
				} else {
					return this.deck
				}
			})())

			if (existingCard) {
				this.cardsToUpdate[groupName].push(card)
				this.updateExistingQuantities(groupName)
			} else {
				this.cardsSuccessfullyAdded[groupName].push(card)
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
	@use '@/sass/page-list-entry.scss';
</style>
