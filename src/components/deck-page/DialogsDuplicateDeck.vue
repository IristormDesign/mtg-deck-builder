<template>
	<div>
		<standard-dialog
			dialogID="duplicateDeck"
			class="with-text-input"
		>
			<p>Enter a unique name for the duplicate deck:</p>
			<form slot="form" method="dialog">
				<input
					v-model.trim="dupDeckName"
					type="text"
					autofocus
				/>
				<button
					@click.prevent="createDuplicateDeck()"
					:disabled="isInvalidDeckName"
				>Create Deck</button>
				<button formmethod="dialog">Cancel</button>
			</form>
		</standard-dialog>
		<standard-dialog dialogID="duplicationSuccess">
			<p><i>{{ dupDeckName }}</i> is now created.</p>
		</standard-dialog>
	</div>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import copyDeck from '@/mixins/copyDeck.js'

export default {
	components: { StandardDialog },
	mixins: [copyDeck],
	props: {
		deck: Object
	},
	data () {
		return {
			dupDeckName: ''
		}
	},
	computed: {
		isInvalidDeckName () {
			return (
				!this.dupDeckName ||
				this.dupDeckPath === this.$route.params.deckPath
			)
		},
		dupDeckPath () {
			return this.stringToPath(this.dupDeckName)
		}
	},
	watch: {
		'$store.state.idOfShowingDialog' (value) {
			if (value === 'duplicateDeck') {
				this.dupDeckName = this.amendCopiedDeckName(this.deck).name
			}
		}
	},
	methods: {
		createDuplicateDeck () {
			if (this.nameIsApproved(this.dupDeckName, this.dupDeckPath)) {
				const dupDeckData = JSON.parse(JSON.stringify(this.deck)) // The technique for deep-cloning objects, which is necessary here.
				const modifiedData = {
					name: this.dupDeckName,
					path: this.dupDeckPath
				}

				this.storeCopiedDeckAndRedirect(dupDeckData, modifiedData)
				this.$store.commit('idOfShowingDialog', null)

				setTimeout(() => {
					this.$store.commit('idOfShowingDialog', 'duplicationSuccess')
				}, 1)
			}
		}
	}
}
</script>
