import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import defaultDecks from './default-decks'

const vuexLocalStorage = new VuexPersist({
	storage: window.localStorage,
	reducer: (state) => ({
		decks: state.decks,
		sortAttribute: state.sortAttribute
	})
})
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alertNameTooLong: '⚠ That deck name is too long. Please shorten it to fewer than 50 characters.',
		decks: defaultDecks,
		deletedDeckName: null,
		showOverlay: false,
		sortAttribute: 'type',
		manaSymbol: {
			w: '<span class="mana-symbol white" title="White mana"><div>W</div></span>',
			u: '<span class="mana-symbol blue" title="Blue mana">U</span>',
			b: '<span class="mana-symbol black" title="Black mana">B</span>',
			r: '<span class="mana-symbol red" title="Red mana">R</span>',
			g: '<span class="mana-symbol green" title="Green mana">G</span>'
		},
		alertNameExists: (name) => {
			return `⚠ Another deck is already named “${name}.” Please give a different name.`
		},
		curlApostrophes: (string) => {
			return string.replace(/'/g, '’') // Convert every straight apostrophe (or single right quotation mark) into a curly one.
		},
		stringToPath: (string) => {
			return string
				.toLowerCase()
				.replace(/\s/g, '-') // Replace whitespace characters with hyphens.
				.replace(/-{2,}/g, '-') // Replace multiple hyphens in a row with a single hyphen.
		}
	},
	getters: {
		// Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique.
		existingDeck: (state) => (testPath) => {
			return state.decks.find(deck =>
				testPath === deck.path
			)
		}
	},
	mutations: {
		setDecks (state, payload) {
			state.decks = payload
		},
		setDeletedDeckName (state, payload) {
			state.deletedDeckName = payload
		},
		setSortAttribute (state, payload) {
			state.sortAttribute = payload
		},
		sortDeckMenu: (state) => {
			state.decks.sort((a, b) => {
				const deckA = a.name.toUpperCase()
				const deckB = b.name.toUpperCase()

				if (deckA > deckB) return 1
				else if (deckA < deckB) return -1
			})
		},
		toggleOverlay (state) {
			if (state.showOverlay === true) {
				state.showOverlay = false
			} else {
				state.showOverlay = true
			}
		}
	},
	actions: {
	},
	plugins: [vuexLocalStorage.plugin]
})
