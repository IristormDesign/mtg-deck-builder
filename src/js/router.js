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
		component: () => import(/* webpackChunkName: "manual" */ '@/views/UserManual.vue'),
		redirect: { name: 'manualIntro' },
		children: [
			{
				name: 'manualIntro',
				path: 'intro',
				component: () => import(/* webpackChunkName: "manual-intro" */ '@/views/manual-chapters/ManualIntro.vue')
			},
			{
				name: 'manualAppHeader',
				path: 'app-header',
				component: () => import(/* webpackChunkName: "manual-app-header" */ '@/views/manual-chapters/AppHeader.vue')
			},
			{
				name: 'manualCreateDeck',
				path: 'create-deck',
				component: () => import(/* webpackChunkName: "manual-create-deck" */ '@/views/manual-chapters/CreateDeckPage.vue')
			},
			{
				name: 'manualDeckPages',
				path: 'deck-pages',
				component: () => import(/* webpackChunkName: "manual-deck-pages" */ '@/views/manual-chapters/DeckPages.vue')
			},
			{
				name: 'manualDeckPageHeader',
				path: 'deck-page-header',
				component: () => import(/* webpackChunkName: "manual-deck-page-header" */ '@/views/manual-chapters/DeckPageHeader.vue')
			},
			{
				name: 'manualDeckPageModes',
				path: 'deck-page-modes',
				component: () => import(/* webpackChunkName: "manual-deck-page-modes" */ '@/views/manual-chapters/DeckPageModes.vue')
			},
			{
				name: 'manualListEditor',
				path: 'list-editor',
				component: () => import(/* webpackChunkName: "manual-list-editor" */ '@/views/manual-chapters/ListEditor.vue')
			},
			{
				name: 'manualStatsAnalyzer',
				path: 'stats-analyzer',
				component: () => import(/* webpackChunkName: "manual-stats-analyzer" */ '@/views/manual-chapters/StatsAnalyzer.vue')
			},
			{
				name: 'manualDrawSim',
				path: 'draw-sim',
				component: () => import(/* webpackChunkName: "manual-draw-sim" */ '@/views/manual-chapters/DrawSim.vue')
			},
			{
				name: 'manualTextRenderer',
				path: 'text-renderer',
				component: () => import(/* webpackChunkName: "manual-text-renderer" */ '@/views/manual-chapters/TextRenderer.vue')
			},
			{
				name: 'manualKeyboardShortcuts',
				path: 'keyboard-shortcuts',
				component: () => import(/* webpackChunkName: "manual-keyboard-shortcuts" */ '@/views/manual-chapters/KeyboardShortcuts.vue')
			},
			{
				name: 'manualStorageOfDeckData',
				path: 'storage-of-deck-data',
				component: () => import(/* webpackChunkName: "manual-storage-of-deck-data" */ '@/views/manual-chapters/StorageOfDeckData.vue')
			},
			{
				name: 'manualAppDevelopment',
				path: 'app-dev',
				component: () => import(/* webpackChunkName: "manual-app-development" */ '@/views/manual-chapters/AppDevelopment.vue')
			}
		]
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
				name: 'statsAnalyzer',
				path: 'stats-analyzer',
				component: () => import(/* webpackChunkName: "stats-analyzer" */ '@/views/StatsAnalyzer.vue')
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
				name: 'textRenderer',
				path: 'text-renderer',
				component: () => import(/* webpackChunkName: "text-renderer" */ '@/views/TextRenderer.vue')
			},
			{
				/* For any URLs with an invalid subdirectory within a deck page directory, automatically redirect to the List Editor. */
				path: '*',
				redirect: { name: 'listEditor' }
			}
		]
	},
	{
		name: 'archiveDecks',
		path: '/archive-decks',
		component: () => import(/* webpackChunkName: "archive-decks" */ '@/views/ArchiveDecks.vue'),
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
			return { x: 0, y: 0 }
		}
	}
})

export default router
