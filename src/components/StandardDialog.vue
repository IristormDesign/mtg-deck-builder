<template>
	<dialog :ref="dialogID">
		<slot><!-- Message inserted here. --></slot>
		<slot name="form">
			<form method="dialog">
				<button autofocus>OK</button>
			</form>
		</slot>
	</dialog>
</template>

<script>
export default {
	props: {
		dialogID: String
	},
	computed: {
		dialog () {
			return this.$refs[this.dialogID]
		}
	},
	watch: {
		'$store.state.idOfShowingDialog' (id) {
			switch (id) {
				case this.dialogID:
					this.dialog.showModal()
					return
				case null:
					this.dialog.close()

					if (this.$store.state.dialogData.callback) {
						this.$store.state.dialogData.callback()
					}
			}
		}
	},
	mounted () {
		this.dialog.addEventListener('close', this.closeDialog)
	},
	destroyed () {
		this.closeDialog()
		this.dialog.removeEventListener('close', this.closeDialog)
	},
	methods: {
		closeDialog () {
			this.$store.commit('idOfShowingDialog', null)
		}
	}
}
</script>
