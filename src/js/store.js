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
		focusCardButton: '',
		highlightedCardLIIndex: -1,
		isMobileLayout: () => window.innerWidth <= 768, // Needs to be a function to return updated values if the viewport changes. The given number must match media query max-width in CSS.
		latestDeckDataVersion: 3,
		latestImageVersion: 2,
		loadDefaultDecks: true,
		overlayHoverEnabled: false,
		regex: {
			manaSymbols: {
				White: /.W./g,
				Blue: /.U./g,
				Black: /.B./g,
				Red: /.R./g,
				Green: /.G./g,
				Colorless: /.C./g,
				Snow: /.S./g,
				Hybrid: /.\/./g
			},
			cardTypes: {
				Creature: /\bCreature\b/,
				Planeswalker: /\bPlaneswalker\b/,
				Battle: /\bBattle\b/,
				Enchantment: /\bEnchantment\b/,
				Artifact: /\bArtifact\b/,
				Sorcery: /\bSorcery\b/,
				Instant: /\bInstant\b/,
				Land: /\bLand\b/
			}
		},
		showingAnyPopup: false,
		showCard: false,
		showDeckMenu: false,
		showSideboard: false,
		viewedDrawnCard: null
	},
	getters: {
		// Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique.
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
		focusCardButton (state, payload) {
			state.focusCardButton = payload
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
		viewedDrawnCard (state, payload) {
			state.viewedDrawnCard = payload
		}
	},
	actions: {
	},
	plugins: [vuexLocalStorage.plugin]
})
