<template>
	<section
		v-if="$store.state.showSideboard"
		class="card-list sideboard"
	>
		<header>
			<h3>Sideboard</h3>
			<div>Total Cards in Sideboard: X</div>
		</header>
		<div
			v-if="deck.sideboard.cards.length <= 0"
			class="no-cards"
			key="sideboard-no-cards"
		>
			<p>This deck’s sideboard is currently empty.</p>
		</div>
		<active-card-list
			v-else
			:deck="deck"
			key="sideboard-cards"
		/>
	</section>
	<section
		v-else
		class="card-list main-deck"
	>
		<header>
			<h3>Main Deck Card List</h3>
		</header>
		<div
			v-if="deck.cards.length <= 0"
			class="no-cards"
			@mouseover="attentionAddCard(true)"
			@mouseleave="attentionAddCard(false)"
			key="main-deck-no-cards"
		>
			<p>This deck has no cards yet. (Add some!)</p>
		</div>
		<active-card-list
			v-else
			:deck="deck"
			key="main-deck-cards"
		/>
	</section>
</template>

<script>
import ActiveCardList from '@/components/ActiveCardList.vue'

export default {
	components: { ActiveCardList },
	props: {
		deck: Object
	},
	methods: {
		attentionAddCard (doIt) {
			const cardAdderInput = document.querySelector('#card-input')

			if (doIt) {
				cardAdderInput.classList.add('attention')
			} else {
				setTimeout(() => {
					cardAdderInput.classList.remove('attention')
				}, 500)
			}
		}
	}
}
</script>
