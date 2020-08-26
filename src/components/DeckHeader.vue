<template>
	<header class="deck-header">
		<form @submit.prevent>
			<template v-if="renaming === deck.cachedName">
				<h2 class="renaming">
					<input type="text" v-model.lazy="deck.name" v-focus />
				</h2>
				<button
					title="Cancel" @click="cancelRename(deck)"
				>Cancel</button>
				<button
					title="Save changes" type="submit" class="primary-btn"
					@click="saveRename(deck, decks)"
				>Save</button>
			</template>

			<template v-else-if="editingDefaultCard === deck.name">
				<h2>{{ deck.name }}</h2>
				<label for="defaultCardOptions">Default Card:</label>
				<select name="defaultCardOptions" id="defaultCardOptions">
					<option value="">&darr; Select a default card</option>
					<option v-for="card in deck.cards" :key="card.name">
						{{ card.name }}
					</option>
				</select>
				<button
					title="Cancel" @click="cancelDefaultCard(deck)"
				>Cancel</button>
				<button
					title="Save changes" type="submit" class="primary-btn"
					@click="saveDefaultCard(deck)"
				>Save</button>

			</template>

			<template v-else>
				<h2>{{ deck.name }}</h2>
				<div class="total-cards">
					<h3>Total Cards</h3>
					<div class="amount">
						{{ totalCards }}
						<span v-show="totalCards < 60" class="warning-symbol" title="The minimum card limit in a deck is 60.">⚠</span>
					</div>
				</div>
				<button
					title="Rename this deck"
					@click="renameDeck(deck)"
				>Rename</button>
				<button
					title="Set the default card of this deck"
					@click="setDefaultCard(deck)"
				>Default Card</button>
				<button
					title="Delete this deck"
					@click="$emit('deck-deleted', deck.name)"
				>Delete</button>
			</template>
		</form>
	</header>
</template>

<script>
export default {
	name: 'deck-list',
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
		renameDeck (deck) {
			this.decks.forEach(deck => {
				deck.cachedName = deck.name
				console.log(deck.cachedName)
			})
			this.renaming = deck.name
		},
		saveRename (activeDeck, decks) {
			let newName = activeDeck.name
			const cachedName = activeDeck.cachedName

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

			this.editingDefaultCard = null
			deck.defaultCard = selectedDefaultCard.options[selectedDefaultCard.selectedIndex].value
		},
		cancelDefaultCard (deck) {
			deck.defaultCard = deck.cachedDefaultCard
			this.editingDefaultCard = null
		}
	}
}
</script>
