import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
	key: 'vuex',
	storage: window.localStorage
	// strictMode: true
})
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alertNameTooLong: '⚠ That deck name is too long. Please shorten it to fewer than 50 characters.',
		deletedDeckName: null,
		getDecks: null,
		manaSymbol: {
			w: '<span class="mana-symbol white" title="White mana"><div>W</div></span>',
			u: '<span class="mana-symbol blue" title="Blue mana">U</span>',
			b: '<span class="mana-symbol black" title="Black mana">B</span>',
			r: '<span class="mana-symbol red" title="Red mana">R</span>',
			g: '<span class="mana-symbol green" title="Green mana">G</span>'
		},
		showOverlay: false,
		sortProperty: 'type'
	},
	getters: {
		alertNameExists: () => (name) => {
			return `⚠ Another deck is already named “${name}.” Please give a different name.`
		},
		// Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique.
		existingDeck: (state) => (testPath) => {
			return state.getDecks.find(deck =>
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
		setDecks (state, payload) {
			state.getDecks = payload
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
		},
		RESTORE_MUTATION: vuexLocalStorage.RESTORE_MUTATION // This is required for vuex-persist.
	},
	actions: {
	},
	// strict: process.env.NODE_ENV !== 'production',
	plugins: [vuexLocalStorage.plugin]
})
