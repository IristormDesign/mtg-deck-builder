import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		name: 'home',
		path: '/',
		component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage.vue')
	},
	{
		name: 'guide',
		path: '/guide',
		component: () => import(/* webpackChunkName: "guide" */ '@/views/UserGuide.vue'),
		redirect: { name: 'guideIntro' },
		children: [
			{
				name: 'guideIntro',
				path: 'intro',
				component: () => import(/* webpackChunkName: "guide-intro" */ '@/views/guide-chapters/GuideIntro.vue')
			},
			{
				name: 'guideAppHeader',
				path: 'app-header',
				component: () => import(/* webpackChunkName: "guide-app-header" */ '@/views/guide-chapters/AppHeader.vue')
			},
			{
				name: 'guideCreateDeck',
				path: 'create-deck',
				component: () => import(/* webpackChunkName: "guide-create-deck" */ '@/views/guide-chapters/CreateDeckPage.vue')
			},
			{
				name: 'guideDeckPages',
				path: 'deck-pages',
				component: () => import(/* webpackChunkName: "guide-deck-pages" */ '@/views/guide-chapters/DeckPages.vue')
			},
			{
				name: 'guideDeckPageHeader',
				path: 'deck-page-header',
				component: () => import(/* webpackChunkName: "guide-deck-page-header" */ '@/views/guide-chapters/DeckPageHeader.vue')
			},
			{
				name: 'guideListEditor',
				path: 'list-editor',
				component: () => import(/* webpackChunkName: "guide-list-editor" */ '@/views/guide-chapters/ListEditor.vue')
			},
			{
				name: 'guideStatsAnalyzer',
				path: 'stats-analyzer',
				component: () => import(/* webpackChunkName: "guide-stats-analyzer" */ '@/views/guide-chapters/StatsAnalyzer.vue')
			},
			{
				name: 'guideDrawSim',
				path: 'draw-sim',
				component: () => import(/* webpackChunkName: "guide-draw-sim" */ '@/views/guide-chapters/DrawSim.vue')
			},
			{
				name: 'guideListTakeout',
				path: 'list-takeout',
				component: () => import(/* webpackChunkName: "guide-list-takeout" */ '@/views/guide-chapters/ListTakeout.vue')
			},
			{ // Outdated links may still point to the old name of the User Guide's List Takeout page. This redirect could be removed in the future.
				path: 'text-renderer',
				redirect: { name: 'guideListTakeout' }
			},
			{
				name: 'guideCardListEntry',
				path: 'card-list-entry',
				component: () => import(/* webpackChunkName: "guide-card-list-entry" */ '@/views/guide-chapters/CardListEntry.vue')
			},
			{
				name: 'guideKeyboardShortcuts',
				path: 'keyboard-shortcuts',
				component: () => import(/* webpackChunkName: "guide-keyboard-shortcuts" */ '@/views/guide-chapters/KeyboardShortcuts.vue')
			},
			{
				name: 'guideStorageOfDeckData',
				path: 'storage-of-deck-data',
				component: () => import(/* webpackChunkName: "guide-storage-of-deck-data" */ '@/views/guide-chapters/StorageOfDeckData.vue')
			},
			{
				name: 'guideAppDevelopment',
				path: 'app-dev',
				component: () => import(/* webpackChunkName: "guide-app-development" */ '@/views/guide-chapters/AppDevelopment.vue')
			}
		]
	},
	{
		path: '/manual', // For any old links to the User Guide. This redirect could be removed in the future.
		redirect: { name: 'guide' },
		children: [
			{
				path: '*',
				redirect: { name: 'guide' }
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
				name: 'listTakeout',
				path: 'list-takeout',
				component: () => import(/* webpackChunkName: "list-takeout" */ '@/views/ListTakeout.vue')
			},
			{ // Outdated links may still point to the old name of the List Takeout mode page. This redirect could be removed in the future.
				path: 'text-renderer',
				redirect: { name: 'listTakeout' }
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
		name: 'donate',
		path: '/donate',
		component: () => import(/* webpackChunkName: "donate" */ '@/views/DonatePage.vue')
	},
	{
		name: 'releaseNotes',
		path: '/release-notes',
		component: () => import(/* webpackChunkName: "release-notes" */ '@/views/ReleaseNotes.vue')
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
		if (savedPosition) {
			return savedPosition
		} else if (to.hash) {
			if (
				to.path !== from.path ||
				to.hash !== from.hash
			) {
				return {
					selector: to.hash
				}
			}
		} else {
			return { x: 0, y: 0 }
		}
	}
})

export default router
