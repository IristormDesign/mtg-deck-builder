<template>
	<transition-group
		tag="ul"
		:key="deck.name"
		name="card-li-fade"
	>
		<li
			v-for="(card, i) in activeCardList.cards"
			:key="card.name"
			class="card-li"
			:class="(card.gapAfter) ? 'gap-after' : null"
		>
			<card-star :card="card" :deck="deck" :i="i" />
			<card-bar :card="card" :deck="deck" :i="i" />
			<card-quantity :card="card" :deck="deck" :i="i" />
		</li>
	</transition-group>
</template>

<script>
import CardStar from '@/components/deck-page/CardStar.vue'
import CardBar from '@/components/deck-page/CardBar.vue'
import CardQuantity from '@/components/deck-page/CardQuantity.vue'
import cardListFunctions from '@/mixins/cardListFunctions.js'

export default {
	components: { CardStar, CardBar, CardQuantity },
	mixins: [cardListFunctions],
	props: {
		deck: Object
	}
}
</script>
