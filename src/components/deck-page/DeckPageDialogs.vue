<template>
	<dialog ref="quantityLimitWarning">
		<p>A deck may not have more than 4 of any card with a particular name, other than the basic land cards.</p>
		<form method="dialog">
			<button
				autofocus
				@click="closeDialog()"
			>OK</button>
		</form>
	</dialog>
</template>

<script>
export default {
	watch: {
		'$store.state.idOfShowingDialog' (value) {
			this.$nextTick(() => {
				switch (value) {
					case 'quantityLimitWarning':
						this.$refs.quantityLimitWarning.showModal()
						break
				}
			})
		}
	},
	mounted () {
		document.addEventListener('keydown', this.listenForKeydown)
	},
	destroyed () {
		document.removeEventListener('keydown', this.listenForKeydown)
	},
	methods: {
		closeDialog () {
			this.$store.commit('idOfShowingDialog', null)
		},
		listenForKeydown (event) {
			if (!this.$store.state.idOfShowingDialog) return

			switch (event.key) {
				case 'Escape': case 'Esc':
					setTimeout(() => {
						this.closeDialog()
					}, 0)
			}
		}
	}
}
</script>
