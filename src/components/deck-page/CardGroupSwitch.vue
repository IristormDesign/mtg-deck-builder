<template>
	<section class="card-group-switch">
		<div>
			<h3>Switch card group:</h3>
			<fieldset class="radio-fieldset">
				<div>
					<label for="radio-main-group">Main</label>
					<input
						id="radio-main-group"
						type="radio"
						checked
						name="view-list"
						@click="$store.commit('showSideboard', false)"
						ref="radioMainGroup"
					/>
				</div>
				<div>
					<label for="radio-sideboard-group">Sideboard</label>
					<input
						id="radio-sideboard-group"
						type="radio"
						name="view-list"
						@click="$store.commit('showSideboard', true)"
						ref="radioSideboardGroup"
					/>
				</div>
			</fieldset>
		</div>
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
			if (this.showSideboard) {
				this.$refs.radioSideboardGroup.checked = true
			} else {
				this.$refs.radioMainGroup.checked = true
			}
		}
	}
}
</script>
