<template>
	<div id="app">
		<header class="site-header">
			<h1>
				<router-link :to="{name: 'home'}">MTG Deck Organizer</router-link>
			</h1>
			<tabs @toggleOverlay="toggleOverlay()" />
		</header>
		<main>
			<router-view />
		</main>
		<site-footer />
		<div class="bg-overlay" @click="toggleOverlay(true)"></div>
	</div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default {
	name: 'App',
	components: {
		Tabs,
		SiteFooter
	},
	data () {
		return {
			decksLocalStorage: this.$store.state.decks
		}
	},
	created () {
		if (!this.decksLocalStorage) {
			const defaultDecks = [
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
			]
			this.$store.state.decks = defaultDecks
			this.decksLocalStorage = this.$store.state.decks
		}
		if (!localStorage.getItem('sortProperty')) {
			localStorage.setItem('sortProperty', 'type')
		}
	},
	methods: {
		toggleOverlay (directClick) {
			const overlay = document.querySelector('.bg-overlay')
			const deckMenu = document.querySelector('.deck-menu ul')

			overlay.classList.toggle('show')

			if (directClick) {
				deckMenu.classList.remove('show')
			}
		}
	},
	watch: {
		decksLocalStorage: {
			handler: function (val) {
				localStorage.setItem('decks', JSON.stringify(val))
			},
			deep: true
		}
	}
}
</script>

<style lang="scss">
	/* CSS gets inserted here. Don't remove this line. */
</style>
