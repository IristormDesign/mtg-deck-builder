<template>
	<transition appear name="fade-from-black">
		<div id="app">
			<site-header />

				<main>
					<transition name="fade-to" mode="out-in">
						<router-view />
					</transition>
				</main>

			<site-footer />
		</div>
	</transition>
</template>

<script>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default {
	components: {
		SiteHeader,
		SiteFooter
	}
}
</script>

<style lang="scss">
	@import '@/sass/index.scss';
</style>
