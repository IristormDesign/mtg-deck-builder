<template>
	<transition appear name="fade-from-black">
		<div class="fade-bg" :class="homePageClass">
			<update-notif />
			<app-header />
			<main>
				<router-view />
			</main>
			<app-footer />
		</div>
	</transition>
</template>

<script>
import UpdateNotif from '@/components/AppUpdateNotif.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
	components: { UpdateNotif, AppHeader, AppFooter },
	computed: {
		homePageClass () {
			if (this.$route.name === 'home') {
				return 'root-home-page'
			} else {
				return null
			}
		}
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
