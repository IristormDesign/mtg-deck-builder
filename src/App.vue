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
	}
}
</script>

<style lang="scss">
	/* CSS gets inserted here. Don't remove this line. */
</style>
