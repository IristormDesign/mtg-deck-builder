import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import Welcome from '@/components/Welcome.vue'
import TabContents from '@/components/TabContents.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			name: 'home',
			path: '/',
			component: Welcome
		},
		{
			name: 'deck',
			path: '/deck/:deckPath',
			component: TabContents,
			beforeEnter: (to, from, next) => {
				// Check that the deck name used in the path is actually valid before going to that path. If it's invalid, go to the "notFound" route instead.

				const deckExists = store.state.decks.find(
					deck => deck.path === to.params.deckPath
				)

				if (deckExists) {
					next()
				} else {
					next({ name: 'notFound' })
				}
			}
		},
		{
			// This route with the `*` path should always be the last item in the `routes` array.
			name: 'notFound',
			path: '*',
			component: NotFound
		}
	]
})
