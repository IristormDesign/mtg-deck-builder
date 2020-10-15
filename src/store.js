import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		activeTab: null,
		deletedDeckMessage: null
	},
	getters: {},
	mutations: {
		changeActiveTab (state, payload) {
			state.activeTab = payload
		},
		changeDeletedDeckMessage (state, payload) {
			state.deletedDeckMessage = payload
		}
	},
	actions: {}
})
