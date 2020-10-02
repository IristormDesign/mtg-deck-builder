<template>
	<div class="card-display">
		<div v-for="card in deck.cards" :key="card.name">
			<img
				v-show="deck.viewedCard == card.name"
				:src="'img/cards/' + card.img"
				width="336" height="468" :alt="card.name"
			>
		</div>
	</div>
</template>

<script>
export default {
	name: 'card-display',
	props: {
		deck: Object
	}
}
</script>
