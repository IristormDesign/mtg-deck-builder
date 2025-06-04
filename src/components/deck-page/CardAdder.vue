<template>
	<section class="card-adder">
		<form
			v-if="!loadingCard"
			@submit.prevent="heardSubmit()"
		>
			<label for="card-input">Add a new card name:</label>
			<div class="tip">
				<button
					type="button"
					@click="$store.commit('idOfShowingDialog', 'adderTip')"
					title="Tip for adding cards"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M450-290h60v-230h-60v230Zm30-298.46q13.73 0 23.02-9.29t9.29-23.02q0-13.73-9.29-23.02-9.29-9.28-23.02-9.28t-23.02 9.28q-9.29 9.29-9.29 23.02t9.29 23.02q9.29 9.29 23.02 9.29Zm.07 488.46q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
				</button>
			</div>
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
				title="[X]"
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
		<standard-dialog dialogID="adderTip">
			<h3>Tip for Adding Cards</h3>
			<p>To include new card names in your decks’ lists, submit any one of the following kinds of queries:</p>
			<ul>
				<li>
					<p>Submit the <strong>name</strong> of a certain <i>Magic</i> card to add that card.</p>
				</li>
				<li>
					<p>Submit the <strong>URL</strong> to a certain card’s page on <a href="https://scryfall.com/" target="_blank">Scryfall<svg><use href="#open-in-new-icon" /></svg></a> to add that card of that specific print edition. (Useful for cards that have been reprinted with different illustrations.)</p>
				</li>
				<li>
					<p>Submit the code <strong><code>#random</code></strong> to add a random <i>Magic</i> card.</p>
				</li>
			</ul>
			<p>For more info about the card adder tool, see the <router-link to="/guide/list-editor#card-adder">User Guide</router-link>.</p>
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
				this.heardSubmit()
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
					this.heardSubmit()
					break
				}
			}
		},
		heardSubmit () {
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

			if (query.toLowerCase() === '#random') { // If the query matches `#random`...
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
					this.axiosRequestName(query, (response) => {
						this.loadingCard = false

						this.$store.commit('idOfShowingDialog', {
							id: 'invalidCardName',
							data: query
						})
					})
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
