<template>
	<header class="sideboard-header">
		<h4>Sideboard</h4>

		<section class="sideboard-card-total">
			<h5>Total Cards<br> in Sideboard</h5>
			<div class="output">
				{{ sideboardTotalCards }}
				<svg
					v-show="sideboardTotalCards > 15"
					class="warning-symbol"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M22.62-98 480-886 937.38-98H22.62ZM481-220.69q18.73 0 32.02-13.29 13.29-13.29 13.29-32.02 0-18.73-13.29-32.02-13.29-13.29-32.02-13.29-18.73 0-32.02 13.29-13.29 13.29-13.29 32.02 0 18.73 13.29 32.02 13.29 13.29 32.02 13.29Zm-43-127.62h86v-204h-86v204Z"
				/></svg>
			</div>
		</section>
	</header>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	computed: {
		sideboardTotalCards () {
			return this.deck.sideboard.cards.reduce(
				(total, card) => total + Number(card.qty),
				0
			)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/sideboard-header.scss';
</style>
