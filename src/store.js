import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
	storage: window.localStorage,
	reducer: (state) => ({
		decks: state.decks,
		sortAttribute: state.sortAttribute
	})
})
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alertNameTooLong: '⚠ That deck name is too long. Please shorten it to fewer than 50 characters.',
		decks: [
			{ name: 'Oops! All Spells', path: 'oops!-all-spells', cards: [{ name: 'Vengevine', mana: '{2}{G}{G}', type: 'Creature — Elemental', cmc: 4, colors: ['G'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/5/6/5631668d-75f2-4d2d-b644-90c073c7be21.jpg?1599707670', rarity: 'mythic', link: 'https://scryfall.com/card/2xm/185/vengevine?utm_source=api', qty: 4 }, { name: 'Salvage Titan', mana: '{4}{B}{B}', type: 'Artifact Creature — Golem', cmc: 6, colors: ['B'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/7/1/7175febd-ae8e-4945-91ab-b6c67c40f04b.jpg?1599705900', rarity: 'rare', link: 'https://scryfall.com/card/2xm/104/salvage-titan?utm_source=api', qty: 1 }, { name: 'Phantasmagorian', mana: '{5}{B}{B}', type: 'Creature — Horror', cmc: 7, colors: ['B'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/9/19bcd780-70a6-4c25-8611-8b750a50aa3d.jpg?1562566719', rarity: 'uncommon', link: 'https://scryfall.com/card/plc/77/phantasmagorian?utm_source=api', qty: 1 }, { name: 'Undercity Informer', mana: '{2}{B}', type: 'Creature — Human Rogue', cmc: 3, colors: ['B'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/8/2/822d0f73-cfb0-41d9-b4eb-09c605112a13.jpg?1613386814', rarity: 'uncommon', link: 'https://scryfall.com/card/gtc/82/undercity-informer?utm_source=api', qty: 4 }, { name: 'Narcomoeba', mana: '{1}{U}', type: 'Creature — Illusion', cmc: 2, colors: ['U'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/a/3/a3e23275-2261-4d6d-88d8-124342334391.jpg?1572892791', rarity: 'rare', link: 'https://scryfall.com/card/grn/47/narcomoeba?utm_source=api', qty: 2 }, { name: 'Balustrade Spy', mana: '{3}{B}', type: 'Creature — Vampire Rogue', cmc: 4, colors: ['B'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/d/2/d295ef8c-fe8f-49f2-8588-7f5782315fc7.jpg?1613386778', rarity: 'common', link: 'https://scryfall.com/card/ima/80/balustrade-spy?utm_source=api', qty: 4 }, { name: 'Sword of the Meek', mana: '{2}', type: 'Artifact — Equipment', cmc: 2, colors: [], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/5/a/5a0c2773-3205-4ac4-b31c-c54fb06fdd7c.jpg?1599710094', rarity: 'rare', link: 'https://scryfall.com/card/2xm/299/sword-of-the-meek?utm_source=api', qty: 3 }, { name: 'Goblin Charbelcher', mana: '{4}', type: 'Artifact', cmc: 4, colors: [], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/2/4/240344ff-404d-4894-a6e9-4401cd68cf50.jpg?1592764888', rarity: 'rare', link: 'https://scryfall.com/card/ddt/57/goblin-charbelcher?utm_source=api', qty: 2 }, { name: 'Sphere of the Suns', mana: '{2}', type: 'Artifact', cmc: 2, colors: [], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/9/7/971f7dd0-290f-4ba4-aa2d-29ff148e7778.jpg?1562265256', rarity: 'common', link: 'https://scryfall.com/card/mm2/231/sphere-of-the-suns?utm_source=api', qty: 2 }, { name: 'Talisman of Resilience', mana: '{2}', type: 'Artifact', cmc: 2, colors: [], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/c/c/cc25a254-edd2-4817-ab80-7373239da7d2.jpg?1562202530', rarity: 'uncommon', link: 'https://scryfall.com/card/mh1/234/talisman-of-resilience?utm_source=api', qty: 4 }, { name: 'Pentad Prism', mana: '{2}', type: 'Artifact', cmc: 2, colors: [], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/2/a/2a2862c5-afa8-4e38-a312-483300f8b194.jpg?1599709726', rarity: 'uncommon', link: 'https://scryfall.com/card/2xm/281/pentad-prism?utm_source=api', qty: 4 }, { name: 'Turntimber Symbiosis / Turntimber, Serpentine Wood', mana: '{4}{G}{G}{G}', type: 'Sorcery / Land', cmc: 7, colors: ['G'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/6/1/61bd69ea-1e9e-46b0-b1a1-ed7fdbe3deb6.jpg?1604199791', rarity: 'mythic', link: 'https://scryfall.com/card/znr/215/turntimber-symbiosis-turntimber-serpentine-wood?utm_source=api', qty: 4 }, { name: 'Sea Gate Restoration / Sea Gate, Reborn', mana: '{4}{U}{U}{U}', type: 'Sorcery / Land', cmc: 7, colors: ['U'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/1/9/193071fe-180b-4d35-ba78-9c16675c29fc.jpg?1604250788', rarity: 'mythic', link: 'https://scryfall.com/card/znr/76/sea-gate-restoration-sea-gate-reborn?utm_source=api', qty: 4 }, { name: 'Emeria’s Call / Emeria, Shattered Skyclave', mana: '{4}{W}{W}{W}', type: 'Sorcery / Land', cmc: 7, colors: ['W'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/c/4/c470539a-9cc7-4175-8f7c-c982b6072b6d.jpg?1604195709', rarity: 'mythic', link: 'https://scryfall.com/card/znr/12/emerias-call-emeria-shattered-skyclave?utm_source=api', qty: 4 }, { name: 'Creeping Chill', mana: '{3}{B}', type: 'Sorcery', cmc: 4, colors: ['B'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/f/5/f5456173-7a08-4b5c-8450-7123375f4a86.jpg?1572892924', rarity: 'uncommon', link: 'https://scryfall.com/card/grn/66/creeping-chill?utm_source=api', qty: 4 }, { name: 'Agadeem’s Awakening / Agadeem, the Undercrypt', mana: '{X}{B}{B}{B}', type: 'Sorcery / Land', cmc: 3, colors: ['B'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/6/7/67f4c93b-080c-4196-b095-6a120a221988.jpg?1604195226', rarity: 'mythic', link: 'https://scryfall.com/card/znr/90/agadeems-awakening-agadeem-the-undercrypt?utm_source=api', qty: 4 }, { name: 'Shatterskull Smashing / Shatterskull, the Hammer Pass', mana: '{X}{R}{R}', type: 'Sorcery / Land', cmc: 2, colors: ['R'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/b/c/bc7239ea-f8aa-4a6f-87bd-c35359635673.jpg?1604197844', rarity: 'mythic', link: 'https://scryfall.com/card/znr/161/shatterskull-smashing-shatterskull-the-hammer-pass?utm_source=api', qty: 4 }, { name: 'Nexus of Fate', mana: '{5}{U}{U}', type: 'Instant', cmc: 7, colors: ['U'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/f/1/f163cfbf-6df6-4af5-9fe4-23b0d511586a.jpg?1610070136', rarity: 'mythic', link: 'https://scryfall.com/card/m19/306/nexus-of-fate?utm_source=api', qty: 1 }, { name: 'Hagra Mauling / Hagra Broodpit', mana: '{2}{B}{B}', type: 'Instant / Land', cmc: 4, colors: ['B'], img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/7/c/7c04c734-354d-4925-8161-7052110951df.jpg?1604195798', rarity: 'rare', link: 'https://scryfall.com/card/znr/106/hagra-mauling-hagra-broodpit?utm_source=api', qty: 4 }], editDate: '2021-03-17T03:19:14.739Z', description: 'By Peter Ward in 2020 MTGO Champions Showcase, Season 3.', viewedCard: 'Vengevine' }
		],
		deletedDeckName: null,
		showOverlay: false,
		sortAttribute: 'type',
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
		setSortAttribute (state, payload) {
			state.sortAttribute = payload
		},
		sortDeckMenu: (state) => {
			state.decks.sort((a, b) => {
				const deckA = a.name.toUpperCase()
				const deckB = b.name.toUpperCase()

				if (deckA > deckB) return 1
				else if (deckA < deckB) return -1
			})
		},
		toggleOverlay (state) {
			if (state.showOverlay === true) {
				state.showOverlay = false
			} else {
				state.showOverlay = true
			}
		}
	},
	actions: {
	},
	plugins: [vuexLocalStorage.plugin]
})
