<template>
	<header>
		<form @submit.prevent>
			<template v-if="renaming === deck.cachedName">
				<h2>
					<input type="text" v-model.lazy="deck.name" v-focus />
				</h2>
				<button
					title="Save changes" type="submit"
					v-on:click="saveRename(deck)"
				>Save</button>
				<button
					title="Cancel"
					v-on:click="cancelRename(deck)"
				>Cancel</button>
			</template>

			<template v-else-if="editingDefaultCard === deck.name">
				<h2>{{ deck.name }}</h2>
				<select id="defaultCardOptions">
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
		deck: Object
	},
	directives: {
		focus: {
			inserted: function (el) {
				el.focus()
			}
		}
	},
	methods: {
		renameDeck (deck) {
			deck.cachedName = deck.name
			this.renaming = deck.name
		},
		saveRename (deck) {
			if (deck.name === '') {
				deck.name = '(Unnamed)'
			}
			// TO-DO: Deck's new name should not match any existing deck's name.

			this.renaming = null
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
	display: flex;
	align-items: center;

	h2 {
		margin: 0;
		display: inline-block;
		margin-right: 1em;
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
</style>
