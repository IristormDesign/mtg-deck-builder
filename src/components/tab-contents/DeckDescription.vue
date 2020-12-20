<template>
	<div class="deck-description">
		<h3>Deck Description</h3>
		<textarea
			v-model="deck.description" maxlength="500"
			@input="deck.editDate = new Date()"
			placeholder="(Write a brief explanation about this deck here.)"
		></textarea>
	</div>
</template>

<script>
export default {
	name: 'deck-description',
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
	}
}
</script>
