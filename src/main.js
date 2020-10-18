import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')

Vue.use(VueRouter)
