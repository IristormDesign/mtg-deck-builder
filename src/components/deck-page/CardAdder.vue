<template>
	<section class="card-adder">
		<form
			v-if="!loadingCard"
			@submit.prevent="handleSubmit()"
		>
			<label for="card-input">Add a new card name:</label>
			<input
				@input="submitSuggestion()"
				@focus="adderFocused()"
				:placeholder="inputPlaceholder"
				autocomplete="off"
				id="card-input"
				list="card-suggestions"
				ref="focusCardAdder"
				type="text"
				v-model.trim="cardQueryInput"
				title="Enter the name of a Magic card or the URL to a Scryfall card page (X)"
				maxlength="99"
			/>
			<datalist id="card-suggestions">
				<option
					v-for="name in cardSuggestions"
					:key="name"
				>
					{{ name }}
				</option>
				<option value="#random">
					🎲 Add a random Magic card
				</option>
			</datalist>
			<button
				:disabled="delay"
				title="Add card to list"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M446.54-446.87H198.67v-67.59h247.87v-247.87h67.59v247.87h247.2v67.59h-247.2v247.2h-67.59v-247.2Z"/></svg>
			</button>
		</form>
		<div v-else class="loading-indicator">
			<span>Loading card&hellip;</span>
		</div>
		<standard-dialog dialogID="nonScryfallURLQuery">
			<p><strong>Error</strong>: Your URL query couldn’t get a card because that URL doesn’t go to a card’s page on <a href="https://scryfall.com/" target="_blank">Scryfall<svg><use href="#open-in-new-icon" /></svg></a>.</p>
		</standard-dialog>
	</section>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import axios from 'axios'
import debounce from 'debounce'
import stringMethods from '@/mixins/stringMethods.js'
import requestScryfallData from '@/mixins/requestScryfallData.js'

export default {
	components: { StandardDialog },
	mixins: [stringMethods, requestScryfallData],
	props: {
		deck: Object
	},
	data () {
		return {
			cardSuggestions: null,
			cardQueryInput: '',
			delay: false,
			focusedViaKBShortcut: false,
			loadingCard: false,
			optionalReplacement: false
		}
	},
	computed: {
		inputPlaceholder () {
			if (this.deck.cards.length === 0) {
				return '(Enter a card’s name here.)'
			} else {
				return ''
			}
		}
	},
	watch: {
		cardQueryInput () {
			this.debouncedAutocomplete()

			/* If the user pastes the URL of a Scryfall card page into the card adder's text input, then automatically submit the query. */
			if (this.regexScryfallCardURL.test(this.cardQueryInput)) {
				this.handleSubmit()
			}
		}
	},
	created () {
		this.debouncedAutocomplete = debounce(this.autocompleteName, 500)
	},
	methods: {
		autocompleteName () {
			const query = this.cardQueryInput
			const regexCodeSymbol = /^#/ // A string beginning with `#`, as for the MDB code `#random`.
			const regexAnyURL = /^http/i // A string beginning with `http`.
			const regexIncompleteScryfallURL = /^scryfa/i // A string beginning with `scryfa`, which indicates the user is manually typing out a Scryfall URL.

			if ( // Basically, if the submitted query is identifiable as just a card name (rather than a URL)...
				query &&
				!regexCodeSymbol.test(query) &&
				!regexAnyURL.test(query) &&
				!regexIncompleteScryfallURL.test(query)
			) {
				console.info(`Query "${query}" autocompleted with Scryfall API`)

				const queryCardSuggestions = (data) => {
					/* Limit the number of autocomplete suggestions to 5. */
					while (data.length > 6) {
						data.pop()
					}

					this.cardSuggestions = data
				}

				axios
					.get(
						`https://api.scryfall.com/cards/autocomplete?q=${query}`
					)
					.then(response => {
						queryCardSuggestions(response.data.data)
					})
			} else {
				this.cardSuggestions = []
			}
		},
		submitSuggestion () {
			const options = document.getElementById('card-suggestions').childNodes

			for (const option of options) {
				if (this.cardQueryInput === option.value) {
					this.handleSubmit()
					break
				}
			}
		},
		handleSubmit () {
			if (this.cardQueryInput === '') {
				this.$refs.focusCardAdder.focus()
			} else {
				this.delay = true // Scryfall staff doesn't want too many server requests sent too quickly.
				this.loadingCard = true
				this.optionalReplacement = false

				this.determineQueryType(this.cardQueryInput)
			}

			this.cardQueryInput = ''

			setTimeout(() => {
				this.delay = false
			}, 500)
		},
		/**
		 * @param {string} query
		 */
		determineQueryType (query) {
			const regexURL = /^http(s?):/i // A string beginning with `http:` or `https:`.

			if (query.toLowerCase() === '#random') { // If the query matches the app code `#random`...
				this.axiosRequestRandom()
			} else if (this.regexScryfallCardURL.test(query)) { // If the query matches the pattern of a URL to a Scryfall card page...
				const coreURL = query.match(this.regexScryfallCardURL)[0] // Extract the core part of the query of a Scryfall card page URL, leaving out any excess cruft in it (often such as "?utm_source=api") that makes finding a match of an existing card less likely.
				const regexSpecialCharacters = /[./]/g // Any period or slash. These are the characters that would be in a core Scryfall URL that must be escaped in order for regex functions to work properly.
				const escapedQuery = coreURL.replace(regexSpecialCharacters, '\\$&') // In the URL query, insert a backslash before any of the special regex characters to escape them. (`$&` means the whole matched string.)
				const regexQueryURL = new RegExp('^' + escapedQuery, 'i') // A string beginning with the URL query.
				const foundExistingCardByLink = this.activeCardList.cards.find(
					foundCard => regexQueryURL.test(foundCard.link)
				)

				if (foundExistingCardByLink) {
					/* The URL query matches an existing card's link URL, which means the queried card is an identical variation match to an existing card. */
					this.notifyCardExists(foundExistingCardByLink)
				} else {
					/* The URL query does NOT match an existing card's link URL, which means the queried card doesn't have an identical variation match. (The queried card may or may not have the same name as an existing card, but that's checked in a separate method.) */
					this.optionalReplacement = true
					this.axiosCollectionRequest(query)
				}
			} else if (regexURL.test(query)) { // If the user mistakenly submits any URL (but that isn't a Scryfall card page URL, because that was just checked in the previous `if` statement)...
				this.$store.commit('idOfShowingDialog', 'nonScryfallURLQuery')
				this.loadingCard = false

			/* Else the query is a card name (or at least it's going to be handled like a card name). */
			} else {
				const foundExistingCardByName = this.findExistingCardByName(query)

				if (foundExistingCardByName) {
					this.notifyCardExists(foundExistingCardByName)
				} else { // Else the queried card doesn't match the name of another card in the list.
					this.axiosRequestName(query)
				}
			}
		},
		adderFocused () {
			if (this.$store.state.highlightedCardLIIndex > -1) {
				this.focusedViaKBShortcut = true
				this.$store.commit('highlightedCardLIIndex', -1)
			} else {
				this.focusedViaKBShortcut = false
			}
		}
	}
}
</script>
