<template>
	<div class="card-display">
		<div
			v-for="card in activeDeck.cards"
			v-bind:key="card.name"
		>
			<img
				v-if="card.showCard == true"
				v-bind:src="'img/cards/' + card.img"
				v-bind:alt="card.name"
				width="336" height="468"
			>
		</div>
	</div>
</template>

<script>
export default {
	name: 'card-display',
	props: {
		activeDeck: Object
	}
}
</script>

<style scoped lang="scss">

.card-display {
	grid-column: 3 / 4;
}
img {
	display: block;
	width: 100%;
	max-width: 672px;
	height: auto;
}

</style>
