<template>
	<article class="deck-action-page list-as-text content-box">
		<section>
			<h4>Main</h4>
			<textarea
				v-if="deck.cards.length > 0"
				class="text-card-list"
				v-text="listCards()"
				readonly
				:rows="textareaHeightMain"
			></textarea>
			<p
				v-else
				class="no-cards"
			>(No cards.)</p>
		</section>

		<section>
			<h4>Sideboard</h4>
			<textarea
				v-if="deck.sideboard.cards.length > 0"
				class="text-card-list"
				v-text="listCards(true)"
				:rows="textareaHeightSideboard"
				readonly
			></textarea>
			<p
				v-else
				class="no-cards"
			>(No cards.)</p>
		</section>
	</article>
</template>

<script>
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	mixins: [getActiveDeck],
	computed: {
		textareaHeightMain () {
			return this.deck.cards.length
		},
		textareaHeightSideboard () {
			return this.deck.sideboard.cards.length
		}
	},
	methods: {
		listCards (forSideboard) {
			const cards = () => {
				if (forSideboard) {
					return this.deck.sideboard.cards
				} else {
					return this.deck.cards
				}
			}

			const arrayOfCardNames = []

			cards().forEach(card => {
				const line = `${card.qty} ${card.name}`
				arrayOfCardNames.push(line)
			})

			return arrayOfCardNames.join('\n')
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-actions.scss';
</style>
