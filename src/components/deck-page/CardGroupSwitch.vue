<template>
	<section class="card-group-switch">
		<div>
			<header>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M68.08-188.08v-583.84h370.19v130.77h-55.96v-74.81H124.04v471.92h258.27v-75h55.96v130.96H68.08Zm453.84 0v-130.96h55.96v75h86.97v55.96H521.92Zm226.58 0v-55.96h87.46v-75h55.96v130.96H748.5ZM521.92-641.15v-130.77h142.93v55.96h-86.97v74.81h-55.96Zm314.04 0v-74.81H748.5v-55.96h143.42v130.77h-55.96ZM124.04-244.04v-471.92 471.92Zm549.73-98.5-39.42-39.42 70.81-70.16H239.62v-55.96h465.54l-70.81-69.65 39.42-39.42L812.31-480 673.77-342.54Z"/></svg>
				<h3>Switch Group:</h3>
			</header>
			<fieldset
				class="radio-fieldset"
				title="(R)"
			>
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
