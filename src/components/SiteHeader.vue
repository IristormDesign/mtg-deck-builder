<template>
	<header class="site-header">
		<div class="wrap">
			<h1>
				<router-link :to="{name: 'home'}">MTG Deck Organizer</router-link>
			</h1>

			<deck-menu @click="store.commit('toggleOverlay')" />
		</div>
	</header>
</template>

<script>
import DeckMenu from '@/components/DeckMenu.vue'

export default {
	name: 'site-header',
	components: {
		DeckMenu
	}
}
</script>
