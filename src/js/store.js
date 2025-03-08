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
		dialogData: {},
		focusCardBar: '',
		hasNotifiedOnceAbout: {
			quantityLimit: false,
			movingCardGroup: false
		},
		highlightedCardLIIndex: -1,
		idOfShowingDialog: null,
		loadDefaultDecks: true,
		overlayHoverEnabled: false,
		showingAnyPopup: false,
		showCard: false,
		showDeckMenu: false,
		showSideboard: false,
		viewedDrawnCard: null
	},
	getters: {
	},
	mutations: {
		analyzerFilter (state, payload) {
			state.analyzerFilter = payload
		},
		decks (state, payload) {
			state.decks = payload
		},
		dialogData (state, payload) {
			state.dialogData = payload
		},
		focusCardBar (state, payload) {
			state.focusCardBar = payload
		},
		hasNotifiedOnceAbout (state, payload) {
			state.hasNotifiedOnceAbout = {
				...state.hasNotifiedOnceAbout,
				...payload
			}
		},
		highlightedCardLIIndex (state, payload) {
			state.highlightedCardLIIndex = payload
		},
		idOfShowingDialog (state, payload) {
			if (
				payload &&
				payload.id !== undefined &&
				payload.data !== undefined
			) {
				state.idOfShowingDialog = payload.id
				state.dialogData = payload.data
			} else {
				state.idOfShowingDialog = payload
			}
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
		viewedDrawnCard (state, payload) {
			state.viewedDrawnCard = payload
		}
	},
	actions: {
	},
	plugins: [vuexLocalStorage.plugin]
})
