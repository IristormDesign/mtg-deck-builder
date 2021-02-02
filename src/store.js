import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		decks: JSON.parse(localStorage.getItem('decks')),
		deletedDeckName: null,
		alertNameTooLong: '⚠ That deck name is too long. Please shorten it to fewer than 50 characters.',
		sortProperty: localStorage.getItem('sortProperty'),
		showOverlay: false
	},
	getters: {
		alertNameExists: () => (name) => {
			return `⚠ Another deck is already named “${name}.” Please give a different name.`
		},
		// Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique.
		existingDeck: (state) => (testPath) => {
			return state.decks.find(deck =>
				testPath === deck.path
			)
		},
		stringToPath: () => (string) => {
			return string
				.toLowerCase()
				.replace(/\s/g, '-') // Replace whitespace characters with hyphens.
				.replace(/-{2,}/g, '-') // Replace multiple hyphens in a row with a single hyphen.
		},
		curlApostrophes: () => (string) => {
			return string.replace(/'/g, '’') // Convert every straight apostrophe (or single right quotation mark) into a curly one.
		}
	},
	mutations: {
		mutateDeletedDeckName (state, payload) {
			state.deletedDeckName = payload
		},
		setSortProperty (state, payload) {
			state.sortProperty = payload
		},
		toggleOverlay (state, payload) {
			if (payload) { // Payload should be a boolean
				state.showOverlay = payload
			} else {
				if (state.showOverlay === true) {
					state.showOverlay = false
				} else {
					state.showOverlay = true
				}
			}
			if (state.showOverlay === false) {
				const deckMenu = document.querySelector('.deck-menu ul')
				deckMenu.classList.remove('show')
			}
		}
	},
	actions: {
	}
})
