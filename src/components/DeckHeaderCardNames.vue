<template>
	<section class="deck-info card-names">
		<h3>Card Names</h3>

		<div class="output">
			{{ this.deck.cards.length }}
		</div>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	}
}
</script>
