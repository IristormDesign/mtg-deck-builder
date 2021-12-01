<template>
	<transition appear name="fade-from-black">
		<div class="fade-bg">
			<update-notif />
			<site-header />
			<main>
				<transition name="fade-to" mode="out-in">
					<router-view />
				</transition>
			</main>
			<scroll-to-top />
			<site-footer />
		</div>
	</transition>
</template>

<script>
import UpdateNotif from '@/components/UpdateNotif.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import SiteFooter from '@/components/SiteFooter.vue'

export default {
	components: {
		UpdateNotif,
		SiteHeader,
		ScrollToTop,
		SiteFooter
	},
	mounted () {
		this.$watch(function () {
			// For better performance, don't let the background texture image load on the home page.
			if (this.$route.name !== 'home') {
				document.querySelector('.fade-bg').classList.add('texture-bg')
			}
		})

		// Prevent all links from opening a new tab via middle-click, with the exception of the links that are always set to open in a new tab.
		document.addEventListener('auxclick', (event) => {
			function conditions (el) {
				if (el !== null) {
					return (el.matches('a') && el.getAttribute('target') !== '_blank')
				}
			}

			if (conditions(event.target) || conditions(event.target.closest('a'))) {
				event.preventDefault()
			}
		})

		// Load the two default decks if needed.
		if (this.$store.state.loadDefaultDecks) {
			import('@/js/default-decks.json')
				.then(data => {
					this.$store.commit('setDecks', data.decks)
					this.$store.commit('setLoadDefaultDecks', false)
				})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/index.scss';
</style>
