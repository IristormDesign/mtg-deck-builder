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
		decks: [],
		overlayHoverEnabled: false,
		latestDeckDataVersion: 2,
		latestImageVersion: 2,
		loadDefaultDecks: true,
		pageScrollByAnchors: false,
		showingAnyPopup: false,
		showCard: false,
		showDeckMenu: false,
		showSideboard: false,
		stickAppHeader: false
	},
	getters: {
		attentionHeaderButton: (state) => () => {
			let buttonForAttention

			if (state.decks.length > 0) {
				buttonForAttention = document.querySelector('.deck-menu-toggler')
			} else {
				buttonForAttention = document.querySelector('.create-deck button')
			}

			buttonForAttention.classList.add('attention')

			setTimeout(() => {
				buttonForAttention.classList.remove('attention')
			}, 1000)
		},
		// Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique.
		deckExists: (state) => (testPath) => {
			return state.decks.find(deck =>
				testPath === deck.path
			)
		}
	},
	mutations: {
		setDecks (state, payload) {
			state.decks = payload
		},
		setOverlayHoverEnabled (state, payload) {
			state.overlayHoverEnabled = payload
		},
		setLoadDefaultDecks (state, payload) {
			state.loadDefaultDecks = payload
		},
		setPageScrollByAnchors (state, payload) {
			state.pageScrollByAnchors = payload
		},
		setStickAppHeader (state, payload) {
			state.stickAppHeader = payload
		},
		setShowingAnyPopup (state, payload) {
			state.showingAnyPopup = payload
		},
		setShowCard (state, payload) {
			state.showCard = payload
		},
		setShowDeckMenu (state, payload) {
			state.showDeckMenu = payload
		},
		setShowSideboard (state, payload) {
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
		}
	},
	actions: {
	},
	plugins: [vuexLocalStorage.plugin]
})
