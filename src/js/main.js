import Vue from 'vue'
import App from '../App.vue'
import './registerServiceWorker.js'
import router from './router.js'
import store from './store.js'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false

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
