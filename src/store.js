import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		decks: JSON.parse(localStorage.getItem('decks')),
		deletedDeckName: null,
		alertNameTooLong: '⚠ That deck name is too long. Please make it fewer than 50 characters.'
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
			return string.replace(/'/g, '’') // Convert every straight apostrophe (or single right quotation mark) into a curly one instead.
		}
	},
	mutations: {
		mutateDeletedDeckName (state, payload) {
			state.deletedDeckName = payload
		}
	},
	actions: {
	}
})
