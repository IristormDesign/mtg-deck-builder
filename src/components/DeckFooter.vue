<template>
	<footer class="deck-footer">
		<form @submit.prevent class="deck-footer-form">
			<template v-if="renaming === deck.cachedName">
				<h3>New deck name:</h3>
				<input
					type="text" class="renaming"
					v-model.lazy="deck.name" v-focus
				/>
				<button
					title="Save changes" type="submit" class="primary-btn"
					@click="saveRename(deck, decks)"
				>Save</button>
				<button
					title="Cancel" @click="cancelRename(deck)"
				>Cancel</button>
			</template>

			<template v-else-if="editingDefaultCard === deck.name">
				<label for="defaultCardOptions">Default Card:</label>
				<select name="defaultCardOptions" id="defaultCardOptions">
					<option value="">&darr; Select a default card</option>
					<option v-for="card in deck.cards" :key="card.name">
						{{ card.name }}
					</option>
				</select>
				<button
					title="Save changes" type="submit" class="primary-btn"
					@click="saveDefaultCard(deck)"
				>Save</button>
				<button
					title="Cancel" @click="cancelDefaultCard(deck)"
				>Cancel</button>
			</template>

			<template v-else>
				<card-adder :deck="deck" @card-added="addCard" />

				<div class="button-group">
					<button
						title="Rename this deck"
						@click="renameDeck(deck)"
					>Rename Deck</button>
					<button
						title="Set the default card of this deck"
						@click="setDefaultCard(deck)"
					>Set Default Card</button>
					<button
						title="Delete this deck"
						@click="$emit('deck-deleted', deck.name)"
					>Delete Deck</button>
				</div>
			</template>
		</form>
	</footer>
</template>

<script>
import CardAdder from './CardAdder.vue'

export default {
	name: 'deck-footer',
	components: {
		CardAdder
	},
	data () {
		return {
			renaming: '',
			editingDefaultCard: ''
		}
	},
	props: {
		decks: Array,
		deck: Object
	},
	directives: {
		focus: {
			inserted: function (el) {
				el.focus()
			}
		}
	},
	computed: {
		totalCards () {
			let total = 0

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					total++
				}
			})

			return total
		}
	},
	methods: {
		addCard (newCard, deck) {
			this.$emit('setup-new-card', newCard)
			deck.cards.push(newCard)
			deck.editDate = new Date()
		},
		renameDeck (deck) {
			this.decks.forEach(deck => {
				deck.cachedName = deck.name
			})
			this.renaming = deck.name
		},
		saveRename (deck, decks) {
			let newName = deck.name
			const cachedName = deck.cachedName

			if (newName === '') {
				alert('Please give this deck a name.')

				newName = cachedName
			} else {
				const existingDeckName = function () {
					for (let i = 0; i < decks.length; i++) {
						if (newName.toUpperCase() === decks[i].cachedName.toUpperCase()) {
							return true
						}
					}
					return false
				}
				if (existingDeckName()) {
					alert('⚠ Another deck already has the name “' + newName + '.” Please enter a different name.')

					newName = cachedName
				} else {
					this.renaming = null
					deck.editDate = new Date()
				}
			}
		},
		cancelRename (deck) {
			deck.name = deck.cachedName
			this.renaming = null
		},
		setDefaultCard (deck) {
			deck.cachedDefaultCard = deck.defaultCard
			this.editingDefaultCard = deck.name
		},
		saveDefaultCard (deck) {
			const selectedDefaultCard = document.getElementById('defaultCardOptions')

			deck.defaultCard = selectedDefaultCard.options[selectedDefaultCard.selectedIndex].value

			this.editingDefaultCard = null

			deck.editDate = new Date()
		},
		cancelDefaultCard (deck) {
			deck.defaultCard = deck.cachedDefaultCard
			this.editingDefaultCard = null
		}
	}
}
</script>
