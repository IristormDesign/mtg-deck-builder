<template>
	<div class="card-display">
		<div v-for="card in deck.cards" :key="card.name">
			<transition name="card-browse" appear>
				<a
					v-if="deck.viewedCard === card.name"
					:key="card.name" :class="card.colors[0]"
					:href="card.link" target="_blank"
					title="Click to open this card’s page on Scryfall"
				>
					<div class="loading-indicator">
						Loading image&hellip;
					</div>
					<img
						:src="card.img" :alt="card.name"
						width="488" height="680"
					/>
				</a>
			</transition>
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
