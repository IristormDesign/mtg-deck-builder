<template>
	<div class="card-display">
		<div v-for="card in deck.cards" :key="card.name">
			<a
				:href="card.link" target="_blank"
				title="Click to view this card’s page on Scryfall"
			>
				<transition name="card-browse">
					<img
						v-if="deck.viewedCard == card.name" :key="card.name"
						:src="card.img" :alt="card.name"
						width="488" height="680"
					/>
				</transition>
			</a>
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
