<template>
	<section class="sideboard-toggler">
		<button
			v-if="!$store.state.showSideboard"
			@click="$store.commit('setShowSideboard', true)">
			View Sideboard
		</button>
		<button
			v-else
			@click="$store.commit('setShowSideboard', false)"
			class="primary-btn">
			View Main Deck
		</button>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	}
}
</script>
