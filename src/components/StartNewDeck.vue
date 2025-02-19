<template>
	<section class="new-deck">
		<h3>New Deck</h3>
		<form @submit.prevent="submitDeckName()">
			<label for="deck-name">Give your deck a name:</label>
			<input
				autocomplete="off"
				id="deck-name"
				@input="checkDeckNameLength()"
				maxlength="50"
				ref="deckNameInput"
				type="text"
				v-model="deckNameInput"
			/>
			<div class="button-container">
				<button :disabled="deckNameInput.length === 0">
					Start
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M665.08-450H180v-60h485.08L437.23-737.85 480-780l300 300-300 300-42.77-42.15L665.08-450Z"/></svg>
				</button>
			</div>
		</form>
		<dialogs-deck-name :deckName="deckNameInput" />
	</section>
</template>

<script>
import DialogsDeckName from '@/components/DialogsDeckName.vue'
import stringMethods from '@/mixins/stringMethods.js'

export default {
	components: { DialogsDeckName },
	mixins: [stringMethods],
	data () {
		return {
			deckNameInput: ''
		}
	},
	methods: {
		checkDeckNameLength () {
			if (this.deckNameInput.length >= 50) {
				this.$store.commit('idOfShowingDialog', 'nameIsTooLong')
			}
		},
		submitDeckName () {
			const name = this.curlApostrophes(this.deckNameInput.trim()) // String trimming should happen here instead of in the component template. Otherwise, the dialog warning about overly long deck names won't appear if the deck name string begins with one or more spaces.
			const path = this.stringToPath(name)

			if (!this.hasLetterOrDigit(name)) {
				this.$store.commit('idOfShowingDialog', 'missingLetterOrDigit')
			} else if (this.deckExists(path)) {
				this.$store.commit('idOfShowingDialog', 'deckNameExists')
			} else {
				const updatedDecksArray = this.$store.state.decks

				updatedDecksArray.push({
					cards: [],
					colors: [],
					dataVersion: this.latestDeckDataVersion,
					editDate: new Date(),
					name: name,
					path: path,
					sideboard: {
						cards: [],
						viewedCard: null
					},
					sortBy: '',
					viewedCard: null
				})

				this.$store.commit('decks', updatedDecksArray)
				this.$parent.goToDeckPage(path)
			}
		}
	}
}
</script>
