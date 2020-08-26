<template>
	<div class="deck-list">
		<div v-if="activeDeck.cards.length == 0" class="no-cards">
			<p>This deck currently has no cards.</p>
		</div>
		<div v-else>
			<div class="labels">
				<div class="button-group">
					<div>Card Name</div>
					<div>Mana Cost</div>
					<div>Type</div>
				</div>
				<div class="qty-group">Quantity</div>
			</div>
			<ul>
				<li
					v-for="card in activeDeck.cards"
					:key="card.name"
				>
					<button @click="$emit('card-selected', card, activeDeck)">
						<h3 class="name">{{ card.name }}</h3>
						<div class="mana">{{ card.mana }}</div>
						<div class="type">{{ card.type }}</div>
					</button>

					<div class="qty">
						<span>{{ card.qty }}</span>

						<button @click="$emit('qty-decreased', card, activeDeck)">&minus;</button>

						<button
							v-if="card.qty < 4 || (card.qty < 99 && RegExp(/^Basic Land\b/).test(card.type))"
							@click="$emit('qty-increased', card)"
						>+</button>
						<button v-else disabled>+</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-list',
	props: {
		activeDeck: Object
	}
}
</script>
