<template>
	<div class="card-display">
		<div
			v-for="card in activeDeck.cards"
			:key="card.name"
		>
			<img
				v-if="card.showCard == true"
				:src="'img/cards/' + card.img"
				:alt="card.name"
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
