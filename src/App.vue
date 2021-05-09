<template>
	<transition appear name="fade-from-black">
		<div id="app">
			<update-notif />
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
import UpdateNotif from '@/components/UpdateNotif.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default {
	components: {
		UpdateNotif,
		SiteHeader,
		SiteFooter
	},
	created () {
		this.$watch(function () {
			const appEl = document.querySelector('#app')

			// For better performance, don't let the background texture image load on the home page.
			if (this.$route.name !== 'home') {
				appEl.classList.add('texture-bg')
			}
		})
	}
}
</script>

<style lang="scss">
	@import '@/sass/index.scss';
</style>
