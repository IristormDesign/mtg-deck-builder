<template>
	<div id="app">
		<site-header />

		<main>
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
	@import '@/sass/index.scss';
</style>
