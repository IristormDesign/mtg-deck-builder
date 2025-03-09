<template>
	<section class="deck-info deck-name">
		<button
			@click="promptToRename()"
			title="Rename this deck"
		>
			<h2>{{ deck.name }}</h2>
		</button>

		<standard-dialog
			dialogID="renameDeck"
			class="with-text-input"
		>
			<p>Rename this deck:</p>
			<form slot="form" method="dialog">
				<input
					v-model.trim="newName"
					type="text" autofocus
					maxlength="50"
				/>
				<button
					@click="renameDeck(newName)"
					:disabled="!newName || newName === deck.name"
				>Rename</button>
				<button
					@click="$store.commit('dialogData', {})"
					class="cancel"
				>Cancel</button>
			</form>
		</standard-dialog>
		<dialogs-deck-name />
	</section>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import DialogsDeckName from '@/components/DialogsDeckName.vue'
import stringMethods from '@/mixins/stringMethods.js'
import sortDeckMenu from '@/mixins/sortDeckMenu.js'

export default {
	components: { StandardDialog, DialogsDeckName },
	mixins: [stringMethods, sortDeckMenu],
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
	props: {
		deck: Object
	},
	methods: {
		promptToRename () {
			this.newName = this.deck.name

			this.$store.commit('idOfShowingDialog', 'renameDeck')
		},
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
					name: 'listEditor',
					params: { deckPath: this.nameToPath }
				})
			}
		}
	}
}
</script>
