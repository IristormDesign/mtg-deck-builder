<template>
	<section class="sideboard-toggler">
		<h3>View List:</h3>
		<fieldset class="radio-fieldset">
			<div>
				<label for="main-deck">Main Deck</label>
				<input
					type="radio" id="main-deck" name="view-list" checked
					@click="$store.commit('setShowSideboard', false)"
				/>
			</div>
			<div>
				<label for="sideboard">Sideboard</label>
				<input
					type="radio" id="sideboard" name="view-list"
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
	}
}
</script>
