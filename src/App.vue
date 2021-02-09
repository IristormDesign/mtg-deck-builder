<template>
	<div id="app">
		<site-header />

		<main>
			<router-view />
		</main>

		<site-footer />

		<transition name="overlay">
			<div
				v-show="$store.state.showOverlay" class="bg-overlay"
				@click="$store.commit('toggleOverlay', false)"
			></div>
		</transition>
	</div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default {
	name: 'App',
	components: {
		SiteHeader,
		SiteFooter
	}
}
</script>

<style lang="scss">
	/* CSS gets inserted here. Don't remove this line. */
</style>
