<template>
	<div class="active-card-list">
		<div class="list-headings">
			<div class="card-label-group">
				<strong class="name">Name</strong>
				<strong class="mana">Mana Cost</strong>
			</div>
			<div class="card-label-group">
				<strong class="type">Type</strong>
				<strong class="rarity">Rarity</strong>
			</div>
			<div class="qty-label-group">
				<strong class="qty" title="Quantity">Qty.</strong>
			</div>
		</div>

		<transition-group tag="ul" name="card-list-main">
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
	</div>
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
