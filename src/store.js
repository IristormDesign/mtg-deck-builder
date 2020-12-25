import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cardSorting: JSON.parse(localStorage.getItem('cardSorting')),
		decks: JSON.parse(localStorage.getItem('decks')),
		deletedDeckName: null
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
			return string.toLowerCase()
				.replace(/\s/g, '-') // Replace whitespace characters with hyphens.
				.replace(/-{2,}/g, '-') // Replace multiple hyphens in a row with a single hyphen.
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
