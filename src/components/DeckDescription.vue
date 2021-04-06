<template>
	<section class="deck-description">
		<h3>Deck Description</h3>

		<textarea
			v-model="deck.description" @change="editedDescription()"
			maxlength="999" placeholder="(Write a brief explanation about this deck here.)"
		></textarea>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	mounted () {
		const textarea = document.querySelector('.deck-description textarea')

		textarea.setAttribute(
			'style', 'height:' + (textarea.scrollHeight) + 'px;'
		)
		textarea.addEventListener('input', function () {
			this.style.height = 'auto'
			this.style.height = (this.scrollHeight) + 'px'
		})
	},
	methods: {
		editedDescription () {
			this.deck.editDate = new Date()

			this.$store.commit('setDecks', this.$store.state.decks)
		}
	}
}
</script>
