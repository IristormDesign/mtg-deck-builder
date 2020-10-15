import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		deletedDeckMessage: null
	},
	getters: {},
	mutations: {
		mutateDeletedDeckMessage (state, payload) {
			state.deletedDeckMessage = payload
		}
	},
	actions: {}
})
