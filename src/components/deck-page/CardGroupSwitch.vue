<template>
	<section class="card-group-switch">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M715.69-168.08 577.08-306.92l138.61-138.85 31.62 33L664-329.62l196 1v45.39l-196-1 83.31 83.54-31.62 32.61Zm-558-11.92q-23.53 0-40.61-17.08T100-237.69v-135.85q0-23.53 17.08-40.61t40.61-17.08h260.16q23.53 0 40.61 17.08t17.08 40.61v135.85q0 23.53-17.08 40.61T417.85-180H157.69Zm0-45.39h260.16q5 0 8.65-3.46 3.66-3.46 3.66-8.84v-135.85q0-5.38-3.66-8.85-3.65-3.46-8.65-3.46H157.69q-5.38 0-8.84 3.46-3.46 3.47-3.46 8.85v135.85q0 5.38 3.46 8.84t8.84 3.46Zm86.62-290.84-31.62-32L296-632.38H100v-45.39h196l-83.31-83.54 31.62-31.61 138.61 137.84-138.61 138.85Zm297.84-12.54q-23.53 0-40.61-17.08t-17.08-40.61v-135.85q0-23.53 17.08-40.61T542.15-780h260.16q23.53 0 40.61 17.08T860-722.31v135.85q0 23.53-17.08 40.61t-40.61 17.08H542.15Zm0-45.38h260.16q5.38 0 8.84-3.46 3.46-3.47 3.46-8.85v-135.85q0-5.38-3.46-8.84t-8.84-3.46H542.15q-5 0-8.65 3.46-3.66 3.46-3.66 8.84v135.85q0 5.38 3.66 8.85 3.65 3.46 8.65 3.46ZM430.16-225.39v-160.46 160.46Zm99.68-348.76v-160.46 160.46Z"/></svg>
		<div>
			<h4 class="section-label">View Card Group:</h4>
			<fieldset class="radio-fieldset" title="[R]">
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
	watch: {
		'$store.state.showSideboard' () {
			if (this.$store.state.showSideboard) {
				this.$refs.radioSideboardGroup.checked = true
			} else {
				this.$refs.radioMainGroup.checked = true
			}
		}
	}
}
</script>
