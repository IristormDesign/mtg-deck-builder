import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import Welcome from '@/components/Welcome.vue'
import Deck from '@/components/Deck.vue'
import DeckDeleted from '@/components/DeckDeleted.vue'
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
			name: 'deckDeleted',
			path: '/deck-deleted',
			component: DeckDeleted,
			beforeEnter: (to, from, next) => {
				if (store.state.deletedDeckName) {
					next()
				} else {
					// This page could be accessed at times when it shouldn't, such as via the browser back button or directly entering the URL.
					next({ name: 'notFound', replace: true })
				}
			}
		},
		{
			name: 'deck',
			path: '/deck/:deckPath',
			component: Deck,
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
