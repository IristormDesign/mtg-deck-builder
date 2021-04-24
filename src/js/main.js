import Vue from 'vue'
import store from './store.js'
import router from './router.js'
import App from '../App.vue'
import VueGtag from 'vue-gtag'
import './registerServiceWorker.js'

Vue.use(VueGtag, {
	config: { id: 'G-SVXNP4LLL4' }
}, router)

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
