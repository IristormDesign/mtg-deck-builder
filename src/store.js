import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
	storage: window.localStorage,
	reducer: (state) => ({
		decks: state.decks,
		sortProperty: state.sortProperty
	})
})
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alertNameTooLong: '⚠ That deck name is too long. Please shorten it to fewer than 50 characters.',
		decks: [
			{
				name: 'Mana Overload',
				path: 'mana-overload',
				editDate: new Date(),
				viewedCard: 'Nyxbloom Ancient',
				description: 'One advanced diverted domestic repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should.',
				cards: [
					{
						name: 'Forest',
						type: 'Basic Land — Forest',
						mana: '0',
						qty: 10,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/8/4/845057a1-4da1-4a32-9bb2-bbf8502acd37.jpg'
					},
					{
						name: 'Mountain',
						type: 'Basic Land — Mountain',
						mana: '0',
						qty: 12,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/c/1/c1baebba-a975-45b1-bbcb-f4ce1ba682b5.jpg'
					},
					{
						name: 'Almighty Bushwagg',
						type: 'Creature — Bushwagg',
						mana: '🟢',
						qty: 1,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/7/1/71f2b7ac-8742-468d-b6a3-87881cb522ff.jpg'
					},
					{
						name: 'Jaya’s Greeting',
						type: 'Instant',
						mana: '1 🔴',
						qty: 3,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/e/c/ec66f169-5cf9-4d7c-a5ab-c64fc4801358.jpg'
					},
					{
						name: 'Leafkin Avenger',
						type: 'Creature — Elemental',
						mana: '772 🔴🟢',
						qty: 3,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/7/b/7bd3a903-23e0-4b5a-9c7e-390d5ced8371.jpg'
					},
					{
						name: 'Shivan Dragon',
						type: 'Creature — Dragon',
						mana: '4 🔴🔴',
						qty: 2,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/2/2/227cf1b5-f85b-41fe-be98-66e383652039.jpg'
					},
					{
						name: 'Nyxbloom Ancient',
						type: 'Creature — Elemental',
						mana: '4 🟢🟢🟢',
						qty: 3,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/a/3/a391da36-0b40-46ea-b771-50d2b920207e.jpg'
					},
					{
						name: 'Stonecoil Serpent',
						type: 'Artifact Creature — Snake',
						mana: 'X',
						qty: 2,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/b/3/b34bf7fd-9fe3-43e2-8cfe-7ce7cff08afe.jpg'
					}
				]
			},
			{
				name: 'Air Force',
				path: 'air-force',
				editDate: new Date(),
				viewedCard: 'Baneslayer Angel',
				description: 'Gravity letters it herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.',
				cards: [
					{
						name: 'Plains',
						type: 'Basic Land — Plains',
						mana: '0',
						qty: 13
					},
					{
						name: 'Island',
						type: 'Basic Land — Island',
						mana: '0',
						qty: 10
					},
					{
						name: 'Azorious Guildgate',
						type: 'Land – Gate',
						mana: '0',
						qty: 2
					},
					{
						name: 'Healer’s Hawk',
						type: 'Creature — Bird',
						mana: '⚪',
						qty: 2
					},
					{
						name: 'Tide Skimmer',
						type: 'Creature — Drake',
						mana: '2 🔵🔵',
						qty: 2
					},
					{
						name: 'Baneslayer Angel',
						type: 'Creature — Angel',
						mana: '3 ⚪⚪',
						qty: 1,
						img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/4/b/4bd3014b-94bb-4a9f-92cf-239a2dcc7e97.jpg?1594734758'
					}
				]
			}
		],
		deletedDeckName: null,
		showOverlay: false,
		sortProperty: 'type',
		manaSymbol: {
			w: '<span class="mana-symbol white" title="White mana"><div>W</div></span>',
			u: '<span class="mana-symbol blue" title="Blue mana">U</span>',
			b: '<span class="mana-symbol black" title="Black mana">B</span>',
			r: '<span class="mana-symbol red" title="Red mana">R</span>',
			g: '<span class="mana-symbol green" title="Green mana">G</span>'
		},
		alertNameExists: (name) => {
			return `⚠ Another deck is already named “${name}.” Please give a different name.`
		},
		curlApostrophes: (string) => {
			return string.replace(/'/g, '’') // Convert every straight apostrophe (or single right quotation mark) into a curly one.
		},
		stringToPath: (string) => {
			return string
				.toLowerCase()
				.replace(/\s/g, '-') // Replace whitespace characters with hyphens.
				.replace(/-{2,}/g, '-') // Replace multiple hyphens in a row with a single hyphen.
		}
	},
	getters: {
		// Check whether another deck exists with the same name. If one does, return that deck object (not the name). The name check is actually based on the deck's path because the path must be unique.
		existingDeck: (state) => (testPath) => {
			return state.decks.find(deck =>
				testPath === deck.path
			)
		}
	},
	mutations: {
		setDecks (state, payload) {
			state.decks = payload
		},
		setDeletedDeckName (state, payload) {
			state.deletedDeckName = payload
		},
		setSortProperty (state, payload) {
			state.sortProperty = payload
		},
		sortDeckMenu: (state) => {
			state.decks.sort((a, b) => {
				const deckA = a.name.toUpperCase()
				const deckB = b.name.toUpperCase()

				if (deckA > deckB) return 1
				else if (deckA < deckB) return -1
			})
		},
		toggleOverlay (state, payload) {
			if (payload) { // Payload should be a boolean
				state.showOverlay = payload
			} else {
				if (state.showOverlay === true) {
					state.showOverlay = false
				} else {
					state.showOverlay = true
				}
			}
			if (state.showOverlay === false) {
				const deckMenu = document.querySelector('.deck-menu ul')
				deckMenu.classList.remove('show')
			}
		}
	},
	actions: {
	},
	plugins: [vuexLocalStorage.plugin]
})
