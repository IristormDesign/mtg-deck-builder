<template>
	<footer class="deck-footer">
		<template v-if="editingDefaultCard === deck.name">
			<label for="defaultCardOptions">Default Card:</label>
			<select name="defaultCardOptions" id="defaultCardOptions">
				<option value="">&darr; Select a default card</option>
				<option v-for="card in deck.cards" :key="card.name">
					{{ card.name }}
				</option>
			</select>
			<button
				title="Save changes" class="primary-btn"
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
					title="Set the default card of this deck"
					@click="setDefaultCard(deck)"
				>Set Default Card</button>
				<button
					title="Delete this deck"
					@click="$emit('deck-deleted', deck.name)"
				>Delete Deck</button>
			</div>
		</template>
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
			editingDefaultCard: ''
		}
	},
	props: {
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
