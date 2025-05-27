import Vue from 'vue'
import App from '../App.vue'
import './registerServiceWorker.js'
import VueMeta from 'vue-meta'
import router from './router.js'
import store from './store.js'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false

Vue.use(VueMeta, {
	// refreshOnceOnNavigation: true,
	// attribute: 'data-vue-meta',
	// replaceTitle: true,
	// titleTemplate: '%s - Hearthstone Deck Tracker'
})
Vue.use(VueGtag, {
	config: {
		id: 'G-SVXNP4LLL4'
	},
	deferScriptLoad: true
}, router)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
