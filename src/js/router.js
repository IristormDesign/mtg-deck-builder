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
	{ // When a `deck` URL is missing a specified deck path, redirect to the home page.
		path: '/deck',
		beforeEnter: (to, from, next) => {
			next({
				name: 'home',
				replace: true
			})
		}
	},
	{
		path: '/deck/:deckPath',
		component: () => import(/* webpackChunkName: "deck" */ '../views/DeckPage.vue'),
		beforeEnter: (to, from, next) => {
			function validDeck () {
				const currentURL = to.path.toLowerCase()

				return store.state.decks.find(deck =>
					currentURL.includes(`/deck/${deck.path}/`) // The trailing slash is actually important here, because if the entered URL doesn't include it, then the deck page doesn't fully load properly. In that case, it's better to redirect to the 404 page than to put the user on a broken deck page.
				)
			}

			if (validDeck()) {
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
		name: 'exportDecks',
		path: '/export-decks',
		component: () => import(/* webpackChunkName: "export-decks" */ '../views/ExportDecks.vue'),
		props: true
	},
	{
		name: 'deleteDecks',
		path: '/delete-decks',
		component: () => import(/* webpackChunkName: "delete-decks" */ '../views/DeleteDecks.vue'),
		props: true
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
		// This route should always be the last item in the `routes` array.
		name: 'notFound',
		path: '*',
		component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
				offset: { y: 62 } // Equal to app header's height plus half of $lhse
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
