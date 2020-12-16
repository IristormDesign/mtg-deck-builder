import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cardSorting: {
			cur: 'type',
			prev: 'qty'
		},
		decks: [
			{
				name: 'Mana Overload',
				path: 'mana-overload',
				cards: [
					{
						name: 'Forest',
						type: 'Basic Land — Forest',
						mana: '0',
						qty: 10
					},
					{
						name: 'Mountain',
						type: 'Basic Land — Mountain',
						mana: '0',
						qty: 12
					},
					{
						name: 'Almighty Bushwagg',
						type: 'Creature — Bushwagg',
						mana: '🟢',
						qty: 1
					},
					{
						name: 'Jaya’s Greeting',
						type: 'Instant',
						mana: '1 🔴',
						qty: 3
					},
					{
						name: 'Leafkin Avenger',
						type: 'Creature — Elemental',
						mana: '772 🔴🟢',
						qty: 3
					},
					{
						name: 'Shivan Dragon',
						type: 'Creature — Dragon',
						mana: '4 🔴🔴',
						qty: 2
					},
					{
						name: 'Nyxbloom Ancient',
						type: 'Creature — Elemental',
						mana: '4 🟢🟢🟢',
						qty: 3
					},
					{
						name: 'Stonecoil Serpent',
						type: 'Artifact Creature — Snake',
						mana: 'X',
						qty: 2
					}
				],
				editDate: new Date(),
				viewedCard: 'Nyxbloom Ancient'
			},
			{
				name: 'Air Force',
				path: 'air-force',
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
						qty: 1
					}
				],
				editDate: new Date(),
				viewedCard: 'Baneslayer Angel'
			}
		],
		deletedDeckName: null
	},
	getters: {
		stringToPath: () => (string) => {
			return string.toLowerCase()
				.replace(/\s/g, '-') // Replace whitespace characters with hyphens.
				.replace(/-{2,}/g, '-') // Replace multiple hyphens in a row with a single hyphen.
		},
		alertNameExists: () => (name) => {
			return `⚠ Another deck is already named “${name}.” Please give a different name.`
		}
	},
	mutations: {
		mutateDeletedDeckName (state, payload) {
			state.deletedDeckName = payload
		}
	},
	actions: {
	}
})
