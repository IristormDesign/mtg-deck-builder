<template>
	<transition name="stt-fade">
		<div
			v-show="!atTop && $route.name !== 'home'"
			class="scroll-to-top"
		>
			<button @click="scrollToTop()">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M434.5-151.87v-481.98L215.76-415.11 151.87-480 480-808.13 808.13-480l-63.89 64.89L525.5-633.85v481.98h-91Z"/></svg>
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
