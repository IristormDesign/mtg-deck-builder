<template>
	<div class="card-display">
		<div v-for="card in deck.cards" :key="card.name">
			<transition name="card-browse">
				<img
					v-show="deck.viewedCard == card.name"
					:src="card.img" :key="card.name"
					width="336" height="468" :alt="card.name"
				>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-card-display',
	props: {
		deck: Object
	}
}
</script>
