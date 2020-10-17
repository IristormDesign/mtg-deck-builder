<template>
	<div id="app">
		<header class="site-header">
			<h1><a href="/">MTG Deck List Organizer</a></h1>
			<tabs />
		</header>
		<main>
			<welcome v-if="$store.state.activeTab == null" />
			<div v-for="(deck, i) in $store.state.decks" :key="i">
				<tab-contents
					:deck="deck"
					v-show="$store.state.activeTab == deck.name"
				>
					<div class="tab-contents-main">
						<deck-header :deck="deck" />
						<deck-list :deck="deck" />
						<card-display :deck="deck" />
					</div>
					<deck-footer :deck="deck" />
				</tab-contents>
			</div>
			<tab-contents v-if="$store.state.deletedDeckMessage">
				<p class="deleted-deck-message">{{ $store.state.deletedDeckMessage }}</p>
			</tab-contents>
		</main>
		<site-footer />
	</div>
</template>

<script>
import Tabs from './components/Tabs.vue'
import TabContents from './components/TabContents.vue'
import Welcome from './components/Welcome.vue'
import DeckHeader from './components/DeckHeader.vue'
import DeckList from './components/DeckList.vue'
import CardDisplay from './components/CardDisplay.vue'
import DeckFooter from './components/DeckFooter.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
	name: 'App',
	components: {
		Tabs,
		TabContents,
		Welcome,
		DeckHeader,
		DeckList,
		CardDisplay,
		DeckFooter,
		SiteFooter
	}
}
</script>

<style lang="scss">
	/* CSS gets inserted here. Don't remove this line. */
</style>
