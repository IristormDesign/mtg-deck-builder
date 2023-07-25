<template>
	<section class="card-group-switch">
		<h3>Switch Card Group:</h3>
		<fieldset class="radio-fieldset">
			<div>
				<label for="radio-main-group">Main</label>
				<input
					id="radio-main-group"
					type="radio"
					checked
					name="view-list"
					@click="$store.commit('setShowSideboard', false)"
					ref="checkRadioMainDeck"
				/>
			</div>
			<div>
				<label for="radio-sideboard-group">Sideboard</label>
				<input
					id="radio-sideboard-group"
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
