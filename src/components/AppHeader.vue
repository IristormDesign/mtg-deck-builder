<template>
	<header class="app-header">
		<div class="wrap">
			<div class="app-title">
				<h1><a href="/">MTG Deck Builder</a></h1>
				<div class="by-iristorm">by
					<a href="https://iristormdesign.com/" target="_blank">Iristorm Design</a>
					<span>Iristorm Design</span>
				</div>
			</div>

			<header-menu />
		</div>
	</header>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'

export default {
	components: { HeaderMenu }
}
</script>

<style lang="scss">
	@import '@/sass/app-header.scss';
</style>
