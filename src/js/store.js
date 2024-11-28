import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
	storage: window.localStorage,
	reducer: (state) => ({
		decks: state.decks,
		loadDefaultDecks: state.loadDefaultDecks
	})
})

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		analyzerFilter: {
			category: null,
			attribute: null
		},
		decks: [],
		focusCardBar: '',
		highlightedCardLIIndex: -1,
		latestDeckDataVersion: 3,
		latestImageVersion: 2,
		loadDefaultDecks: true,
		overlayHoverEnabled: false,
		showingAnyPopup: false,
		showCard: false,
		showDeckMenu: false,
		showNoticeAboutMovingLastCard: true,
		showSideboard: false,
		viewedDrawnCard: null
	},
	getters: {
		/* Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique. */
		deckExists: (state) => (testPath) => {
			return state.decks.find(deck =>
				testPath === deck.path
			)
		}
	},
	mutations: {
		analyzerFilter (state, payload) {
			state.analyzerFilter = payload
		},
		decks (state, payload) {
			state.decks = payload
		},
		focusCardBar (state, payload) {
			state.focusCardBar = payload
		},
		highlightedCardLIIndex (state, payload) {
			state.highlightedCardLIIndex = payload
		},
		loadDefaultDecks (state, payload) {
			state.loadDefaultDecks = payload
		},
		overlayHoverEnabled (state, payload) {
			state.overlayHoverEnabled = payload
		},
		showingAnyPopup (state, payload) {
			state.showingAnyPopup = payload
		},
		showCard (state, payload) {
			state.showCard = payload
		},
		showDeckMenu (state, payload) {
			state.showDeckMenu = payload
		},
		showSideboard (state, payload) {
			state.showSideboard = payload
		},
		sortDeckMenu (state) {
			state.decks.sort((a, b) => {
				const deckA = a.name.toUpperCase()
				const deckB = b.name.toUpperCase()

				if (deckA > deckB) return 1
				else if (deckA < deckB) return -1
				else return 0
			})
		},
		showNoticeAboutMovingLastCard (state, payload) {
			state.showNoticeAboutMovingLastCard = payload
		},
		viewedDrawnCard (state, payload) {
			state.viewedDrawnCard = payload
		}
	},
	actions: {
	},
	plugins: [vuexLocalStorage.plugin]
})
