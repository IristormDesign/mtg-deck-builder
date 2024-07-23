<template>
	<transition name="stt-fade">
		<div
			v-show="!atTop && $route.name !== 'home'"
			class="scroll-to-top"
		>
			<button @click="scrollToTop()">
				<span>▲</span>
				<span class="text-label"> Scroll to Top</span>
			</button>
		</div>
	</transition>
</template>

<script>
export default {
	data () {
		return {
			atTop: true
		}
	},
	mounted () {
		window.addEventListener('scroll', this.checkScrollPosition)
	},
	methods: {
		checkScrollPosition () {
			this.atTop = window.scrollY <= 0
		},
		scrollToTop () {
			window.scrollTo({
				top: 0,
				behavior: window.scrollY < 10000 ? 'smooth' : 'instant'
			})

			this.atTop = true
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/scroll-to-top.scss';
</style>
