<template>
	<div class="sideboard-toggler">
		<p>
			<button
				v-if="!$store.state.showSideboard" @click="showSideboard()"
			>View Sideboard</button>
			<button
				v-else
				@click="showMainDeck()"
				class="primary-btn"
			>View Main Deck</button>
		</p>
	</div>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	methods: {
		showSideboard () {
			this.$store.commit('setShowSideboard', true)
		},
		showMainDeck () {
			this.$store.commit('setShowSideboard', false)
		}
	}
}
</script>
