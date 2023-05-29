<template>
	<section class="sideboard-toggler">
		<h3>Switch Group:</h3>
		<fieldset class="radio-fieldset">
			<div>
				<label for="radio-main-deck">Main Deck</label>
				<input
					id="radio-main-deck"
					type="radio"
					checked
					name="view-list"
					@click="$store.commit('setShowSideboard', false)"
					ref="checkRadioMainDeck"
				/>
			</div>
			<div>
				<label for="radio-sideboard">Sideboard</label>
				<input
					id="radio-sideboard"
					type="radio"
					name="view-list"
					@click="$store.commit('setShowSideboard', true)"
				/>
			</div>
		</fieldset>
	</section>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	computed: {
		showSideboard () {
			return this.$store.state.showSideboard
		}
	},
	watch: {
		showSideboard () {
			if (!this.showSideboard) {
				this.$refs.checkRadioMainDeck.checked = true
			}
		}
	}
}
</script>
