import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
	{
		name: 'home',
		path: '/',
		component: HomePage
	},
	{
		name: 'manual',
		path: '/manual',
		component: () => import(/* webpackChunkName: "manual" */ '../views/ManualPage.vue')
	},
	{
		name: 'createDeck',
		path: '/create-deck',
		component: () => import(/* webpackChunkName: "create-deck" */ '../views/CreateDeck.vue')
	},
	{
		path: '/deck/:deckPath',
		component: () => import(/* webpackChunkName: "deck" */ '../views/DeckPage.vue'),
		beforeEnter: (to, from, next) => {
			const validDeck = store.state.decks.find(deck =>
				regexDeckPage(`/deck/${deck.path}`).test(to.path)
			)

			function regexDeckPage (path) {
				return new RegExp('^' + path, 'i')
			}

			if (validDeck) {
				next()
			} else {
				next({
					name: 'notFound',
					replace: true
				})
			}
		},
		children: [
			{
				name: 'deckMain',
				path: '',
				component: () => import(/* webpackChunkName: "deck-main" */ '../views/DeckMain.vue')
			},
			{
				name: 'moreStats',
				path: 'more-stats',
				component: () => import(/* webpackChunkName: "more-stats" */ '../views/MoreStats.vue')
			}
		]
	},
	{
		name: 'deckDeleted',
		path: '/deck-deleted',
		component: () => import(/* webpackChunkName: "deck-deleted" */ '../views/DeckDeleted.vue'),
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
		name: 'contact',
		path: '/contact',
		component: () => import(/* webpackChunkName: "contact" */ '../views/ContactPage.vue')
	},
	{
		name: 'terms',
		path: '/terms',
		component: () => import(/* webpackChunkName: "terms" */ '../views/TermsPage.vue')
	},
	{
		name: 'privacy',
		path: '/privacy',
		component: () => import(/* webpackChunkName: "privacy" */ '../views/PrivacyPage.vue')
	},
	{
		// This route with the `*` path should always be the last item in the `routes` array.
		name: 'notFound',
		path: '*',
		component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
				offset: { y: 70 },
				behavior: 'smooth'
			}
		} else if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})

export default router
