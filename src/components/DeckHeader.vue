<template>
	<header>
		<form @submit.prevent>
			<template v-if="renaming === deck.cachedName">
				<h2 class="renaming">
					<input type="text" v-model.lazy="deck.name" v-focus />
				</h2>
				<button
					title="Save changes" type="submit"
					v-on:click="saveRename(deck, decks)"
				>Save</button>
				<button
					title="Cancel"
					v-on:click="cancelRename(deck)"
				>Cancel</button>
			</template>

			<template v-else-if="editingDefaultCard === deck.name">
				<h2>{{ deck.name }}</h2>
				<label for="defaultCardOptions">Default Card:</label>
				<select name="defaultCardOptions" id="defaultCardOptions">
					<option value="">&darr; Select a default card</option>
					<option v-for="card in deck.cards" v-bind:key="card.name">
						{{ card.name }}
					</option>
				</select>
				<button
					title="Save changes" type="submit"
					v-on:click="saveDefaultCard(deck)"
				>Save</button>
				<button
					title="Cancel"
					v-on:click="cancelDefaultCard(deck)"
				>Cancel</button>
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
					v-on:click="renameDeck(deck)"
				>Rename</button>
				<button
					title="Set the default card of this deck"
					v-on:click="setDefaultCard(deck)"
				>Default Card</button>
				<button
					title="Delete this deck"
					v-on:click="$emit('deck-deleted', deck.name)"
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

<style scoped lang="scss">
@import '../sass/variables';

header {
	grid-column: span 3;

	form {
		display: flex;
	}
	h2 {
		margin: 0;
		margin-right: .75em;
		flex-grow: 1;

		&.renaming {
			flex-grow: 0
		}
	}
	label {
		display: flex;
		align-items: center;
		margin-right: .5em;
	}
	button {
		margin-left: .75em;
		background: #aaa;
		color: #000;
		border-radius: .167em;
		padding: .167em .25em;
		min-width: 4.5em;

		&:hover,
		&:focus {
			background: #777;
			color: #fff;
		}
	}
}
.total-cards {
	display: flex;
	flex-direction: column;
	line-height: 1;
	text-align: center;
	height: 100%;
	background: #222;
	border: 1px solid #444;
	padding: 1px .375em;

	h3 {
		margin: .125em 0 -.0625em;
		text-transform: uppercase;
		font-size: .667em;
		letter-spacing: 0;
	}
	.amount {
		font-size: 1.333em;
	}
}
</style>
