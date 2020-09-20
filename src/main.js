import Vue from 'vue'
import store from './store.js'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
