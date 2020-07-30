<template>
	<div class="card-display">
		<img
			v-for="card in activeDeck.cards"
			v-bind:key="card.name"
			v-bind:src="'img/cards/' + card.img"
			alt="Card" width="336" height="468"
		>
	</div>
</template>

<script>
export default {
	name: 'card-display',
	data () {
		return {
			shownCard: []
		}
	},
	// created () {
	// this.shownCard = card.img
	// },
	props: {
		// shownCard: Object,
		activeDeck: Object
	}
}
</script>

<style scoped lang="scss">
@import '../sass/variables';

</style>
