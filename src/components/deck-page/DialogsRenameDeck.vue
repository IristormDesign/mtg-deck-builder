<template>
	<div>
		<standard-dialog
			dialogID="renameDeck"
			class="with-text-input"
		>
			<p><strong>Rename this deck:</strong></p>
			<form slot="form" method="dialog">
				<input
					v-model.trim="newName"
					type="text"
					maxlength="50"
				/>
				<div class="button-container">
					<button
						@click="renameDeck(newName)"
						:disabled="!newName || newName === deck.name"
					>Rename</button>
				</div>
				<div class="button-container">
					<button
						@click="$store.commit('dialogData', {})"
						class="cancel"
					>Cancel</button>
				</div>
			</form>
		</standard-dialog>
		<dialogs-deck-name />
	</div>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import DialogsDeckName from '@/components/DialogsDeckName.vue'
import stringMethods from '@/mixins/stringMethods.js'
import sortDeckMenu from '@/mixins/sortDeckMenu.js'

export default {
	components: { StandardDialog, DialogsDeckName },
	mixins: [stringMethods, sortDeckMenu],
	props: {
		deck: Object
	},
	data () {
		return {
			newName: this.deck.name
		}
	},
	computed: {
		nameToPath () {
			return this.stringToPath(this.newName)
		}
	},
	watch: {
		/**
		 * Watch for changes in the `dialogData` store state to update the `newName` data variable to match the name of the currently open deck. This is needed for when the user navigates from one deck page to another.
		 * @param newData
		 */
		'$store.state.dialogData' (data) {
			if (typeof data === 'string') {
				this.newName = data
			}
		}
	},
	methods: {
		renameDeck () {
			const store = this.$store

			this.$nextTick(() => {
				store.commit('idOfShowingDialog', null)
				store.commit('dialogData', {})
			})

			this.newName = this.removeExcessSpaces(this.newName)

			if (!this.deckNameIsApproved(
				this.newName, this.nameToPath, this.promptToRename
			)) return

			Object.assign(this.deck, {
				name: this.newName,
				path: this.nameToPath,
				editDate: new Date()
			})

			this.sortDeckMenu()
			store.commit('decks', store.state.decks)

			if (this.nameToPath !== this.$route.params.deckPath) {
				this.$router.replace({
					name: this.$route.name,
					params: { deckPath: this.nameToPath }
				})
			}
		}
	}
}
</script>
