<template>
	<transition-group
		tag="ul"
		:key="deck.name"
		name="card-li-fade"
	>
		<li
			v-for="(card, i) in activeCardList.cards"
			:key="card.name"
			:class="(card.gapAfter) ? 'gap-after' : null"
		>
			<card-star :card="card" :deck="deck" :i="i" />
			<card-button :card="card" :deck="deck" :i="i" />
			<card-quantity :card="card" :deck="deck" :i="i" />
		</li>
	</transition-group>
</template>

<script>
import CardStar from '@/components/deck-page/CardStar.vue'
import CardButton from '@/components/deck-page/CardButton.vue'
import CardQuantity from '@/components/deck-page/CardQuantity.vue'
import cardListFunctions from '@/mixins/cardListFunctions.js'

export default {
	components: { CardStar, CardButton, CardQuantity },
	mixins: [cardListFunctions],
	props: {
		deck: Object
	}
}
</script>
