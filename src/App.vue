<template>
	<div id="app">
		<header class="site-header">
			<h1>
				<router-link :to="{name: 'home'}">MTG Deck List Organizer</router-link>
			</h1>
			<tabs />
		</header>
		<main>
			<router-view />
		</main>
		<site-footer />
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
			decksDefault: [
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
							qty: 3,
							img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/a/3/a391da36-0b40-46ea-b771-50d2b920207e.jpg?1581480808'
						},
						{
							name: 'Stonecoil Serpent',
							type: 'Artifact Creature — Snake',
							mana: 'X',
							qty: 2
						}
					],
					editDate: new Date(),
					description: 'One advanced diverted domestic repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should.',
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
							qty: 1,
							img: 'https://c1.scryfall.com/file/scryfall-cards/normal/front/4/b/4bd3014b-94bb-4a9f-92cf-239a2dcc7e97.jpg?1594734758'
						}
					],
					editDate: new Date(),
					description: 'Gravity letters it herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.',
					viewedCard: 'Baneslayer Angel'
				}
			],
			decksLocalStorage: this.$store.state.decks
		}
	},
	created () {
		if (this.decksLocalStorage === null) {
			this.decksLocalStorage = this.decksDefault
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
