<template>
	<transition name="stt-fade">
		<div v-show="!atTop && $route.name !== 'home'" class="scroll-to-top">
			<button @click="scrollToTop()" title="Scroll up to the top">▲</button>
		</div>
	</transition>
</template>

<script>
import { reusableMethods } from '@/mixins/reusableMethods.js'

export default {
	mixins: [reusableMethods],
	data () {
		return {
			atTop: true
		}
	},
	mounted () {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 128) {
				this.atTop = false
			} else {
				this.atTop = true
			}
		})
	}
}
</script>
