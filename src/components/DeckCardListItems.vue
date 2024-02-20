<template>
	<transition-group
		tag="ul"
		:key="deck.name"
	>
		<li
			v-for="(card, i) in activeCardList.cards"
			:key="card.name"
			:class="(card.gapAfter) ? 'gap-after' : null"
		>
			<card-star :card="card" :deck="deck" :i="i" />
			<card-button :card="card" :deck="deck" />
			<card-quantity :card="card" :deck="deck" :i="i" />
		</li>
	</transition-group>
</template>

<script>
import CardStar from '@/components/DeckCardStar.vue'
import CardButton from '@/components/DeckCardButton.vue'
import CardQuantity from '@/components/DeckCardQuantity.vue'
import cardListFunctions from '@/mixins/cardListFunctions.js'

export default {
	components: { CardStar, CardButton, CardQuantity },
	mixins: [cardListFunctions],
	props: {
		deck: Object
	}
}
</script>
