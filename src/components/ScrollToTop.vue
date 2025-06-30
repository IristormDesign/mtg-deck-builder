<template>
	<transition name="stt-fade">
		<div
			v-show="!atTop && $route.name !== 'home'"
			class="scroll-to-top"
		>
			<button @click="scrollToTop()">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M180-760v-60h600v60H180Zm270 620v-411.85l-114 114L293.85-480 480-666.15 666.15-480 624-437.85l-114-114V-140h-60Z"/></svg>
				<span class="text-label"> Scroll to Top</span>
			</button>
		</div>
	</transition>
</template>

<script>
export default {
	data () {
		return {
			atTop: true,
			pausePositionCheck: false
		}
	},
	mounted () {
		window.addEventListener(
			'scroll', this.checkScrollPosition, { passive: true }
		)
	},
	methods: {
		checkScrollPosition () {
			if (!this.pausePositionCheck) {
				this.atTop = window.scrollY <= 0
			}
		},
		scrollToTop () {
			this.pausePositionCheck = true
			this.atTop = true

			window.scrollTo({
				top: 0,
				behavior: window.scrollY < 1024 ? 'smooth' : 'instant'
			})

			setTimeout(() => {
				this.pausePositionCheck = false
			}, 1000)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/scroll-to-top.scss';
</style>
