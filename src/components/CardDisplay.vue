<template>
	<section class="card-display">
		<transition
			v-for="card in deck.cards" :key="card.name"
			name="card-browse" appear appear-active-class="card-browse-appear-active"
		>
			<a
				v-if="deck.viewedCard === card.name"
				:key="card.name" :class="card.colors[0]" :href="card.link"
				target="_blank" rel="noopener noreferrer"
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
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	}
}
</script>
