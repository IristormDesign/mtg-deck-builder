import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'

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
		component: () => import(/* webpackChunkName: "manual" */ '@/views/UserManual.vue')
	},
	{
		name: 'createDeck',
		path: '/create-deck',
		component: () => import(/* webpackChunkName: "create-deck" */ '@/views/CreateDeck.vue')
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
		component: () => import(/* webpackChunkName: "deck" */ '@/views/DeckPage.vue'),
		children: [
			{
				name: 'listEditor',
				path: '',
				component: () => import(/* webpackChunkName: "list-editor" */ '@/views/ListEditor.vue')
			},
			{
				name: 'deckAnalyzer',
				path: 'deck-analyzer',
				component: () => import(/* webpackChunkName: "deck-analyzer" */ '@/views/DeckAnalyzer.vue')
			},
			{
				name: 'drawSim',
				path: 'draw-sim',
				component: () => import(/* webpackChunkName: "draw-sim" */ '@/views/DrawSim.vue')
			},
			{
				name: 'listEntry',
				path: 'list-entry',
				component: () => import(/* webpackChunkName: "list-entry" */ '@/views/ListEntry.vue')
			},
			{
				name: 'listEntryResults',
				path: 'list-entry-results',
				component: () => import(/* webpackChunkName: "list-entry-results" */ '@/views/ListEntryResults.vue'),
				props: true
			},
			{
				name: 'renderAsText',
				path: 'render-as-text',
				component: () => import(/* webpackChunkName: "render-as-text" */ '@/views/RenderAsText.vue')
			}
		]
	},
	{
		name: 'exportDecks',
		path: '/export-decks',
		component: () => import(/* webpackChunkName: "export-decks" */ '@/views/ExportDecks.vue'),
		props: true
	},
	{
		name: 'deleteDecks',
		path: '/delete-decks',
		component: () => import(/* webpackChunkName: "delete-decks" */ '@/views/DeleteDecks.vue'),
		props: true
	},
	{
		name: 'contact',
		path: '/contact',
		component: () => import(/* webpackChunkName: "contact" */ '@/views/ContactPage.vue')
	},
	{
		name: 'terms',
		path: '/terms',
		component: () => import(/* webpackChunkName: "terms" */ '@/views/TermsOfService.vue')
	},
	{
		name: 'privacy',
		path: '/privacy',
		component: () => import(/* webpackChunkName: "privacy" */ '@/views/PrivacyPolicy.vue')
	},
	{
		/* This route should always be the last item in the `routes` array. */
		name: 'notFound',
		path: '*',
		component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue')
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
				offset: { y: 26.6667 } // Equal to $lhse at standard font size
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
