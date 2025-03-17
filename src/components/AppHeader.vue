<template>
	<header class="app-header">
		<div class="wrap">
			<div class="app-title">
				<h1><a href="/">MTG Deck Builder</a></h1>
				<div class="by-iristorm">by
					<a href="https://iristormdesign.com/" target="_blank">Iristorm Design<svg><use href="#open-in-new-icon" /></svg></a>
					<span>Iristorm Design</span>
				</div>
			</div>

			<app-header-menu />
		</div>
	</header>
</template>

<script>
import AppHeaderMenu from '@/components/AppHeaderMenu.vue'

export default {
	components: { AppHeaderMenu }
}
</script>

<style lang="scss">
	@import '@/sass/app-header.scss';
</style>
