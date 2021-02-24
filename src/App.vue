<template>
	<div id="app">
		<site-header />

		<main :class="{ 'welcome-bg': $route.path == '/' }">
			<router-view />
		</main>

		<site-footer />
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
