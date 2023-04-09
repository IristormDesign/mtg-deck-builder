<template>
	<section
		v-if="$store.state.showSideboard"
		class="card-list sideboard"
	>
		<header>
			<h3>Sideboard</h3>
			<div class="sideboard-card-total">
				<h4>Total Cards in Sideboard</h4>
				<div class="output">
					{{ sideboardTotalCards }}
					<span
						class="warning-symbol" v-show="sideboardTotalCards > 15"
						title="Sideboards cannot have more than 15 cards."
					>⚠</span>
				</div>
			</div>
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
	computed: {
		sideboardTotalCards () {
			let total = 0

			this.deck.sideboard.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					total++
				}
			})
			return total
		}
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
