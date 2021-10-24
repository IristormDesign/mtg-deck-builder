import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'
const Home = () =>
	import(/* webpackChunkName: "home" */ '../pages/Home.vue')
const CreateDeck = () =>
	import(/* webpackChunkName: "create-deck" */ '../pages/CreateDeck.vue')
const Deck = () =>
	import(/* webpackChunkName: "deck" */ '../pages/Deck.vue')
const Manual = () =>
	import(/* webpackChunkName: "manual" */ '../pages/Manual.vue')
const Contact = () =>
	import(/* webpackChunkName: "contact" */ '../pages/Contact.vue')
const MoreStats = () =>
	import(/* webpackChunkName: "more-stats" */ '../pages/MoreStats.vue')
const DeckDeleted = () =>
	import(/* webpackChunkName: "deck-deleted" */ '../pages/DeckDeleted.vue')
const NotFound = () =>
	import(/* webpackChunkName: "not-found" */ '../pages/NotFound.vue')
const Terms = () =>
	import(/* webpackChunkName: "terms" */ '../pages/Terms.vue')
const Privacy = () =>
	import(/* webpackChunkName: "privacy" */ '../pages/Privacy.vue')

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			name: 'home',
			path: '/',
			component: Home
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
			name: 'createDeck',
			path: '/create-deck',
			component: CreateDeck
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
				if (deckExists) next()
				else next({ name: 'notFound' })
			}
		},
		{
			name: 'moreStats',
			path: '/deck/:deckPath/more-stats',
			component: MoreStats,
			props: true,
			beforeEnter: (to, from, next) => {
				if (to.params.deck) {
					next()
				} else {
					const relevantDeck = store.state.decks.find(
						deck => deck.path === to.params.deckPath
					)

					if (relevantDeck) {
						next({
							name: 'moreStats',
							params: {
								deckPath: relevantDeck.path,
								deck: relevantDeck
							},
							replace: true
						})
					} else {
						next({
							name: 'notFound',
							replace: true
						})
					}
				}
			}
		},
		{
			name: 'manual',
			path: '/manual',
			component: Manual
		},
		{
			name: 'contact',
			path: '/contact',
			component: Contact
		},
		{
			name: 'terms',
			path: '/terms',
			component: Terms
		},
		{
			name: 'privacy',
			path: '/privacy',
			component: Privacy
		},
		{
			// This route with the `*` path should always be the last item in the `routes` array.
			name: 'notFound',
			path: '*',
			component: NotFound
		}
	],
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
