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
				<button class="cancel">Cancel</button>
			</form>
		</standard-dialog>

		<standard-dialog dialogID="duplicationSuccess">
			<p><i>{{ dupDeckName }}</i> is now created.</p>
		</standard-dialog>
	</div>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import amendCopiedDeckName from '@/mixins/amendCopiedDeckName.js'

export default {
	components: { StandardDialog },
	mixins: [amendCopiedDeckName],
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
		'$store.state.idOfShowingDialog' (id) {
			if (id === 'duplicateDeck') {
				this.dupDeckName = this.amendCopiedDeckName(this.deck).name
			}
		}
	},
	methods: {
		createDuplicateDeck () {
			const store = this.$store
			const isApproved = this.deckNameIsApproved(
				this.dupDeckName, this.dupDeckPath, () => {
					store.commit('idOfShowingDialog', null)
					store.commit('dialogData', {})

					setTimeout(() => {
						store.commit('idOfShowingDialog', 'duplicateDeck')
					}, 1)
				}
			)
			if (!isApproved) return

			const dupDeck = JSON.parse(JSON.stringify(this.deck)) // The technique for deep-cloning objects, which is necessary here.
			dupDeck.name = this.dupDeckName
			dupDeck.path = this.dupDeckPath
			dupDeck.editDate = new Date()

			store.state.decks.push(dupDeck)
			this.sortDeckMenu()
			store.commit('decks', store.state.decks)

			this.$router.push({
				name: 'listEditor',
				params: { deckPath: this.dupDeckPath }
			})

			store.commit('idOfShowingDialog', null)

			setTimeout(() => {
				store.commit('idOfShowingDialog', 'duplicationSuccess')
			}, 1)
		}
	}
}
</script>
